<template>
  <div class="min-h-screen bg-haiti">
    <slot />
    <div class="bg-gray-200/30">
      <LazyWrapperPlayer />
    </div>
  </div>
</template>

<script setup>
import LazyWrapperPlayer from '~~/components/Player/WrapperPlayer.vue';
</script>
