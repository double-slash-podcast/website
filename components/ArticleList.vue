<script setup lang="ts">
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
    <NuxtLink
      :title="`Lire l'article : ${article.title}`"
      :to="`${article._path}/`"
      class="text-xl font-brand text-yellowDs"
      >Lire l'article</NuxtLink
    >
  </div>
</template>
