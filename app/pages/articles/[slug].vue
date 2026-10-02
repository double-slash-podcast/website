<script setup lang="ts">
import {articleAuthors} from '~/utils/articleAuthors';

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

const authors = computed(() => articleAuthors(article.value?.author));

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
        :prose="false"
        :components="markdownComponents"
        class="prose article-content min-h-125 py-6 max-w-full [&>img]:rounded-lg"
      />
      <div
        v-if="authors.length"
        class="mt-10 w-full"
        :class="{'max-w-xl': authors.length === 1}"
      >
        <h3 class="mb-4 text-xl font-normal font-sans normal-case text-gray-700">
          {{
            authors.length > 1
              ? 'À propos des auteurs'
              : "À propos de l'auteur"
          }}
        </h3>
        <div
          class="flex flex-col gap-4"
          :class="{'md:flex-row md:items-stretch': authors.length > 1}"
        >
          <Author
            v-for="person in authors"
            :key="person.url"
            about
            :url="person.url"
            class="min-w-0 md:flex-1"
          />
        </div>
      </div>
      <ShareBtn :text="article?.title || ''" />
    </main>
  </div>
</template>
