<script setup lang="ts">
defineProps<{
  name: string;
  size: number;
  classes: string;
}>();
</script>
<template>
  <span
    :style="`width: ${size}px;height: ${size}px;background-image:url(${name});`"
    :class="`block bg-no-repeat bg-contain ${classes}`"
  ></span>
</template>
