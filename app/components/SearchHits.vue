<script setup lang="ts">
import {
  groupSearchHits,
  pickSearchTab,
  type SiteSearchHit,
} from '~/utils/mergeSearchHits';
import type {WebMcpCatalogKind} from '~/utils/webmcpTypes';

const props = defineProps<{
  hits: SiteSearchHit[];
  query?: string;
}>();

const emit = defineEmits<{
  navigate: [hit: SiteSearchHit];
}>();

const kind = defineModel<WebMcpCatalogKind>({default: 'episode'});

const grouped = computed(() => groupSearchHits(props.hits));
const activeHits = computed(() =>
  kind.value === 'article' ? grouped.value.articles : grouped.value.episodes,
);
const emptyLabel = computed(() =>
  kind.value === 'article' ? 'Aucun article' : 'Aucun épisode',
);

watch(
  grouped,
  next => {
    kind.value = pickSearchTab(next, kind.value);
  },
  {immediate: true},
);
</script>

<template>
  <div>
    <SearchKindTabs
      v-model="kind"
      id-prefix="search-page"
      :episode-count="grouped.episodes.length"
      :article-count="grouped.articles.length"
    />
    <div
      id="search-page-panel"
      class="pt-6"
      role="tabpanel"
      :aria-labelledby="`search-page-tab-${kind}`"
    >
      <p v-if="activeHits.length === 0" class="text-purple-100">
        {{ emptyLabel }}
        <template v-if="query?.trim()"> pour « {{ query.trim() }} ».</template>
        <template v-else>.</template>
      </p>
      <ul v-else class="flex flex-col gap-3" role="list">
        <li v-for="hit in activeHits" :key="hit.href">
          <NuxtLink
            :to="hit.href"
            class="block p-4 rounded-md bg-dark/80 ring-1 ring-secondary/40 hover:ring-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            @click="emit('navigate', hit)"
          >
            <SearchHitRow :hit="hit" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
