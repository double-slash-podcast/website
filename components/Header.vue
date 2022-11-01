<script setup>
defineProps({
  height: {
    type: Number,
    default: 300,
  },
});
</script>

<template>
  <header
    class="relative grid col-span-1 overflow-hidden bg-darkPurple place-items-center"
    :class="`h-[${height}px]`"
  >
    <Navbar />
    <div class="z-10 col-start-1 row-start-1">
      <!-- titre -->
      <slot name="title">
        <Brand />
      </slot>
      <!-- baseline -->
      <slot name="baseline"></slot>
    </div>
    <!-- player -->
    <slot name="player"></slot>
    <LazyAnimateBackground class="col-start-1 row-start-1" :height="height" />
  </header>
</template>

<style scoped>
header {
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
}
</style>
