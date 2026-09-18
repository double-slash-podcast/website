<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue';
import {debounce} from 'throttle-debounce';
import {SEARCH_MODAL_LIMIT, searchResultsPath} from '~/utils/siteCatalog';
import {
  groupSearchHits,
  pickSearchTab,
  type SiteSearchHit,
} from '~/utils/mergeSearchHits';
import {isTypingTarget} from '~/utils/siteSearchKeys';
import type {WebMcpCatalogKind} from '~/utils/webmcpTypes';

const {isOpen, close, open, search, init, ftsStatus} = useSiteSearch();

const dialogEl = ref<HTMLDialogElement | null>(null);
const query = ref('');
const hits = ref<SiteSearchHit[]>([]);
const isSearching = ref(false);
const selected = ref<SiteSearchHit | null>(null);
const kind = ref<WebMcpCatalogKind>('episode');
let searchRequestId = 0;

/**
 * Open or close the native dialog without double-toggling showModal/close.
 */
function syncDialog(openState: boolean) {
  const el = dialogEl.value;
  if (!el) {
    return;
  }
  if (openState && !el.open) {
    el.showModal();
  } else if (!openState && el.open) {
    el.close();
  }
}

/**
 * Keep Vue state in sync when Escape or the backdrop dismisses the dialog.
 */
function onNativeClose() {
  if (isOpen.value) {
    close();
  }
}

/**
 * Clicks on the ::backdrop hit the dialog element itself, not its children.
 */
function onBackdropClick(event: MouseEvent) {
  if (event.target === dialogEl.value) {
    close();
  }
}

/**
 * Rank published documents for a query (FTS5 + catalog tags / numbers).
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
  await nextTick();
  syncDialog(openState);

  if (!openState) {
    query.value = '';
    hits.value = [];
    selected.value = null;
    kind.value = 'episode';
    return;
  }

  await init();
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
});

onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKeydown);
});

/**
 * Navigate to a hit and close the palette.
 */
async function goToHit(hit: SiteSearchHit | null) {
  if (!hit) {
    return;
  }

  const href = hit.href;
  await navigateTo(href);
  close();
}

/**
 * Open the full results page for the current query.
 */
async function goToResults() {
  const href = resultsHref.value;
  await navigateTo(href);
  close();
}

/**
 * Keep the combobox input in sync with the local query string.
 */
function onQueryInput(event: Event | string) {
  if (typeof event === 'string') {
    query.value = event;
    return;
  }

  const target = event.target;
  if (target instanceof HTMLInputElement) {
    query.value = target.value;
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

watch(kind, () => {
  selected.value = null;
});
</script>

<template>
  <dialog
    ref="dialogEl"
    class="search-palette z-60 w-[min(42rem,calc(100vw-2rem))] max-h-[min(40rem,80vh)] border-0 bg-transparent p-0 text-white"
    aria-labelledby="search-palette-title"
    @close="onNativeClose"
    @click="onBackdropClick"
  >
    <h2 id="search-palette-title" class="sr-only">
      Rechercher sur Double Slash
    </h2>
    <div
      class="overflow-hidden rounded-lg bg-dark shadow-lg shadow-haiti/80 ring-1 ring-secondary"
    >
      <Combobox v-model="selected" nullable @update:model-value="goToHit">
        <div
          class="flex items-center gap-2 border-b border-secondary/50 px-3"
        >
          <Icon
            name="material-symbols:search"
            class="w-5 h-5 shrink-0 text-primary"
            aria-hidden="true"
          />
          <ComboboxInput
            class="w-full bg-transparent py-3 text-white placeholder:text-purple-200/80 border-0 focus:ring-0"
            :display-value="() => query"
            placeholder="alpineJS, WebMCP, ThreeJS…"
            aria-label="Rechercher des épisodes et des articles"
            @change="onQueryInput"
          />
          <kbd
            class="hidden sm:inline px-1.5 py-0.5 text-[10px] uppercase border rounded-sm border-primary/40 text-primary"
          >
            esc
          </kbd>
        </div>
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
            <ComboboxOptions static class="p-2">
              <ComboboxOption
                v-for="hit in activeHits"
                :key="hit.href"
                v-slot="{active}"
                :value="hit"
                as="template"
              >
                <li
                  class="cursor-pointer rounded-md p-3"
                  :class="active ? 'bg-secondary/40' : ''"
                >
                  <SearchHitRow :hit="hit" />
                </li>
              </ComboboxOption>
            </ComboboxOptions>
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
      </Combobox>
    </div>
  </dialog>
</template>

<style scoped>
@reference '../assets/main.css';

.search-palette {
  margin: 12vh auto auto;
}

.search-palette::backdrop {
  @apply bg-haiti/85;
}
</style>
