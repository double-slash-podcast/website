<script setup lang="ts">
/**
 * Episode row for listings: artwork, title, excerpt, duration and play control.
 */
import type {PodcastsCollectionItem} from '@nuxt/content';
import {debounce} from 'throttle-debounce';

const {podcastInfos} = useAppConfig();

const root = ref<HTMLElement | null>(null);

const props = withDefaults(
  defineProps<{
    episode: PodcastsCollectionItem;
    level?: string;
  }>(),
  {
    level: '2',
  },
);

const isoPublicationDate = computed(() =>
  toIsoDatetime(props.episode.publicationDate),
);

/**
 * Align the title with the artwork on small screens after layout.
 * The heading itself must not use a Vue template ref: `<component :is>`
 * plus a ref next to a Nuxt island (Duration) crashes in production
 * (`Cannot read properties of null (reading 'refs')` during hydrate).
 */
const setTitlePosition = () => {
  const heading = root.value?.querySelector(
    '.episode-heading-title',
  ) as HTMLElement | null;
  if (!heading) return;
  const height = heading.getBoundingClientRect().height;
  if (height > 68 && window.innerWidth < 640) {
    heading.style.top = '-5px';
  } else if (height < 30 && window.innerWidth < 640) {
    heading.style.top = '20px';
  }
};

const onResize = debounce(300, setTitlePosition);

onMounted(async () => {
  await nextTick();
  setTitlePosition();
  window.addEventListener('resize', onResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
});
</script>

<template>
  <div
    ref="root"
    class="grid grid-cols-episode-heading-mobile md:grid-cols-episode-heading episode-heading w-full md:min-w-3xl px-3 text-center text-white gap-x-3 md:gap-x-8 gap-y-3 md:gap-y-1 relative z-10"
  >
    <AppImg
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
        class="episode-heading-title text-lg leading-6 text-balance text-pretty text-white normal-case tracking-normal sm:leading-8 sm:text-2xl font-headings font-bold top-2 sm:top-0 relative mb-1"
        >{{ props.episode.title }}</component
      >
    </nuxt-link>
    <p
      class="col-start-1 col-end-3 text-left text-white/80 md:row-start-2 md:col-start-2"
    >
      {{ props.episode.description?.substring(0, 120) }}...
    </p>
    <NuxtTime
      v-if="isoPublicationDate"
      :datetime="isoPublicationDate"
      locale="fr-FR"
      year="numeric"
      month="long"
      day="numeric"
      class="col-start-1 col-end-3 mt-1 text-sm text-left text-white/60 md:col-start-2"
    />
    <div class="flex items-center justify-between col-span-2 md:pt-2">
      <div class="flex items-center gap-x-2">
        <EpisodeNumber :episode-number="+props.episode.episodeNumber" />
        <NewEpisode :publication-date="isoPublicationDate" />
      </div>
      <div class="flex items-center gap-x-2">
        <Duration :duration="props.episode.duration" />
        <PlayerRemote :episode="props.episode" class="relative z-20 -mt-1" />
      </div>
    </div>
  </div>
</template>
