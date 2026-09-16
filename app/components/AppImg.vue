<script setup lang="ts">
/**
 * Cloudinary-backed <img> via useImage(), without NuxtImg.
 * NuxtImg's useTemplateRef('imgEl') throws during Vue 3.5 production SSR
 * (`Cannot redefine property: imgEl`) and fails `nuxi generate`.
 */
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

/**
 * Parse a width/height that may be a number or a string with a `px` suffix.
 */
function toPx(value?: number | string): number | undefined {
  if (value === undefined || value === '') return undefined;
  const parsed =
    typeof value === 'number' ? value : Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}
</script>

<template>
  <img
    :src="resolvedSrc"
    :alt="alt"
    :width="widthPx"
    :height="heightPx"
    :loading="loading"
    :decoding="decoding"
  />
</template>
