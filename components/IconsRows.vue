<template>
  <div>
    <div class="relative flex space-x-2 overflow-hidden select-none">
      <ul
        class="flex h-[55px] min-w-full space-x-4 shrink-0 animate-slideLeft1"
      >
        <li v-for="logo in shuffleLogos" :key="logo">
          <IconImg :name="logo" size="40" classes="grayscale icon" />
        </li>
      </ul>
      <ul
        class="absolute top-0 flex min-w-full space-x-2 shrink-0 animate-slideLeft2"
      >
        <li v-for="logo in shuffleLogos" :key="logo">
          <IconImg :name="logo" size="40" classes="grayscale icon" />
        </li>
      </ul>
    </div>
    <!-- 2 eme ligne -->
    <div class="relative flex space-x-2 overflow-hidden select-none">
      <ul
        class="flex h-[55px] min-w-full space-x-4 shrink-0 animate-slideRight1"
      >
        <li v-for="logo in shuffleLogos" :key="logo">
          <IconImg :name="logo" size="40" classes="grayscale icon" />
        </li>
      </ul>
      <ul
        class="absolute top-0 flex min-w-full space-x-2 shrink-0 animate-slideRight2"
      >
        <li v-for="logo in shuffleLogos" :key="logo">
          <IconImg :name="logo" size="40" classes="grayscale icon" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icons?: string[];
}>();

const shuffleLogos = computed(() => {
  return props.icons ? [...props.icons].sort(() => Math.random() - 0.5) : [];
});
</script>
