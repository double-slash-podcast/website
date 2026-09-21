import {registerWebMcpToolsWhenAvailable} from '~/utils/webmcpContext';
import {createWebMcpTools} from '~/utils/webmcpTools';
import {loadSiteCatalog} from '~/utils/siteCatalog';
import {toFullTextHits} from '~/utils/mergeSearchHits';
import {withSqlite} from '~/utils/sqliteQueue';
import type {SiteFullTextApi} from '~/composables/useSiteSearch';
import {usePlayerStore} from '~/stores/player';

/**
 * Register Double Slash WebMCP tools when the browser exposes modelContext,
 * including the late-injection case (agent sidebar after first paint).
 * Also exposes the lazy FTS5 searcher to the human search UI.
 */
export default defineNuxtPlugin({
  name: 'webmcp',
  setup(nuxtApp) {
    const controller = new AbortController();
    const {
      status,
      search: searchCollection,
      init: initCollection,
    } = useSearchCollection(['podcasts', 'articles'], {
      immediate: false,
      ignoredTags: ['code', 'pre'],
    });

    /**
     * Build the FTS5 index once, queued so it never overlaps a catalog select.
     */
    const initFullText: SiteFullTextApi['init'] = () =>
      withSqlite(() => initCollection());

    /**
     * Build the FTS5 index on first use, then return ranked body/title rows.
     */
    const searchFullText: SiteFullTextApi['search'] = async (query, limit) => {
      await initFullText();
      return withSqlite(async () => {
        const rows = await searchCollection(query, {
          limit,
          minTermLength: 2,
          snippet: {columns: ['content'], around: 40},
        });

        return toFullTextHits(rows);
      });
    };

    const siteFullText: SiteFullTextApi = {
      status,
      init: initFullText,
      search: searchFullText,
    };
    nuxtApp.provide('siteFullText', siteFullText);

    const tools = createWebMcpTools({
      loadCatalog: loadSiteCatalog,
      searchFullText,
      openPage(path) {
        return navigateTo(path);
      },
      playEpisode(item) {
        if (!item.dsSlug) {
          return;
        }

        const store = usePlayerStore();
        const isCurrent = store.currentDsSlug === item.dsSlug;
        store.setDsSlug(item.dsSlug, item.title);
        if (isCurrent) {
          store.setStatusPlayer('play');
        }
      },
      controlPlayer(action) {
        const store = usePlayerStore();
        store.setStatusPlayer(action);
        return {
          status: store.statusPlayer,
          title: store.currentTitle,
          dsSlug: store.currentDsSlug,
        };
      },
      getPlayerStatus() {
        const store = usePlayerStore();
        return {
          status: store.statusPlayer,
          title: store.currentTitle,
          dsSlug: store.currentDsSlug,
        };
      },
    });

    registerWebMcpToolsWhenAvailable(tools, {signal: controller.signal});

    if (import.meta.client) {
      window.addEventListener('pagehide', () => controller.abort(), {
        once: true,
      });
    }
  },
});
