<script setup>
const {path} = useRoute();
const {data: episode} = await useAsyncData('OneEpisode', () => {
  return queryContent()
    .where({_path: {$eq: path}})
    .only(['title'])
    .findOne();
});
if (!episode) {
  throw createError({statusCode: 404, statusMessage: 'Page Not Found'});
}
</script>
<template>
  <main v-if="episode">
    <Header title="{{episode.title}}"></Header>
    <!-- <h1 class="text-white">{{ episode.title }}</h1> -->
  </main>
</template>
