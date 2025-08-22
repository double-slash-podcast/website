<template>
  <div>
    <div class="relative flex space-x-2 overflow-hidden select-none">
      <ul
        class="flex min-w-full space-x-4 h-14 shrink-0 animate-slideLeft1"
      >
        <li v-for="logo in shuffleLogos" :key="logo" class="w-10 h-14">
          <Icon
            :id="logo"
            :name="logo"
            size="40"
            class="w-10 h-14 grayscale"
            mode="css"
          />
          <!-- <Icon
            v-if="isFirst"
            :id="logo"
            :name="logo"
            size="40"
            class="flex grayscale"
            mode="css"
          />
          <IconsUse v-else :id="logo" size="40" class="grayscale icon" /> -->
        </li>
      </ul>
      <ul
        class="absolute top-0 flex min-w-full space-x-4 shrink-0 animate-slideLeft2"
      >
        <li v-for="logo in shuffleLogos" :key="logo" class="w-10 h-14">
          <!-- <IconsUse :id="logo" size="40" class="grayscale icon" /> -->
          <Icon
            :id="logo"
            :name="logo"
            size="40"
            class="w-10 h-14 grayscale"
            mode="css"
          />
        </li>
      </ul>
    </div>
    <!-- 2 eme ligne -->
    <div class="relative flex space-x-2 overflow-hidden select-none">
      <ul
        class="flex min-w-full space-x-4 h-14 shrink-0 animate-slideRight1"
      >
        <li v-for="logo in shuffleLogos" :key="logo" class="w-10 h-14">
          <!-- <IconsUse :id="logo" size="40" class="grayscale icon" /> -->
          <Icon
            :id="logo"
            :name="logo"
            size="40"
            class="w-10 h-14 grayscale"
            mode="css"
          />
        </li>
      </ul>
      <ul
        class="absolute top-0 flex min-w-full space-x-4 shrink-0 animate-slideRight2"
      >
        <li v-for="logo in shuffleLogos" :key="logo" class="w-10 h-14">
          <Icon
            :id="logo"
            :name="logo"
            size="40"
            class="w-10 h-14 grayscale"
            mode="css"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    isFirst: boolean;
  }>(),
  {isFirst: false},
);

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
  'logos:mistral-ai-icon',
  'logos:bun',
  'logos:deno',
  'logos:pwa',
  'logos:php',
  'logos:laravel',
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
  'logos:alpinejs-icon',
  'logos:wordpress-icon',
  'logos:claude-icon',
  'logos:github-copilot'
];

const shuffleLogos = computed(() => {
  return logos.sort(() => Math.random() - 0.5);
});
</script>
