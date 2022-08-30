<template>
  <div>
    <div class="relative flex space-x-2 overflow-hidden select-none">
      <ul class="flex h-5 min-w-full space-x-2 shrink-0 animate-slideLeft1">
        <li v-for="logo in logos" :key="logo">
          <Icon :name="logo" class="w-3 h-3 grayscale" />
        </li>
      </ul>
      <ul
        class="absolute top-0 flex min-w-full space-x-2 shrink-0 animate-slideLeft2"
      >
        <li v-for="logo in logos" :key="logo">
          <Icon :name="logo" class="w-3 h-3 grayscale" />
        </li>
      </ul>
    </div>
    <!-- 2 eme ligne -->
    <div class="relative flex space-x-2 overflow-hidden select-none">
      <ul class="flex h-5 min-w-full space-x-2 shrink-0 animate-slideRight1">
        <li v-for="logo in logos" :key="logo">
          <Icon :name="logo" class="w-3 h-3 grayscale" />
        </li>
      </ul>
      <ul
        class="absolute top-0 flex min-w-full space-x-2 shrink-0 animate-slideRight2"
      >
        <li v-for="logo in logos" :key="logo">
          <Icon :name="logo" class="w-3 h-3 grayscale" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
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
</script>
