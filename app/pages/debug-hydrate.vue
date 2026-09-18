<script setup lang="ts">
/**
 * Staging probe step 2: blank layout + Header only (Navbar, Brand,
 * LazyAnimateBackground). Player, UpButton and SearchModal stay out.
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
    <p>debug hydrate — Header only</p>
  </div>
</template>
