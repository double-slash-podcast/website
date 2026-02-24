<script setup lang="ts">
const route = useRoute();

// get height of total scroll
const scrollHeight = ref(0);
// viewport height
const vh = ref(0);
const showCircle = ref(false);

const circleWrapper = ref<HTMLDivElement | null>(null);
const circle = ref<HTMLDivElement | null>(null);
const progressCircle = ref<SVGElement | null>(null);

const {
  width = 60,
  height = 60,
  size = 4,
} = defineProps<{
  width?: number;
  height?: number;
  size?: number;
}>();

onMounted(() => {
  scrollHeight.value = document.body.scrollHeight - window.innerHeight;
  vh.value = window.innerHeight;
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onResize);
});

watch(
  () => route.fullPath,
  () => {
    onResize();
  },
);

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onResize);
});

const onResize = () =>
  window.requestAnimationFrame(() => {
    scrollHeight.value = document.body.scrollHeight - window.innerHeight;
    vh.value = window.innerHeight;
  });

const onScroll = () =>
  window.requestAnimationFrame(() => {
    const scrollPosition = Math.round(
      (window.scrollY / scrollHeight.value) * 100,
    );
    if (
      scrollHeight.value > vh.value &&
      window.scrollY > vh.value &&
      circleWrapper.value
    ) {
      showCircle.value = true;
    } else if (circleWrapper?.value) {
      showCircle.value = false;
    }

    if (progressCircle?.value && circle.value) {
      circle.value.style.strokeDashoffset =
        scrollPosition > 99.9999 ? '0' : `${100 - scrollPosition}`;
    }
  });

const upToTop = () =>
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
</script>

<template>
  <div
    ref="circleWrapper"
    class="fixed z-100 md:bottom-2 bottom-26 right-2 flex items-center justify-center transition-opacity duration-500 ease-in-out"
    :class="{
      'opacity-0': !showCircle,
      'opacity-100': showCircle,
    }"
    :style="{width: `${width}px`, height: `${height}px`}"
  >
    <svg
      ref="progressCircle"
      :width="`${width}px`"
      :height="`${height}px`"
      :viewBox="`0 0 ${width} ${height}`"
    >
      <circle
        :cx="width / 2"
        :cy="width / 2"
        :r="width / 2 - size - 0.2"
        fill="none"
        :stroke-width="size"
      />
      <circle
        ref="circle"
        :cx="width / 2"
        :cy="width / 2"
        :r="width / 2 - size - 0.2"
        fill="none"
        :stroke-width="size"
        stroke-dashoffset="0"
        pathLength="100"
      />
    </svg>
    <button
      class="text-purple-800 bg-primary relative rounded-full p-2 w-12 h-12 rotate-90 up-button flex justify-center items-center cursor-pointer"
      aria-label="remonter en haut de la page"
      @click="upToTop"
    >
      <Icon name="ic:outline-arrow-upward" class="w-9 h-9" />
    </button>
  </div>
</template>

<style scoped>
@reference '../../assets/main.css';
svg {
  @apply -rotate-90 absolute;
}

svg circle:first-child {
  @apply stroke-gray-200;
}

svg circle:last-child {
  @apply stroke-purple-800;
  stroke-dasharray: 100;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 0.1s linear;
}
</style>
