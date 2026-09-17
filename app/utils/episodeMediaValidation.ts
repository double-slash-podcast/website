import {globSync, readFileSync} from 'node:fs';
import {parseFrontMatter} from 'remark-mdc';
import {isValidDuration, isValidFileSize} from './mediaMeta';

const PODCASTS_GLOB = 'content/podcasts/**/*.md';

type EpisodeFrontmatter = Record<string, unknown> & {
  dsSlug?: string;
  title?: string;
  status?: string;
  duration?: unknown;
  fileSize?: unknown;
};

export type EpisodeMediaIssue = {
  filePath: string;
  dsSlug: string;
  title?: string;
  missingDuration: boolean;
  missingFileSize: boolean;
};

export const collectEpisodeMediaIssues = async (
  globPattern = PODCASTS_GLOB,
): Promise<EpisodeMediaIssue[]> => {
  const files = globSync(globPattern).sort();
  const issues: EpisodeMediaIssue[] = [];

  for (const filePath of files) {
    const raw = readFileSync(filePath, 'utf8');
    const {data} = await parseFrontMatter(raw, {preserveOrder: true});
    const frontmatter = data as EpisodeFrontmatter;

    if (frontmatter.status === 'draft') {
      continue;
    }

    const missingDuration = !isValidDuration(frontmatter.duration);
    const missingFileSize = !isValidFileSize(frontmatter.fileSize);

    if (!missingDuration && !missingFileSize) {
      continue;
    }

    issues.push({
      filePath,
      dsSlug: frontmatter.dsSlug || filePath,
      title: typeof frontmatter.title === 'string' ? frontmatter.title : undefined,
      missingDuration,
      missingFileSize,
    });
  }

  return issues;
};

export const formatEpisodeMediaIssues = (
  issues: EpisodeMediaIssue[],
): string => {
  const lines = issues.map((issue) => {
    const missing = [
      issue.missingDuration ? 'duration' : null,
      issue.missingFileSize ? 'fileSize' : null,
    ].filter(Boolean);

    const label = issue.title
      ? `${issue.dsSlug} — ${issue.title}`
      : issue.dsSlug;

    return `  - ${label} (${issue.filePath}): missing ${missing.join(', ')}`;
  });

  return [
    'Build blocked: podcast episodes are missing media metadata in frontmatter.',
    '',
    'Each published episode must have `duration` and `fileSize` filled in.',
    'Run `pnpm sync-durations` to fetch them from the CDN, then commit the updated markdown files.',
    '',
    ...lines,
  ].join('\n');
};
