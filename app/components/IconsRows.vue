<script setup lang="ts">
import stripA from '~/assets/logo-strips/strip-a.svg?url';
import stripB from '~/assets/logo-strips/strip-b.svg?url';
import stripC from '~/assets/logo-strips/strip-c.svg?url';

const STRIPS = [stripA, stripB, stripC] as const;

/**
 * Native strip size from scripts/build-logo-strips.ts (34 logos × 64px − 16px gap).
 */
const STRIP_WIDTH = 2160;
const STRIP_HEIGHT = 48;

const props = defineProps({
  /**
   * Cycles a/b/c so stacked marquees do not share the same shuffle.
   */
  variant: {
    type: Number,
    default: 0,
  },
});

const src = computed(() => {
  return STRIPS[props.variant % STRIPS.length] ?? stripA;
});
</script>

<template>
  <div aria-hidden="true">
    <div class="relative flex gap-8 overflow-hidden select-none">
      <img
        :src="src"
        alt=""
        :width="STRIP_WIDTH"
        :height="STRIP_HEIGHT"
        decoding="async"
        draggable="false"
        class="mb-2 h-12 w-[2160px] max-w-none shrink-0 animate-slideLeft1 grayscale"
      />
      <img
        :src="src"
        alt=""
        :width="STRIP_WIDTH"
        :height="STRIP_HEIGHT"
        decoding="async"
        draggable="false"
        class="absolute top-0 mb-2 h-12 w-[2160px] max-w-none shrink-0 animate-slideLeft2 grayscale"
      />
    </div>
    <div class="relative flex gap-4 overflow-hidden select-none">
      <img
        :src="src"
        alt=""
        :width="STRIP_WIDTH"
        :height="STRIP_HEIGHT"
        decoding="async"
        draggable="false"
        class="mb-2 h-12 w-[2160px] max-w-none shrink-0 animate-slideRight1 grayscale"
      />
      <img
        :src="src"
        alt=""
        :width="STRIP_WIDTH"
        :height="STRIP_HEIGHT"
        decoding="async"
        draggable="false"
        class="absolute top-0 mb-2 h-12 w-[2160px] max-w-none shrink-0 animate-slideRight2 grayscale"
      />
    </div>
  </div>
</template>
