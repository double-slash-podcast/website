<script setup lang="ts">
/**
 * Staging probe step 3: blank layout + Header + UpButton.
 * Player and SearchModal stay out.
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
  <div>
    <Header />
    <p>debug hydrate — Header + UpButton</p>
    <UpButton />
  </div>
</template>
