import {registerWebMcpTools} from '~/utils/webmcpContext';
import {createWebMcpTools} from '~/utils/webmcpTools';
import type {WebMcpCatalogItem} from '~/utils/webmcpTypes';
import {usePlayerStore} from '~/stores/player';

/**
 * Map a Nuxt Content document to the slim catalog shape agents receive.
 */
function toCatalogItem(
  kind: WebMcpCatalogItem['kind'],
  doc: {
    title?: string;
    path?: string;
    description?: string;
    tags?: string[];
    dsSlug?: string;
    episodeNumber?: number;
  },
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

let catalogPromise: Promise<WebMcpCatalogItem[]> | null = null;

/**
 * Load episodes and articles from the content collections, cached for the tab.
 */
async function loadCatalog(): Promise<WebMcpCatalogItem[]> {
  if (!catalogPromise) {
    catalogPromise = (async () => {
      const [podcasts, articles] = await Promise.all([
        queryCollection('podcasts').all(),
        queryCollection('articles').all(),
      ]);

      return [
        ...podcasts.map(doc => toCatalogItem('episode', doc)),
        ...articles.map(doc => toCatalogItem('article', doc)),
      ].filter((item): item is WebMcpCatalogItem => item != null);
    })().catch(error => {
      catalogPromise = null;
      throw error;
    });
  }

  return catalogPromise;
}

/**
 * Register Double Slash WebMCP tools when the browser exposes modelContext.
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

    registerWebMcpTools(tools, {signal: controller.signal});

    if (import.meta.client) {
      window.addEventListener('pagehide', () => controller.abort(), {
        once: true,
      });
    }
  },
});
