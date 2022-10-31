<template>
  <svg
    :width="`${size}px`"
    :height="`${size}px`"
    :viewBox="`0 0 ${size} ${size}`"
  >
    <use :href="`#${id}`" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  size: string;
}>();
</script>
