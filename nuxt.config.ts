import {defineNuxtConfig} from 'nuxt';
import {baseInfos, podcastInfos} from './config';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
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
  nitro: {
    prerender: {
      routes: ['/podcast-rss-feed.xml'],
    },
  },
  runtimeConfig: {
    public: {
      ...baseInfos,
      podcastInfos,
    },
  },
});
