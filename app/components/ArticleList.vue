<script setup lang="ts">
defineProps<{article: ArticleType}>();
</script>

<template>
  <div class="mb-24">
    <NuxtLink :to="`${article.path}/`">
      <h2 class="text-3xl tracking-tighter normal-case">{{ article.title }}</h2>
    </NuxtLink>
    <ArticleDetails :article="article" :is-list="true" />
    <p class="pt-4 text-gray-100">{{ article.description }}</p>
    <nuxt-link
      :title="`Lire l'article : ${article.title}`"
      :to="`${article.path}/`"
      class="flex items-center justify-end text-lg group text-yellowDs"
      >Lire l'article
      <Icon
        class="ml-1 transition-all group-hover:translate-x-1"
        name="mdi:arrow-right"
        size="24"
    /></nuxt-link>
  </div>
</template>
