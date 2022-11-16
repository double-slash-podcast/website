<script setup lang="ts">
const {$dayjs} = useNuxtApp();

const props = withDefaults(
  defineProps<{
    episode: PodcastContentType;
    level?: string;
  }>(),
  {
    level: '2',
  },
);
</script>

<template>
  <div
    class="flex w-full md:min-w-[600px] px-1 py-10 text-center text-white uppercase justify-between"
  >
    <nuxt-link
      :to="`${episode._path}/`"
      class="flex items-center w-1/5 text-6xl sm:w-1/4 font-brand text-yellowDs"
    >
      <span class="text-haiti text-outline">0</span
      >{{ props.episode.episodeNumber }}
    </nuxt-link>
    <nuxt-link :to="`${episode._path}/`" class="w-2/3 text-right">
      <component
        :is="`h${level}`"
        class="text-xl text-white sm:leading-6 sm:text-2xl font-headings"
        >{{ props.episode.title }}</component
      >
      <div class="mt-1 text-sm italic font-light text-gray-400">
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
