<script setup lang="ts">
/**
 * Display an episode duration from content frontmatter (seconds).
 */
import {parseEpisodeDuration} from '~/helpers/duration/parseEpisodeDuration';

const props = defineProps<{
  duration?: string | number | null;
}>();

const parts = computed(() =>
  useCalculateTotalValue(parseEpisodeDuration(props.duration)),
);
</script>

<template>
  <span class="font-light text-primary">
    <span v-show="parts.hours > 0">{{ parts.hours }}h</span>
    {{ parts.minutes.toString().padStart(2, '0') }}mn
    {{ parts.seconds.toString().padStart(2, '0') }}s
  </span>
</template>
