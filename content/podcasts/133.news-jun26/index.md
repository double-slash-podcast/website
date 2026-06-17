---
publicationDate: 3 Jun 2026
status: published
author: Double Slash
categories:
  - Technology
duration: 
episodeNumber: 133
episodeType: full
explicit: false
season: 2
dsSlug: DS_133_news-juin26
title: News Juin 2026, Bun passe à Rust, npm verrouille les scripts et SEO pour l'IA
subtitle: Les news pour juin 2026, sécurité npm/Composer, Bun porté en Rust, SEO IA et outils MCP.
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1780480242/episode/ART_133_tt4h5f.png
description: Nous évoquons le portage de Bun de Zig vers Rust par des agents IA, npm qui bloque par défaut les scripts postinstall non approuvés, Composer 2.10 qui filtre nativement les paquets malveillants, Windsurf absorbé par Devin Desktop, le guide SEO de Google optimisé pour les IA, MCP Chrome DevTools, Kimi WebBridge et quelques outils comme Perry, Osaurus ou Liquid Dom.
videoLink : lS9ZDxoTzNo
tags: ["npm", "bun", "rust", "zig", "composer", "windsurf", "devin", "google", "seo", "ai", "mcp", "chrome", "devtools", "kimi", "perry"]
---

## Composer 2.10

**Filtrage natif des logiciels malveillants**

- Intègre une détection automatique des paquets malveillants publiés sur Packagist.org, alimentée par Aikido.
- Les versions de paquets malveillantes sont bloquées lors des opérations `composer update`, `require` et `install`.
- Le logiciel malveillant est également signalé par `composer audit`, qui échoue par défaut en cas de détection.

https://blog.packagist.com/composer-2-10-release/

## NPM

pnpm bloque les scripts preinstall et postinstall, yarn v4 aussi.  
Actuellement, npm autorise les scripts preinstall et postinstall par défaut.
Pour désactiver les scripts, utilisez l'option --ignore-scripts :

```bash
npm install --ignore-scripts
```

npm v11.16

- Phase 1 - PR fusionné
- package.allowScripts = []
- Avertissements sur les scripts postinstall non approuvés

npm v12.0

- Phase 2 - Prochain PR à venir
- Bloque par défaut les scripts postinstall non approuvés

https://x.com/sebastienlorber/status/2059659115228508376?s=20

## Utiq

https://korben.info/utiq-identifiant-publicitaire-telcos.html

## Windsurf est mort, Vive DevinDesktop

https://devin.ai/blog/windsurf-is-now-devin-desktop

## Perry

TS to native **macOS, iPadOS, iOS, Android, Linux, Windows, watchOS, tvOS, WebAssembly, and the Web**

https://www.perryts.com

## Kimi WebBridge

https://www.kimi.com/features/webbridge

## MCP Chrome dev tools

https://developer.chrome.com/blog/devtools-for-agents-v1

## IS AI Profitable

https://isaiprofitable.com

## SEO GEO les infos de Google

https://developers.google.com/search/docs/fundamentals/ai-optimization-guide?hl=fr

## Bun en Rust

- https://rust.developpez.com/actu/382917/Bun-la-boite-a-outils-JavaScript-sur-laquelle-tourne-Claude-Code-en-train-d-etre-portee-de-Zig-vers-Rust-par-des-agents-IA-Entre-experience-prometteuse-et-signal-d-alarme-les-developpeurs-sont-partages/

- https://github.com/oven-sh/bun/pull/30412

## Osaurus

https://osaurus.ai

## OMLX

https://omlx.ai

## Liquid Dom

https://github.com/AndrewPrifer/liquid-dom

## OpenHare

https://sjjian.github.io/openhare/

## TablePro

https://omlx.ai

## Formisch

https://formisch.dev


## Attention aux Skills

https://www.youtube.com/watch?v=WNJHMoHTrBU
