<template>
  <div class="max-w-[100vw] md:max-w-[400px] m-auto relative">
    <div
      class="absolute top-0 bottom-0 left-0 right-0 w-full bg-gradient-radial from-[#7D459A] to-darkPurple"
    ></div>
    <IconsRows
      v-for="i in rowCount"
      :key="i"
      :size="size"
      :icons="iconImages"
      class="opacity-20"
    />
    <div
      class="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-darkPurple to-darkPurple via-transparent"
    ></div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  height: {
    type: Number,
    default: 300,
  },
});

const size = 100;

// list logos
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

// create array of url
const iconImages = ref<string[]>([]);
onMounted(async () => {
  const icons = await Promise.all(
    logos.map(async logo => {
      // slow query
      await new Promise(resolve => setTimeout(resolve, 300));
      const path = `${logo.replace(':', '/')}.svg`;
      // load icon
      const {data: svgIcon} = await useFetch(
        `https://api.iconify.design/${path}?width=${size}&height=${size}`,
      );

      if (svgIcon?.value) {
        // create url for bg
        return URL.createObjectURL(svgIcon.value as Blob);
      }
      return '';
    }),
  );
  iconImages.value = icons;
});

const rowCount = computed(() => {
  return Math.round(props.height / size) + 2;
});
</script>
