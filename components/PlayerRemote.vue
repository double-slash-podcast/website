<template>
  <div class="flex items-center justify-end space-x-3 text-yellowDs">
    <button @click.stop.prevent="tooglePlayer">
      <Icon
        v-if="
          (store.currentTitle === episode.title &&
            store.statusPlayer === 'pause') ||
          store.currentTitle !== episode.title
        "
        name="ic:baseline-play-circle-filled-white"
        size="36"
      />
      <Icon
        v-else-if="
          store.currentTitle === episode.title && store.statusPlayer === 'play'
        "
        name="ic:baseline-pause-circle-filled"
        size="36"
      />
    </button>
    <p class="cursor-pointer" @click.stop.prevent="tooglePlayer">
      Ecouter l'episode //
    </p>
  </div>
</template>

<script setup lang="ts">
import {usePlayerStore} from '~~/stores/player';
const props = defineProps<{
  episode: PodcastContentType;
}>();

const store = usePlayerStore();
const tooglePlayer = () => {
  if (store.currentTitle !== props.episode.title) {
    store.setDsSlug(props.episode.dsSlug, props.episode.title);
  } else {
    store.setStatusPlayer(store.statusPlayer === 'pause' ? 'play' : 'pause');
  }
};
</script>
