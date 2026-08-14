# Double Slash Podcast Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/790566ad-de5b-494f-9a91-e285f98080e5/deploy-status)](https://app.netlify.com/sites/double-slash-website/deploys)

## Website

[https://double-slash.dev/](https://double-slash.dev/)

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


#### Build application

```
pnpm build
```

#### Generate static site

```
pnpm generate
```

Both `build` and `generate` run `validate-durations` first and fail if a published episode is missing `duration` or `fileSize` in its frontmatter.

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
