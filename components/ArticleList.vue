<script setup lang="ts">
type ArticleType = {
  _path: string;
  title: string;
  description: string;
  publicationDate: string;
  body: string;
};
defineProps<{article: ArticleType}>();
</script>

<template>
  <div class="mb-24">
    <NuxtLink :to="`${article._path}/`">
      <h2>{{ article.title }}</h2>
    </NuxtLink>
    <i class="py-4 text-gray-400"
      >Le {{ $dayjs(article.publicationDate).format('DD MMM. YY') }}</i
    >
    <p class="py-4 text-gray-100">{{ article.description }}</p>
    <NuxtLink :to="`${article._path}/`" class="text-xl font-brand text-yellowDs"
      >Lire l'article</NuxtLink
    >
  </div>
</template>
