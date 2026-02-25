<template>
  <svg
    ref="svg"
    xmlns="http://www.w3.org/2000/svg"
    :width="`${size}px`"
    :height="`${size}px`"
    viewBox="0 0 90 144"
    :class="insideClass"
  >
    >
    <text
      transform="translate(0 111)"
      font-size="144"
      font-family="Mono45"
      letter-spacing="-0.26em"
    >
      <tspan x="0" y="0">//</tspan>
    </text>
  </svg>
</template>
<script setup lang="ts">
const {insideClass} = useAttrs();
defineProps<{
  size: string;
}>();
const svg = ref();
defineExpose({
  svg,
});
</script>

<!-- class="absolute -top-[13px] left-[43%] hidden drop-shadow-sm -z-10 sm:block" -->
