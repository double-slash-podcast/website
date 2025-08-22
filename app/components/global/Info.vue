<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'info' | 'warning' | 'danger';
  }>(),
  {type: 'info'},
);
</script>

<template>
  <div
    class="p-4 border rounded-lg info-block"
    :class="{
      'bg-blue-100 border-blue-200': type === 'info',
      'bg-orange-100 border-orange-200': type === 'warning',
      'bg-red-100 border-red-200': type === 'danger',
    }"
  >
    <slot />
  </div>
</template>
