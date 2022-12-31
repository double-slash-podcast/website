<script setup>
const props = defineProps({
  height: {
    type: Number,
    default: 300,
  },
});

// predict height with animated background loaded
const headerHeight = computed(() => {
  // total row icons
  const total = Math.round(props.height / 60);
  // 110px is real size for row
  return `${total * 110}px`;
});
</script>

<template>
  <header
    class="relative grid col-span-1 overflow-hidden bg-darkPurple place-items-center"
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
  </header>
</template>

<style scoped>
/** <LazyAnimateBackground class="col-start-1 row-start-1" :height="height" />*/
header {
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
  height: v-bind('headerHeight');
}
</style>
