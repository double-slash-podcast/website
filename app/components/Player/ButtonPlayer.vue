<template>
  <div
    class="relative flex items-center justify-center"
    :style="`width: ${width}px; height:${height}px;`"
  >
    <svg
      class="progressCircle"
      :width="`${width}px`"
      :height="`${height}px`"
      :viewBox="`0 0 ${width} ${height}`"
    >
      <circle
        :cx="width / 2"
        :cy="width / 2"
        :r="width / 2 - size - 0.2"
        fill="none"
        :stroke-width="size"
      />
      <circle
        :cx="width / 2"
        :cy="width / 2"
        :r="width / 2 - size - 0.2"
        fill="none"
        :stroke-width="size"
        pathLength="100"
      />
    </svg>
    <div
      v-if="load === true"
      class="flex items-center justify-center rounded-full bg-yellowDs"
      :style="`width: ${width - size}px; height:${height - size}px;`"
    >
      <Loader />
    </div>
    <button
      v-else
      class="relative z-[1]"
      :aria-label="props.status === 'pause' ? 'play' : 'pause'"
      :title="props.status === 'pause' ? 'play' : 'pause'"
      @click="$emit('click')"
    >
      <span v-if="props.status === 'pause'"
        ><Icon
          class="text-yellowDs"
          name="ant-design:play-circle-filled"
          :size="`${width - size}px`" /></span
      ><span v-else
        ><Icon
          class="text-yellowDs"
          name="ant-design:pause-circle-filled"
          :size="`${width - size}px`"
      /></span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits(['click']);

const props = withDefaults(
  defineProps<{
    status: typeStatusPlayer;
    /** in px */
    width?: number;
    /** in px */
    height?: number;
    value?: number;
    size?: number;
    load?: boolean;
  }>(),
  {
    width: 100,
    height: 100,
    size: 6,
    load: false,
    value: 0,
  },
);

// css calc on  stroke-dashoffset don't work on safari and firefox
const val = computed(() => 100 - props.value);
</script>

<style scoped>
svg.progressCircle {
  @apply -rotate-90 absolute;
}

svg.progressCircle circle:first-child {
  stroke: #FFE40F;
}

svg.progressCircle circle:last-child {
  stroke: #9123CB;
  stroke-dasharray: 100;
  stroke-dashoffset: v-bind('val');
  transition: stroke-dashoffset 0.5s linear;
}
</style>
