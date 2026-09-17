<script setup lang="ts">
const props = defineProps<{
  duration?: number;
}>();

const hours = computed(() =>
  props.duration ? Math.floor(props.duration / 3600) : 0,
);
const minutes = computed(() =>
  props.duration
    ? Math.floor((props.duration - 3600 * hours.value) / 60)
    : 0,
);
const seconds = computed(() =>
  props.duration
    ? Math.floor(props.duration - 3600 * hours.value - minutes.value * 60)
    : 0,
);
</script>

<template>
  <span v-if="duration" class="font-light text-primary">
    <span v-show="hours > 0">{{ hours }}h</span>
    {{ minutes.toString().padStart(2, '0') }}mn
    {{ seconds.toString().padStart(2, '0') }}s
  </span>
  <span v-else class="font-light text-primary">--</span>
</template>
