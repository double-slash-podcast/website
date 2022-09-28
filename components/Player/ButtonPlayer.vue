<template>
  <div class="relative flex items-center justify-center">
    <svg
      class="progressCircle"
      :width="`${width}px`"
      :height="`${height}px`"
      :viewBox="`0 0 ${width} ${height}`"
    >
      <circle
        :cx="width / 2"
        :cy="width / 2"
        :r="width / 2 - size"
        fill="none"
        :stroke-width="size"
      />
      <circle
        :style="`--val: ${props.value || 0};`"
        :cx="width / 2"
        :cy="width / 2"
        :r="width / 2 - size"
        fill="none"
        :stroke-width="size"
        pathLength="100"
      />
    </svg>
    <button
      :aria-label="props.status === 'pause' ? 'play' : 'pause'"
      :title="props.status === 'pause' ? 'play' : 'pause'"
      @click="$emit('click')"
    >
      <span v-if="props.status === 'pause'"
        ><Icon
          class="text-purpleDs"
          name="ant-design:play-circle-filled"
          :size="`${width - size}px`" /></span
      ><span v-else
        ><Icon
          class="text-purpleDs"
          name="ant-design:pause-circle-filled"
          :size="`${width - size}px`"
      /></span>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    status: typeStatusPlayer;
    /** in px */
    width?: number;
    /** in px */
    height?: number;
    value: number;
    size?: number;
  }>(),
  {
    width: 100,
    height: 100,
    size: 6,
  },
);
</script>

<style scoped>
svg.progressCircle {
  @apply -rotate-90 absolute;
}

svg.progressCircle circle:first-child {
  @apply stroke-purpleDs;
}

svg.progressCircle circle:last-child {
  @apply stroke-yellowDs;
  stroke-dasharray: 100;
  stroke-dashoffset: calc(100 - var(--val));
  transition: stroke-dashoffset 0.5s linear;
}
</style>
