<script setup lang="ts">
/**
 * Staging probe step 8: native dialog with a Vue template ref, still no Combobox.
 */
definePageMeta({
  layout: 'blank',
});

const {isOpen, close} = useSiteSearch();
const dialogEl = ref<HTMLDialogElement | null>(null);

/**
 * Open or close the dialog via the template ref (Vue setRef path).
 */
function syncDialog(openState: boolean) {
  const el = dialogEl.value;
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
  syncDialog(openState);
});

useSeoMeta({
  title: 'debug hydrate',
  robots: 'noindex, nofollow',
});
</script>

<template>
  <div>
    <Header />
    <p>debug hydrate — dialog natif + ref Vue</p>
    <UpButton />
    <dialog
      ref="dialogEl"
      class="w-[min(42rem,calc(100vw-2rem))] border-0 bg-dark p-6 text-white"
      @close="close"
    >
      dialog natif avec ref Vue, sans Combobox
    </dialog>
  </div>
</template>
