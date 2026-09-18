import {JSDOM} from 'jsdom';
import {NodeHtmlMarkdown} from 'node-html-markdown';
import {escapeMarkdownHeading} from './frontmatter';
import {buildAgentNavMarkdown, extractSiteNavLinks} from './agentMarkdownNav';

const youtubeWatchUrl = 'https://www.youtube.com/watch?v=';
const ytimgIdPattern = /i\.ytimg\.com\/vi(?:_webp)?\/([^/?#]+)\//;

const htmlToMarkdown = new NodeHtmlMarkdown({
  bulletMarker: '-',
  maxConsecutiveNewlines: 2,
  ignore: ['script', 'style', 'template', 'noscript', 'svg', 'button', 'link'],
});

/**
 * Visible text of the first document heading, collapsed to one line.
 */
function firstHeadingText(document: Document): string {
  const heading = document.querySelector('h1');
  return heading?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
}

/**
 * YouTube video id from a poster URL (`i.ytimg.com/vi/{id}/hqdefault.jpg`).
 */
function youtubeIdFrom(value: string | null | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const match = value.match(ytimgIdPattern);
  if (!match?.[1]) {
    return undefined;
  }

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

/**
 * Replace an embed node with a watch-page link.
 */
function replaceWithWatchLink(node: Element, id: string, title: string): void {
  const link = node.ownerDocument.createElement('a');
  link.setAttribute('href', `${youtubeWatchUrl}${id}`);
  link.textContent = title || 'YouTube';
  node.replaceWith(link);
}

/**
 * Turn vue-lite-youtube-embed SSR (`article.yt-lite`) into watch URLs.
 * Also accepts a legacy `<lite-youtube videoid>` node if one appears.
 */
function replaceYoutubeEmbeds(root: Element): void {
  for (const article of [...root.querySelectorAll('article.yt-lite')]) {
    const id =
      youtubeIdFrom(article.getAttribute('style')) ||
      youtubeIdFrom(article.previousElementSibling?.getAttribute('href'));
    if (!id) {
      continue;
    }

    replaceWithWatchLink(
      article,
      id,
      article.getAttribute('data-title')?.trim() || 'YouTube',
    );
  }

  for (const node of [...root.querySelectorAll('lite-youtube')]) {
    const id =
      node.getAttribute('videoid') || node.getAttribute('data-videoid');
    if (!id) {
      continue;
    }

    replaceWithWatchLink(
      node,
      id,
      node.getAttribute('title') ||
        node.getAttribute('videotitle') ||
        'YouTube',
    );
  }

  root
    .querySelectorAll('link[href*="i.ytimg.com"]')
    .forEach(node => node.remove());
}

/**
 * Map Info callout boxes to blockquotes so they survive HTML→markdown.
 */
function replaceInfoBlocks(root: Element): void {
  for (const node of [...root.querySelectorAll('.info-block')]) {
    const quote = node.ownerDocument.createElement('blockquote');
    quote.innerHTML = node.innerHTML;
    node.replaceWith(quote);
  }
}

/**
 * Drop in-page chrome (tabs, share, icons) while keeping hidden tab panels.
 */
function stripChrome(root: Element): void {
  root.querySelectorAll('[role="tablist"]').forEach(node => node.remove());
  root.querySelectorAll('button').forEach(node => node.remove());
  root.querySelectorAll('svg').forEach(node => node.remove());
}

/**
 * Prepare <main> so conversion keeps article body, not player / share UI.
 */
function prepareMain(main: Element, title: string): void {
  replaceYoutubeEmbeds(main);
  replaceInfoBlocks(main);
  stripChrome(main);

  const heading = main.querySelector('h1');
  if (heading && heading.textContent?.replace(/\s+/g, ' ').trim() === title) {
    heading.remove();
  }
}

/**
 * Convert prerendered page HTML into agent markdown: title, site nav, then body.
 */
export function htmlToAgentMarkdown(html: string): string {
  const {window} = new JSDOM(html);

  try {
    const {document} = window;
    const main = document.querySelector('main');

    if (!main) {
      throw new Error('No <main> in prerendered HTML');
    }

    const title = firstHeadingText(document);
    const nav = buildAgentNavMarkdown(extractSiteNavLinks(document));
    prepareMain(main, title);

    const body = htmlToMarkdown.translate(main.innerHTML).trim();
    const parts: string[] = [];
    if (title) {
      parts.push(`# ${escapeMarkdownHeading(title)}`);
    }
    parts.push(nav);
    if (body) {
      parts.push(body);
    }

    return `${parts.join('\n\n')}\n`;
  } finally {
    window.close();
  }
}
