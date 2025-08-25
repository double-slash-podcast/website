<script setup lang="ts">
const {path} = useRoute();

const {data: article} = await useAsyncData(`${path.replace(/\/+$/, '')}`, () =>
  queryCollection('articles')
    .where('path', '=', path.replace(/\/+$/, ''))
    .first(),
);

if (!article.value?.title) {
  // redirect to 404 page
  navigateTo('/_404');
}
useHead({
  title: article.value?.title,
  meta: [{name: 'description', content: article.value?.description ?? ''}],
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
    <main class="pb-20">
      <h1 class="mt-10 text-4xl font-bold">{{ article?.title }}</h1>
      <ArticleDetails :article="article" />
      <ContentRenderer
        v-if="article"
        :value="article"
        class="prose article-content min-h-[500px] py-6 max-w-full"
      />
      <ShareBtn :text="article?.title || ''" />
    </main>
  </div>
</template>
