<template>
  <audio ref="audioPlayerElement" preload="auto">
    <source :src="props.src" :type="type" />
  </audio>
  <h2>
    {{ $formatTime(detailDuration.hours) }}:{{
      $formatTime(detailDuration.minutes)
    }}:{{ $formatTime(detailDuration.seconds) }}
  </h2>
  <h2>
    {{ $formatTime(detailCurrentTime.hours) }}:{{
      $formatTime(detailCurrentTime.minutes)
    }}:{{ $formatTime(detailCurrentTime.seconds) }}
  </h2>
  <button @click="toggle">
    <span v-if="state.status === 'pause'">Play</span><span v-else>Pause</span>
  </button>
</template>

<script setup lang="ts">
import {calculateTotalValue, typeDuration} from '../helpers/player';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});
// never change
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
    // first load
    audioPlayerElement.value?.load();
    // update duration
    audioPlayerElement.value.addEventListener('durationchange', () => {
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

// reload src when props change
watch(
  () => props.src,
  () => audioPlayerElement.value?.load(),
);

// get object for duration
const detailDuration = computed(
  (): typeDuration =>
    state.duration
      ? calculateTotalValue(state.duration)
      : {hours: 0, seconds: 0, minutes: 0},
);

// get object for currentTime
const detailCurrentTime = computed(
  (): typeDuration =>
    state.duration
      ? calculateTotalValue(state.currentTime)
      : {hours: 0, seconds: 0, minutes: 0},
);

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
