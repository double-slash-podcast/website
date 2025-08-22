<template>
  <div class="wrapper-range">
    <input
      :value="props.currentPosition"
      aria-label="Seek"
      type="range"
      autocomplete="off"
      role="slider"
      step="0.01"
      min="0"
      max="100"
      aria-valuemin="0"
      :aria-valuemax="props.duration"
      :aria-valuenow="props.currentTime"
      :aria-valuetext="`${$formatTime(detailCurrentTime.hours)}:${$formatTime(
        detailCurrentTime.minutes,
      )}:${$formatTime(detailCurrentTime.seconds)} of ${$formatTime(
        detailDuration.hours,
      )}:${$formatTime(detailDuration.minutes)}:${$formatTime(
        detailDuration.seconds,
      )}`"
      :seek-value="props.currentPosition"
      @input.stop="event => $emit('updateCurrentTime', event)"
    />
    <progress
      min="0"
      :value="
        // fix little space on first part
        props.currentPosition < 50 && props.currentPosition !== 0
          ? props.currentPosition + 1
          : props.currentPosition
      "
      max="100"
      class="progress-bar"
      role="progressbar"
      aria-hidden="true"
    />
  </div>
</template>

<script setup lang="ts">
defineEmits(['updateCurrentTime']);

const props = defineProps<{
  currentPosition: number;
  currentTime: number;
  duration: number;
  detailDuration: typeDuration;
  detailCurrentTime: typeDuration;
}>();
</script>

<style scoped>
.wrapper-range {
  @apply w-full relative h-4 m-0 p-0;
}
/** progress bar */
.progress-bar {
  @apply appearance-none border-none rounded-full h-1 m-0 p-0 absolute top-[0%] bg-purpleDs w-full focus:outline-none;
}

::-webkit-progress-bar {
  @apply bg-purpleDs rounded-full h-1;
}

::-webkit-progress-value {
  @apply bg-yellowDs rounded-full h-2 relative -top-0.5 py-1;
}

::-moz-progress-bar {
  @apply bg-yellowDs rounded-full h-2 relative -mt-0.5;
}

/** range */

input[type='range'] {
  @apply appearance-none bg-left-top border-none rounded-full text-purpleDs h-1 m-0 p-0 w-full bg-transparent absolute top-[0%] z-10 focus:outline-none block transition-shadow cursor-pointer;
}

/* the track */
::-webkit-slider-runnable-track {
  @apply trackTimeline;
}

/* the thumb */
::-webkit-slider-thumb {
  @apply thumbTimeline -mt-0.5;
}

/* Mozilla */
::-moz-range-track {
  @apply trackTimeline;
}

::-moz-range-thumb {
  @apply thumbTimeline;
}

/* Microsoft */
::-ms-fill-upper,
::-ms-fill-lower,
::-ms-track {
  @apply trackTimeline;
}

::-ms-thumb {
  @apply thumbTimeline;
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
