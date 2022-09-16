<script setup>
const {$dayjs} = useNuxtApp();

defineProps({
  episode: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <nuxt-link
    :to="episode._path"
    class="flex py-10 text-center text-white uppercase"
  >
    <div class="flex items-center w-1/3 text-6xl font-brand text-yellowDs">
      <span class="text-haiti spe">0</span>{{ episode.episodeNumber }}
    </div>
    <div class="w-2/3 text-right">
      <h3 class="text-2xl">{{ episode.title }}</h3>
      <div class="italic font-light text-gray-400">
        {{ $dayjs(episode.publicationDate).format('DD MMM YY') }}
      </div>
      <div class="flex items-center justify-end space-x-3 text-yellowDs">
        <Icon name="ic:baseline-play-circle-filled-white" size="30" />
        <p>Ecouter l'episode //</p>
      </div>
    </div>
  </nuxt-link>
</template>

<style>
.spe {
  text-shadow: -2px -2px 0 #9123cb, 2px 2px 0 #9123cb, 2px -2px 0 #9123cb,
    -2px 2px 0 #9123cb;
}
</style>
