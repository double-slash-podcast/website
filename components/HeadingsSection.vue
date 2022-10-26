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
  level: {
    type: String,
    default: '3',
  },
});
</script>
<template>
  <section class="max-w-3xl m-auto my-8">
    <div class="max-w-3xl m-auto my-8 mb-4 text-2xl text-center text-white">
      <component
        :is="`h${level}`"
        class="tracking-tight font-headings"
        :class="{'text-haiti': dark}"
      >
        {{ title }}
      </component>
      <slot />
    </div>
  </section>
</template>
