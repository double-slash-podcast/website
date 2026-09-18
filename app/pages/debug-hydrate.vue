<script setup lang="ts">
/**
 * Staging probe step 5: same chrome as step 4, but SearchModal is a plain
 * v-if panel. Isolates Headless UI Dialog/Combobox from useSiteSearch.open().
 */
definePageMeta({
  layout: 'blank',
});

const {isOpen, close} = useSiteSearch();

useSeoMeta({
  title: 'debug hydrate',
  robots: 'noindex, nofollow',
});
</script>

<template>
  <div>
    <Header />
    <p>debug hydrate — Header + UpButton + search stub</p>
    <UpButton />
    <div
      v-if="isOpen"
      class="fixed inset-0 z-60 bg-haiti/85 p-8 text-white"
      @click="close"
    >
      search stub (pas Headless UI)
    </div>
  </div>
</template>
