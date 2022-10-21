<script setup>
defineProps({
  episode: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <nuxt-link :to="episode._path">
    <EpisodeHeadings :episode="episode" />
  </nuxt-link>
</template>
