<template>
  <strong class="text-xs font-base">
    {{ $formatTime(props.currentTime.hours) }}:{{
      $formatTime(props.currentTime.minutes)
    }}:{{ $formatTime(props.currentTime.seconds) }}
  </strong>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentTime: typeDuration;
}>();
</script>
