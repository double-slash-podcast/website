---
publicationDate: 11 September 2026
status: published
author: Double Slash
categories:
  - Technology
duration: 3768
fileSize: 60291205
episodeNumber: 139
episodeType: full
explicit: false
season: 2
dsSlug: DS_139_bun
title: BunJS, l'environement JS ultime ?
subtitle: Runtime, bundler, tests et package manager — tout dans un seul binaire
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1789110154/episode/ART_139_szimen.png
description: "Bun est un toolkit tout-en-un pour JavaScript et TypeScript: runtime, gestionnaire de paquets, test runner et bundler, dans un seul exécutable. Créé par Jarred Sumner, présenté publiquement en juillet 2022 puis stable avec la 1.0 de septembre 2023, il se pose en alternative plus rapide à Node.js. On revient sur son historique et ce qu’il embarque vraiment."
videoLink: Wp0LvBiyK_M
tags:
  - bun
  - javascript
  - backend
---
Dans cet épisode, on soulève le capot de Bun : historique du JS back-end (Node, Deno, Bun), JavaScriptCore vs V8, l’effet waouh du `bun install`, workspaces et catalogues monorepo, bundler + binaire CLI, tests natifs, modules intégrés (SQLite, Redis, images, markdown…) et la polémique Anthropic / migration Rust. Pour qui c’est intéressant et pourquoi la DX compte autant que les performances.

**Liens utiles :**

- Site : https://bun.com
- Documentation : https://bun.com/docs
- Annonce 1.0 : https://bun.com/blog/bun-v1.0
- Bun rejoint Anthropic : https://bun.com/blog/bun-joins-anthropic

## Un peu d'histoire

Jarred Sumner commence Bun en 2021, bloqué par un hot reload Next.js trop lent. Il porte d’abord le transpileur JSX / TypeScript d’esbuild, puis embarque **JavaScriptCore** (le moteur de Safari) plutôt que V8, pour un démarrage plus rapide.

La preview publique, **v0.1.0**, sort en juillet 2022 : runtime pensé comme drop-in de Node.js, bundler, transpileur, test runner et package manager. La **1.0** arrive en septembre 2023. En décembre 2025, Bun rejoint Anthropic ; le projet reste open source, licence MIT.

## Ce que Bun embarque

D’après la doc officielle, `bun` est un seul binaire qui fait plusieurs métiers :

- **Runtime** : exécute JS et TypeScript (et JSX) sans outil externe, compatible Node (`fs`, `path`, `http`…) et APIs web (`fetch`, `WebSocket`).
- **Package manager** : `bun install`, jusqu’à 30× plus rapide que npm, avec cache global et workspaces.
- **Tests** : `bun test`, compatible Jest, TypeScript en premier.
- **Bundler** : `bun build` pour le navigateur et le serveur.

Côté runtime, Bun ajoute aussi des modules natifs : SQLite (`bun:sqlite`), clients SQL (PostgreSQL, MySQL), Redis, et la compilation en binaire autonome.

Bonne écoute !