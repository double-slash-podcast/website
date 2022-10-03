<template>
  <strong class="text-xs font-base">{{ time }}</strong>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentTime: typeDuration;
}>();

const time = computed(() => useFormatTime(props.currentTime));
</script>
