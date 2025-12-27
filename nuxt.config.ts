export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxt/image',
    'nuxt-schema-org',
    '@nuxtjs/fontaine',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@browser-echo/nuxt',
    'nuxt-llms'
  ],

  alias: {
    'micromark/lib/preprocess.js': 'micromark',
    'micromark/lib/postprocess.js': 'micromark',
  },

  icon: {
    mode: 'svg',
  },
  content: {
    experimental: { nativeSqlite: true },
    // anchorLinks: { h1: false, h2: false, h3: false, h4: false, h5: false, h6: false },
    build: {
      markdown: {
        highlight: {
          // Theme used in all color schemes.
          theme: 'synthwave-84',
        },
      },
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

  experimental: {
    reactivityTransform: true,
    componentIslands: true,
    viewTransition: true,
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
  browserEcho: {
    route: '/__client-logs',
    include: ['log', 'warn', 'error'],
    tag: '[web]',
    batch: { size: 20, interval: 300 },
    preserveConsole: true,
    stackMode: 'condensed', // 'full' | 'condensed' | 'none'
  },
  llms: {
    domain: 'https://double-slash.dev',
    title: 'Double Slash Podcast',
    description: 'Le podcast sur le code, le développement web et les outils modernes.',
  },
  compatibilityDate: '2025-08-29'
});
