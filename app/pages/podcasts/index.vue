<script setup lang="ts">
const {public: config} = useRuntimeConfig();
const route = useRoute();
const page = (route.params.page as string) || '1';

// total episodes
const {data: count} = await useAsyncData(`podcasts-count-${page}`, () => {
  return queryCollection('podcasts').count();
});
// define skip
const skip = +page < 2 ? 0 : (+page - 1) * config.numberEpisodesList;

const {data} = await useAsyncData(`podcasts-${page}`, () => {
  return queryCollection('podcasts')
    .order('id', 'DESC')
    .limit(config.numberEpisodesList)
    .skip(skip)
    .all();
});

useSeoMeta({
  title: `Tous les épisodes du podcast Double Slash ${+page > 1 ? ` - page ${page}` : ''}`,
  description:
    "Retrouvez la liste de tous les podcasts publiés par Double Slash depuis le début de l'aventure en avril 2020",
});
useSchemaOrg([defineWebPage()]);
</script>

<template>
  <div class="pb-20 bg-haiti">
    <Header />
    <main class="px-4">
      <HeadingsSection
        title="Tous les épisodes du podcast double slash"
        level="1"
      />
      <div v-if="count" class="flex items-center justify-end mt-5 text-white">
        Page {{ page }} sur {{ Math.ceil(count / config.numberEpisodesList) }}
      </div>

      <div class="flex flex-col gap-20 mt-20">
        <EpisodeHeadings
          v-for="episode in data"
          :key="episode.id"
          v-bind="{episode}"
        />
        <div class="flex justify-center">
          <Pagination :count="count || 0" :page="page" />
        </div>
      </div>
    </main>
  </div>
</template>
