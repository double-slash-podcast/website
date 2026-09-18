<script setup lang="ts">
/**
 * Staging probe: empty layout, no Header/Player/UpButton.
 * If this page still throws setRef, the crash is above the layout
 * (plugins, app wrapper, Nuxt internals).
 */
definePageMeta({
  layout: 'blank',
});

useSeoMeta({
  title: 'debug hydrate',
  robots: 'noindex, nofollow',
});
</script>

<template>
  <p>debug hydrate — layout vide</p>
</template>
