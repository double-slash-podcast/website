<script setup lang="ts">
import {useStore} from '~~/stores';

const {$dayjs} = useNuxtApp();
const store = useStore();

withDefaults(
  defineProps<{
    episode: PodcastContentType;
    cta: boolean;
  }>(),
  {cta: false},
);
</script>

<template>
  <div
    class="flex w-full md:w-[600px] py-10 text-center text-white uppercase justify-between"
  >
    <div
      class="flex items-center w-1/4 text-6xl sm:w-1/3 font-brand text-yellowDs"
    >
      <span class="text-haiti spe">0</span>{{ episode.episodeNumber }}
    </div>
    <div class="w-2/3 text-right">
      <h3 class="text-xl sm:text-2xl">{{ episode.title }}</h3>
      <div class="italic font-light text-gray-400">
        {{ $dayjs(episode.publicationDate).format('DD MMM YY') }}
      </div>
      <div
        v-show="cta"
        class="flex items-center justify-end space-x-3 text-yellowDs"
      >
        <button
          @click.stop.prevent="store.setDsSlug(episode.dsSlug, episode.title)"
        >
          <Icon name="ic:baseline-play-circle-filled-white" size="30" />
        </button>
        <p>Ecouter l'episode //</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.spe {
  text-shadow: -2px -2px 0 #9123cb, 2px 2px 0 #9123cb, 2px -2px 0 #9123cb,
    -2px 2px 0 #9123cb;
}
</style>
s
