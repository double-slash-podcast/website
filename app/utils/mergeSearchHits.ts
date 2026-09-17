import {stripSnippetHtml} from './snippetHtml';
import {
  clampCatalogLimit,
  rankCatalog,
  scoreCatalogItem,
  tokenizeQuery,
} from './webmcpSearch';
import type {WebMcpCatalogItem, WebMcpCatalogKind} from './webmcpTypes';

/** One FTS5 row before it is collapsed to a document. */
export type FullTextHit = {
  collection: string;
  id: string;
  title: string;
  content: string;
  rank: number;
  snippet?: string;
};

/** Ranked, published hit shown in the modal, results page, and WebMCP. */
export type SiteSearchHit = {
  kind: WebMcpCatalogKind;
  title: string;
  path: string;
  href: string;
  description: string;
  snippet?: string;
  matchedTags: string[];
  tags: string[];
  episodeNumber?: number;
  dsSlug?: string;
  publicationDate?: string;
  score: number;
};

const FTS_BASE_BOOST = 15;

/**
 * Strip heading anchors from an FTS id and drop a trailing slash.
 */
export function normalizeDocPath(path: string): string {
  const withoutHash = path.split('#')[0] ?? path;
  if (!withoutHash || withoutHash === '/') {
    return '/';
  }

  return withoutHash.replace(/\/+$/, '');
}

/**
 * Canonical document href, keeping an FTS heading hash when present.
 */
export function toHitHref(path: string, ftsId?: string): string {
  const normalized = normalizeDocPath(path);
  const base = normalized === '/' ? '/' : `${normalized}/`;
  const hashIndex = ftsId?.indexOf('#') ?? -1;
  const hash = hashIndex >= 0 && ftsId ? ftsId.slice(hashIndex) : '';

  return `${base}${hash}`;
}

/**
 * Tags whose names contain a query token (frontmatter, not FTS).
 */
export function collectMatchedTags(tags: string[], query: string): string[] {
  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) {
    return [];
  }

  return tags.filter(tag => {
    const lower = tag.toLowerCase();
    return tokens.some(token => lower.includes(token));
  });
}

/**
 * Map Nuxt Content search rows into the merge helper shape.
 */
export function toFullTextHits(
  rows: Array<{
    collection: string;
    id: string;
    title: string;
    content: string;
    rank: number;
    snippets?: {content?: string};
  }>,
): FullTextHit[] {
  return rows.map(row => ({
    collection: row.collection,
    id: row.id,
    title: row.title,
    content: row.content,
    rank: row.rank,
    snippet: row.snippets?.content,
  }));
}

/**
 * One published catalog row per normalized path.
 */
function catalogByPath(
  catalog: WebMcpCatalogItem[],
): Map<string, WebMcpCatalogItem> {
  const map = new Map<string, WebMcpCatalogItem>();
  for (const item of catalog) {
    map.set(normalizeDocPath(item.path), item);
  }

  return map;
}

/**
 * Keep the best FTS section per document (lower BM25 rank wins).
 */
function collapseFullTextHits(ftsHits: FullTextHit[]): FullTextHit[] {
  const best = new Map<string, FullTextHit>();

  for (const hit of ftsHits) {
    const path = normalizeDocPath(hit.id);
    const current = best.get(path);
    if (!current || hit.rank < current.rank) {
      best.set(path, hit);
    }
  }

  return [...best.values()].sort((left, right) => left.rank - right.rank);
}

/**
 * Build a UI/agent hit from a published catalog row and optional FTS snippet.
 */
function toSiteHit(
  item: WebMcpCatalogItem,
  query: string,
  score: number,
  fts?: FullTextHit,
): SiteSearchHit {
  return {
    kind: item.kind,
    title: item.title,
    path: item.path,
    href: toHitHref(item.path, fts?.id),
    description: item.description,
    snippet: fts?.snippet,
    matchedTags: collectMatchedTags(item.tags, query),
    tags: item.tags,
    episodeNumber: item.episodeNumber,
    dsSlug: item.dsSlug,
    publicationDate: item.publicationDate,
    score,
  };
}

/**
 * Unix ms for recency sorts; missing or invalid dates sink to the bottom.
 */
function recencyTime(hit: Pick<SiteSearchHit, 'publicationDate'>): number {
  if (!hit.publicationDate) {
    return 0;
  }

  const time = Date.parse(hit.publicationDate);
  return Number.isNaN(time) ? 0 : time;
}

/**
 * Newest first: episode number, then publication date, then relevance score.
 */
