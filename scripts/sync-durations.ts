import {globSync, readFileSync, writeFileSync} from 'node:fs';
import axios from 'axios';
import {parseFrontMatter, stringifyFrontMatter} from 'remark-mdc';
import {buildEpisodeAudioUrl} from '../app/utils/audio';
import {
  isValidDuration,
  isValidFileSize,
} from '../app/utils/mediaMeta';
import estimateMP3DurationAxios from '../app/helpers/duration/estimateMP3DurationAxios';

const PODCASTS_GLOB = 'content/podcasts/**/*.md';
const CONCURRENCY = 4;

type CliOptions = {
  dryRun: boolean;
  force: boolean;
  slug?: string;
};

type EpisodeFrontmatter = Record<string, unknown> & {
  dsSlug?: string;
  duration?: unknown;
  fileSize?: unknown;
};

const parseArgs = (): CliOptions => {
  const args = process.argv.slice(2);
  const slugIndex = args.indexOf('--slug');

  return {
    dryRun: args.includes('--dry-run'),
    force: args.includes('--force'),
    slug: slugIndex >= 0 ? args[slugIndex + 1] : undefined,
  };
};

const fetchFileSize = async (url: string): Promise<number | undefined> => {
  const response = await axios.head(url);
  const contentLength = response.headers['content-length'];

  if (!contentLength) {
    return undefined;
  }

  const size = parseInt(String(contentLength), 10);
  return Number.isFinite(size) && size > 0 ? size : undefined;
};

const runPool = async <T>(
  items: T[],
  worker: (item: T) => Promise<void>,
  concurrency: number,
) => {
  let index = 0;

  const runners = Array.from({length: concurrency}, async () => {
    while (index < items.length) {
      const currentIndex = index;
      index += 1;
      await worker(items[currentIndex] as T);
    }
  });

  await Promise.all(runners);
};

const syncEpisode = async (
  filePath: string,
  options: CliOptions,
): Promise<'skip' | 'updated' | 'error'> => {
  const raw = readFileSync(filePath, 'utf8');
  const {data, content} = await parseFrontMatter(raw, {preserveOrder: true});
  const frontmatter = data as EpisodeFrontmatter;

  if (!frontmatter.dsSlug || typeof frontmatter.dsSlug !== 'string') {
    console.error(`[error] ${filePath}: missing dsSlug`);
    return 'error';
  }

  if (options.slug && frontmatter.dsSlug !== options.slug) {
    return 'skip';
  }

  const needsDuration = options.force || !isValidDuration(frontmatter.duration);
  const needsFileSize = options.force || !isValidFileSize(frontmatter.fileSize);

  if (!needsDuration && !needsFileSize) {
    console.log(`[skip] ${frontmatter.dsSlug}`);
    return 'skip';
  }

  const url = buildEpisodeAudioUrl(frontmatter.dsSlug);

  try {
    if (needsDuration) {
      const estimate = await estimateMP3DurationAxios(url);

      if (!estimate?.duration) {
        console.error(`[error] ${frontmatter.dsSlug}: unable to estimate duration`);
        return 'error';
      }

      frontmatter.duration = estimate.duration;
      frontmatter.fileSize = estimate.size;
    } else if (needsFileSize) {
      const size = await fetchFileSize(url);

      if (!size) {
        console.error(`[error] ${frontmatter.dsSlug}: unable to fetch file size`);
        return 'error';
      }

      frontmatter.fileSize = size;
    }

    if (!options.dryRun) {
      const {__order__, ...frontmatterData} = frontmatter;
      writeFileSync(
        filePath,
        stringifyFrontMatter(frontmatterData, content),
      );
    }

    console.log(
      `[updated] ${frontmatter.dsSlug} duration=${frontmatter.duration} fileSize=${frontmatter.fileSize}${options.dryRun ? ' (dry-run)' : ''}`,
    );
    return 'updated';
  } catch (error) {
    console.error(
      `[error] ${frontmatter.dsSlug}: ${error instanceof Error ? error.message : String(error)}`,
    );
    return 'error';
  }
};

const main = async () => {
  const options = parseArgs();
  const files = globSync(PODCASTS_GLOB).sort();

  const filteredFiles = options.slug
    ? (
        await Promise.all(
          files.map(async (file) => {
            const raw = readFileSync(file, 'utf8');
            const {data} = await parseFrontMatter(raw, {preserveOrder: true});
            return (data as EpisodeFrontmatter).dsSlug === options.slug
              ? file
              : null;
          }),
        )
      ).filter((file): file is string => file !== null)
    : files;

  if (options.slug && filteredFiles.length === 0) {
    console.error(`[error] No episode found for slug "${options.slug}"`);
    process.exit(1);
  }

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  await runPool(
    filteredFiles,
    async (filePath) => {
      const result = await syncEpisode(filePath, options);

      if (result === 'updated') {
        updated += 1;
      } else if (result === 'skip') {
        skipped += 1;
      } else {
        errors += 1;
      }
    },
    CONCURRENCY,
  );

  console.log(
    `\nDone: ${updated} updated, ${skipped} skipped, ${errors} error(s)`,
  );

  if (errors > 0) {
    process.exit(1);
  }
};

main();
