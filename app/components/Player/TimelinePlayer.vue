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