export function compareHitsByRecency(
  left: SiteSearchHit,
  right: SiteSearchHit,
): number {
  const episodeDiff = (right.episodeNumber ?? 0) - (left.episodeNumber ?? 0);
  if (episodeDiff !== 0) {
    return episodeDiff;
  }

  const dateDiff = recencyTime(right) - recencyTime(left);
  if (dateDiff !== 0) {
    return dateDiff;
  }

  return right.score - left.score;
}

/**
 * Rank catalog matches separately per kind so one type cannot crowd out the other.
 */
function catalogMatches(
  catalog: WebMcpCatalogItem[],
  query: string,
  limit: number,
): WebMcpCatalogItem[] {
  return [
    ...rankCatalog(
      catalog.filter(item => item.kind === 'episode'),
      query,
      limit,
    ),
    ...rankCatalog(
      catalog.filter(item => item.kind === 'article'),
      query,
      limit,
    ),
  ];
}

/**
 * Keep the top `limit` hits of one kind by score, then recency.
 */
function takeKindHits(
  hits: SiteSearchHit[],
  kind: WebMcpCatalogKind,
  limit: number,
): SiteSearchHit[] {
  return hits
    .filter(hit => hit.kind === kind)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .sort(compareHitsByRecency);
}

/**
 * Union FTS5 body/title hits with catalog ranking (tags, episode number).
 * Drafts and unknown paths never appear: FTS rows must resolve in `catalog`.
 * `limit` is applied per kind so episodes cannot starve articles (and vice versa).
 */
export function mergeFullTextAndCatalog(
  ftsHits: FullTextHit[],
  catalog: WebMcpCatalogItem[],
  query: string,
  limit?: number,
): SiteSearchHit[] {
  const capped = clampCatalogLimit(limit, 25);
  const published = catalogByPath(catalog);
  const collapsed = collapseFullTextHits(ftsHits);
  const merged = new Map<string, SiteSearchHit>();

  collapsed.forEach((fts, index) => {
    const path = normalizeDocPath(fts.id);
    const item = published.get(path);
    if (!item) {
      return;
    }

    const score =
      scoreCatalogItem(item, query) +
      FTS_BASE_BOOST +
      (collapsed.length - index);
    merged.set(path, toSiteHit(item, query, score, fts));
  });

  for (const item of catalogMatches(catalog, query, capped)) {
    const path = normalizeDocPath(item.path);
    const existing = merged.get(path);
    if (existing) {
      existing.matchedTags = collectMatchedTags(item.tags, query);
      continue;
    }

    merged.set(path, toSiteHit(item, query, scoreCatalogItem(item, query)));
  }

  const all = [...merged.values()];
  return [
    ...takeKindHits(all, 'episode', capped),
    ...takeKindHits(all, 'article', capped),
  ];
}

/**
 * Agent-readable block for one merged hit, including tags and a body excerpt.
 */
export function formatSiteSearchHit(hit: SiteSearchHit): string {
  const kind = hit.kind === 'episode' ? 'Épisode' : 'Article';
  const number = hit.episodeNumber != null ? ` #${hit.episodeNumber}` : '';
  const slug = hit.dsSlug ? ` [${hit.dsSlug}]` : '';
  const tags = hit.matchedTags.length
    ? `\n  Tags: ${hit.matchedTags.join(', ')}`
    : '';
  const snippet = hit.snippet
    ? `\n  Extrait: ${stripSnippetHtml(hit.snippet)}`
    : '';

  return `${kind}${number}: ${hit.title}${slug}\n  ${hit.href}\n  ${hit.description}${tags}${snippet}`;
}

/**
 * Split ranked hits into episode and article groups for the UI.
 */
export function groupSearchHits(hits: SiteSearchHit[]): {
  episodes: SiteSearchHit[];
  articles: SiteSearchHit[];
} {
  return {
    episodes: hits
      .filter(hit => hit.kind === 'episode')
      .slice()
      .sort(compareHitsByRecency),
    articles: hits
      .filter(hit => hit.kind === 'article')
      .slice()
      .sort(compareHitsByRecency),
  };
}

/**
 * Keep the current tab when it has hits; otherwise jump to the tab that does.
 */
export function pickSearchTab(
  grouped: {episodes: SiteSearchHit[]; articles: SiteSearchHit[]},
  current: WebMcpCatalogKind,
): WebMcpCatalogKind {
  if (
    current === 'episode' &&
    grouped.episodes.length === 0 &&
    grouped.articles.length > 0
  ) {
    return 'article';
  }

  if (
    current === 'article' &&
    grouped.articles.length === 0 &&
    grouped.episodes.length > 0
  ) {
    return 'episode';
  }

  return current;
}
