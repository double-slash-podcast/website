<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
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
