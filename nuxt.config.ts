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
    '@nuxtjs/fontaine',
  ],
  content: {
    watch: {
      ws: {
        port: 5000,
      },
    },
    highlight: {
      // Theme used in all color schemes.
      theme: 'github-dark',
    },
  },
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
      routes: [
        '/podcast-rss-feed.xml',
        '/sitemaps.xml',
        '/github-sponsor.json',
      ],
    },
  },
  runtimeConfig: {
    github_auth: process.env.GITHUB_AUTH,
    public: {
      ...baseInfos,
      podcastInfos,
      isDev: process.env.NODE_ENV === 'development',
      content: {
        anchorLinks: {
          exclude: [1, 2, 3, 4, 5, 6],
        },
      },
    },
  },
});
