import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    'nuxt-schema-org',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@browser-echo/nuxt',
    'nuxt-llms',
    '@nuxtjs/robots',
    '@nuxt/scripts',
  ],

  alias: {
    'micromark/lib/preprocess.js': 'micromark',
    'micromark/lib/postprocess.js': 'micromark',
  },

  icon: {
    mode: 'svg',
    clientBundle: {
      // Pre-bundle scanned icons so SSR does not fetch /api/_nuxt_icon
      scan: true,
      // Icons referenced dynamically via app.config (SocialList)
      icons: ['fa6-brands:square-x-twitter', 'logos:bluesky', 'mdi:github'],
      sizeLimitKb: 512,
    },
  },
  content: {
    experimental: {nativeSqlite: true},
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
  sourcemap: false,
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: false,
    },
  },
  css: ['~/assets/main.css'],
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
  experimental: {
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
    batch: {size: 20, interval: 300},
    preserveConsole: true,
    stackMode: 'condensed', // 'full' | 'condensed' | 'none'
  },
  llms: {
    domain: 'https://double-slash.dev',
    title: 'Double Slash Podcast',
    description:
      'Le podcast sur le code, le développement web et les outils modernes.',
  },
  robots: {
    sitemap: 'https://double-slash.dev/sitemaps.xml',
    groups: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
    ],
  },
  scripts: {
    privacy: { ip: true, language: true, hardware: true },
    registry: {
      umamiAnalytics: {
        websiteId: '7c9e9bde-91d9-4c59-a877-17f305d80e09',
        hostUrl: 'https://analytics.doubleslash.dev',
        trigger: 'onNuxtReady',
      }
    }
  },
  compatibilityDate: '2025-08-29',
});