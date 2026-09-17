<script setup lang="ts">
/**
 * Navbar search trigger. Lives outside the animated link row so the
 * underline does not treat it as a nav link. Shortcut label waits for
 * mount to avoid a Mac/Windows hydration mismatch.
 */
const {open} = useSiteSearch();

const shortcutLabel = ref('');

onMounted(() => {
  shortcutLabel.value = /Mac|iPhone|iPad/.test(
    navigator.userAgent || navigator.platform,
  )
    ? '⌘K'
    : 'Ctrl+K';
});
</script>

<template>
  <button
    type="button"
    class="z-10 flex cursor-pointer items-center gap-1.5 rounded-md px-2 pt-4 pb-2 text-white hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    aria-label="Rechercher sur le site"
    aria-keyshortcuts="Control+K Meta+K"
    @click="open"
  >
    <Icon name="material-symbols:search" class="w-6 h-6" aria-hidden="true" />
    <kbd
      v-if="shortcutLabel"
      class="hidden md:inline px-1.5 py-0.5 text-[10px] font-sans font-medium tracking-wide uppercase border rounded-sm border-primary/50 text-primary"
    >
      {{ shortcutLabel }}
    </kbd>
  </button>
</template>
