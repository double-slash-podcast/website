<script setup lang="ts">
import {useStore} from '~~/stores';

const {$dayjs} = useNuxtApp();
const store = useStore();

const props = withDefaults(
  defineProps<{
    episode: PodcastContentType;
    cta: boolean;
  }>(),
  {cta: false},
);

const handlerClick = () => {
  if (store.currentTitle !== props.episode.title) {
    store.setDsSlug(props.episode.dsSlug, props.episode.title);
  } else {
    store.setStatusPlayer(store.statusPlayer === 'pause' ? 'play' : 'pause');
  }
};
</script>

<template>
  <div
    class="flex w-full md:w-[600px] py-10 text-center text-white uppercase justify-between"
  >
    <div
      class="flex items-center w-1/5 text-6xl sm:w-1/4 font-brand text-yellowDs"
    >
      <span class="text-haiti text-outline">0</span>{{ episode.episodeNumber }}
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
        <button @click.stop.prevent="handlerClick">
          <Icon
            v-if="
              (store.currentTitle === episode.title &&
                store.statusPlayer === 'pause') ||
              store.currentTitle !== episode.title
            "
            name="ic:baseline-play-circle-filled-white"
            size="30"
          />
          <Icon
            v-else-if="
              store.currentTitle === episode.title &&
              store.statusPlayer === 'play'
            "
            name="ic:baseline-pause-circle-filled"
            size="30"
          />
        </button>
        <p>Ecouter l'episode //</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.text-outline {
  text-shadow: -2px -2px 0 #9123cb, 2px 2px 0 #9123cb, 2px -2px 0 #9123cb,
    -2px 2px 0 #9123cb;
}
</style>
