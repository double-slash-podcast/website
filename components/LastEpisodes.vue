<script setup>
// should be a composable useLastEpisode(3)
const {data: last3} = await useAsyncData('last3', () => {
  return queryContent('podcasts')
    .sort({episodeNumber: -1, $numeric: true})
    .where({_extension: {$eq: 'md'}})
    .limit(3)
    .skip(1)
    .find();
});
</script>

<template>
  <div class="flex flex-col gap-20">
    <EpisodeHeadings
      v-for="episode in last3"
      :key="episode._id"
      v-bind="{episode}"
    />
  </div>
</template>
