<script setup lang="ts">
import {debounce} from 'throttle-debounce';
import {
  SEARCH_PAGE_LIMIT,
  searchKindFromQuery,
  searchResultsPath,
} from '~/utils/siteCatalog';
import type {SiteSearchHit} from '~/utils/mergeSearchHits';
import type {WebMcpCatalogKind} from '~/utils/webmcpTypes';

const route = useRoute();
const {search, init, ftsStatus} = useSiteSearch();

const query = ref(typeof route.query.q === 'string' ? route.query.q : '');
const kind = ref<WebMcpCatalogKind>(searchKindFromQuery(route.query.kind));
const hits = ref<SiteSearchHit[]>([]);
const isSearching = ref(Boolean(query.value.trim()));
const hasIndexed = ref(false);
let searchRequestId = 0;

/** True until FTS init and the current query have settled. */
const showPending = computed(
  () =>
    isSearching.value ||
    (Boolean(query.value.trim()) && ftsStatus.value === 'loading'),
);

useSeoMeta({
  title: () =>
    query.value.trim()
      ? `Recherche : ${query.value.trim()}`
      : 'Recherche sur Double Slash',
  description:
    'Recherchez les épisodes du podcast et les articles du blog Double Slash.',
  robots: 'noindex, follow',
});

useSchemaOrg([defineWebPage()]);

/**
 * Keep the address bar in sync without adding history entries.
 */
async function syncQueryToRoute(value: string) {
  const trimmed = value.trim();
  const current = typeof route.query.q === 'string' ? route.query.q : '';
  if (trimmed === current) {
    return;
  }

  await navigateTo(searchResultsPath(trimmed, kind.value), {replace: true});
}

/**
 * Run search against FTS5 + the published catalog.
 */
async function refreshHits() {
  const value = query.value.trim();
  const requestId = ++searchRequestId;
  if (value) {
    isSearching.value = true;
  }
  await syncQueryToRoute(value);
  if (!value) {
    hits.value = [];
    isSearching.value = false;
    return;
  }

  try {
    if (!hasIndexed.value) {
      await init();
      hasIndexed.value = true;
    }
    const nextHits = await search(value, SEARCH_PAGE_LIMIT);
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

watch(
  () => route.query.q,
  value => {
    const next = typeof value === 'string' ? value : '';
    if (next !== query.value) {
      query.value = next;
    }
  },
);

watch(
  () => route.query.kind,
  value => {
    const next = searchKindFromQuery(value);
    if (next !== kind.value) {
      kind.value = next;
    }
  },
);

watch(kind, async value => {
  const current = searchKindFromQuery(route.query.kind);
  if (current === value) {
    return;
  }

  await navigateTo(searchResultsPath(query.value, value), {replace: true});
});

onMounted(() => {
  void refreshHits();
});
</script>

<template>
  <div class="pb-20 bg-haiti">
    <Header>
      <template #title>
        <h1 class="text-4xl text-center font-headings text-white">Recherche</h1>
      </template>
    </Header>
    <main class="px-4 min-h-[70vh]">
      <form
        class="max-w-3xl mx-auto mt-8"
        role="search"
        @submit.prevent="refreshHits"
      >
        <label for="site-search-q" class="block mb-2 text-sm text-purple-100">
          Rechercher des épisodes et des articles
        </label>
        <div class="relative">
          <Icon
            name="material-symbols:search"
            class="absolute w-5 h-5 pointer-events-none left-3 top-1/2 -translate-y-1/2 text-primary"
            aria-hidden="true"
          />
          <input
            id="site-search-q"
            v-model="query"
            type="search"
            name="q"
            placeholder="alpineJS, WebMCP, ThreeJS…"
            class="w-full py-3 pl-11 pr-4 text-white rounded-md bg-dark border-secondary placeholder:text-purple-200/80 focus:border-primary focus:ring-primary"
            autocomplete="off"
            enterkeyhint="search"
          />
        </div>
      </form>

      <section class="max-w-3xl mx-auto mt-10 min-h-40" aria-live="polite">
        <p v-if="showPending" class="text-purple-100">Recherche en cours…</p>
        <p v-else-if="!query.trim()" class="text-purple-100">
          Tapez un mot-clé, un tag ou un numéro d’épisode.
        </p>
        <p v-else-if="hits.length === 0" class="text-purple-100">
          Aucun résultat pour « {{ query.trim() }} ».
        </p>
        <template v-else>
          <SearchHits v-model="kind" :hits="hits" :query="query" />
        </template>
      </section>
    </main>
  </div>
</template>
