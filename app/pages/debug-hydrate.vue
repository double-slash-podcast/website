<script setup lang="ts">
/**
 * Staging probe step 6: Headless UI Dialog only (no Combobox).
 */
import {Dialog, DialogPanel, DialogTitle} from '@headlessui/vue';

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
    <p>debug hydrate — Header + UpButton + Dialog only</p>
    <UpButton />
    <ClientOnly>
      <Dialog :open="isOpen" class="relative z-60" @close="close">
        <div class="fixed inset-0 bg-haiti/85" aria-hidden="true" />
        <div class="fixed inset-0 overflow-y-auto p-4 pt-[12vh]">
          <DialogPanel
            class="mx-auto w-full max-w-2xl overflow-hidden rounded-lg bg-dark p-6 text-white"
          >
            <DialogTitle>Dialog only (pas Combobox)</DialogTitle>
          </DialogPanel>
        </div>
      </Dialog>
    </ClientOnly>
  </div>
</template>
