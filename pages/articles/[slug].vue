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
  <div class="">
    <Header :height="160"></Header>
    <main>
      <h1 class="mt-10 text-4xl font-bold">{{ article?.title }}</h1>
      <ArticleDetails :article="article" />
      <ContentRenderer
        v-if="article"
        :value="article"
        class="prose min-h-[500px] py-6"
      />
    </main>
  </div>
</template>
