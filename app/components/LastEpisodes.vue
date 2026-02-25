<script setup>
// should be a composable useLastEpisode(3)
const {data: last3} = await useAsyncData('last3', () => {
  return queryCollection('podcasts').order('id', 'DESC').limit(3).skip(1).all();
});
</script>

<template>
  <div class="flex flex-col gap-20 px-3">
    <EpisodeHeadings
      v-for="episode in last3"
      :key="episode.id"
      v-bind="{episode}"
    />
  </div>
</template>
