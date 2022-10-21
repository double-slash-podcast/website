<script setup>
// should be a composable useLastEpisode(3)
const {data} = await useAsyncData('last3', () => {
  return queryContent('podcasts')
    .sort({episodeNumber: -1, $numeric: true})
    .where({_extension: {$eq: 'md'}})
    .limit(3)
    .find();
});
</script>

<template>
  <div class="divide-y divide-dashed divide-purpleDs">
    <EpisodeLink
      v-for="episode in data"
      :key="episode._id"
      v-bind="{episode}"
    />
  </div>
</template>
