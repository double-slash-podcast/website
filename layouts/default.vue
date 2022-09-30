<template>
  <div class="min-h-screen bg-haiti">
    <slot />
    <div class="w-1/2 bg-gray-200">
      <LazyWrapperPlayer />
    </div>
  </div>
</template>

<script setup>
import LazyWrapperPlayer from '~~/components/Player/WrapperPlayer.vue';
</script>
