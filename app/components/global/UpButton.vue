<script setup lang="ts">
/**
 * Scroll-to-top control with a circular progress ring.
 * Template refs are unsafe under Nuxt's root Suspense: Vue 3.5 setRef
 * reads owner.refs while owner is still null in production.
 */
const size = 2;
const mobileSize = 46;
const desktopSize = 54;

const store = usePlayerStore();
const route = useRoute();
const instance = getCurrentInstance();

const scrollHeight = ref(0);
const vh = ref(0);
const showCircle = ref(false);
const mq = ref<MediaQueryList | null>(null);
const isMobile = ref(false);

/**
 * Root element of the control, without a Vue template ref.
 */
function getWrapper(): HTMLElement | null {
  const el = instance?.vnode.el;
  return el instanceof HTMLElement ? el : null;
}

/**
 * Progress ring SVG inside the control.
 */
function getProgressSvg(): SVGElement | null {
  const svg = getWrapper()?.querySelector('svg');
  return svg instanceof SVGElement ? svg : null;
}

/**
 * Foreground circle whose dashoffset tracks scroll progress.
 */
function getProgressCircle(): SVGCircleElement | null {
  const circle = getProgressSvg()?.querySelector('circle:last-child');
  return circle instanceof SVGCircleElement ? circle : null;
}

onMounted(() => {
  scrollHeight.value = document.body.scrollHeight - window.innerHeight;
  vh.value = window.innerHeight;
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onResize);

  mq.value = window.matchMedia('(max-width: 640px)');
  mq.value.addEventListener('change', e => {
    isMobile.value = e.matches;
  });
  isMobile.value = mq.value.matches;
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
  mq.value?.removeEventListener('change', e => {
    isMobile.value = e.matches;
  });
  mq.value = null;
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
      getWrapper()
    ) {
      showCircle.value = true;
    } else if (getWrapper()) {
      showCircle.value = false;
    }

    const progress = getProgressCircle();
    if (progress) {
      progress.style.strokeDashoffset =
        scrollPosition > 99.9999 ? '0' : `${100 - scrollPosition}`;
    }
  });

const upToTop = () =>
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

const getSize = computed(() => {
  if (isMobile.value) {
    return mobileSize;
  }
  return desktopSize;
});
</script>

<template>
  <div
    class="fixed z-100 md:bottom-4 right-3 flex items-center justify-center transition-opacity duration-500 ease-in-out"
    :class="{
      'bottom-30 sm:bottom-20': store.src,
      'bottom-4': !store.src,
      'opacity-0': !showCircle,
      'opacity-100': showCircle,
    }"
  >
    <svg
      :width="`${getSize}px`"
      :height="`${getSize}px`"
      :viewBox="`0 0 ${getSize} ${getSize}`"
    >
      <circle
        :cx="getSize / 2"
        :cy="getSize / 2"
        :r="getSize / 2 - size - 0.2"
        fill="none"
        :stroke-width="size"
      />
      <circle
        :cx="getSize / 2"
        :cy="getSize / 2"
        :r="getSize / 2 - size - 0.2"
        fill="none"
        :stroke-width="size"
        stroke-dashoffset="0"
        pathLength="100"
      />
    </svg>
    <button
      class="text-purple-800 bg-primary relative rounded-full p-2 w-10 h-10 sm:w-12 sm:h-12 rotate-90 up-button flex justify-center items-center cursor-pointer"
      aria-label="remonter en haut de la page"
      @click="upToTop"
    >
      <Icon name="ic:outline-arrow-upward" class="w-7 h-7 sm:w-9 sm:h-9" />
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
