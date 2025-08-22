
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'nuxt-icon',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxt/image',
    'nuxt-schema-org',
    '@nuxtjs/fontaine',
  ],

  alias: {
    'micromark/lib/preprocess.js': 'micromark',
    'micromark/lib/postprocess.js': 'micromark',
  },

  content: {
    experimental: { nativeSqlite: true },
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

  tailwindcss: {
    cssPath: '~/assets/main.css',
  },

  buildModules: [],

  experimental: {
    reactivityTransform: true,
    viteNode: false,
    componentIslands: true,
    viewTransition: true
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
    REDIS_URL: process.env.REDIS_URL,
    REDIS_TOKEN: process.env.REDIS_TOKEN,
    public: {
      numberEpisodesList: 25,
      isDev: process.env.NODE_ENV === 'development',
      content: {
        anchorLinks: {
          exclude: [1, 2, 3, 4, 5, 6],
        },
      },
    },
  },
  hooks: {
    'pages:extend'(pages) {
      // add a route
      pages.push({
        name: 'podcasts-index',
        path: '/podcasts/:page(\\d+)?',
        file: '~/pages/podcasts/index.vue',
      });
    },
  },
  compatibilityDate: '2024-10-29',
});