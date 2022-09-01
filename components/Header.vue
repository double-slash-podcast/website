<template>
  <header
    class="relative grid h-64 col-span-1 overflow-hidden bg-darkPurple place-items-center"
  >
    <div class="relative z-10 col-start-1 row-start-1">
      <h1 class="text-center brand text-[80px]">DOUBLE SLASH</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="90"
        height="125"
        viewBox="0 0 90 144"
        class="absolute top-[-20px] left-[196px] drop-shadow -z-10"
      >
        <text
          transform="translate(0 111)"
          fill="#fff"
          font-size="144"
          font-family="Mono45Headline-Regular, Mono45-Headline"
          letter-spacing="-0.26em"
        >
          <tspan x="0" y="0">//</tspan>
        </text>
      </svg>
      <h2>le podcast des developpeurs web</h2>
      <p class="font-light text-center text-white">
        par <span class="font-normal">PATRICK FARAMAZ</span> et
        <span class="font-normal">ALEX DUVAL</span>
      </p>
    </div>
    <AnimateBackground class="col-start-1 row-start-1" />
    <!-- LECTEUR -->
  </header>
</template>
