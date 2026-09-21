import tailwindcss from '@tailwindcss/vite';
import {formatContentSignalPairs} from './app/utils/contentSignals';

const sentryDsn =
  process.env.NUXT_PUBLIC_SENTRY_DSN;
const sentryEnvironment =
  process.env.NUXT_SITE_ENV ||
  (process.env.NODE_ENV === 'production' ? 'production' : 'development');

export default defineNuxtConfig({
  modules: [
    '@sentry/nuxt/module',
    '@nuxt/content',
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

  icon: {
    mode: 'svg',
    clientBundle: {
      // Pre-bundle scanned icons so SSR does not fetch /api/_nuxt_icon
      scan: true,
      // Icons referenced dynamically via app.config (SocialList)
      icons: [
        'fa6-brands:square-x-twitter',
        'logos:bluesky',
        'mdi:github',
        'cbi:deezer-logo',
        'vscode-icons:file-type-rss',
      ],
      sizeLimitKb: 512,
    },
  },
  content: {
    experimental: {sqliteConnector: 'native'},
    // Content 3 heading anchors wrap titles in <a> and steal .prose h2/h3 styles.
    renderer: {
      anchorLinks: {
        h1: false,
        h2: false,
        h3: false,
        h4: false,
        h5: false,
        h6: false,
      },
    },
    build: {
      markdown: {
        highlight: {
          // Theme used in all color schemes.
          theme: 'synthwave-84',
        },
      },
    },
  },
  sourcemap: {
    client: false,
    // Server maps bloat the prerender worker (~4GB OOM on `nuxi build`).
    // Production is nginx/SSG; prerender errors go through logSsrErrors.
    server: false,
  },
  sentry: {
    org: 'goodmotion',
    project: 'double-slash',
    authToken: process.env.SENTRY_AUTH_TOKEN,
    // Capture prerender errors during `nuxi generate` without a Node --import flag.
    autoInjectServerSentry: 'top-level-import',
    /**
     * Keep `nuxi generate` going if Sentry upload fails (missing token, network).
     */
    errorHandler(error: Error) {
      console.warn('[sentry] source maps upload failed', error);
    },
  },
  vite: {
    plugins: [tailwindcss()],
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
    typedPages: true,
  },
  colorMode: {
    classSuffix: '',
  },
  // Production SSG is nginx (config on the server): also set
  // Content-Type application/linkset+json on /.well-known/api-catalog there.
  // Markdown for Agents: pnpm generate copies content/*.md next to HTML;
  // nginx must negotiate Accept: text/markdown (see AGENTS.md).
  routeRules: {
    '/.well-known/api-catalog': {
      headers: {
        'Content-Type': 'application/linkset+json; charset=utf-8',
      },
    },
    '/sitemap.xml': {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    },
  },
  nitro: {
    prerender: {
      failOnError: true,
      // Native sqlite is not safe for parallel prerender workers.
      concurrency: 1,
      routes: [
        '/podcast-rss-feed.xml',
        '/robots.txt',
        '/sitemap.xml',
        '/sitemaps.xml',
        '/github-sponsor.json',
      ],
    },
    hooks: {
      'prerender:generate'(route) {
        if (!route.error) {
          return;
        }
        console.error('[prerender]', route.route, route.error);
        const err = route.error as {cause?: unknown; stack?: string};
        if (err.cause) {
          console.error('[prerender:cause]', err.cause);
        }
        if (err.stack) {
          console.error(err.stack);
        }
      },
    },
  },
  runtimeConfig: {
    github_auth: process.env.GITHUB_AUTH,
    public: {
      numberEpisodesList: 25,
      isDev: process.env.NODE_ENV === 'development',
      sentry: {
        dsn: sentryDsn,
        environment: sentryEnvironment,
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
    sitemap: 'https://double-slash.dev/sitemap.xml',
    groups: [
      {
        userAgent: '*',
        allow: '/',
        contentSignal: formatContentSignalPairs(),
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        contentSignal: formatContentSignalPairs(),
      },
    ],
  },
  scripts: {
    privacy: {ip: true, language: true, hardware: true},
    registry: {
      umamiAnalytics: {
        websiteId: '942988c9-8c60-4497-ad8b-5c7169365a52',
        hostUrl: 'https://analytics.double-slash.dev',
        trigger: 'onNuxtReady',
      },
    },
  },
  compatibilityDate: '2026-09-16',
});
