<template>
  <div>
    <div class="relative flex space-x-2 overflow-hidden select-none">
      <ul
        :style="`height: ${size}px`"
        class="flex min-w-full space-x-4 shrink-0 animate-slideLeft1"
      >
        <li v-for="logo in getRandomElements" :key="logo">
          <Icon
            v-if="isFirst"
            :id="logo"
            :name="logo"
            :size="`${size * 0.8}`"
            class="grayscale"
          />
          <IconsUse
            v-else
            :id="logo"
            :size="`${size * 0.8}`"
            class="grayscale icon"
          />
        </li>
      </ul>
      <ul
        class="absolute top-0 flex min-w-full space-x-2 shrink-0 animate-slideLeft2"
      >
        <li v-for="logo in getRandomElements" :key="logo">
          <IconsUse :id="logo" :size="`${size * 0.8}`" class="grayscale icon" />
        </li>
      </ul>
    </div>
    <!-- 2 eme ligne -->
    <div class="relative flex space-x-2 overflow-hidden select-none">
      <ul
        :style="`height: ${size}px`"
        class="flex min-w-full space-x-4 shrink-0 animate-slideRight1"
      >
        <li v-for="logo in getRandomElements" :key="logo">
          <IconsUse :id="logo" :size="`${size * 0.8}`" class="grayscale icon" />
        </li>
      </ul>
      <ul
        class="absolute top-0 flex min-w-full space-x-2 shrink-0 animate-slideRight2"
      >
        <li v-for="logo in getRandomElements" :key="logo">
          <IconsUse :id="logo" :size="`${size * 0.8}`" class="grayscale icon" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    isFirst: boolean;
    size: number;
  }>(),
  {isFirst: false},
);

const numberOfElements = 31;

const logos = [
  'logos:vitejs',
  'logos:pnpm',
  'logos:fastify-icon',
  'logos:javascript',
  'logos:nextjs-icon',
  'logos:nodejs-icon',
  'logos:css-3-official',
  'logos:html-5',
  'logos:vue',
  'logos:react',
  'logos:bun',
  'logos:deno',
  'logos:pwa',
  'logos:php',
  'logos:symfony',
  'logos:graphql',
  'logos:astro',
  'logos:angular-icon',
  'logos:visual-studio-code',
  'logos:docker-icon',
  'logos:hasura-icon',
  'logos:nuxt-icon',
  'logos:rust',
  'logos:tailwindcss-icon',
  'logos:redis',
  'logos:postgresql',
  'logos:mongodb-icon',
  'logos:wordpress-icon',
  'logos:webpack',
  'logos:alpinejs-icon',
  'logos:solidity',
];

const getRandomElements = computed(() => {
  const workArray = logos.slice();
  const randomElements = [];
  for (let i = 0; i < numberOfElements; i++) {
    const randomIndex = Math.floor(Math.random() * workArray.length);
    const randomElement = workArray[randomIndex];
    randomElements.push(randomElement);
    workArray.splice(randomIndex, 1);
  }
  return randomElements;
});

// const shuffleLogos = computed(() => {
//   return logos.sort(() => Math.random() - 0.5);
// });
</script>
