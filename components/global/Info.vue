<script setup lang="ts">
withDefaults(
  defineProps<{
    type: 'info' | 'warning' | 'danger';
  }>(),
  {type: 'info'},
);
</script>

<template>
  <div
    class="p-4 rounded-lg info-block"
    :class="{
      'bg-blue-100': type === 'info',
      'bg-orange-100': type === 'warning',
      'bg-red-100': type === 'danger',
    }"
  >
    <slot />
  </div>
</template>
