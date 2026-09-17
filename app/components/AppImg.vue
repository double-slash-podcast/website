<script setup lang="ts">
/**
 * Cloudinary-backed images via NuxtImg.
 * @nuxt/image is patched: useTemplateRef('imgEl') throws
 * `Cannot redefine property: imgEl` during Vue 3.5 production SSR
 * and fails `nuxi generate` (see patches/@nuxt__image@2.1.0.patch).
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
