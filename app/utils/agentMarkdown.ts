import {
  existsSync,
  globSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {shouldPublishAgentMarkdown} from './frontmatter';
import {htmlToAgentMarkdown} from './htmlToAgentMarkdown';

/** Nuxt Content ordering prefix, e.g. `140.news` → `news`. */
const ORDER_PREFIX = /^\d+\./;

/** Collections whose prerendered HTML is converted to agent markdown. */
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
 * Mirrors Nuxt Content page routes: numeric prefixes stripped, `/custom`
 * dropped, and slugs lowercased like Content pathMeta (Linux prerender).
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

  return `/${segments.map(segment => segment.toLowerCase()).join('/')}`;
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
 * Public URL path → prerendered HTML written by `nuxi generate`.
 */
export function publicPathToHtmlFile(
  publicPath: string,
  outputDir: string,
): string {
  const relative = publicPath.replace(/^\//, '');
  return join(outputDir, relative, 'index.html');
}

/**
 * SSG folders to emit into: CLI arg, else `.output/public`, else leftover `dist/`.
 * Never both — a stale dist next to a fresh generate must not fail the build.
 */
export function resolveAgentMarkdownOutputDirs(
  root: string,
  fromArg?: string,
): string[] {
  if (fromArg) {
    return [resolve(root, fromArg)];
  }

  const outputPublic = resolve(root, '.output/public');
  if (existsSync(outputPublic)) {
    return [outputPublic];
  }

  const dist = resolve(root, 'dist');
  return existsSync(dist) ? [dist] : [];
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
 * Content markdown that may get an agent page (podcast drafts stay out).
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
 * Convert each published page's prerendered HTML into agent markdown files.
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

    const htmlPath = publicPathToHtmlFile(publicPath, options.outputDir);
    if (!existsSync(htmlPath)) {
      throw new Error(
        `Missing prerendered HTML for ${publicPath} (${htmlPath}). Run nuxi generate first.`,
      );
    }

    const {indexPath, siblingPath} = publicPathToOutputFiles(
      publicPath,
      options.outputDir,
    );
    const markdown = htmlToAgentMarkdown(readFileSync(htmlPath, 'utf8'));

    mkdirSync(dirname(indexPath), {recursive: true});
    mkdirSync(dirname(siblingPath), {recursive: true});
    writeFileSync(indexPath, markdown);
    writeFileSync(siblingPath, markdown);

    emitted.push({
      sourcePath: relativePath,
      publicPath,
      indexPath,
      siblingPath,
    });
  }

  return emitted;
}
