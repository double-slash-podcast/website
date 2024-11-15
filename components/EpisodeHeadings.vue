<script setup lang="ts">
const {public: config} = useRuntimeConfig();

const props = withDefaults(
  defineProps<{
    episode: PodcastContentType;
    level?: string;
  }>(),
  {
    level: '2',
  },
);

const date = useLocalDate(props.episode.publicationDate);
</script>

<template>
  <div
    class="grid grid-cols-episode-heading-mobile md:grid-cols-episode-heading episode-heading w-full md:min-w-[768px] px-4 md:px-1 text-center text-white gap-x-3 md:gap-x-8 gap-y-3 md:gap-y-1 relative z-10"
  >
    <nuxt-img
      :src="episode.episodeArtwork || config.podcastInfos.imageUrl"
      class="w-full col-start-1 row-span-1 row-start-1 rounded-lg md:row-span-3"
      loading="lazy"
      decoding="async"
      width="140"
      height="140"
      :alt="episode.title"
    />
    <nuxt-link
      :to="`${episode._path}/`"
      class="text-left md:col-start-2 md:col-end-3 after:absolute after:w-full after:h-full after:top-0 after:left-0 after:z-10"
    >
      <component
        :is="`h${level}`"
        class="text-xl text-white capitalize tracking-normal sm:leading-[2.2rem] sm:text-2xl font-headings font-bold pt-2 md:pt-0"
        >{{ props.episode.title }}</component
      >
    </nuxt-link>
    <p
      class="col-start-1 col-end-3 text-left text-gray-300 md:row-start-2 md:col-start-2"
    >
      {{ props.episode.description.substring(0, 120) }}...
    </p>
    <div class="col-start-1 col-end-3 mt-1 text-sm text-left md:col-start-2">
      {{ date }}
    </div>
    <div class="flex items-center justify-between col-span-2 md:pt-2">
      <span class="flex items-center text-4xl font-brand text-yellowDs">
        <span
          v-show="+props.episode.episodeNumber < 10"
          class="text-haiti text-outline"
          >0</span
        >
        <span
          v-show="+props.episode.episodeNumber < 100"
          class="text-haiti text-outline"
          >0</span
        >
        {{ props.episode.episodeNumber }}
      </span>
      <div class="flex items-center gap-x-2">
        <Duration :slug="props.episode.dsSlug" />
        <PlayerRemote :episode="props.episode" class="relative z-20 -mt-1" />
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
