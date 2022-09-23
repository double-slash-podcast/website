import {defineNuxtConfig} from 'nuxt';
import {baseInfos, podcastInfos} from './config';

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'nuxt-icon',
    '@nuxtjs/color-mode',
    '@nathanchase/nuxt-dayjs-module',
  ],
  dayjs: {},
  tailwindcss: {
    cssPath: '~/assets/main.css',
  },
  buildModules: [],
  experimental: {
    reactivityTransform: true,
    viteNode: false,
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
