import {buildWebMcpCatalog} from './webmcpSearch';
import {withSqlite} from './sqliteQueue';
import type {
  WebMcpCatalogItem,
  WebMcpCatalogKind,
  WebMcpCatalogSource,
} from './webmcpTypes';

export const SEARCH_PAGE_PATH = '/search/';
export const SEARCH_MODAL_LIMIT = 8;
export const SEARCH_PAGE_LIMIT = 25;

let catalogPromise: Promise<WebMcpCatalogItem[]> | null = null;

/**
 * Shareable results URL for a query. Empty queries stay on the bare page.
 * `kind=article` is the only extra param; episodes are the default tab.
 */
export function searchResultsPath(
  query: string,
  kind?: WebMcpCatalogKind,
): string {
  const trimmed = query.trim();
  const params = new URLSearchParams();
  if (trimmed) {
    params.set('q', trimmed);
  }
  if (kind === 'article') {
    params.set('kind', 'article');
  }

  const qs = params.toString();
  return qs ? `${SEARCH_PAGE_PATH}?${qs}` : SEARCH_PAGE_PATH;
}

/**
 * Read the results-page tab from a route query value.
 */
export function searchKindFromQuery(value: unknown): WebMcpCatalogKind {
  return value === 'article' ? 'article' : 'episode';
}

/**
 * Load published episodes and articles from Content, cached for the tab.
 * Slims columns so the WASM dump is not copied as full markdown bodies.
 */
export async function loadSiteCatalog(): Promise<WebMcpCatalogItem[]> {
  if (!catalogPromise) {
    catalogPromise = withSqlite(async () => {
      const podcasts = await queryCollection('podcasts')
        .select(
          'title',
          'path',
          'description',
          'tags',
          'dsSlug',
          'episodeNumber',
          'publicationDate',
          'status',
        )
        .all();
      const articles = await queryCollection('articles')
        .select('title', 'path', 'description', 'publicationDate')
        .all();
      const catalog = buildWebMcpCatalog(
        podcasts as WebMcpCatalogSource[],
        articles as WebMcpCatalogSource[],
      );
      if (catalog.length === 0) {
        throw new Error('Published catalog is empty');
      }

      return catalog;
    }).catch(error => {
      catalogPromise = null;
      throw error;
    });
  }

  return catalogPromise;
}
