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
  <span v-if="isNewEpisode" class="flex items-center neonText"
    ><span class="pr-1 text-3xl">&#8226;</span>NE<span class="neonTextBug"
      >W</span
    ></span
  >
</template>

<style scoped>
@reference "../assets/main.css";
@keyframes flicker {
  0%,
  /* 10%, */
  /* 18%, */
  /* 22%, */
  15%,
  25%,
  53%,
  57%,
  100% {
    text-shadow:
      0 0 3px #9123cb,
      0 0 4px #9123cb,
      0 0 7px #ffe40f;
  }
  2%,
  /* 9%,
  14%, */
  20%,
  24%,
  55% {
    text-shadow: none;
  }
}
.neonText {
  color: #ffe40f;
  text-shadow:
    0 0 3px #9123cb,
    0 0 4px #9123cb,
    0 0 7px #ffe40f;
}
.neonTextBug {
  color: #ffe40f;
  animation: flicker 1.5s infinite alternate;
}
</style>
