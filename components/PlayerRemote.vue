<template>
  <div class="flex items-center justify-end space-x-3 text-yellowDs">
    <button
      :aria-label="getStatus"
      :title="getStatus"
      @click.stop.prevent="tooglePlayer"
    >
      <Icon
        v-if="
          (store.currentTitle === episode.title &&
            store.statusPlayer === 'pause') ||
          store.currentTitle !== episode.title
        "
        name="ic:baseline-play-circle-filled-white"
        :size="size"
      />
      <Icon
        v-else-if="
          store.currentTitle === episode.title && store.statusPlayer === 'play'
        "
        name="ic:baseline-pause-circle-filled"
        :size="size"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import {usePlayerStore} from '~~/stores/player';
const props = withDefaults(
  defineProps<{
    episode: PodcastContentType;
    size?: string;
  }>(),
  {
    size: '50',
  },
);

const store = usePlayerStore();
const tooglePlayer = () => {
  if (store.currentTitle !== props.episode.title) {
    store.setDsSlug(props.episode.dsSlug, props.episode.title);
  } else {
    store.setStatusPlayer(store.statusPlayer === 'pause' ? 'play' : 'pause');
  }
};

// title for button
const getStatus = computed(() => {
  if (
    store.currentTitle === props.episode.title &&
    store.statusPlayer === 'play'
  ) {
    return `mettre en pause ${props.episode.title}`;
  } else if (
    store.currentTitle === props.episode.title &&
    store.statusPlayer === 'pause'
  ) {
    return `mettre en lecture ${props.episode.title}`;
  } else {
    return `mettre en lecture ${props.episode.title}`;
  }
});
</script>
