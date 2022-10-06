<template>
  <div class="min-h-screen bg-haiti">
    <div class="pb-12">
      <slot />
    </div>
    <div class="fixed bottom-0 left-0 right-0 bg-darkPurple">
      <LazyWrapperPlayer />
    </div>
  </div>
</template>

<script setup>
import LazyWrapperPlayer from '~/components/Player/WrapperPlayer.vue';
</script>
