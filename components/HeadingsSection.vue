<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  dark: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <section class="max-w-3xl m-auto my-8">
    <h3
      class="mb-4 text-2xl text-center text-white"
      :class="{'text-haiti': dark}"
    >
      {{ title }}
    </h3>
    <slot />
  </section>
</template>
