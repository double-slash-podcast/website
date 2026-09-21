<script setup lang="ts">
const {path} = useRoute();
const {
  baseInfos: {siteUrl},
} = useAppConfig();

const {data: article} = await useAsyncData(`${path.replace(/\/+$/, '')}`, () =>
  queryCollection('articles')
    .where('path', '=', path.replace(/\/+$/, ''))
    .first(),
);

if (!article.value?.title) {
  throw createError(notFoundErrorOptions);
}

useSeoMeta({
  title: article.value.title,
  description: article.value.description ?? '',
  ogUrl: `${siteUrl}${path}`,
});

useSchemaOrg([
  defineWebPage(),
  defineArticle({
    '@type': 'TechArticle',
    datePublished: article.value?.publicationDate,
    description: article.value?.description,
  }),
]);
</script>
<template>
  <div class="">
    <Header />
    <main class="pb-20 px-4">
      <h1 class="mt-10 text-4xl font-bold">{{ article?.title }}</h1>
      <ArticleDetails
        :publication-date="article?.publicationDate"
        :author="article?.author"
      />
      <ContentRenderer
        v-if="article"
        :value="article"
        class="prose article-content min-h-125 py-6 max-w-full"
      />
      <ShareBtn :text="article?.title || ''" />
    </main>
  </div>
</template>
