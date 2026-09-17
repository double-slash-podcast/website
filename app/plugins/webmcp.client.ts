import {registerWebMcpToolsWhenAvailable} from '~/utils/webmcpContext';
import {buildWebMcpCatalog} from '~/utils/webmcpSearch';
import {createWebMcpTools} from '~/utils/webmcpTools';
import type {WebMcpCatalogItem} from '~/utils/webmcpTypes';
import {usePlayerStore} from '~/stores/player';

let catalogPromise: Promise<WebMcpCatalogItem[]> | null = null;

/**
 * Load published episodes and articles from the content collections, cached
 * for the tab. Draft/scheduled podcasts stay out of the agent catalog.
 */
async function loadCatalog(): Promise<WebMcpCatalogItem[]> {
  if (!catalogPromise) {
    catalogPromise = (async () => {
      const [podcasts, articles] = await Promise.all([
        queryCollection('podcasts').all(),
        queryCollection('articles').all(),
      ]);

      return buildWebMcpCatalog(podcasts, articles);
    })().catch(error => {
      catalogPromise = null;
      throw error;
    });
  }

  return catalogPromise;
}

/**
 * Register Double Slash WebMCP tools when the browser exposes modelContext,
 * including the late-injection case (agent sidebar after first paint).
 */
export default defineNuxtPlugin({
  name: 'webmcp',
  setup() {
    const controller = new AbortController();

    const tools = createWebMcpTools({
      loadCatalog,
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
