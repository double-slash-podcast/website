<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="90"
    height="125"
    viewBox="0 0 90 144"
    :class="design"
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
<script setup>
const {design} = useAttrs();
</script>
<style></style>

<!-- class="absolute -top-[13px] left-[43%] hidden drop-shadow -z-10 sm:block" -->
