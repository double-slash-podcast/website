import tailwindcss from '@tailwindcss/vite';
import {formatContentSignalPairs} from './app/utils/contentSignals';

const sentryDsn = process.env.NUXT_PUBLIC_SENTRY_DSN;
const sentryEnvironment =
  process.env.NUXT_SITE_ENV ||
  (process.env.NODE_ENV === 'production' ? 'production' : 'development');

export default defineNuxtConfig({
  modules: [
    '@sentry/nuxt/module',
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxt/image',
    'nuxt-schema-org',
    '@nuxt/icon',
    '@nuxt/eslint',
    'nuxt-llms',
    '@nuxtjs/robots',
    '@nuxt/scripts',
    '@nuxt/fonts',
    ...(process.env.NODE_ENV === 'development' ? ['@browser-echo/nuxt'] : []),
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
  // Fonts are self-hosted woff2 files in app/assets/fonts, resolved by filename
  // convention (see @nuxt/fonts local provider). provider: 'local' guarantees
  // no remote font download at build time (Railpack/SSG).
  // processCSSVariables is disabled: with the default 'font-prefixed-only' the
  // module also parses Tailwind's --font-weight-* / --default-font-family
  // variables as font families and warns on every build. The families are
  // declared explicitly with global: true instead.
  fonts: {
    provider: 'local',
    processCSSVariables: false,
    // Fail the production build when a family cannot be resolved (missing or
    // renamed woff2 file) instead of shipping a silent fallback font.
    // Dev keeps warn-only so a broken stack does not block local work.
    throwOnError: process.env.NODE_ENV === 'production',
    local: {
      dirs: ['app/assets/fonts'],
    },
    families: [
      {name: 'Mono45', global: true},
      {name: 'Dank', global: true},
      {
        name: 'Inter',
        global: true,
        weights: ['100 800'],
        display: 'optional',
        unicodeRange: ['U+000-5FF'],
        // unicode-range disables the automatic preload; keep the old manual
        // preload behavior from app/layouts/default.vue.
        preload: true,
      },
    ],
  },
  image: {
    provider: 'cloudinary',
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/doubleslash/image/fetch/',
      modifiers: {
        quality: 'auto:good',
      },
    },
  },
  experimental: {
    componentIslands: {
      selectiveClient: true, // or 'deep', to enable `nuxt-client`
      remoteIsland: false, // allow rendering islands from a remote source
    },
    viewTransition: true,
    typedPages: true,
    defaults: {
      nuxtLink: {
        prefetchOn: {visibility: false, interaction: true},
      },
    },
  },
  // Production SSG is nginx (config on the server): also set
  // Content-Type application/linkset+json on /.well-known/api-catalog there.
  // Markdown for Agents: bun run generate converts prerendered HTML to markdown
  // next to it; nginx must negotiate Accept: text/markdown (see AGENTS.md).
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
  ...(process.env.NODE_ENV === 'development'
    ? {
        browserEcho: {
          route: '/__client-logs',
          include: ['log', 'warn', 'error'],
          tag: '[web]',
          batch: {size: 20, interval: 300},
          preserveConsole: true,
          stackMode: 'condensed' as const,
        },
      }
    : {}),
  llms: {
    domain: 'https://double-slash.dev',
    title: 'Double Slash Podcast',
    description:
      'Le podcast sur le code, le développement web et les outils modernes.',
  },
  // Absolute origin for Schema.org and prerendered URLs.
  // Indexable still follows the env: production indexes, staging does not.
  site: {
    url: 'https://double-slash.dev',
    name: 'Double Slash',
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
  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://res.cloudinary.com',
          crossorigin: '',
        },
      ],
    },
  },
});
