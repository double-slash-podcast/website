<script setup lang="ts">
/**
 * Staging probe step 4: blank layout + Header + UpButton + SearchModal.
 * Player stays out.
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
    <p>debug hydrate — Header + UpButton + SearchModal</p>
    <UpButton />
    <ClientOnly>
      <SearchModal />
    </ClientOnly>
  </div>
</template>
