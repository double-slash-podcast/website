<script setup lang="ts">
import {articleAuthors, type ArticleAuthor} from '~/utils/articleAuthors';
import {toIsoDatetime} from '~/utils/toIsoDatetime';
/**
 * Article byline (date + authors). Dates use NuxtTime so SSR and the client
 * do not disagree on timezone.
 */
const props = withDefaults(
  defineProps<{
    publicationDate?: string | Date | null;
    author?: ArticleAuthor | ArticleAuthor[] | null;
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

const authors = computed(() => articleAuthors(props.author));
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
    <template v-for="(person, index) in authors" :key="person.url">
      <span v-if="index > 0">{{
        index === authors.length - 1 ? ' et ' : ', '
      }}</span>
      <a class="hover:underline" :href="person.url" target="_blank">{{
        person.name
      }}</a>
    </template>
  </div>
</template>
