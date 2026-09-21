<script setup lang="ts">
import {debounce} from 'throttle-debounce';
import {SEARCH_MODAL_LIMIT, searchResultsPath} from '~/utils/siteCatalog';
import {
  groupSearchHits,
  pickSearchTab,
  type SiteSearchHit,
} from '~/utils/mergeSearchHits';
import {
  getSiteSearchDialog,
  syncSiteSearchDialog,
} from '~/utils/siteSearchDialog';
import {isTypingTarget} from '~/utils/siteSearchKeys';
import type {WebMcpCatalogKind} from '~/utils/webmcpTypes';

const instance = getCurrentInstance();
const {isOpen, close, open, search, init, ftsStatus} = useSiteSearch();

const query = ref('');
const hits = ref<SiteSearchHit[]>([]);
const isSearching = ref(false);
const kind = ref<WebMcpCatalogKind>('episode');
let searchRequestId = 0;

/**
 * Run the shared FTS + catalog search for the palette.
 */
async function refreshHits() {
  const value = query.value.trim();
  const requestId = ++searchRequestId;
  if (!value) {
    hits.value = [];
    isSearching.value = false;
    return;
  }

  isSearching.value = true;
  try {
    const nextHits = await search(value, SEARCH_MODAL_LIMIT);
    if (requestId !== searchRequestId) {
      return;
    }
    hits.value = nextHits;
  } catch {
    if (requestId !== searchRequestId) {
      return;
    }
    hits.value = [];
  } finally {
    if (requestId === searchRequestId) {
      isSearching.value = false;
    }
  }
}

const debouncedRefresh = debounce(150, refreshHits);

watch(query, () => {
  debouncedRefresh();
});

watch(isOpen, async openState => {
  if (!openState) {
    query.value = '';
    hits.value = [];
    kind.value = 'episode';
    syncSiteSearchDialog(getSiteSearchDialog(instance), false);
    return;
  }

  await nextTick();
  // Re-check after awaits: a close can land before showModal/init finish.
  if (!isOpen.value) {
    return;
  }
  syncSiteSearchDialog(getSiteSearchDialog(instance), true);
  await init();
  if (!isOpen.value) {
    return;
  }
  if (query.value.trim()) {
    await refreshHits();
  }
});

/**
 * Keyboard shortcut: Cmd/Ctrl+K opens the palette unless a field has focus.
 */
function onGlobalKeydown(event: KeyboardEvent) {
  if (event.repeat || event.key.toLowerCase() !== 'k') {
    return;
  }
  if (!event.metaKey && !event.ctrlKey) {
    return;
  }
  if (isTypingTarget(event.target) && !isOpen.value) {
    return;
  }

  event.preventDefault();
  open();
}

onMounted(() => {
  window.addEventListener('keydown', onGlobalKeydown);
  if (isOpen.value) {
    syncSiteSearchDialog(getSiteSearchDialog(instance), true);
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKeydown);
});

/**
 * Open the full results page for the current query.
 */
async function goToResults() {
  const href = resultsHref.value;
  await navigateTo(href);
  close();
}

/**
 * Close the palette when the click landed on the dialog (backdrop), not its panel.
 */
function onDialogClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    close();
  }
}

const resultsHref = computed(() => searchResultsPath(query.value, kind.value));
const groupedHits = computed(() => {
  const grouped = groupSearchHits(hits.value);
  return {
    episodes: grouped.episodes.slice(0, SEARCH_MODAL_LIMIT),
    articles: grouped.articles.slice(0, SEARCH_MODAL_LIMIT),
  };
});
const activeHits = computed(() =>
  kind.value === 'article'
    ? groupedHits.value.articles
    : groupedHits.value.episodes,
);
const emptyTabLabel = computed(() =>
  kind.value === 'article' ? 'Aucun article' : 'Aucun épisode',
);
const showEmpty = computed(
  () =>
    query.value.trim().length > 0 &&
    !isSearching.value &&
    hits.value.length === 0,
);

watch(groupedHits, next => {
  kind.value = pickSearchTab(next, kind.value);
});
</script>

<template>
  <dialog
    class="m-auto w-[min(42rem,calc(100vw-2rem))] max-h-[min(80vh,40rem)] overflow-hidden rounded-lg bg-dark p-0 text-white shadow-lg shadow-haiti/80 ring-1 ring-secondary backdrop:bg-haiti/85"
    aria-labelledby="site-search-dialog-title"
    @close="close"
    @click="onDialogClick"
  >
    <div
      class="flex max-h-[min(80vh,40rem)] flex-col overflow-hidden"
      @click.stop
    >
      <h2 id="site-search-dialog-title" class="sr-only">
        Rechercher sur Double Slash
      </h2>
      <form role="search" @submit.prevent="goToResults">
        <div class="flex items-center gap-2 border-b border-secondary/50 px-3">
          <Icon
            name="material-symbols:search"
            class="w-5 h-5 shrink-0 text-primary"
            aria-hidden="true"
          />
          <input
            id="site-search-modal-q"
            v-model="query"
            type="search"
            name="q"
            class="w-full bg-transparent py-3 text-white placeholder:text-purple-200/80 border-0 focus:ring-0"
            placeholder="alpineJS, WebMCP, ThreeJS…"
            aria-label="Rechercher des épisodes et des articles"
            autocomplete="off"
            enterkeyhint="search"
          />
          <kbd
            class="hidden sm:inline px-1.5 py-0.5 text-[10px] uppercase border rounded-sm border-primary/40 text-primary"
          >
            esc
          </kbd>
        </div>
      </form>
      <SearchKindTabs
        v-if="hits.length"
        v-model="kind"
        id-prefix="search-modal"
        :episode-count="groupedHits.episodes.length"
        :article-count="groupedHits.articles.length"
      />
      <div
        class="max-h-[min(30rem,60vh)] overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-haiti"
      >
        <p
          v-if="ftsStatus === 'loading' && !hits.length"
          class="px-4 py-3 text-sm text-purple-100"
        >
          Préparation de l'index…
        </p>
        <p
          v-else-if="!query.trim()"
          class="px-4 py-3 text-sm text-purple-100"
        >
          Tapez un mot-clé, un tag ou un numéro d'épisode.
        </p>
        <p v-else-if="showEmpty" class="px-4 py-3 text-sm text-purple-100">
          Aucun résultat pour « {{ query.trim() }} ».
        </p>
        <p
          v-else-if="activeHits.length === 0"
          id="search-modal-panel"
          class="px-4 py-3 text-sm text-purple-100"
          role="tabpanel"
          :aria-labelledby="`search-modal-tab-${kind}`"
        >
          {{ emptyTabLabel }} pour « {{ query.trim() }} ».
        </p>
        <div
          v-else
          id="search-modal-panel"
          role="tabpanel"
          :aria-labelledby="`search-modal-tab-${kind}`"
        >
          <ul class="flex flex-col gap-1 p-2" role="list">
            <li v-for="hit in activeHits" :key="hit.href">
              <NuxtLink
                :to="hit.href"
                class="block rounded-md p-3 hover:bg-secondary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                @click="close"
              >
                <SearchHitRow :hit="hit" />
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div
        v-if="query.trim()"
        class="border-t border-secondary/50 px-4 py-2 text-right"
      >
        <NuxtLink
          :to="resultsHref"
          class="text-sm text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          @click.prevent="goToResults"
        >
          Voir tous les résultats
        </NuxtLink>
      </div>
    </div>
  </dialog>
</template>
