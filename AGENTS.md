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

Self-hosted at `analytics.doubleslash.dev`. The public `:443` front is **Istio Envoy** and returns `RBAC: access denied` on `/api/send` (CORS preflight dies there). Port **3000** is the Umami process; it is **not** published on the internet (`https://analytics.doubleslash.dev:3000` times out).

Do **not** set `hostUrl` to `https://analytics.doubleslash.dev` or `:3000` (cross-origin + RBAC / unreachable).

SSG workaround: same-origin collect + nginx reverse proxy to the **internal** Umami listener on 3000.

1. `nuxt.config.ts` — `hostUrl: 'https://double-slash.dev/umami'` (tracker POSTs `/umami/api/send`). `domains: ['double-slash.dev']` skips local `.test`.
2. Coolify nginx on **this** site (not on the Umami app). Use the Coolify internal hostname/IP of the Umami container, not the public Istio URL:

```nginx
location /umami/ {
    proxy_pass http://<umami-internal-host>:3000/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

`/umami/api/send` → `http://<umami-internal-host>:3000/api/send`. Same-origin, no CORS, Istio skipped.

Keep Umami `/api/send` reachable from this nginx (dashboard may stay behind auth). `privacy` on Nuxt Scripts does nothing in SSG.

## Podcast content

- Frontmatter: `.agents/podcast-frontmatter.md`
- After a new episode: `pnpm sync-durations`
- `pnpm validate-durations` runs before `pnpm generate` / `pnpm build`

## Code conventions

- User-facing replies in French
- Code comments and docblocks in English
- Aim for ≤ 300 lines per source file; split before ~300
