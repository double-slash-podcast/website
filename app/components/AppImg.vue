<script setup lang="ts">
/**
 * Cloudinary-backed images via NuxtImg.
 * @nuxt/image is patched (see patches/@nuxt__image@2.1.0.patch):
 * useTemplateRef('imgEl') throws during Vue 3.5 production SSR, and a
 * template ref on <img> crashes setRef under Nuxt Suspense (null owner).
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
