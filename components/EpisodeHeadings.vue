<script setup lang="ts">
const {$dayjs} = useNuxtApp();

const props = defineProps<{
  episode: PodcastContentType;
}>();
</script>

<template>
  <div
    class="flex w-full md:w-[600px] py-10 text-center text-white uppercase justify-between"
  >
    <nuxt-link
      :to="episode._path"
      class="flex items-center w-1/5 text-6xl sm:w-1/4 font-brand text-yellowDs"
    >
      <span class="text-haiti text-outline">0</span
      >{{ props.episode.episodeNumber }}
    </nuxt-link>
    <nuxt-link :to="episode._path" class="w-2/3 text-right">
      <h3 class="text-xl sm:text-2xl">{{ props.episode.title }}</h3>
      <div class="italic font-light text-gray-400">
        {{ $dayjs(props.episode.publicationDate).format('DD MMM YY') }}
      </div>
      <PlayerRemote :episode="props.episode" />
    </nuxt-link>
  </div>
</template>
<style scoped>
.text-outline {
  text-shadow: -2px -2px 0 #9123cb, 2px 2px 0 #9123cb, 2px -2px 0 #9123cb,
    -2px 2px 0 #9123cb;
}
</style>
