<script setup lang="ts">
const {podcastInfos} = useAppConfig();

const props = defineProps<{
  episode: PodcastsCollectionItem;
}>();

const date = useLocalDate(props.episode.publicationDate);
</script>

<template>
  <div
    class="grid grid-cols-episode-head-mobile sm:grid-cols-episode-head-phablette md:grid-cols-episode-head episode-head w-full max-w-[calc(100vw - 2rem)] md:max-w-[768px] px-4 md:px-1 text-center text-white gap-x-4 md:gap-x-8 gap-y-3 md:gap-y-1 relative z-10"
  >
    <div>
      <nuxt-img
        :src="episode.episodeArtwork || podcastInfos.imageUrl"
        class="w-full rounded-lg md:row-span-3"
        loading="eager"
        decoding="async"
        width="200"
        height="200"
        :alt="episode.title"
      />
    </div>
    <div class="flex flex-col justify-end gap-3">
      <nuxt-link
        :to="`${episode.path}/`"
        class="text-left after:absolute after:w-full after:h-full after:top-0 after:left-0 after:z-10"
      >
        <h1
          class="text-2xl text-white normal-case tracking-normal sm:leading-[2.2rem] sm:text-4xl font-headings font-bold md:pt-0 text-balance hyphens-auto sm:hyphens-none"
        >
          {{ props.episode.title }}
        </h1>
      </nuxt-link>
      <time
        :datetime="new Date(props.episode.publicationDate)"
        class="mt-1 text-sm text-left"
      >
        {{ date }}
      </time>
    </div>
    <div
      class="flex items-center justify-between col-start-1 col-end-3 row-start-2 gap-3"
    >
      <div class="flex items-center gap-x-2">
        <EpisodeNumber :episode-number="+props.episode.episodeNumber" />
        <NewEpisode :publication-date="props.episode.publicationDate" />
      </div>
      <div class="flex items-center gap-x-2">
        <Duration :slug="props.episode.dsSlug" />
        <PlayerRemote
          :episode="props.episode"
          size="80"
          class="relative z-20 -mt-1"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.episode-head {
  hyphenate-limit-chars: 13 auto auto;
}
</style>
