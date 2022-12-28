<template>
  <div>
    <div class="relative flex space-x-2 overflow-hidden select-none">
      <ul
        :style="`height: ${size}px`"
        :class="`flex min-w-full space-x-4 shrink-0 animate-slideLeft1 items-center`"
      >
        <li v-for="logo in shuffleLogos" :key="logo">
          <IconImg :name="logo" :size="size * 0.9" classes="grayscale icon" />
        </li>
      </ul>
      <ul
        class="absolute top-0 flex min-w-full space-x-2 shrink-0 animate-slideLeft2"
      >
        <li v-for="logo in shuffleLogos" :key="logo">
          <IconImg :name="logo" :size="size * 0.9" classes="grayscale icon" />
        </li>
      </ul>
    </div>
    <!-- 2 eme ligne -->
    <div class="relative flex space-x-2 overflow-hidden select-none">
      <ul
        :class="`flex min-w-full space-x-4 shrink-0 animate-slideRight1`"
        :style="`height: ${size}px`"
      >
        <li v-for="logo in shuffleLogos" :key="logo">
          <IconImg :name="logo" :size="size * 0.9" classes="grayscale icon" />
        </li>
      </ul>
      <ul
        class="absolute top-0 flex min-w-full space-x-2 shrink-0 animate-slideRight2"
      >
        <li v-for="logo in shuffleLogos" :key="logo">
          <IconImg :name="logo" :size="size * 0.9" classes="grayscale icon" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icons?: string[];
  size: number;
}>();

const shuffleLogos = computed(() => {
  return props.icons ? [...props.icons].sort(() => Math.random() - 0.5) : [];
});
</script>
