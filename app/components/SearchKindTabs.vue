<script setup lang="ts">
import type {WebMcpCatalogKind} from '~/utils/webmcpTypes';

const props = defineProps<{
  /** Prefix so the modal and /search tablists never share ids. */
  idPrefix: string;
  episodeCount: number;
  articleCount: number;
}>();

const kind = defineModel<WebMcpCatalogKind>({required: true});

const tabs = computed(() => [
  {
    kind: 'episode' as const,
    label: 'Épisodes',
    count: props.episodeCount,
  },
  {
    kind: 'article' as const,
    label: 'Articles',
    count: props.articleCount,
  },
]);

/**
 * Move between Épisodes and Articles with the arrow keys.
 */
async function onTabKeydown(event: KeyboardEvent) {
  if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
    return;
  }

  event.preventDefault();
  kind.value = kind.value === 'episode' ? 'article' : 'episode';
  await nextTick();
  document.getElementById(tabId(kind.value))?.focus();
}

/**
 * DOM id of the tab button for a content kind.
 */
function tabId(tabKind: WebMcpCatalogKind): string {
  return `${props.idPrefix}-tab-${tabKind}`;
}
</script>

<template>
  <div
    :id="`${idPrefix}-tablist`"
    class="flex w-full border-b border-secondary/50"
    role="tablist"
    aria-label="Type de contenu"
    @keydown="onTabKeydown"
  >
    <button
      v-for="tab in tabs"
      :id="tabId(tab.kind)"
      :key="tab.kind"
      type="button"
      role="tab"
      class="flex flex-1 flex-col items-center pt-3 text-sm font-medium tracking-wide uppercase transition-colors after:mt-2 after:h-0.5 after:w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      :class="
        kind === tab.kind
          ? 'text-primary after:bg-primary'
          : 'text-purple-100 after:bg-secondary/40 hover:text-white'
      "
      :aria-selected="kind === tab.kind"
      :aria-controls="`${idPrefix}-panel`"
      :tabindex="kind === tab.kind ? 0 : -1"
      @click="kind = tab.kind"
    >
      <span>
        {{ tab.label }}
        <span class="font-sans normal-case tracking-normal text-purple-100">
          ({{ tab.count }})
        </span>
      </span>
    </button>
  </div>
</template>
