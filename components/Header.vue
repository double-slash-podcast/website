<template>
  <header class="h-64 overflow-hidden bg-darkPurple">
    <div class="max-w-[400px] m-auto relative">
      <div
        class="absolute top-0 bottom-0 left-0 right-0 w-full bg-gradient-radial from-[#7D459A] to-darkPurple"
      ></div>
      <IconsRows v-for="i in 7" :key="i" class="opacity-20" />
      <div
        class="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-darkPurple to-darkPurple via-transparent"
      ></div>
    </div>
  </header>
</template>
