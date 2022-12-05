<script setup lang="ts">
const {
  $config: {
    public: {siteUrl},
  },
} = useNuxtApp();

withDefaults(
  defineProps<{
    src: string;
    alt: string;
    width?: string;
    height?: string;
    align?: 'left' | 'right' | 'center';
  }>(),
  {align: 'left', width: undefined, height: undefined},
);
</script>

<template>
  <nuxt-img
    :src="`${siteUrl}${src}`"
    :alt="alt"
    :width="width"
    :height="height"
    loading="lazy"
    decoding="async"
    :class="{
      'mx-auto': align === 'center',
      'ml-auto': align === 'right',
    }"
  />
</template>
