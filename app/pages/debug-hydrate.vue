<script setup lang="ts">
/**
 * Staging probe step 7: native dialog without a Vue template ref or Combobox.
 * Opens via getElementById so Vue setRef is not involved.
 */
definePageMeta({
  layout: 'blank',
});

const {isOpen, close} = useSiteSearch();

/**
 * Sync the command-palette flag to a native dialog looked up by id.
 */
function syncById(openState: boolean) {
  const el = document.getElementById(
    'debug-search-dialog',
  ) as HTMLDialogElement | null;
  if (!el) {
    return;
  }
  if (openState && !el.open) {
    el.showModal();
  } else if (!openState && el.open) {
    el.close();
  }
}

watch(isOpen, openState => {
  syncById(openState);
});

useSeoMeta({
  title: 'debug hydrate',
  robots: 'noindex, nofollow',
});
</script>

<template>
  <div>
    <Header />
    <p>debug hydrate — dialog natif sans ref Vue</p>
    <UpButton />
    <dialog
      id="debug-search-dialog"
      class="w-[min(42rem,calc(100vw-2rem))] border-0 bg-dark p-6 text-white"
      @close="close"
    >
      dialog natif sans ref / sans Combobox
    </dialog>
  </div>
</template>
