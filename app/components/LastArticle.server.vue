<script setup lang="ts">
const {data} = await useAsyncData('last-articles', () => {
  return queryCollection('articles').order('publicationDate', 'DESC').limit(2).all();
});
</script>

<template>
  <section v-if="data && data.length" class="max-w-3xl m-auto px-4">
    <HeadingsSection title="Les derniers articles" class="mb-14" level="2" />
    <div v-for="article in data" :key="article.path" class="mb-16 last:mb-8">
      <NuxtLink :to="`${article.path}/`">
        <h3 class="text-3xl tracking-tighter normal-case text-primary">{{ article.title }}</h3>
      </NuxtLink>
      <div class="py-2 text-sm text-gray-300">
        <span>Le {{ useLocalDate(article.publicationDate) }}</span
        ><span class="px-0.5">|</span>
        <a class="hover:underline" :href="article.author.url" target="_blank">{{
          article.author.name
        }}</a>
      </div>
      <p class="pt-4 text-gray-100">{{ article.description }}</p>
      <nuxt-link
        :title="`Lire l'article : ${article.title}`"
        :to="`${article.path}/`"
        class="flex items-center justify-end text-lg group text-primary"
        >Lire l'article
        <Icon
          class="ml-1 transition-all group-hover:translate-x-1"
          name="mdi:arrow-right"
          size="24"
      /></nuxt-link>
    </div>
    <div class="mt-12 mb-16 text-center">
      <nuxt-link
        to="/articles/"
        class="flex items-center justify-center text-xl uppercase group text-primary"
        >Voir tous les articles
        <Icon
          class="ml-1 transition-all group-hover:translate-x-1"
          name="mdi:arrow-right"
          size="24"
      /></nuxt-link>
    </div>
  </section>
</template>