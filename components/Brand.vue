<script setup>
defineProps({
  slash: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div class="relative">
    <svg
      v-show="slash"
      xmlns="http://www.w3.org/2000/svg"
      width="90"
      height="125"
      viewBox="0 0 90 144"
      class="absolute -top-[13px] left-[43%] hidden drop-shadow -z-10 sm:block"
    >
      <text
        transform="translate(0 111)"
        fill="#fff"
        font-size="144"
        font-family="Mono45"
        letter-spacing="-0.26em"
      >
        <tspan x="0" y="0">//</tspan>
      </text>
    </svg>
    <h1 class="text-center brand sm:text-[80px] text-[50px]">DOUBLE SLASH</h1>
  </div>
</template>
>
