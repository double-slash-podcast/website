<script setup lang="ts">
const {path} = useRoute();

const {data: article} = await useAsyncData(`${path.replace(/\/+$/, '')}`, () =>
  queryContent<ArticleType>()
    .where({_path: {$eq: path.replace(/\/+$/, '')}})
    .findOne(),
);

if (!article.value?.title) {
  // redirect to 404 page
  navigateTo('/_404');
}
useHead({
  title: article.value?.title,
  description: article.value?.description,
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
  <div class="bg-gradient-to-b from-purple-50 to-purple-100">
    <Header :height="160"></Header>
    <main class="pb-20">
      <h1 class="mt-10 text-4xl font-bold">{{ article?.title }}</h1>
      <ArticleDetails :article="article" />
      <ContentRenderer
        v-if="article"
        :value="article"
        class="prose article-content min-h-[500px] py-6"
      />
    </main>
  </div>
</template>
