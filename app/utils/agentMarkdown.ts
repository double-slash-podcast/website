import {copyFileSync, globSync, mkdirSync, readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {shouldPublishAgentMarkdown} from './frontmatter';

/** Nuxt Content ordering prefix, e.g. `140.news` → `news`. */
const ORDER_PREFIX = /^\d+\./;

/** Collections whose files are copied next to prerendered HTML. */
export const AGENT_MARKDOWN_COLLECTIONS = [
  'articles',
  'podcasts',
  'custom',
] as const;

export type EmittedMarkdownPage = {
  sourcePath: string;
  publicPath: string;
  indexPath: string;
  siblingPath: string;
};

export type EmitAgentMarkdownOptions = {
  contentDir: string;
  outputDir: string;
};

/**
 * Strip a Nuxt Content numeric ordering prefix from one path segment.
 */
export function stripContentOrderPrefix(segment: string): string {
  return segment.replace(ORDER_PREFIX, '');
}

/**
 * Map a path relative to `content/` to the public URL (no trailing slash).
 * Mirrors Nuxt Content page routes, including the `/custom` prefix strip.
 */
export function contentFileToPublicPath(relativePath: string): string {
  const normalized = relativePath.replaceAll('\\', '/').replace(/^\/+/, '');
  const parts = normalized.split('/').filter(Boolean);

  if (parts.length < 2) {
    throw new Error(`Unexpected content path: ${relativePath}`);
  }

  const [collection, ...rest] = parts;
  const slugs: string[] = [];

  for (const [index, part] of rest.entries()) {
    const isFile = index === rest.length - 1;
    const stripped = stripContentOrderPrefix(part);

    if (isFile) {
      if (!stripped.endsWith('.md')) {
        throw new Error(`Not a markdown file: ${relativePath}`);
      }

      if (stripped === 'index.md') {
        continue;
      }

      slugs.push(stripped.slice(0, -3));
      continue;
    }

    slugs.push(stripped);
  }

  const segments = collection === 'custom' ? slugs : [collection, ...slugs];

  if (segments.length === 0 || segments.some(segment => segment.length === 0)) {
    throw new Error(`Could not map content path: ${relativePath}`);
  }

  return `/${segments.join('/')}`;
}

/**
 * Public URL path → files written under the SSG output directory.
 * `index.md` covers `/path/` + Accept; the sibling covers `/path.md`.
 */
export function publicPathToOutputFiles(
  publicPath: string,
  outputDir: string,
): {indexPath: string; siblingPath: string} {
  const relative = publicPath.replace(/^\//, '');

  return {
    indexPath: join(outputDir, relative, 'index.md'),
    siblingPath: join(outputDir, `${relative}.md`),
  };
}

/**
 * List markdown sources under `content/` that get an agent representation.
 */
export function listAgentMarkdownSources(contentDir: string): string[] {
  return AGENT_MARKDOWN_COLLECTIONS.flatMap(collection =>
    globSync(`${collection}/**/*.md`, {cwd: contentDir}),
  ).sort();
}

export type PublishableAgentMarkdown = {
  sourcePath: string;
  markdown: string;
};

/**
 * Content markdown that may be copied next to HTML (podcast drafts stay out).
 */
export function listPublishableAgentMarkdown(
  contentDir: string,
): PublishableAgentMarkdown[] {
  return listAgentMarkdownSources(contentDir).flatMap(sourcePath => {
    const markdown = readFileSync(join(contentDir, sourcePath), 'utf8');
    if (!shouldPublishAgentMarkdown(sourcePath, markdown)) {
      return [];
    }

    return [{sourcePath, markdown}];
  });
}

/**
 * Copy each published content markdown file next to its prerendered HTML.
 */
export function emitAgentMarkdownPages(
  options: EmitAgentMarkdownOptions,
): EmittedMarkdownPage[] {
  const sources = listPublishableAgentMarkdown(options.contentDir);
  const seen = new Map<string, string>();
  const emitted: EmittedMarkdownPage[] = [];

  for (const {sourcePath: relativePath} of sources) {
    const publicPath = contentFileToPublicPath(relativePath);
    const previous = seen.get(publicPath);

    if (previous && previous !== relativePath) {
      throw new Error(
        `Markdown path collision: ${previous} and ${relativePath} both map to ${publicPath}`,
      );
    }

    seen.set(publicPath, relativePath);

    const {indexPath, siblingPath} = publicPathToOutputFiles(
      publicPath,
      options.outputDir,
    );
    const diskPath = join(options.contentDir, relativePath);

    mkdirSync(dirname(indexPath), {recursive: true});
    mkdirSync(dirname(siblingPath), {recursive: true});
    copyFileSync(diskPath, indexPath);
    copyFileSync(diskPath, siblingPath);

    emitted.push({
      sourcePath: relativePath,
      publicPath,
      indexPath,
      siblingPath,
    });
  }

  return emitted;
}
