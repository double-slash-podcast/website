<script setup lang="ts">
const props = defineProps<{
  episodeNumber: number;
}>();
</script>

<template>
  <span class="flex items-center text-4xl font-brand text-primary">
    <span v-show="+props.episodeNumber < 10" class="text-haiti text-outline"
      >0</span
    >
    <span v-show="+props.episodeNumber < 100" class="text-haiti text-outline"
      >0</span
    >
    {{ props.episodeNumber }}
  </span>
</template>

<style scoped>
@reference "../assets/main.css";
.text-outline {
  text-shadow:
    -2px -2px 0 #9123cb,
    2px 2px 0 #9123cb,
    2px -2px 0 #9123cb,
    -2px 2px 0 #9123cb;
}
</style>
