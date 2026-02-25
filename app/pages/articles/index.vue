<script setup>
const {data} = await useAsyncData('bloglist', () => {
  return queryCollection('articles').order('publicationDate', 'DESC').all();
});

useHead({
  title: 'Tous les articles du blog Double Slash',
  meta: [
    {
      name: 'description',
      content:
        'Retrouvez la liste de tous les articles publiés par Double Slash',
    },
  ],
});
useSchemaOrg([defineWebPage()]);
</script>

<template>
  <div class="bg-haiti">
    <Header :height="160" />
    <main class="px-4">
      <HeadingsSection
        title="Tous les articles du blog double slash"
        level="1"
      />
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
