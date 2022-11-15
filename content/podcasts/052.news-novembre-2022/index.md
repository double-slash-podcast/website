---
publicationDate: 2022-11-15
status: published
author: Double Slash
categories:
  - Technology
duration: 2611
episodeNumber: 52
episodeType: full
explicit: false
season: 1
title: Les News pour novembre 2022
subtitle: Dans cet épisode spécial news de novembre 2022, nous évoquons Next 13, Turbopack, Gatbsy 5, Gatbsy Valhalla, WordPress 6.1 et les conférences qui ont eu lieu dernièrement.
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1667301483/episode/51_EpArtwork_ndarop.png
description: Dans cet épisode spécial news de novembre 2022, nous évoquons Next 13, Turbopack, Gatbsy 5, Gatbsy Valhalla, WordPress 6.1 et les conférences qui ont eu lieu dernièrement.
videoLink : xzB3TGeENEU
links:
  [
    {
      title: 'Node Security releases',
      url: 'https://nodejs.org/en/blog/vulnerability/november-2022-security-releases/',
    },
    {
      title: 'Npm 9.0.0',
      url: 'https://github.blog/changelog/2022-10-24-npm-v9-0-0-released/',
    },
    {
      title: 'Deno 1.28',
      url: 'https://deno.com/blog/v1.28',
    },
    {
      title: 'Next.js 13',
      url: 'https://nextjs.org/blog/next-13#introducing-turbopack-alpha',
    },
    {
      title: 'Turbopack',
      url: 'https://turbo.build/pack/docs/core-concepts',
    },
    {
      title: 'Gatsby 5',
      url: 'https://www.gatsbyjs.com/gatsby-5/',
    },
    {
      title: 'Gatsby Valhalla',
      url: 'https://www.gatsbyjs.com/products/valhalla-content-hub',
    },
    {
        title: 'WordPress 6.1',
        url: 'https://fr.wordpress.org/2022/10/12/guide-des-changements-techniques-de-wordpress-6-1/'
    },
    {
      title: 'Node conf EU 2022',
      url: 'https://www.youtube.com/playlist?list=PL0CdgOSSGlBaULAdbribJiENfXxPW0aLQ',
    },
    {
      title: 'ViteConf 2022',
      url: 'https://viteconf.org/2022/replay',
    },
    {
      title: 'The component gallery',
      url: 'https://component.gallery/',
    },
    {
      title: 'DevToys',
      url: 'https://devtoys.app/',
    },
    {
      title: 'Trash CLI',
      url: 'https://www.npmjs.com/package/trash-cli',
    },
    {
      title: 'Content Layer',
      url: 'https://www.contentlayer.dev/',
    },
  ]
---
## Next 13

On pose les bases du futur de Next.js et de React.
Next 13 est utilisable avec l’ancien système de page.

### 2 gros changement obligatoires :

- Link (on a plus besoin d’utiliser l’ancre en enfant. Enfin !!)
- Image (utilise l’API native des browsers, plus efficace et rapide)

**Il y a un codemod pour migrer les projets sur les 2 changements.**

### New App directory (Beta) :

- Layout (juste le contenu est updaté pas le layout)
- Server component (Moins de JS dans le browser !)
- Streaming (rendu progressif et incrémental) Avec les servers components, permet de rendre les éléments qui ne fetch pas de data directement et les autres une fois que les data sont arrivés.
- Data Fetching dans les components. N’importe quel component peut fetcher des data
SSG, SSR, ISR en une seule API ⇒ fetch (API étendu dans NextJS) réglage du cache et revalidate.

- Nouveau plugin TypeScript (better suggestions and auto-complete)


## TurboPack

**Attention, il est en alpha !**

### Fonctionnement global :

- Écrit en Rust
- Pas d’ESM en dev contrairement à ViteJS
- Pas de compatibilité avec l’écosystème WebPack
- Que dev pour le moment. Le build n’utilise pas turbopack
- Système de Memory Cache. Dans le futur, cache persistant via file ou remote
- Pour le moment, que NextJS, Svelte prévu et pour les autres c’est en discussion

En gros, il passe en cache les fichiers et recompile le bundle avec le cache. Si un fichier change, il update le cache que de ce fichier et recompile avec le cache des autres fichiers.

- [Réaction d’Evan You](https://github.com/yyx990803/vite-vs-next-turbo-hmr/discussions/8) -> Evan test réellement la différence entre Turbopack et Vite.

## Gatsby 5

- Slice API : Permet de créer des slices : Header, Footer, Layout et de déployer uniquement les éléments qui changent.
- Partial Hydratation (Beta) via React Server Component
- Head API
- Script component
- Node 18 et React 18


## Gastby Valhalla Content Hub

**Pour le moment que dispo pour les Entreprises**

C’est un agrégateur de sources comme on peut trouver dans Gatsby mais via un service accessible via le net.

On peut donc concentrer plusieurs sources de différents services pour l’interroger avec une API GraphQL

## WordPress 6.1

- Cache query !!
- Extend query loop block
- Typographie Fluide (clamp)
- WebP
- Gutenberg → Améliorations de blocs
- etc…


Bonne écoute !

::authors
