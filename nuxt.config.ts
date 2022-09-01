import {defineNuxtConfig} from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'nuxt-icon',
    '@nuxtjs/color-mode',
  ],
  tailwindcss: {
    cssPath: '~/assets/main.css',
  },
  buildModules: ['unplugin-icons/nuxt'],
  experimental: {
    reactivityTransform: true,
    viteNode: false,
  },
  components: {
    global: true,
    dirs: ['~/components'],
  },
  colorMode: {
    classSuffix: '',
  },
});
