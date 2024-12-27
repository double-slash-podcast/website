<script setup lang="ts">
import {debounce} from 'throttle-debounce';

const header = ref();
const headerHeight = ref();

const updateHeaderHeight = () => {
  headerHeight.value = header.value.getBoundingClientRect().height;
};

onMounted(async () => {
  // only client side
  await nextTick();
  updateHeaderHeight();
  // resize window
  window.addEventListener('resize', debounce(300, updateHeaderHeight));
});

onUnmounted(() => {
  window.removeEventListener('resize', debounce(300, updateHeaderHeight));
});
</script>

<template>
  <header
    class="relative flex flex-col items-center gap-20 pb-20 overflow-hidden bg-darkPurple"
    ref="header"
  >
    <Navbar />
    <div class="z-10 flex flex-col justify-center">
      <!-- titre -->
      <slot name="title">
        <Brand />
      </slot>
      <!-- baseline -->
      <slot name="baseline"></slot>
    </div>
    <!-- player -->
    <slot name="player"></slot>
    <LazyAnimateBackground
      class="absolute top-0 left-[50%] -translate-x-1/2"
      :height="headerHeight"
    />
  </header>
</template>

<style scoped>
header {
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
}
</style>
