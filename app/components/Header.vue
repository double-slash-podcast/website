<script setup lang="ts">
// Multi-root component: bind fallthrough attrs to <header>, not the fragment
defineOptions({inheritAttrs: false});

/**
 * Static fill height for decorative icon rows. Measuring the header on mount
 * updated this lazy island before hydration and skipped hydrate-on-idle.
 * Overflow is clipped by the header.
 */
const BACKGROUND_HEIGHT = 960;
</script>

<template>
  <Navbar />
  <header
    v-bind="$attrs"
    class="relative z-10 pt-33 flex flex-col items-center gap-20 pb-20 overflow-hidden bg-dark"
  >
    <div
      class="flex flex-col justify-center w-full md:max-w-3xl max-w-[calc(100vw-2rem)]"
    >
      <!-- Title -->
      <slot name="title">
        <Brand />
      </slot>
      <!-- Baseline -->
      <slot name="baseline" />
    </div>
    <!-- Player -->
    <slot name="player" />
    <!-- <AnimateBackground
      hydrate-on-idle
      class="absolute top-0 left-[50%] -translate-x-1/2"
      :height="BACKGROUND_HEIGHT"
    /> -->
  </header>
</template>

<style scoped>
@reference "../assets/main.css";
header {
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
}
</style>
