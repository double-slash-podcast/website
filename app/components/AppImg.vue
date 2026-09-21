<script setup lang="ts">
/**
 * Cloudinary-backed images via Nuxt Image.
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
    fetchpriority?: 'high' | 'low' | 'auto';
    preload?: boolean;
  }>(),
  {
    loading: 'lazy',
    decoding: 'async',
    preload: false,
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
    :fetchpriority="fetchpriority"
    :preload="preload"
  />
</template>
