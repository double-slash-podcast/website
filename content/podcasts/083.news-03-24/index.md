---
publicationDate: 13 Mar 2024
status: published
author: Double Slash
categories:
  - Technology
duration: 3374
episodeNumber: 83
episodeType: full
explicit: false
season: 1
dsSlug: DS_083_news-03-24
title: Les News Web Dev mars 2024
subtitle: L'actualité du développement Web
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1710311967/episode/ART_83_srvzdf.png
description: Un épisode pour parler d’Apple qui fait marche arrière devant la
  commission européenne, de Rust de plus en plus présent dans nos outils, de la
  version de Tailwind 4 qui arrive en version alpha, de Laravel 11, d’Astro qui
  n’arrête plus de nous surprendre et pleins d’autres choses.
videoLink: khiumNmZf4o
tags:
  - pwa
  - tailwindcss
  - astro
  - nuxt
  - shiki
  - web core vitals
fileSize: 53993220
---

### PWA et Apple

https://twitter.com/i/web/status/1763598540389929313

### Rollup version Rust

Le futur bundler de Vite

https://github.com/rolldown/rolldown

### Tailwind v4 Alpha

https://tailwindcss.com/blog/tailwindcss-v4-alpha

🚫 No postcss.config.js file
🚫 No tailwind.config.js file.
🚫 No configuring content globs.
🚫 No @tailwind` directives in your CSS.

Exemple de Simon (Pro Tailwind)

```
/* app/styles.css */

@import 'tailwindcss'

@theme {
  --color-primary: #aab9ff;
}
```

This is the equivalent of doing the following in Tailwind CSS v3:

```
// tailwind.config.ts

export default {
  theme: {
    colors: {
      primary: '#aab9ff'
    }
  }
}
```

In v4, the CSS variables are also exposed in your CSS output, which means you can “consume” those variables anywhere you need it:

```
<div class="bg-(--color-primary)">
```

### Laravel 11

[https://blog.laravel.com/laravel-11-now-available](https://blog.laravel.com/laravel-11-now-available)

### React compilé mais pas pour le v19

https://reacttraining.com/blog/react-19-will-be-compiled

### Million Lint, pour identifier le code lent et suggérer des améliorations

https://million.dev/blog/lint

### Nuxt Hub Alpha

https://hub.nuxt.com/

### Astro Studio et Astro DB ??

Espace avec une DB disponible et des helpers dans Astro pour interroger la DB.
Vidéo prochainement.

https://studio.astro.build/


### RSPress, rspack static site generator

https://github.com/web-infra-dev/rspress

### Shiki Syntaxe highlighter + Twoslash

Retourne le code déjà formaté contrairement a Prism ou highlight.js.

https://nuxt.com/blog/shiki-v1

### Livre pour implémenter auth sur une web app

https://thecopenhagenbook.com/

### INP Article

https://agencewebperformance.fr/metrique-inp-amelioration/

### Streaming without JS

https://lamplightdev.com/blog/2024/01/10/streaming-html-out-of-order-without-javascript/

Bonne écoute !
