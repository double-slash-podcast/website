<template>
  <audio class="js-player-audio" preload="auto">
    <source :src="props.src" :type="type" />
  </audio>
  <div
    v-if="props.src"
    class="block w-full px-2 -translate-y-6 md:w-3/4 lg:w-1/2 md:m-auto sm:flex"
  >
    <div class="flex items-end justify-center">
      <button
        class="mr-2"
        title="back to 10 seconds"
        :disabled="state.currentTime < 10"
        :aria-disabled="state.currentTime < 10"
        @click="skip(-10)"
      >
        <Icon class="text-white" name="fluent:skip-back-10-24-filled" />
      </button>
      <ButtonPlayer
        :value="state.loadedProgress"
        :status="state.status"
        :width="65"
        :height="65"
        :size="4"
        :load="state.loadedProgress < state.currentPosition"
        @click="toggle"
      />
      <button class="ml-2" title="forward to 10 seconds" @click="skip(+10)">
        <Icon class="text-white" name="fluent:skip-forward-10-24-filled" />
      </button>
    </div>

    <Loader v-if="!state.loaded" />

    <div
      v-else
      class="flex flex-wrap w-full text-white sm:translate-y-5 sm:ml-4"
    >
      <div class="flex-1 my-2 text-sm text-center sm:text-left font-headings">
        {{ props.title }}
      </div>
      <TimelinePlayer
        :detail-current-time="detailCurrentTime"
        :detail-duration="detailDuration"
        :duration="state.duration || 0"
        :current-time="state.currentTime"
        :current-position="
          isNaN(state.currentPosition) ? 0 : state.currentPosition
        "
        @update-current-time="updateCurrentTime"
      />
      <div class="flex items-center justify-between w-full">
        <div class="flex">
          <TimerPlayer :current-time="detailCurrentTime" /><span
            class="mx-3 text-xs font-base"
            >//</span
          >
          <TimerPlayer :current-time="detailDuration" />
        </div>

        <SpeedPlayer :speed="state.playbackRate" @change="changeSpeed" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonPlayer from './ButtonPlayer.vue';
import TimelinePlayer from './TimelinePlayer.vue';
import TimerPlayer from './TimerPlayer.vue';
import SpeedPlayer from './SpeedPlayer.vue';
const {trackPlayOnce} = usePlayTracking();

const props = withDefaults(
  defineProps<{
    src?: string | undefined;
    dsSlug?: string | undefined;
    title?: string | undefined;
    status: typeStatusPlayer;
  }>(),
  {
    src: undefined,
    dsSlug: undefined,
    title: undefined,
  },
);

function handleAction() {
  trackPlayOnce(props.dsSlug, props.title);
}

const emit = defineEmits<{
  (e: 'statusChange', status: typeStatusPlayer): void;
}>();

// never change
const type = 'audio/mpeg';

/**
 * Audio element without a Vue template ref. This player sits under Nuxt's
 * root Suspense; Vue 3.5 setRef crashes in production when owner is null.
 */
function getAudio(): HTMLAudioElement | null {
  const el = document.querySelector('.js-player-audio');
  return el instanceof HTMLAudioElement ? el : null;
}

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
} = reactive({
  duration: 0,
  status: 'pause',
  currentTime: 0,
  playbackRate: 1,
  currentPosition: 0,
  loaded: false,
  loadedProgress: 0,
});

/** progress data load */
const load = () => {
  if (!getAudio()) return;
  if (!state.loaded) return;
  // length of buffered
  const c = getAudio()?.buffered.length || 1;
  const totalBuffered = getAudio()?.buffered.end(c - 1);
  state.loadedProgress =
    (totalBuffered / getAudio()?.duration) * 100;
};

const updateDuration = () => {
  state.duration = getAudio()
    ? +getAudio().duration
    : Infinity;
};

/** init player on mounted or when src change */
const initPlayer = (withPlay = false) => {
  if (getAudio() && props.src) {
    state.duration = 0;
    state.currentTime = 0;
    state.currentPosition = 0;
    state.loadedProgress = 0;
    // first load
    getAudio()?.load();
    getAudio().addEventListener('canplay', () => {
      state.loaded = true;
    });
    // update duration
    getAudio().addEventListener('loadedmetadata', updateDuration);
    // update currentTime
    getAudio().addEventListener('timeupdate', () => {
      state.currentTime = getAudio()?.currentTime || 0;
    });

    getAudio().addEventListener('progress', load);
    getAudio().addEventListener('loadedmetadata', load);

    // sound is ended
    getAudio().addEventListener('ended', reset);

    // set play rate
    getAudio().playbackRate = state.playbackRate;

    if (withPlay) {
      toggle();
    }
  }
};

/** reset player */
const resetPlayer = (init = false) => {
  if (getAudio()) {
    // stop
    getAudio().pause();
    getAudio().currentTime = 0;
    state.status = 'pause';
    emit('statusChange', state.status);
    // first load
    getAudio().removeEventListener('canplay', () => {
      state.loaded = true;
    });
    // update duration
    getAudio().removeEventListener(
      'loadedmetadata',
      updateDuration,
    );
    // update currentTime
    getAudio().removeEventListener('timeupdate', () => {
      state.currentTime = getAudio()?.currentTime || 0;
    });
    getAudio().removeEventListener('progress', load);
    getAudio().removeEventListener('loadedmetadata', load);
    // sound is ended
    getAudio().removeEventListener('ended', reset);
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
    (state.currentPosition = getAudio()
      ? (getAudio().currentTime /
          getAudio().duration) *
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
      ? useCalculateTotalValue(state.duration)
      : {hours: 0, seconds: 0, minutes: 0},
);

// get object for currentTime
const detailCurrentTime = computed(
  (): typeDuration =>
    state.currentTime
      ? useCalculateTotalValue(state.currentTime)
      : {hours: 0, seconds: 0, minutes: 0},
);

/** play sound or pause */
const toggle = () => {
  if (state.status === 'pause') {
    handleAction();
    getAudio()?.play();
    state.status = 'play';
  } else {
    getAudio()?.pause();
    state.status = 'pause';
  }

  emit('statusChange', state.status);
};

/** update currentTime from input range */
const updateCurrentTime = (event: Event) => {
  const {currentTarget} = event;
  const audio = getAudio();
  if (!audio || !currentTarget) return;
  const _currentTime =
    (+(currentTarget as HTMLInputElement).value * audio.duration) / 100;
  audio.currentTime = _currentTime;
  state.currentTime = _currentTime;
};

// reset player
const reset = () => {
  toggle();
  state.currentPosition = 0;
  if (getAudio()) {
    getAudio().currentTime = 0;
    state.currentTime = 0;
  }
};

const changeSpeed = (speed: typeSpeedPlayer) => {
  if (!getAudio()) return;
  // set play rate
  state.playbackRate = speed;
  getAudio().playbackRate = speed;
};

const skip = (value: number) => {
  if (!getAudio()) return;
  const to = getAudio().currentTime + value;
  getAudio().currentTime = to > 0 ? to : 0;
};
</script>
