<script setup lang="ts">
import type {PodcastsCollectionItem} from '@nuxt/content';
import {debounce} from 'throttle-debounce';
const {podcastInfos} = useAppConfig();

const title = ref<HTMLHeadingElement | null>(null);

const props = withDefaults(
  defineProps<{
    episode: PodcastsCollectionItem;
    level?: string;
  }>(),
  {
    level: '2',
  },
);

const date = useLocalDate(props.episode.publicationDate);

const setTitlePosition = () => {
  if (!title.value) return;
  const height = title.value.getBoundingClientRect().height;
  if (height > 68 && window.innerWidth < 640) {
    title.value.style.top = '-5px';
  } else if (height < 30 && window.innerWidth < 640) {
    title.value.style.top = '20px';
  }
};

onMounted(async () => {
  await nextTick();
  setTitlePosition();
  window.addEventListener('resize', debounce(300, setTitlePosition));
});

onUnmounted(() => {
  window.removeEventListener('resize', debounce(300, setTitlePosition));
});
</script>

<template>
  <div
    class="grid grid-cols-episode-heading-mobile md:grid-cols-episode-heading episode-heading w-full md:min-w-[768px] px-4 md:px-1 text-center text-white gap-x-3 md:gap-x-8 gap-y-3 md:gap-y-1 relative z-10"
  >
    <nuxt-img
      :src="episode.episodeArtwork || podcastInfos.imageUrl"
      class="w-full col-start-1 row-span-1 row-start-1 rounded-lg md:row-span-3"
      loading="lazy"
      decoding="async"
      width="140"
      height="140"
      :alt="episode.title"
    />
    <nuxt-link
      :to="`${episode.path}/`"
      class="text-left md:col-start-2 md:col-end-3 after:absolute after:w-full after:h-full after:top-0 after:left-0 after:z-10"
    >
      <component
        :is="`h${level}`"
        ref="title"
        class="text-xl text-white normal-case tracking-normal sm:leading-[2.2rem] sm:text-2xl font-headings font-bold top-2 sm:top-0 relative"
        >{{ props.episode.title }}</component
      >
    </nuxt-link>
    <p
      class="col-start-1 col-end-3 text-left text-white/80 md:row-start-2 md:col-start-2"
    >
      {{ props.episode.description?.substring(0, 120) }}...
    </p>
    <time
      :datetime="`${new Date(props.episode.publicationDate).toLocaleDateString('fr-FR', {})}`"
      class="col-start-1 col-end-3 mt-1 text-sm text-left text-white/60 md:col-start-2"
    >
      {{ date }}
    </time>
    <div class="flex items-center justify-between col-span-2 md:pt-2">
      <div class="flex items-center gap-x-2">
        <EpisodeNumber :episode-number="+props.episode.episodeNumber" />
        <NewEpisode :publication-date="props.episode.publicationDate" />
      </div>
      <div class="flex items-center gap-x-2">
        <Duration :slug="props.episode.dsSlug" />
        <PlayerRemote :episode="props.episode" class="relative z-20 -mt-1" />
      </div>
    </div>
  </div>
</template>
