<script setup lang="ts">
defineProps<{
  name: string;
  size: number;
  classes: string;
}>();
</script>
<template>
  <img
    :src="name"
    :width="`${size}`"
    :height="`${size}`"
    :style="`min-width:${size}px;min-height:${size}px;`"
    :class="`${classes}`"
    loading="async"
    decoding="async"
  />
</template>
