# Double Slash Podcast Website

## Website

[https://double-slash.dev/](https://double-slash.dev/)

Production runs on **Coolify** (Nixpacks) behind **nginx**, as a **static site** (`pnpm generate` → `dist/`). See `AGENTS.md` for deploy and analytics details.

## Quick Start

We use [pnpm](https://pnpm.io) on package management.

#### Install dependencies

```
pnpm install
```

#### Run dev mode

```
pnpm dev
```

#### Generate static site (production)

```
pnpm generate
```

Output: `dist/`. Coolify/nginx serves that folder.

#### Node server build (local / not prod)

```
pnpm build
```

`pnpm start` runs Nitro (`node .output/server/index.mjs`). Production is SSG, not this server.

`generate` runs `sync-durations` then `nuxi generate`. `build` runs `validate-durations` then `nuxi build`. Both fail if a published episode is missing `duration` or `fileSize` in its frontmatter.

### Podcast episode metadata

After adding a new episode, sync `duration` and `fileSize` from the remote MP3 into the markdown frontmatter:

```
pnpm sync-durations
```

Options:

- `--dry-run` — preview changes without writing files
- `--force` — recalculate even when values already exist
- `--slug <dsSlug>` — sync a single episode

Check that all published episodes have the required metadata (same check used before build):

```
pnpm validate-durations
```

## Analytics

Umami is self-hosted at [https://analytics.double-slash.dev](https://analytics.double-slash.dev). `@nuxt/scripts` loads it with `hostUrl: 'https://analytics.double-slash.dev'`. The browser posts to `/api/send` on that origin (CORS allowed). No nginx reverse-proxy on the static site.

## Tools

### Interface

- [Vue](https://vuejs.org/)
- [Nuxt](https://nuxtjs.org/)

### Store

- [Pinia](https://pinia.vuejs.org/)

### content

- [Nuxt content](https://content.nuxtjs.org/)

### Test

- [Vitest](https://vitest.dev/)

### Dev

- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Typescript](https://www.typescriptlang.org/)

## Todo

- [ ] Transcription for `SEO`
- [ ] Sponsoring page => redirection
- [ ] Contact Form
- [ ] Live page ?
