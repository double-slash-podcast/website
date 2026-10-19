<script setup lang="ts">
/**
 * Cloudinary-backed images via Nuxt Image.
 * Author aspect-ratio keeps a layout box before the file loads. The
 * user-agent hint is `aspect-ratio: auto W / H`, which Chrome treats as
 * a zero-size lazy image.
 */
const props = withDefaults(
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

const aspectRatio = computed(() => {
  if (
    props.width == null ||
    props.height == null ||
    props.width === '' ||
    props.height === ''
  ) {
    return undefined;
  }
  return `${props.width} / ${props.height}`;
});
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
    :style="aspectRatio ? {aspectRatio} : undefined"
  />
</template>
