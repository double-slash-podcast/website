# AGENTS.md

## Stack

- Nuxt 4, Vue 3, Bun (`packageManager` in `package.json`)
- Content: `@nuxt/content` (markdown in `content/`)
- Local: lerd (`*.test`)
- Production: **Coolify + Railpack + nginx, static (SSG)**. Not Netlify.

## Deploy

- Build pack: **Railpack (Beta)** (`railpack.json`)
- Build: `bun run generate` (`nuxi generate` → `.output/public`, then converts prerendered HTML to markdown next to it)
- nginx serves `.output/public` and must negotiate `Accept: text/markdown` (sibling `.md` / `index.md`)
- Node 24 + Bun 1.4.2 via `railpack.json` / `.nvmrc`
- Do not add `netlify.toml` or treat `nuxi build` + `bun run start` as production
- `bun run generate` is SSG: `@nuxt/scripts` **disables** its Nitro reverse proxy (`/_scripts/p/`)

Coolify (staging first): static site, publish `/.output/public`. Leave **Install Command empty** (Railpack copies `package.json` + `bun.lock` then runs `bun install`). Build Command: `NUXT_SITE_ENV=staging bun run generate`. Do not set Install to `bun install --frozen-lockfile`: that replaces Railpack’s COPY steps and fails with “could not find a package.json”. Remove `NIXPACKS_*` env vars. Optional: `RAILPACK_NODE_VERSION=24`, `RAILPACK_NO_SPA=1`.

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
- After a new episode: `bun run sync-durations`
- `bun run validate-durations` runs before `bun run generate` / `bun run build`

## Code conventions

- User-facing replies in French
- Code comments and docblocks in English
- Aim for ≤ 300 lines per source file; split before ~300
