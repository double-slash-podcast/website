<template>
  <audio ref="audioPlayerElement" preload="auto">
    <source :src="props.src" :type="type" />
  </audio>
  <div v-if="props.src" class="flex w-full p-5">
    <div class="flex justify-center px-10 w-34">
      <button
        class="mr-2"
        title="back to 10 seconds"
        :disabled="state.currentTime < 10"
        :aria-disabled="state.currentTime < 10"
        @click="skip(-10)"
      >
        <Icon name="fluent:skip-back-10-24-filled" />
      </button>
      <ButtonPlayer
        :value="state.loadedProgress"
        :status="state.status"
        :width="65"
        :height="65"
        :size="4"
        :load="state.totalBuffered < state.currentTime"
        @click="toggle"
      />
      <button class="ml-2" title="forward to 10 seconds" @click="skip(+10)">
        <Icon name="fluent:skip-forward-10-24-filled" />
      </button>
    </div>
    <Loader v-if="!state.loaded" />
    <div v-else class="flex flex-wrap w-full">
      <TimelinePlayer
        :detail-current-time="detailCurrentTime"
        :detail-duration="detailDuration"
        :duration="state.duration || 0"
        :current-time="state.currentTime"
        :current-position="
          isNaN(state.currentPosition) ? 0 : state.currentPosition
        "
        @updateCurrentTime="updateCurrentTime"
      />
      <div class="flex items-center w-full">
        <TimerPlayer :current-time="detailCurrentTime" /><span
          class="mx-3 text-xs font-base"
          >//</span
        >
        <TimerPlayer :current-time="detailDuration" />
        <div class="flex-1 mx-5 text-sm font-headings">
          {{ props.title }}
        </div>
        <SpeedPlayer :speed="state.playbackRate" @change="changeSpeed" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {calculateTotalValue} from '../../helpers/player';
import ButtonPlayer from './ButtonPlayer.vue';
import TimelinePlayer from './TimelinePlayer.vue';
import TimerPlayer from './TimerPlayer.vue';
import SpeedPlayer from './SpeedPlayer.vue';

const props = withDefaults(
  defineProps<{
    src: string | undefined;
    title: string | undefined;
    status: typeStatusPlayer;
  }>(),
  {
    src: undefined,
    title: undefined,
  },
);

const emit = defineEmits<{
  (e: 'statusChange', status: typeStatusPlayer): void;
}>();

// never change
const type = 'audio/mpeg';
// audio tag
const audioPlayerElement = ref<HTMLAudioElement | null>(null);

const state: {
  // duration of sound
  duration: number | null;
  // status player
  status: typeStatusPlayer;
  // currentTime played
  currentTime: number;
  // speed paly rate
  playbackRate: typeSpeedPlayer;
  // position for input range
  currentPosition: number;
  // sound is loaded
  loaded: boolean;
  // loaded percentage
  loadedProgress: number;
  // total buffered
  totalBuffered: number;
} = reactive({
  duration: 0,
  status: 'pause',
  currentTime: 0,
  playbackRate: 1,
  currentPosition: 0,
  loaded: false,
  loadedProgress: 0,
  totalBuffered: 0,
});

/** progress data load */
const load = () => {
  if (!audioPlayerElement.value) return;
  if (!state.loaded) return;
  // length of buffered
  const c = audioPlayerElement.value?.buffered.length || 1;
  state.totalBuffered = audioPlayerElement.value?.buffered.end(c - 1);
  state.loadedProgress =
    (audioPlayerElement.value?.buffered.end(c - 1) /
      audioPlayerElement.value?.duration) *
    100;
};

const updateDuration = () => {
  state.duration = audioPlayerElement.value
    ? +audioPlayerElement.value.duration
    : Infinity;
};

/** init player on mounted or when src change */
const initPlayer = (withPlay = false) => {
  if (audioPlayerElement.value && props.src) {
    state.duration = 0;
    state.currentTime = 0;
    state.currentPosition = 0;
    state.loadedProgress = 0;
    state.totalBuffered = 0;
    // first load
    audioPlayerElement.value?.load();
    audioPlayerElement.value.addEventListener('canplay', () => {
      state.loaded = true;
    });
    // update duration
    audioPlayerElement.value.addEventListener('loadedmetadata', updateDuration);
    // update currentTime
    audioPlayerElement.value.addEventListener('timeupdate', () => {
      state.currentTime = audioPlayerElement.value?.currentTime || 0;
    });

    audioPlayerElement.value.addEventListener('progress', load);
    audioPlayerElement.value.addEventListener('loadedmetadata', load);

    // sound is ended
    audioPlayerElement.value.addEventListener('ended', reset);

    // set play rate
    audioPlayerElement.value.playbackRate = state.playbackRate;

    if (withPlay) {
      toggle();
    }
  }
};

/** reset player */
const resetPlayer = (init = false) => {
  if (audioPlayerElement.value) {
    // stop
    audioPlayerElement.value.pause();
    audioPlayerElement.value.currentTime = 0;
    state.status = 'pause';
    emit('statusChange', state.status);
    // first load
    audioPlayerElement.value.removeEventListener('canplay', () => {
      state.loaded = true;
    });
    // update duration
    audioPlayerElement.value.removeEventListener(
      'loadedmetadata',
      updateDuration,
    );
    // update currentTime
    audioPlayerElement.value.removeEventListener('timeupdate', () => {
      state.currentTime = audioPlayerElement.value?.currentTime || 0;
    });
    audioPlayerElement.value.removeEventListener('progress', load);
    audioPlayerElement.value.removeEventListener('loadedmetadata', load);
    // sound is ended
    audioPlayerElement.value.removeEventListener('ended', reset);
    if (init) {
      // reinit player
      initPlayer(true);
    }
  }
};

onMounted(initPlayer);

onUnmounted(resetPlayer);

// reload src when props change
watch(
  () => props.src,
  () => {
    resetPlayer(true);
  },
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

watch(
  () => props.status,
  () => {
    // avoid infinite loops
    if (props.status !== state.status) toggle();
  },
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
    state.status = 'play';
  } else {
    audioPlayerElement.value?.pause();
    state.status = 'pause';
  }

  emit('statusChange', state.status);
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

const changeSpeed = (speed: typeSpeedPlayer) => {
  if (!audioPlayerElement.value) return;
  // set play rate
  state.playbackRate = speed;
  audioPlayerElement.value.playbackRate = speed;
};

const skip = (value: number) => {
  if (!audioPlayerElement.value) return;
  const to = audioPlayerElement.value.currentTime + value;
  audioPlayerElement.value.currentTime = to > 0 ? to : 0;
};
</script>
