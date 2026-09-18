<script setup lang="ts">
/**
 * Staging probe: Header + UpButton + real SearchModal (native dialog).
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
    <p>debug hydrate — Header + UpButton + SearchModal native</p>
    <UpButton />
    <ClientOnly>
      <SearchModal />
    </ClientOnly>
  </div>
</template>
