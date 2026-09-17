import {SITE_ORIGIN} from './agentDiscovery';
import {isPublishedStatus} from './publishedContent';
import type {
  WebMcpCatalogItem,
  WebMcpCatalogKind,
  WebMcpCatalogSource,
} from './webmcpTypes';

const MIN_TOKEN_LENGTH = 2;
const MIN_LIMIT = 1;
const MAX_LIMIT = 25;

/**
 * Split a free-text query into lowercase tokens of at least two characters.
 */
export function tokenizeQuery(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9àâäéèêëïîôùûüç\s/_.-]/gi, ' ')
    .split(/\s+/)
    .filter(token => token.length >= MIN_TOKEN_LENGTH);
}

/**
 * Clamp a caller-supplied limit into the catalog tool range.
 */
export function clampCatalogLimit(
  limit: number | undefined,
  fallback: number,
): number {
  const value =
    typeof limit === 'number' && Number.isFinite(limit) ? limit : fallback;
  return Math.min(Math.max(Math.trunc(value), MIN_LIMIT), MAX_LIMIT);
}

/**
 * Score one catalog item against a query (title beats path, tags, description).
 */
export function scoreCatalogItem(
  item: WebMcpCatalogItem,
  query: string,
): number {
  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) {
    return 0;
  }

  const title = item.title.toLowerCase();
  const path = item.path.toLowerCase();
  const description = item.description.toLowerCase();
  const tags = item.tags.join(' ').toLowerCase();
  const slug = (item.dsSlug ?? '').toLowerCase();
  const phrase = query.toLowerCase().trim();

  let score = 0;
  for (const token of tokens) {
    if (title.includes(token)) score += 8;
    if (path.includes(token)) score += 6;
    if (slug.includes(token)) score += 6;
    if (tags.includes(token)) score += 5;
    if (description.includes(token)) score += 4;
    if (item.episodeNumber != null && token === String(item.episodeNumber)) {
      score += 10;
    }
  }

  if (phrase.length >= MIN_TOKEN_LENGTH && title.includes(phrase)) {
    score += 12;
  }

  return score;
}

/**
 * Rank catalog items for a query and return the top matches.
 */
export function rankCatalog(
  items: WebMcpCatalogItem[],
  query: string,
  limit?: number,
): WebMcpCatalogItem[] {
  const capped = clampCatalogLimit(limit, 5);

  return items
    .map(item => ({item, score: scoreCatalogItem(item, query)}))
    .filter(entry => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, capped)
    .map(entry => entry.item);
}

/**
 * Latest episodes by episode number, newest first.
 */
export function latestEpisodes(
  items: WebMcpCatalogItem[],
  limit?: number,
): WebMcpCatalogItem[] {
  const capped = clampCatalogLimit(limit, 10);

  return items
    .filter(item => item.kind === 'episode')
    .slice()
    .sort(
      (left, right) => (right.episodeNumber ?? 0) - (left.episodeNumber ?? 0),
    )
    .slice(0, capped);
}

/**
 * Resolve an episode from slug, number, path, or free-text query.
 */
export function findEpisode(
  items: WebMcpCatalogItem[],
  lookup: {
    dsSlug?: string;
    episodeNumber?: number;
    path?: string;
    query?: string;
  },
): WebMcpCatalogItem | undefined {
  const episodes = items.filter(item => item.kind === 'episode');

  if (lookup.dsSlug) {
    const slug = lookup.dsSlug.toLowerCase();
    const match = episodes.find(item => item.dsSlug?.toLowerCase() === slug);
    if (match) return match;
  }

  if (lookup.episodeNumber != null) {
    const match = episodes.find(
      item => item.episodeNumber === lookup.episodeNumber,
    );
    if (match) return match;
  }

  if (lookup.path) {
    const normalized = lookup.path.replace(/\/+$/, '');
    const match = episodes.find(
      item => item.path.replace(/\/+$/, '') === normalized,
    );
    if (match) return match;
  }

  if (lookup.query) {
    const [ranked] = rankCatalog(episodes, lookup.query, 1);
    return ranked;
  }

  return undefined;
}

/**
 * Same-origin site-relative path only (no protocol-relative or off-site URLs).
 */
export function isSafeSitePath(path: string): boolean {
  if (!path.startsWith('/') || path.startsWith('//')) {
    return false;
  }

  try {
    return new URL(path, SITE_ORIGIN).origin === SITE_ORIGIN;
  } catch {
    return false;
  }
}

/**
 * Human-readable catalog line for an agent tool result.
 */
export function formatCatalogItem(item: WebMcpCatalogItem): string {
  const kind = item.kind === 'episode' ? 'Épisode' : 'Article';
  const number = item.episodeNumber != null ? ` #${item.episodeNumber}` : '';
  const slug = item.dsSlug ? ` [${item.dsSlug}]` : '';

  return `${kind}${number}: ${item.title}${slug}\n  ${item.path}/\n  ${item.description}`;
}

/**
 * Slim a Nuxt Content document to the catalog shape agents receive.
 */
export function toCatalogItem(
  kind: WebMcpCatalogKind,
  doc: WebMcpCatalogSource,
): WebMcpCatalogItem | undefined {
  if (!doc.title || !doc.path) {
    return undefined;
  }

  return {
    kind,
    title: doc.title,
    path: doc.path,
    description: doc.description ?? '',
    tags: doc.tags ?? [],
    dsSlug: doc.dsSlug,
    episodeNumber: doc.episodeNumber,
  };
}

/**
 * Build the in-browser catalog: published episodes plus every article.
 */
export function buildWebMcpCatalog(
  podcasts: WebMcpCatalogSource[],
  articles: WebMcpCatalogSource[],
): WebMcpCatalogItem[] {
  const episodes = podcasts
    .filter(doc => isPublishedStatus(doc.status))
    .map(doc => toCatalogItem('episode', doc));
  const posts = articles.map(doc => toCatalogItem('article', doc));

  return [...episodes, ...posts].filter(
    (item): item is WebMcpCatalogItem => item != null,
  );
}
