<script setup lang="ts">
defineProps<{
  name: string;
  size: number;
  classes: string;
}>();
</script>
<template>
  <span
    :style="`min-width: ${size}px;min-height: ${size}px;background-image:url(${name});`"
    :class="`flex bg-no-repeat bg-contain ${classes}`"
  ></span>
</template>
