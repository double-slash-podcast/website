<script setup lang="ts">
import {toIsoDatetime} from '~/utils/toIsoDatetime';
/**
 * Article byline (date + author). Dates use NuxtTime so SSR and the client
 * do not disagree on timezone.
 */
const props = withDefaults(
  defineProps<{
    publicationDate?: string | Date | null;
    author?: {name: string; url: string} | null;
    isList?: boolean;
  }>(),
  {
    publicationDate: null,
    author: null,
    isList: false,
  },
);

const isoPublicationDate = computed(() =>
  toIsoDatetime(props.publicationDate),
);
</script>

<template>
  <div
    v-if="isoPublicationDate"
    class="py-2 text-sm"
    :class="{
      'text-gray-300': isList,
      'text-gray-500': !isList,
    }"
  >
    <span v-if="isoPublicationDate"
      >Le
      <NuxtTime
        :datetime="isoPublicationDate"
        locale="fr-FR"
        year="numeric"
        month="long"
        day="numeric"
    /></span>
    <span class="px-0.5">|</span>
    <a
      v-if="author"
      class="hover:underline"
      :href="author.url"
      target="_blank"
      >{{ author.name }}</a
    >
  </div>
</template>
