<template>
  <div class="min-h-screen bg-haiti">
    <slot />
    <div class="bg-darkPurple">
      <LazyWrapperPlayer />
    </div>
  </div>
</template>

<script setup>
import LazyWrapperPlayer from '~~/components/Player/WrapperPlayer.vue';
</script>
