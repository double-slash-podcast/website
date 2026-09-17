# AGENTS.md

## Stack

- Nuxt 4, Vue 3, pnpm (`packageManager` in `package.json`)
- Content: `@nuxt/content` (markdown in `content/`)
- Local: lerd (`*.test`)
- Production: **Coolify + Nixpacks + nginx, static (SSG)**. Not Netlify.

## Deploy

- Build: `pnpm generate` (`nuxi generate` → `dist/`)
- nginx serves `dist/`
- Node 22 via `nixpacks.toml` / `pnpm-workspace.yaml` (linux/glibc)
- Do not add `netlify.toml` or treat `nuxi build` + `pnpm start` as production
- `pnpm generate` is SSG: `@nuxt/scripts` **disables** its Nitro reverse proxy (`/_scripts/p/`)

## Umami (`@nuxt/scripts`)

Self-hosted, public: https://analytics.double-slash.dev

SSG disables the Nuxt Scripts Nitro proxy (`/_scripts/p/`). The tracker talks to Umami **directly** (CORS is enabled on `/api/send`). Do **not** add an nginx `location /umami/` on this site (502 / crash if it replaces the static `default.conf`).

`nuxt.config.ts`:

```ts
umamiAnalytics: {
  websiteId: '942988c9-8c60-4497-ad8b-5c7169365a52',
  hostUrl: 'https://analytics.double-slash.dev',
  trigger: 'onNuxtReady',
}
```

Staging (`staging.double-slash.dev`) and prod use the same `hostUrl`. `privacy` on Nuxt Scripts does nothing in SSG.

## Podcast content

- Frontmatter: `.agents/podcast-frontmatter.md`
- After a new episode: `pnpm sync-durations`
- `pnpm validate-durations` runs before `pnpm generate` / `pnpm build`

## Code conventions

- User-facing replies in French
- Code comments and docblocks in English
- Aim for ≤ 300 lines per source file; split before ~300
