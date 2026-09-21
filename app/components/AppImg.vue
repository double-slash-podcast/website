<script setup lang="ts">
/**
 * Cloudinary-backed images via a native img tag.
 */
withDefaults(
  defineProps<{
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    sizes?: string;
    densities?: string;
    loading?: 'lazy' | 'eager';
    decoding?: 'async' | 'auto' | 'sync';
  }>(),
  {
    loading: 'lazy',
    decoding: 'async',
  },
);
</script>

<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :sizes="sizes"
    :densities="densities"
    :loading="loading"
    :decoding="decoding"
  />
</template>
