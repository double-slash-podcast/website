<template>
  <div class="max-w-[100vw] md:max-w-100 m-auto">
    <div
      class="absolute top-0 bottom-0 left-0 right-0 w-full bg-radial from-[#7D459A] to-dark"
    />
    <ClientOnly>
      <IconsRows
        v-for="i in rowCount"
        :key="i"
        :is-first="i === 1"
        class="opacity-20"
      />
    </ClientOnly>
    <div
      class="absolute top-0 bottom-0 left-0 right-0 bg-linear-to-r from-dark to-dark via-transparent"
    />
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
  return Math.round(props.height / 60);
});
</script>
