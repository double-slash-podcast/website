<script setup>
const {data} = await useAsyncData('podcasts', () => {
  return queryContent('podcasts')
    .sort({episodeNumber: -1, $numeric: true})
    .limit(3)
    .find();
});
</script>

<template>
  <div class="divide-y divide-dashed divide-purpleDS">
    <EpisodeLink
      v-for="episode in data"
      :key="episode._id"
      v-bind="{episode}"
    />
  </div>
</template>
