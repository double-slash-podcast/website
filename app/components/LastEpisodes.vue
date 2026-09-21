<script setup>
/**
 * Previous episodes on the homepage. Homepage wraps this in <Suspense>
 * because setup awaits content (nested async setup 500s generate without it).
 */
const {data: last3} = await useAsyncData('last3', () => {
  return queryCollection('podcasts').order('id', 'DESC').limit(3).skip(1).all();
});
</script>

<template>
  <div class="flex flex-col gap-20 px-3">
    <EpisodeHeadings
      v-for="episode in last3 ?? []"
      :key="episode.id"
      v-bind="{episode}"
    />
  </div>
</template>
