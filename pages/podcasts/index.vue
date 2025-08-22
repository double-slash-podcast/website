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

useHead({
  title: `Tous les épisodes du podcast Double Slash ${+page > 1 ? ` - page ${page}` : ''}`,
  meta: [
    {
      name: 'description',
      content:
        "Retrouvez la liste de tous les podcasts publiés par Double Slash depuis le début de l'aventure en avril 2020",
    },
  ],
});
useSchemaOrg([defineWebPage()]);
</script>

<template>
  <div class="pb-20 bg-haiti">
    <Header></Header>
    <main>
      <HeadingsSection
        title="Tous les épisodes du podcast double slash"
        level="1"
      ></HeadingsSection>
      <div class="flex items-center justify-end mt-5 text-white">
        Page {{ page }} sur {{ Math.ceil(count / config.numberEpisodesList) }}
      </div>

      <!-- <div class="sm:max-w-md sm:m-auto">
        <label for="search" class="block m-auto text-sm font-medium text-white"
          >Recherche</label
        >
        <div class="relative mt-1">
          <input
            id="search"
            type="text"
            name="search"
            placeholder="alpineJS, Sébastion Chopin, ThreeJS..."
            class="block w-full pr-12 rounded-md shadow-sm placeholder:text-gray-500 border-purpleDs focus:border-purple-400 focus:ring-purple-400 sm:text-md"
          />
          <div class="absolute hidden inset-y-0 right-0 flex py-1.5 pr-1.5">
            <kbd
              class="inline-flex items-center px-2 font-sans text-sm font-medium border rounded text-purpleDs border-purpleDs"
              >⌘K</kbd
            >
          </div>
        </div>
      </div> -->

      <div class="flex flex-col gap-20 mt-20">
        <EpisodeHeadings
          v-for="episode in data"
          :key="episode.id"
          v-bind="{episode}"
        />
        <div class="flex justify-center">
          <Pagination :count="count" :page="page" />
        </div>
      </div>
    </main>
  </div>
</template>
