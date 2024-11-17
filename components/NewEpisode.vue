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
.neonText {
  color: #ffe40f;
  text-shadow:
    0 0 3px #9123cb,
    0 0 4px #9123cb,
    0 0 7px #ffe40f;
}
</style>
