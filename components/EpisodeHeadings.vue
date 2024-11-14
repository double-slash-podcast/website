<script setup lang="ts">
const {$dayjs} = useNuxtApp();

const props = withDefaults(
  defineProps<{
    episode: PodcastContentType;
    level?: string;
    hasLink?: boolean;
  }>(),
  {
    level: '2',
    hasLink: true,
  },
);
</script>

<template>
  <div
    class="grid sm:grid-cols-episode-heading w-full md:min-w-[768px] px-4 md:px-1 text-center text-white gap-9 uppercase relative"
  >
    <div class="relative">
      <img
        :src="episode.episodeArtwork"
        class="w-full md:w-11/12"
        loading="lazy"
        decoding="async"
        :alt="episode.title"
      />
      <span
        class="absolute right-0 flex items-center pl-2 text-4xl -bottom-12 sm:-bottom-1 font-brand sm:-right-14 md:-right-10 text-yellowDs"
      >
        <span
          v-show="+props.episode.episodeNumber < 10"
          class="text-haiti text-outline"
          >0</span
        >
        <span
          v-show="+props.episode.episodeNumber < 100"
          class="text-haiti text-outline"
          >0</span
        >{{ props.episode.episodeNumber }}
      </span>
    </div>
    <div class="flex flex-col justify-start gap-1 text-left sm:text-right">
      <div class="mt-1 text-sm italic font-light text-gray-400">
        {{ $dayjs(props.episode.publicationDate).format('DD MMM YY') }}
      </div>
      <nuxt-link
        :to="`${episode._path}/`"
        class="after:absolute after:w-full after:h-full after:top-0 after:left-0 after:z-10"
        v-if="props.hasLink"
      >
        <component
          :is="`h${level}`"
          class="text-xl text-white sm:leading-8 sm:text-2xl font-headings"
          >{{ props.episode.title }}</component
        >
      </nuxt-link>
      <component
        v-else
        :is="`h${level}`"
        class="text-xl text-white sm:leading-6 sm:text-2xl font-headings"
        >{{ props.episode.title }}</component
      >
      <div class="relative z-20 mt-auto">
        <PlayerRemote :episode="props.episode" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.text-outline {
  text-shadow:
    -2px -2px 0 #9123cb,
    2px 2px 0 #9123cb,
    2px -2px 0 #9123cb,
    -2px 2px 0 #9123cb;
}
</style>
