<template>
  <audio ref="audioPlayerElement" preload="auto">
    <source :src="props.src" :type="type" />
  </audio>
  <div class="flex w-full">
    <div class="w-32 p-10">
      <button @click="toggle">
        <span v-if="state.status === 'pause'">Play</span
        ><span v-else>Pause</span>
      </button>
    </div>
    <div class="flex flex-wrap w-full">
      <input
        :value="state.currentPosition"
        class="w-full focus:outline-none"
        aria-label="Seek"
        type="range"
        step="0.01"
        min="0"
        max="100"
        autocomplete="off"
        role="slider"
        @click.stop="() => true"
        @change.stop="updateCurrentTime"
      />
      <strong>
        {{ $formatTime(detailCurrentTime.hours) }}:{{
          $formatTime(detailCurrentTime.minutes)
        }}:{{ $formatTime(detailCurrentTime.seconds) }}
      </strong>
      <strong class="ml-10">
        {{ $formatTime(detailDuration.hours) }}:{{
          $formatTime(detailDuration.minutes)
        }}:{{ $formatTime(detailDuration.seconds) }}
      </strong>
    </div>
  </div>
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
  currentPosition: number;
} = reactive({
  duration: 0,
  status: 'pause',
  currentTime: 0,
  playbackRate: 1,
  currentPosition: 0,
});

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
    state.currentTime
      ? calculateTotalValue(state.currentTime)
      : {hours: 0, seconds: 0, minutes: 0},
);

watch(
  () => state.currentTime,
  () =>
    (state.currentPosition = audioPlayerElement.value
      ? parseInt(
          (
            (audioPlayerElement.value.currentTime /
              audioPlayerElement.value.duration) *
            100
          ).toString(),
        )
      : 0),
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

const updateCurrentTime = (event: Event) => {
  const {currentTarget} = event;
  if (!audioPlayerElement.value || !currentTarget) return;
  const _currentTime =
    (+(currentTarget as HTMLInputElement).value *
      audioPlayerElement?.value.duration) /
    100;
  audioPlayerElement.value.currentTime = _currentTime;
  state.currentTime = _currentTime;
};
</script>

<style scoped>
input[type='range'] {
  @apply relative appearance-none overflow-hidden cursor-pointer h-3 border-t border-transparent rounded-lg mx-3;
}

::-webkit-slider-runnable-track {
  @apply bg-trackPurple;
}

::-moz-range-track {
  @apply h-1.5 bg-trackPurple;
}

::-webkit-slider-thumb {
  @apply w-0 h-1.5 appearance-none border-2 border-transparent shadow-thumb rounded-lg;
}

::-moz-range-thumb {
  @apply w-0 h-1.5 bg-trackPurple border-0 border-transparent shadow-thumb;
  border-radius: 0 !important;
  box-sizing: border-box;
}

::-ms-thumb {
  @apply w-0 h-1.5 bg-trackPurple border-0 border-transparent;
  box-sizing: border-box;
}

::-ms-track {
  @apply h-1.5 bg-trackPurple text-transparent border-0;
}

::-ms-fill-lower {
  @apply h-1.5 bg-yellowDs;
}

::-ms-ticks-after {
  @apply hidden;
}

::-ms-ticks-before {
  @apply hidden;
}

::-ms-tooltip {
  @apply hidden;
}
</style>
