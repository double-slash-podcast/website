<script setup>
const props = defineProps({
  height: {
    type: Number,
    default: 300,
  },
  heightMobile: {
    type: Number,
    default: 700,
  },
});

// predict height with animated background loaded
const headerHeight = computed(() => {
  // total row icons
  const total = Math.round(props.height / 60);
  // 110px is real size for row
  return `${total * 110}px`;
});

const headerHeightMobile = computed(() => {
  // total row icons
  const total = Math.round(props.heightMobile / 60);
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
    <LazyAnimateBackground class="col-start-1 row-start-1" :height="height" />
  </header>
</template>

<style scoped>
header {
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
  /* height: v-bind('headerHeight'); */
}
@media screen and (max-width: 640px) {
  header {
    /* height: v-bind('headerHeightMobile'); */
  }
}
</style>
