<template>
  <div class="max-w-[400px] m-auto relative">
    <div
      class="absolute top-0 bottom-0 left-0 right-0 w-full bg-gradient-radial from-[#7D459A] to-darkPurple"
    ></div>
    <IconsRows v-for="i in rowCount" :key="i" class="opacity-20" />
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

const rowCount = computed(() => {
  return Math.round(props.height / 55);
});
</script>
