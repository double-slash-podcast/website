<script setup lang="ts">
const props = defineProps<{
  slug: string;
}>();

const {public: config} = useRuntimeConfig();

const {duration} = await useRemoteDuration(
  `${config.prefixAudio}/${props.slug}.mp3`,
);

const hours = computed(() => (duration ? Math.floor(duration / 3600) : 0));
const minutes = computed(() =>
  duration ? Math.floor((duration - 3600 * +hours.value) / 60) : 0,
);
const seconds = computed(() =>
  duration
    ? Math.floor(duration - 3600 * +hours.value - minutes.value * 60)
    : 0,
);
</script>

<template>
  <span class="font-light text-white">
    <span v-show="hours > 0">{{ hours }}h</span>
    {{ minutes.toString().padStart(2, '0') }}mn
    {{ seconds.toString().padStart(2, '0') }}s
  </span>
</template>
