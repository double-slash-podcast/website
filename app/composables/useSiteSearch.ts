import {loadSiteCatalog, SEARCH_MODAL_LIMIT} from '~/utils/siteCatalog';
import {
  mergeFullTextAndCatalog,
  type FullTextHit,
  type SiteSearchHit,
} from '~/utils/mergeSearchHits';

export type SiteFullTextApi = {
  status: Ref<'idle' | 'loading' | 'ready' | 'error'>;
  init: () => Promise<unknown>;
  search: (query: string, limit: number) => Promise<FullTextHit[]>;
};

/**
 * Modal flag plus a search runner shared by the palette and /search.
 */
export function useSiteSearch() {
  const isOpen = useState('site-search-open', () => false);
  const nuxtApp = useNuxtApp();
  const fullText = computed(
    () => nuxtApp.$siteFullText as SiteFullTextApi | undefined,
  );

  /**
   * Rank published documents for a query (FTS5 + catalog tags / numbers).
   */
  async function search(
    query: string,
    limit = SEARCH_MODAL_LIMIT,
  ): Promise<SiteSearchHit[]> {
    const trimmed = query.trim();
    if (!trimmed) {
      return [];
    }

    // SQLite WASM cannot safely run catalog select and FTS index build together.
    if (fullText.value) {
      await fullText.value.init();
    }

    const catalog = await loadSiteCatalog();
    const ftsLimit = Math.min(limit * 6, 50);
    const ftsHits = fullText.value
      ? await fullText.value.search(trimmed, ftsLimit).catch(() => [])
      : [];

    return mergeFullTextAndCatalog(ftsHits, catalog, trimmed, limit);
  }

  /**
   * Open the command palette, optionally seeding the input.
   */
  function open() {
    isOpen.value = true;
  }

  /**
   * Close the command palette.
   */
  function close() {
    isOpen.value = false;
  }

  return {
    isOpen,
    ftsStatus: computed(() => fullText.value?.status.value ?? 'idle'),
    open,
    close,
    search,
    init: () => fullText.value?.init() ?? Promise.resolve(),
  };
}
