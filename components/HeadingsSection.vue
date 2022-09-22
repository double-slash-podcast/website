<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="max-w-3xl m-auto mt-4 mb-16">
    <h3 class="mb-4 text-2xl text-center text-white">{{ title }}</h3>
    <slot />
  </div>
</template>
