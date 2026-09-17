<script setup lang="ts">
import type {SiteSearchHit} from '~/utils/mergeSearchHits';
import {sanitizeSnippetHtml} from '~/utils/mergeSearchHits';

const props = defineProps<{
  hit: SiteSearchHit;
}>();

/**
 * Safe FTS excerpt: mark tags only.
 */
const snippetHtml = computed(() =>
  props.hit.snippet ? sanitizeSnippetHtml(props.hit.snippet) : '',
);

const kindLabel = computed(() =>
  props.hit.kind === 'episode'
    ? props.hit.episodeNumber != null
      ? `Épisode #${props.hit.episodeNumber}`
      : 'Épisode'
    : 'Article',
);
</script>

<template>
  <div class="flex flex-col gap-1 text-left">
    <p class="text-xs font-medium tracking-wide uppercase text-primary">
      {{ kindLabel }}
    </p>
    <p class="text-base font-headings text-white">{{ hit.title }}</p>
    <p
      v-if="snippetHtml"
      class="text-sm text-purple-100 search-snippet"
      v-html="snippetHtml"
    />
    <p v-else-if="hit.description" class="text-sm text-purple-100">
      {{ hit.description }}
    </p>
    <ul v-if="hit.matchedTags.length" class="flex flex-wrap gap-1.5 pt-1">
      <li
        v-for="tag in hit.matchedTags"
        :key="tag"
        class="px-2 py-0.5 text-xs rounded-full bg-secondary text-white"
      >
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
@reference "../assets/main.css";
.search-snippet :deep(mark) {
  background-color: var(--color-primary);
  color: var(--color-haiti);
  padding: 0 0.15em;
  border-radius: 0.1em;
}
</style>
