<script setup lang="ts">
/**
 * Defer SearchModal until the first open so its CSS/JS stay off first paint.
 * Owns Cmd/Ctrl+K so the shortcut still works before the dialog is mounted.
 */
import {bindSearchModalRender} from '~/utils/searchModalLatch';
import {isTypingTarget} from '~/utils/siteSearchKeys';

const SearchModal = defineAsyncComponent(
  () => import('~/components/SearchModal.vue'),
);

const {isOpen, open} = useSiteSearch();
const shouldRender = bindSearchModalRender(isOpen);

/**
 * Keyboard shortcut: Cmd/Ctrl+K opens the palette unless a field has focus.
 */
function onGlobalKeydown(event: KeyboardEvent) {
  if (event.repeat || event.key.toLowerCase() !== 'k') {
    return;
  }
  if (!event.metaKey && !event.ctrlKey) {
    return;
  }
  if (isTypingTarget(event.target) && !isOpen.value) {
    return;
  }

  event.preventDefault();
  open();
}

onMounted(() => {
  window.addEventListener('keydown', onGlobalKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKeydown);
});
</script>

<template>
  <SearchModal v-if="shouldRender" />
</template>
