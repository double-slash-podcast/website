---
publicationDate: 16 Oct 2024
status: published
author: Double Slash
categories:
  - Technology
duration: 3218
episodeNumber: 98
episodeType: full
explicit: false
season: 1
dsSlug: DS_098_news-oct24-2
title: Les news web dev pour octobre 2024 - 2.0
subtitle: V2 - Épisode new web développement pour octobre 2024
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1729068225/episode/ART_96_cqqnbv.png
description: Dans cet épisode, on revient sur les grandes annonces faites lors de la Vite Conf, avec des nouveautés pour les développeurs JavaScript, des évolutions majeures comme Deno 2, et des avancées en IA avec Bolt AI. On parle aussi des dernières tendances dans l'écosystème Shopify, Tauri, et bien plus encore.
videoLink : Jgwh1w42Opo
---
### Vite Conf

- Creation d’une nouvelle toolchain et d’une nouvelle organisation pour remplacer esbuild et rollup. https://voidzero.dev/
Actuellement dans le capot de ViteJS, on a 3 outils esbuild, rollup et SWR. Chacun a ses force et se trouve là pour combler les faiblesses des autres.

> **Void Zero**
>
>
> We are on a mission to build a next-generation toolchain for JavaScript that is unified, high-performance, composable, and runtime-agnostic.
>
> We are excited to announce our $4.6m seed funding led by @Accel
>
- Nitro 3 [https://nitro-viteconf-2024.pages.dev](https://nitro-viteconf-2024.pages.dev/3)
    - H3 V2 : complètement réécrit. 10x plus rapide pour les réponses, bundle 60% plus petit.  Basé sur les web standards. Nouveau moteur pour les routes.
    - Nitro v3 : output plus petit. nitropack NPM devient nitro
- 4h50 Converging Web Framework. Comment les frameworks ont adpoté “Signal” sauf React qui part vers un système de compilation. Explications rapide de signal dans Angular. Dans le futur, Signal va certainement être intégré dans le core de JS.
- 5h24 Demo avec Sqlite browser. Local First app et recherche vectorielle via LLM. Très intéressant.
- 5h38 One un framework React Multi platform https://onestack.dev/
- 9h10 Vike https://vike.dev/

### Bolt AI

Une IA capable de coder plusieurs fichiers et de sortir une app prête à déployer.

https://bolt.new/

Le code de l’app est open-source sous licence MIT. C’est basé sur Remix.

### Tauri 2.0

App IOS, Android, Linux, Apple, PC !

https://tauri.app/blog/tauri-20/

Vidéo avec Jason  https://www.youtube.com/watch?v=0BIT4kxUJDk

### SRVX

minimal serveur basé sur les fondamentaux du web (Response)

https://srvx.unjs.io/

### Shopify

Shopify passe par défaut l’API sur GraphQL. La REST API passe en legacy et à partir du 1 avril 2025, toutes les applications devront utiliser GraphQL.

https://www.shopify.com/ca/partners/blog/all-in-on-graphql

### Pan (Pan)

https://laravel-news.com/pan-php

### Mini drama Astro - Nuxt JS

https://x.com/fredkschott/status/1844446785256960401?s=61

https://x.com/danielcroe/status/1844478846210539822?s=61

### WordPress

Drame pour l’open-source et triste spectacle.

Matt est devenu incontrôlable et se comporte comme Elon Musk ou Trump.

### NuxtUI V3

Utilisation de Tailwind V4 !

https://ui3.nuxt.dev/getting-started

### Kit Figma Shadcn

https://www.figma.com/community/file/1426161867268046394/opensource-shadcn-ui-kit-for-figma

### Deno 2.0

https://deno.com/blog/v2.0

La vidéo https://x.com/deno_land/status/1844418020539846754?s=61

Deno 2 est la nouvelle version de la plateforme Deno, conçue pour simplifier le développement web moderne avec JavaScript et TypeScript. Deno se distingue par son approche "tout-en-un" sans configuration, tout en étant sécurisé par défaut et construit sur des standards web comme les Promises et les modules ES.

Les améliorations majeures de Deno 2 incluent :

- **Compatibilité avec Node.js et npm** : permet de faire fonctionner des applications Node existantes et d'utiliser des packages npm sans nécessiter `package.json` ou `node_modules`.
- **Gestion des packages simplifiée** : avec les nouvelles commandes `deno install`, `deno add` et `deno remove` pour gérer les dépendances.
- **Support pour les grands projets** : compatibilité avec les monorepos, les workspaces et les registres npm privés.
- **LTS (Long Term Support)** : une branche dédiée pour assurer des corrections de bugs critiques sur six mois pour les grandes entreprises.

Deno 2 offre également des améliorations comme un formatteur plus puissant, une prise en charge des tests Node, et la gestion des serveurs HTTP multicores. Il reste performant tout en offrant une compatibilité étendue avec les frameworks JavaScript populaires comme Next.js et Angular.

Le **registre JSR** (JavaScript Registry) permet une meilleure gestion des modules JavaScript et TypeScript, facilitant la publication et la consommation de modules dans différents environnements.

En résumé, Deno 2 cherche à combiner la simplicité et la puissance en étant rétrocompatible avec l'écosystème Node tout en offrant de nombreuses fonctionnalités modernes pour les développeurs.

Bonne écoute !




