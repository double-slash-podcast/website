<script setup>
const {data} = await useAsyncData('bloglist', () => {
  return queryContent('articles').sort({publicationDate: -1}).find();
});

useHead({
  title: 'Tous les articles du blog Double Slash',
  description:
    'Retrouvez la liste de tous les articles publiés par Double Slash',
});
useSchemaOrg([defineWebPage()]);
</script>

<template>
  <div class="bg-haiti">
    <Header :height="160"></Header>
    <main>
      <HeadingsSection
        title="Tous les articles du blog double slash"
        level="1"
      ></HeadingsSection>
      <section class="min-h-screen pt-8 pb-20">
        <ArticleList
          v-for="article in data"
          :key="article.path"
          :article="article"
        />
      </section>
    </main>
  </div>
</template>
