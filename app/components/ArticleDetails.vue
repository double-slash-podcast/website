<script setup lang="ts">
/**
 * Article byline (date + author). Not a server island: islands serialize
 * props into the GET query, and a full article body triggers HTTP 431.
 * Dates use NuxtTime so SSR and the client do not disagree on timezone.
 */
withDefaults(
  defineProps<{
    publicationDate?: string | null;
    author?: {name: string; url: string} | null;
    isList?: boolean;
  }>(),
  {
    publicationDate: null,
    author: null,
    isList: false,
  },
);
</script>

<template>
  <div
    v-if="publicationDate"
    class="py-2 text-sm"
    :class="{
      'text-gray-300': isList,
      'text-gray-500': !isList,
    }"
  >
    <span
      >Le
      <NuxtTime
        :datetime="publicationDate"
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
