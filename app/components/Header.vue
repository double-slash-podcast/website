<script setup lang="ts">
import {debounce} from 'throttle-debounce';

const header = ref();
const headerHeight = ref();

const updateHeaderHeight = () => {
  if (!header.value) return;
  headerHeight.value = header.value?.getBoundingClientRect().height || 0;
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
  <Navbar />
  <header
    ref="header"
    class="relative z-10 pt-33 flex flex-col items-center gap-20 pb-20 overflow-hidden bg-dark"
  >
    <div
      class="flex flex-col justify-center w-full md:max-w-3xl max-w-[calc(100vw - 2rem)]"
    >
      <!-- titre -->
      <slot name="title">
        <Brand />
      </slot>
      <!-- baseline -->
      <slot name="baseline" />
    </div>
    <!-- player -->
    <slot name="player" />
    <LazyAnimateBackground
      class="absolute top-0 left-[50%] -translate-x-1/2"
      :height="headerHeight"
    />
  </header>
</template>

<style scoped>
@reference "../assets/main.css";
header {
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
}
</style>
