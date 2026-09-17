<script setup lang="ts">
/**
 * Cloudinary-backed <img> via useImage(), with NuxtImg-like 1x/2x srcset.
 * NuxtImg itself cannot be used: `useTemplateRef('imgEl')` throws during
 * Vue 3.5 production SSR (`Cannot redefine property: imgEl`) and fails
 * `nuxi generate`.
 */
import {buildDensitySrcset, toPx} from '~/utils/appImg';

const props = withDefaults(
  defineProps<{
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    loading?: 'lazy' | 'eager';
    decoding?: 'async' | 'auto' | 'sync';
  }>(),
  {
    loading: 'lazy',
    decoding: 'async',
  },
);

const img = useImage();

const widthPx = computed(() => toPx(props.width));
const heightPx = computed(() => toPx(props.height));

const resolvedSrc = computed(() =>
  img(props.src, {
    width: widthPx.value,
    height: heightPx.value,
  }),
);

const srcset = computed(() =>
  buildDensitySrcset(
    (width, height) => img(props.src, {width, height}),
    widthPx.value,
    heightPx.value,
  ),
);
</script>

<template>
  <img
    :src="resolvedSrc"
    :srcset="srcset"
    :alt="alt"
    :width="widthPx"
    :height="heightPx"
    :loading="loading"
    :decoding="decoding"
  />
</template>
