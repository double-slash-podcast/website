<script setup>
// should be a composable useLastEpisode(9)
const {data} = await useAsyncData('podcasts', () => {
  return queryContent('podcasts')
    .where({_extension: {$eq: 'md'}})
    .sort({episodeNumber: -1, $numeric: true})
    .limit(9)
    .find();
});
</script>

<template>
  <div>
    <Header height="200"></Header>
    <main>
      <HeadingsSection title="tous les épisodes"></HeadingsSection>

      <div class="sm:max-w-md sm:m-auto">
        <label for="search" class="block m-auto text-sm font-medium text-white"
          >Recherche</label
        >
        <div class="relative mt-1">
          <input
            id="search"
            type="text"
            name="search"
            placeholder="alpineJS, Sébastion Chopin, ThreeJS..."
            class="block w-full pr-12 rounded-md shadow-sm placeholder:text-gray-500 border-purpleDS focus:border-purple-400 focus:ring-purple-400 sm:text-md"
          />
          <div class="absolute hidden inset-y-0 right-0 flex py-1.5 pr-1.5">
            <kbd
              class="inline-flex items-center px-2 font-sans text-sm font-medium border rounded text-purpleDS border-purpleDS"
              >⌘K</kbd
            >
          </div>
        </div>
      </div>

      <div class="divide-y divide-dashed divide-purpleDS">
        <EpisodeLink
          v-for="episode in data"
          :key="episode._id"
          v-bind="{episode}"
        />
      </div>
    </main>
  </div>
</template>
