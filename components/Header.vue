<script setup>
defineProps({
  height: {
    type: Number,
    default: 300,
  },
});
</script>

<template>
  <header
    class="relative grid col-span-1 overflow-hidden bg-darkPurple place-items-center"
    :class="`h-[${height}px]`"
  >
    <div class="relative z-10 col-start-1 row-start-1">
      <!-- titre -->
      <slot name="title">
        <h1 class="text-center brand text-[80px]">DOUBLE SLASH</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="90"
          height="125"
          viewBox="0 0 90 144"
          class="absolute top-[-20px] left-[196px] drop-shadow -z-10 hidden sm:block"
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
      </slot>
      <!-- baseline -->
      <slot name="baseline"></slot>
    </div>
    <!-- player -->
    <slot name="player"></slot>
    <AnimateBackground class="col-start-1 row-start-1" :height="height" />
  </header>
</template>

<style scoped>
header {
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
}
</style>
