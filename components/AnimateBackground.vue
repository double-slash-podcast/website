<template>
  <div class="max-w-[100vw] md:max-w-[400px] m-auto relative">
    <div
      class="absolute top-0 bottom-0 left-0 right-0 w-full bg-gradient-radial from-[#7D459A] to-darkPurple"
    ></div>
    <ClientOnly>
      <span v-if="showSVG">
        <IconsRows
          v-for="i in rowCount"
          :key="i"
          :is-first="i === 1"
          class="opacity-20"
        />
      </span>
    </ClientOnly>
    <div
      class="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-darkPurple to-darkPurple via-transparent"
    ></div>
  </div>
</template>
<script setup>
const props = defineProps({
  height: {
    type: Number,
    default: 300,
  },
});

const showSVG = ref(false);

onMounted(() => setTimeout(() => (showSVG.value = true), 1000));

const rowCount = computed(() => {
  return Math.round(props.height / 60);
});
</script>
