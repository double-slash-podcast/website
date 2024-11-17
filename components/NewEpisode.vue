<script setup lang="ts">
const props = defineProps<{
  publicationDate: string;
}>();

const isNewEpisode = computed(() => {
  const date = new Date(props.publicationDate);
  const now = new Date();
  now.setDate(now.getDate() - 15);
  return date.getTime() > now.getTime();
});
</script>

<template>
  <span v-if="isNewEpisode" class="flex items-center gap-2 neonText"
    ><span class="text-3xl">&#8226;</span>Nouveau</span
  >
</template>

<style scoped>
@keyframes flicker {
  0%,
  18%,
  22%,
  25%,
  53%,
  57%,
  100% {
    text-shadow:
      0 0 3px #9123cb,
      0 0 4px #9123cb,
      0 0 7px #ffe40f;
  }
  20%,
  24%,
  55% {
    text-shadow: none;
  }
}
.neonText {
  color: #ffe40f;
  animation: flicker 1.5s infinite alternate;
}
</style>
