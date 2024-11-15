<script setup lang="ts">
const props = withDefaults(
  defineProps<{article: ArticleType | null; isList?: boolean}>(),
  {
    isList: false,
  },
);
const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
const dt = new Date(props.article?.publicationDate);
</script>

<template>
  <div
    v-if="article"
    class="py-2 text-sm"
    :class="{
      'text-gray-300': isList,
      'text-gray-500': !isList,
    }"
  >
    <span>Le {{ dt.toLocaleDateString('fr-FR', options) }}</span
    ><span class="px-0.5">|</span>
    <a class="hover:underline" :href="article?.author.url" target="_blank">{{
      article?.author.name
    }}</a>
  </div>
</template>
