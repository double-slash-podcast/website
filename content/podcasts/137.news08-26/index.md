---
publicationDate: 20 Aug 2026
status: published
author: Double Slash
categories:
  - Technology
duration:
fileSize:
episodeNumber: 137
episodeType: full
explicit: false
season: 2
dsSlug: DS_137_news08-26
title: News Août 2026,
subtitle: 
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1787235734/episode/ART_137_yhshvy.png
description:
videoLink : egXl359HcNo
tags: []
---

## Xirp : L'environnement de développement agentique avec mémoire institutionnelle

https://xirp.spotify.com

Xirp est un **environnement de développement agentique** qui résout le problème de la **récupération de connaissances** pour les agents IA. Contrairement aux outils traditionnels (README, Confluence, diagrammes d'architecture), Xirp se connecte à **Portal** pour comprendre les services, la propriété, les dépendances et les décisions architecturales, offrant ainsi un contexte complet et à jour pour chaque session. Les agents ne devinent plus, ils **savent**.
On peut changer d’agent en cours de session, forker un agent.

## WebMCP : Cloudflare lance une préversion pour les agents IA

https://blog.cloudflare.com/webmcp/

Cloudflare lance une **préversion développeur de WebMCP**, un nouveau standard pour le navigateur qui permet aux agents IA d'interagir avec les sites web sans avoir à deviner leur fonctionnement. Grâce à un simple basculement dans le tableau de bord Cloudflare, les sites peuvent exposer des outils pour les agents IA, sans modifier leur code. WebMCP permet aux agents de découvrir et d'utiliser des outils directement dans le navigateur, en utilisant le **Model Context Protocol (MCP)**.

## Kitesurf : Le navigateur conçu pour les agents IA

https://blog.cloudflare.com/kitesurf/

Cloudflare annonce **Kitesurf**, un navigateur conçu spécifiquement pour les agents IA, fonctionnant entièrement sur **Cloudflare Workers**. Optimisé pour les tâches agentiques comme les captures d'écran et l'extraction de HTML, Kitesurf est **3 à 7 fois plus économe en CPU et en mémoire** que Chromium, tout en offrant une compatibilité croissante avec les sites web modernes. Il est disponible en bêta gratuite via **Browser Run** et supporte déjà plus de **215 000 tests WPT** (Web Platform Tests).

## La méthode HTTP QUERY : Une révolution pour les requêtes complexes

https://www.axopen.com/blog/2026/07/nouvelle-methode-http-query-expliquee/

L'IETF a récemment publié la **RFC 10008**, introduisant la méthode HTTP **QUERY**, conçue pour résoudre un problème récurrent : l'utilisation abusive de `POST` pour des requêtes qui devraient être des `GET` avec un payload complexe. Cette méthode est **sûre** (lecture seule) et **idempotente**, permettant ainsi la mise en cache des réponses, un avantage majeur pour les performances. Elle offre une alternative normalisée aux endpoints `POST` comme `/clients/search`, tout en conservant les avantages de la sémantique HTTP.

## Open Analytics : L'alternative à Google Analytics, sans cookies et open-source

https://getopen.so

Open Analytics est une alternative moderne à Google Analytics, conçue pour être simple, respectueuse de la vie privée et sans cookies.

## pnpm 12 : Une réécriture en Rust et de nouvelles fonctionnalités

https://pnpm.io/blog/whats-different-in-pnpm-12

pnpm 12 est une réécriture complète en Rust, actuellement en version **release candidate**. Cette mise à jour conserve les commandes, les flags et le format du lockfile de pnpm 11, mais introduit des changements majeurs : gestion des binaires globaux sensibles au projet, résolution unifiée des dépendances Git, gestion des gestionnaires de paquets, et une meilleure gestion des lockfiles pour les graphes de dépendances cycliques.

## React compiler

Porté sur Rust il y a quelques mois. Désormais disponible dans oxc et Bun.

- https://oxc.rs/blog/2026-08-18-react-compiler-support
- https://github.com/oven-sh/bun/issues/24356#issuecomment-5276435139


## Cursor migrates from SolidJS to React

https://x.com/poteto/status/2089227731305464150

## Cursor Origin

https://cursor.com/origin
https://cursor.com/docs/origin

## Mesa : Le système de fichiers versionné pour les agents IA

https://www.mesa.dev

Mesa est un **système de fichiers versionné** spécialement conçu pour les agents IA. Il permet de connecter les agents aux fichiers dont ils ont besoin, de déverrouiller des **essaims d'agents parallèles**, et de suivre automatiquement leurs modifications. Avec Mesa, les agents peuvent travailler sur des branches isolées, versionner les changements, et même revenir à des états précédents en un seul appel API. Il offre des performances exceptionnelles : des lectures/écritures en **moins de 50 ms**, un montage instantané de dépôts, et une compatibilité POSIX complète.

## Mistral : Inférence régionale, modèles ouverts et nouvelle infrastructure européenne pour une IA souveraine

https://mistral.ai/news/regional-inference-open-models-new-compute/

Mistral renforce la souveraineté de l'IA en offrant aux entreprises et aux pays un contrôle total sur les modèles, l'infrastructure et la capacité de calcul. L'entreprise étend l'accès aux modèles ouverts, introduit des **endpoints régionaux** (Europe/US) et des **niveaux de priorité** pour les charges de travail critiques, avec un SLA de disponibilité. Mistral vise également à construire jusqu'à **1 GW de capacité de calcul d'ici 2030** en Europe, via une coalition d'entreprises engagées sur le long terme pour sécuriser l'infrastructure nécessaire.

## Hetzner lance une API expérimentale d'inférence LLM open-weight

https://x.com/Hetzner_Online/status/2087099126760501364

Hetzner a lancé une **plateforme expérimentale** proposant une API d'inférence LLM open-weight, gratuite et sans SLA. Cette initiative permet aux utilisateurs de tester leurs propres cas d'usage et de partager leurs retours. Aucune garantie n'est donnée quant à sa pérennité en tant que produit permanent.

Hetzner vous offre maintenant un accès GRATUIT à Qwen 3.8 27B

## Nuxt Eval

https://nuxt.com/evals

Les résultats des évaluations des agents IA sur des tâches de génération de code Nuxt, mesurant le taux de réussite et le temps d'exécution. **Kimi K3** (OpenCode) et **Claude Fable 5** (Claude Code) obtiennent un taux de réussite de 100 %, avec des coûts moyens par évaluation estimés à respectivement **$0,311** et **$1,194**. **GPT 5.6 Sol** (Codex) et **Claude Opus 5** (Claude Code) suivent de près, avec des performances remarquables en termes de durée moyenne et de coût.

## The State of Open Source AI – Rapport Mozilla (juillet 2026)

https://stateofopensource.ai/

Le rapport inaugural de Mozilla sur l'IA open-source analyse l'écosystème actuel : **72,4 % des tokens routés sur OpenRouter** proviennent de modèles open-weight, avec des acteurs comme **Kimi K3** (4e au classement général) et **DeepSeek V4** (leader en volume). Les défis majeurs restent le **déploiement**, la **maintenance**, et l'**intégration**, tandis que les modèles ouverts dominent en adoption (79 % des développeurs) mais peinent à atteindre la production (53 % vs 63 % pour les modèles fermés).

## AI CSS

https://www.aicss.dev

## fx : Un agent de codage natif, léger et open-source

https://fx.sh

**fx** est un **agent de codage natif**, écrit en Zig, optimisé pour la recherche et l'intégrabilité au sein de systèmes plus larges. Avec un binaire de seulement **6,39 Mo**, fx se distingue par sa légèreté, sa rapidité et son approche minimaliste. Il est conçu pour démarrer instantanément (10 µs à froid), avec une empreinte mémoire minimale, ce qui le rend idéal pour les environnements contraints ou les sandboxes d'agents. fx est **open-source** (licence Apache-2.0), agnostique aux modèles et aux fournisseurs, et prend en charge le **Wasm** pour une intégration facile dans les navigateurs ou les systèmes embarqués.

## Lerd : Développement PHP local pour Linux et macOS

https://lerd.sh

**Lerd** est un outil **open-source** pour le développement PHP local sur Linux et macOS, inspiré de Laravel Herd. Il utilise **Podman en mode rootless** pour exécuter Nginx, PHP-FPM et d'autres services sans démon Docker, sans `sudo` et sans polluer le système. Il offre des **domaines `.test` automatiques**, une **TLS automatique**, des versions de PHP et Node.js **par projet**, ainsi qu'un **tableau de bord web** et une **intégration MCP** pour permettre aux assistants IA de gérer l'environnement de développement.

## CodexBar : Suivi des limites, coûts et statuts des outils d'IA

https://codexbar.app

**CodexBar** est un outil **open-source** pour macOS qui permet de suivre les **limites d'utilisation**, les **coûts** et les **statuts** des outils d'IA directement depuis la barre de menu. Il prend en charge **69 fournisseurs d'IA**, dont Codex, Claude, Cursor, OpenCode, Alibaba, Copilot, et bien d'autres. Avec des fonctionnalités comme le suivi des **fenêtres de session et hebdomadaires**, les **compteurs de réinitialisation**, et les **incidents**, CodexBar est idéal pour les développeurs qui veulent optimiser leur utilisation des outils d'IA sans dépasser leurs limites.



