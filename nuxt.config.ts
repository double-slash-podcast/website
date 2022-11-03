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
    '@pinia/nuxt',
    '@nuxt/image-edge',
    'nuxt-schema-org',
  ],
  image: {
    provider: 'cloudinary',
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/doubleslash/image/fetch/',
      modifiers: {
        effect: 'sharpen:100',
        quality: 'auto:best',
      },
    },
  },
  schemaOrg: {
    canonicalHost: baseInfos.siteUrl,
  },
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
      routes: ['/podcast-rss-feed.xml', '/sitemaps.xml'],
    },
  },
  runtimeConfig: {
    public: {
      ...baseInfos,
      podcastInfos,
      isDev: process.env.NODE_ENV === 'development',
    },
  },
});
