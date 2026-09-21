import {isPublishedStatus} from './publishedContent';

/**
 * YAML block between the opening and closing `---` fences, or empty.
 */
export function readFrontmatter(markdown: string): string {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match?.[1] ?? '';
}

/**
 * Read a scalar `title:` or `status:` from the frontmatter block only.
 * Body lines that happen to start with the same key are ignored.
 */
export function readFrontmatterValue(
  markdown: string,
  key: 'title' | 'status',
): string | undefined {
  const block = readFrontmatter(markdown);
  if (!block) {
    return undefined;
  }

  const match = block.match(
    new RegExp(`^${key}:\\s*(?:['"](.+?)['"]|(.+?))\\s*$`, 'm'),
  );
  const raw = match?.[1] ?? match?.[2];
  return raw?.trim() || undefined;
}

/**
 * Frontmatter `title`, or `fallback` when the fence is missing or empty.
 */
export function extractFrontmatterTitle(
  markdown: string,
  fallback: string,
): string {
  return readFrontmatterValue(markdown, 'title') || fallback;
}

/**
 * Podcast markdown is public only when `status: published`.
 * Articles and custom pages have no status field and always emit.
 */
export function shouldPublishAgentMarkdown(
  relativePath: string,
  markdown: string,
): boolean {
  if (!relativePath.replaceAll('\\', '/').startsWith('podcasts/')) {
    return true;
  }

  return isPublishedStatus(readFrontmatterValue(markdown, 'status'));
}

/**
 * Escape a label so it cannot break a markdown `[label](href)` link.
 */
export function escapeMarkdownLinkLabel(label: string): string {
  return label.replace(/\\/g, '\\\\').replace(/[[\]]/g, '\\$&');
}

/**
 * Escape a heading so `# Title` cannot inject a link or extra ATX markup.
 */
export function escapeMarkdownHeading(text: string): string {
  return escapeMarkdownLinkLabel(text).replace(/#/g, '\\#');
}
