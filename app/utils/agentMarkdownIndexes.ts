import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {
  contentFileToPublicPath,
  listPublishableAgentMarkdown,
} from './agentMarkdown';
import {escapeMarkdownLinkLabel, extractFrontmatterTitle} from './frontmatter';
import {buildAgentNavMarkdown} from './agentMarkdownNav';

export const AGENT_MARKDOWN_SITE_TITLE = 'Double Slash';
export const AGENT_MARKDOWN_SITE_DESCRIPTION =
  'Le podcast sur le code, le développement web et les outils modernes.';

export type AgentMarkdownIndexEntry = {
  collection: string;
  publicPath: string;
  title: string;
  sourcePath: string;
};

export type EmitAgentMarkdownIndexesOptions = {
  contentDir: string;
  outputDir: string;
};

/**
 * Build catalog entries from published content markdown files.
 */
export function collectAgentMarkdownIndexEntries(
  contentDir: string,
): AgentMarkdownIndexEntry[] {
  return listPublishableAgentMarkdown(contentDir).map(
    ({sourcePath, markdown}) => {
      const publicPath = contentFileToPublicPath(sourcePath);
      const collection = sourcePath.split('/')[0] ?? 'pages';

      return {
        collection,
        publicPath,
        sourcePath,
        title: extractFrontmatterTitle(markdown, publicPath),
      };
    },
  );
}

/**
 * Markdown bullet list of catalog entries.
 */
function toBulletList(entries: AgentMarkdownIndexEntry[]): string {
  return entries
    .map(
      entry =>
        `- [${escapeMarkdownLinkLabel(entry.title)}](${entry.publicPath}/)`,
    )
    .join('\n');
}

/**
 * Homepage markdown served when agents request `/` with Accept: text/markdown.
 */
export function buildHomeMarkdown(entries: AgentMarkdownIndexEntry[]): string {
  const articles = entries.filter(entry => entry.collection === 'articles');
  const podcasts = [...entries]
    .filter(entry => entry.collection === 'podcasts')
    .reverse();

  return `# ${AGENT_MARKDOWN_SITE_TITLE}

${AGENT_MARKDOWN_SITE_DESCRIPTION}

${buildAgentNavMarkdown()}

## Articles

${toBulletList(articles)}

## Épisodes

${toBulletList(podcasts)}
`;
}

/**
 * Collection listing served for `/articles/` or `/podcasts/` markdown negotiation.
 */
export function buildCollectionMarkdown(
  title: string,
  entries: AgentMarkdownIndexEntry[],
): string {
  return `# ${title}

${buildAgentNavMarkdown()}

${toBulletList(entries)}
`;
}

/**
 * Write an aggregate markdown page as `index.md` (and a sibling `.md` when not `/`).
 */
function writeAggregateMarkdown(
  outputDir: string,
  publicPath: string,
  markdown: string,
): void {
  const relative = publicPath.replace(/^\//, '');
  const indexPath = relative
    ? join(outputDir, relative, 'index.md')
    : join(outputDir, 'index.md');

  mkdirSync(dirname(indexPath), {recursive: true});
  writeFileSync(indexPath, markdown);

  if (relative) {
    writeFileSync(join(outputDir, `${relative}.md`), markdown);
  }
}

/**
 * Emit homepage and listing markdown so Accept: text/markdown works on HTML-only routes.
 */
export function emitAgentMarkdownIndexes(
  options: EmitAgentMarkdownIndexesOptions,
): string[] {
  const entries = collectAgentMarkdownIndexEntries(options.contentDir);
  const articles = entries.filter(entry => entry.collection === 'articles');
  const podcasts = [...entries]
    .filter(entry => entry.collection === 'podcasts')
    .reverse();

  writeAggregateMarkdown(options.outputDir, '/', buildHomeMarkdown(entries));
  writeAggregateMarkdown(
    options.outputDir,
    '/articles',
    buildCollectionMarkdown('Articles', articles),
  );
  writeAggregateMarkdown(
    options.outputDir,
    '/podcasts',
    buildCollectionMarkdown('Épisodes', podcasts),
  );

  return ['/', '/articles', '/podcasts'];
}
