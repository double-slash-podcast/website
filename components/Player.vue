<template>
  <audio ref="audioPlayerElement" preload="auto">
    <source :src="props.src" :type="type" />
  </audio>
  <h2>{{ state.duration }}</h2>
  <h2>{{ state.currentTime }}</h2>
  <button @click="toggle">
    <span v-if="state.status === 'pause'">Play</span><span v-else>Pause</span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});
const type = 'audio/mpeg';
const audioPlayerElement = ref<HTMLAudioElement | null>(null);

const state: {
  duration: number | null;
  status: 'play' | 'pause';
  currentTime: number;
  playbackRate: number;
} = reactive({duration: 0, status: 'pause', currentTime: 0, playbackRate: 1});

onMounted(() => {
  if (audioPlayerElement.value) {
    // udpate duration
    audioPlayerElement.value.addEventListener('loadedmetadata', () => {
      state.duration = audioPlayerElement.value
        ? +audioPlayerElement.value.duration
        : 0;
    });
    // update currentTime
    audioPlayerElement.value.addEventListener('timeupdate', () => {
      state.currentTime = audioPlayerElement.value?.currentTime || 0;
    });
    // set play rate
    audioPlayerElement.value.playbackRate = state.playbackRate;
  }
});

/** play sound or pause */
const toggle = () => {
  if (state.status === 'pause') {
    audioPlayerElement.value?.play();
    state.status = 'play';
  } else {
    audioPlayerElement.value?.pause();
    state.status = 'pause';
  }
};
</script>
