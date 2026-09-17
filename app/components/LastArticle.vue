<script setup lang="ts">
/**
 * Latest articles on the homepage. Not a server island: islands render via a
 * separate prerender request and throw NUXT_E4015 (then a 500 on `/`) on generate.
 * Homepage wraps this in <Suspense> because setup awaits content.
 */
const {data} = await useAsyncData('last-articles', () => {
  return queryCollection('articles')
    .order('publicationDate', 'DESC')
    .limit(2)
    .all();
});
</script>

<template>
  <section v-if="data && data.length" class="max-w-3xl m-auto px-4">
    <HeadingsSection title="Les derniers articles" class="mb-14" level="2" />
    <div v-for="article in data" :key="article.path" class="mb-16 last:mb-8">
      <NuxtLink :to="`${article.path}/`">
        <h3 class="text-3xl tracking-tighter normal-case text-primary">
          {{ article.title }}
        </h3>
      </NuxtLink>
      <ArticleDetails
        :publication-date="article.publicationDate"
        :author="article.author"
        :is-list="true"
      />
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
