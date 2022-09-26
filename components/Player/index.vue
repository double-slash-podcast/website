<template>
  <audio ref="audioPlayerElement" preload="auto">
    <source :src="props.src" :type="type" />
  </audio>
  <div class="flex w-full p-5">
    <div class="w-32 px-10">
      <button @click="toggle">
        <span v-if="state.status === StatusPlayer.pause"
          ><Icon name="ant-design:play-circle-filled" size="3rem" /></span
        ><span v-else
          ><Icon name="ant-design:pause-circle-filled" size="3rem"
        /></span>
      </button>
    </div>
    <Loader v-if="!state.loaded" />
    <div v-else class="flex flex-wrap w-full">
      <Timeline
        :detail-current-time="detailCurrentTime"
        :detail-duration="detailDuration"
        :duration="state.duration || 0"
        :current-time="state.currentTime"
        :current-position="state.currentPosition"
        @updateCurrentTime="updateCurrentTime"
      />
      <Timer :current-time="detailCurrentTime" /><span
        class="mx-3 text-xs font-base"
        >//</span
      >
      <Timer :current-time="detailDuration" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {calculateTotalValue} from '../../helpers/player';
import Timeline from './Timeline.vue';
import Timer from './Timer.vue';

enum StatusPlayer {
  play = 'play',
  pause = 'pause',
}

const props = defineProps<{src: string}>();
// never change
const type = 'audio/mpeg';
// audio tag
const audioPlayerElement = ref<HTMLAudioElement | null>(null);

const state: {
  // duration of sound
  duration: number | null;
  // status player
  status: StatusPlayer;
  // currentTime played
  currentTime: number;
  // speed paly rate
  playbackRate: number;
  // position for input range
  currentPosition: number;
  // sound is loaded
  loaded: boolean;
} = reactive({
  duration: 0,
  status: StatusPlayer.pause,
  currentTime: 0,
  playbackRate: 1,
  currentPosition: 0,
  loaded: false,
});

onMounted(() => {
  if (audioPlayerElement.value) {
    // first load
    audioPlayerElement.value?.load();
    audioPlayerElement.value.addEventListener('canplay', () => {
      state.loaded = true;
    });
    // update duration
    audioPlayerElement.value.addEventListener('loadedmetadata', () => {
      state.duration = audioPlayerElement.value
        ? +audioPlayerElement.value.duration
        : Infinity;
    });
    // update currentTime
    audioPlayerElement.value.addEventListener('timeupdate', () => {
      state.currentTime = audioPlayerElement.value?.currentTime || 0;
    });

    // sound is ended
    audioPlayerElement.value.addEventListener('ended', () => {
      reset();
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

// update currentPosition on play
watch(
  () => state.currentTime,
  () =>
    (state.currentPosition = audioPlayerElement.value
      ? (audioPlayerElement.value.currentTime /
          audioPlayerElement.value.duration) *
        100
      : 0),
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

/** play sound or pause */
const toggle = () => {
  if (state.status === 'pause') {
    audioPlayerElement.value?.play();
    state.status = StatusPlayer.play;
  } else {
    audioPlayerElement.value?.pause();
    state.status = StatusPlayer.pause;
  }
};

/** update currentTime from input range */
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

// reset player
const reset = () => {
  toggle();
  state.currentPosition = 0;
  if (audioPlayerElement.value) {
    audioPlayerElement.value.currentTime = 0;
    state.currentTime = 0;
  }
};
</script>
