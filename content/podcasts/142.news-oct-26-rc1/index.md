---
publicationDate: 7 Oct 2026
status: published
author: Double Slash
categories:
  - Technology
episodeNumber: 142
episodeType: full
explicit: false
season: 2
dsSlug: DS_142_news-oct-26-rc1
title: "News octobre 2026, Cloudflare Birthday Week, Shaders open source et LeCun à Sciences Po"
subtitle: Les news pour octobre 2026 RC1, Cloudflare, Shaders, LeCun et outils du mois.
episodeArtwork: "https://res.cloudinary.com/doubleslash/image/upload/v1791365672/episode/ART_142_c5ioxn.png"
type: news
description: "Nous évoquons la Cloudflare Birthday Week avec la CLI cf, Vinext et Clef, Shaders qui passe en open source sous MIT, Yann LeCun à Sciences Po sur les world models et JEPA, Lightpanda 1.0 hors beta, le patch sécurité Next.js 15.5.27 et 16.3.8, Turso qui rejoint Supabase, TanStack Charts 1.0, la keynote DHH pencils down avec HEY en Rust, le runtime Copilot porté en Rust, ng-native, OpenDots et OpenMuse, Upstash Blob à 1 To d’egress, un mois sans IA, Nuxt 4.6, et quelques outils comme uncheck, e2e, Zedis, Laya ou interfaces.dev, plus le débat sur la mort de l’éducation web."
videoLink: fL0A8R54fng
tags:
  - agents
  - ai
  - angular
  - cloudflare
  - copilot
  - lightpanda
  - nextjs
  - nuxt
  - rails
  - rust
  - securite
  - shaders
  - supabase
  - tanstack
  - turso
---

## TanStack Charts 1.0: grammaire de charts typée SVG/Canvas

- [Lien](https://tanstack.com/charts/latest)

TanStack Charts 1.0 sort une API stable: une grammaire de charts typée et tree-shakable pour SVG (par défaut) et Canvas. On compose marks, vues, scales, transforms, interactions et motion avec des primitives compactes ou des entrées compatibles D3. Les types restent branchés sur la ligne de données (domaines, tooltips, focus). On peut peindre une seule mark dense en Canvas tout en gardant axes, labels et tooltips en SVG dans la même définition. Bundle annoncé autour de 32 kB gzip pour une line React basique. Themes CSS, export, adapters web/vanilla/static, React Native encore expérimental. Inspiré Observable Plot / ggplot2, runtime indépendant.

## Upstash Blob offre 1 To d’egress gratuit par mois

- [Lien](https://upstash.com/blog/upstash-blob-now-includes-1-tb-of-free-egress-every-month)

Sur le plan pay-as-you-go, Upstash Blob inclut désormais 1 To d’egress gratuit chaque mois. Au-delà, la bande passante sortante passe à 0,02 $/Go, soit bien moins que S3 (0,09 $/Go après 100 Go partagés) ou Vercel Blob. Stockage à 0,02 $/Go/mois, lectures à 0,30 $ le million d’ops, uploads/copies/listes à 4,50 $ le million. Upload bandwidth et deletes restent gratuits. Les fichiers publics passent par le CDN Cloudflare sans frais CDN en plus, au même tarif cache ou origin. Le free plan inchangé: 1 Go de stockage et 10 Go d’egress, sans carte bancaire. Buckets S3-compatibles, uploads navigateur et SDK typé, même compte que Redis, QStash et Workflow.

## Turso rejoint Supabase pour les bases agentiques

- [Lien](https://turso.tech/blog/turso-is-joining-supabase)

Turso (SQLite cloud “many databases”, réécrit pour le serveur avec écritures concurrentes et archi diskless WAL-on-S3) est acquis par Supabase. L’idée: bases légères instantanées pour chaque agent, puis passage fluide vers Postgres Supabase (jusqu’à Multigres) quand ça grossit. La plateforme Turso continue, l’open source reste ouvert, intégrations plus profondes à venir. Glauber Costa devient Head of Agentic Services chez Supabase, avec Pekka Enberg et l’équipe. Clients cités côté agents: Superhuman, Sauna.ai, Mastra.

## Lightpanda 1.0: le browser headless Zig sort de beta

- [Lien](https://lightpanda.io/blog/posts/lightpanda-1-0)

Après ~2 ans et 10k commits, Lightpanda quitte la beta. Moteur Zig sans rendu graphique, JS via V8 15.5, pilotable Puppeteer/Playwright/Selenium/ChromeDP, plus `pip`/`npm`, MCP et CLI (HTML, markdown, arbre sémantique, mode agent). ~1,74M de sous-tests WPT passent (~80% de Chrome; l’écart est surtout CSS/SVG/édition). CORS est activé par défaut, avec durcissement cookies, filtrage réseau, resources opt-in. En prod chez des acteurs d’agents/indexation (jusqu’à des dizaines de millions de pages/jour); retours type 4× plus rapide et 6× moins cher que Chromium. Compatible Hermes Agent et agent-browser (`--engine lightpanda`).

## ng-native: des apps natives Angular via Expo

- [Lien](https://ng-native.com)

ng-native fait tourner Angular sur du vrai native: Renderer2 qui dessine des UIView et android.view.View via Expo, pas de WebView. Templates, signals et services comme sur le web, CSS compilé au build (cascade, custom properties, media queries, transitions) plus Tailwind v4 avec variantes ios:, android: et dark:. Router Angular sur stacks/tabs natives, hot reload qui garde l’état, Signal Forms, listes virtualisées, ng-icons, Reanimated, tests Testing Library en Node et E2E Maestro. Stack annoncée: Angular 22, Expo SDK 57. Même composants réutilisables sur le web, starter avec AGENTS.md et docs en llms.txt.

## Cloudflare Birthday Week 2026: 46 annonces, CLI cf, Vinext et Clef

- [Lien](https://blog.cloudflare.com/birthday-week-2026-wrap-up/)
- [Lien](https://blog.cloudflare.com/tag/birthday-week/)
- [Lien](https://blog.cloudflare.com/cloudflare-cf-cli-launch/)
- [Lien](https://blog.cloudflare.com/vinext-nextjs-on-vite/)
- [Lien](https://blog.cloudflare.com/voidzero-update/)
- [Lien](https://blog.cloudflare.com/real-time-issue-detection/)
- [Lien](https://blog.cloudflare.com/clef-decision-models/)

Cloudflare a publié le récap officiel de sa Birthday Week 2026 (28 septembre au 2 octobre): 46 annonces classées jour par jour, autour de l’open source, de la sécu, de l’économie agentique, de la plateforme développeur et de l’observabilité. Le wrap-up liste chaque lancement avec un lien; le tag Birthday Week du blog regroupe les articles un par un. Signal Over Noise trie ce qui compte vraiment (crawlers, Pay Per Use, AI Gateway, cf CLI, EmDash) et ce qu’on peut sauter. Côté stack: le CLI `cf` avec Forge pour couvrir toute l’API, Vinext 1.0 pour faire tourner Next.js sur Vite, un point d’étape VoidZero (Oxfmt, tsgolint, Bundled Dev), Workers Issues qui envoie erreurs et traces aux agents de code, et Clef, modèles de décision open source pour classification et workflows agents.

## Laya: modèle de décisions typées non-autorégressif (~33 ms)

- [Lien](https://huggingface.co/convaiinnovations/laya)
- [Lien](https://github.com/NandhaKishorM/laya)

Laya est un modèle de décision System 1 non-autorégressif (Apache 2.0, Convai Innovations): on lui passe un état (texte, email, ticket, JSON) et des questions typées (`choice`, `score`, `noul`), il répond en un seul forward pass (~33 ms) avec des probabilités calibrées, sans générer de texte. Trois checkpoints: anglais (ModernBERT-large, 421M), multilingue 100+ langues (mmBERT-base, jusqu’à 8k tokens), et `typed-decisions` fine-tuné (0.766 de précision sur le bench interne). Le `Router` détecte la langue/script et route vers le bon checkpoint. Pip: `pip install laya`, extras serve/MCP/LangChain/ONNX. Limites honnêtes: le zero-shot sur typed-decisions est faible sans fine-tune, et les grilles à 50+ options demandent d’augmenter `head_max_len`. Concurrent intéressant de TypeSafe Jev, open weights et self-host.

## Rails World 2026: pencils down, HEY en Rust, Rails mort ?

- [Lien](https://double-slash.dev/articles/dhh-a-tue-rails/)
- [Lien](https://michaelbensoussan.com/posts/rails-est-il-fini/)

Deux lectures de la keynote DHH à Rails World 2026. Sur Double Slash, Patrick recentre: ce n’est pas « Rails is dead », c’est « pencils down » chez 37signals (agents par défaut, code à la main en exception), rebuild HEY en six apps natives + backend Rust, Rails repositionné pour le web conventionnel lisible par les agents. Côté Michael Bensoussan: Rails n’est ni mort ni « done »; il liste ce qui manque encore (Inertia/Vite au `rails new`, Active LLM, AGENTS.md, form objects, soft delete, notifications, feature flags, SEO/llms.txt…) et le piège omakase quand le chef (DHH) part sur Rust et des positions politiques toxiques. Ensemble: débat stack vs métier, ownership d’archi, et ce que Rails devrait encore embarquer.

## La mort de l’éducation web selon molily

- [Lien](https://molily.de/web-dev-education/)

Essai de molily (sept. 2026) sur l’impact du GenAI sur l’éducation web. Il relie Baldur Bjarnason (formations et ebooks en chute, « éducation » via chatbots), Axel Rauschmayer (revenus livres à zéro, trafic crawlers IA, blog/livres offline), Salma Alam-Naylor (DevRel, sortie du public), Josh Comeau (−50 %+ de revenus courses), Kyle Cook / Web Dev Simplified (vues et revenus divisés par deux) et Rachel Andrew (édition technique, erreurs IA, productivité déplacée). Contre le « adapte-toi », il défend le paiement du travail éducatif, les communautés d’apprentissage indépendantes et un web démocratique, face à l’appropriation par les big AI.

## interfaces.dev: cheat sheet UI, anim, typo et a11y

- [Lien](https://interfaces.dev/cheat-sheet)

Une cheat sheet interactive de règles d’interface, avec exemples bad/good. UI: border-radius concentriques, alignement optique, padding asymétrique bouton+icône, profondeur via box-shadow, outline 1px sur images, stroke d’icône aligné au texte. Anim: transform-origin depuis le trigger, menus fréquents sans entrée, pas de `transition: all`, scale press 0.95–0.98, transitions CSS vs keyframes, respect du dark mode sans transition, reduced motion. Typo: woff2, tabular-nums, mesure 60–75, text-wrap balance/pretty. Couleurs: tokens sémantiques, palette dark dédiée. A11y: éléments natifs, focus-visible, aria-label, hit areas, etc. Plus layout et writing (verbes sur boutons, empty states).

## Zedis: GUI Redis native (GPUI) pour gros keyspaces

- [Lien](https://zedis.net)
- [Lien](https://github.com/vicanso/zedis)

Zedis est un client Redis/Valkey desktop open source (Apache-2.0), stack GPUI comme Zed, pas Electron. SCAN virtual-scrolled pour millions de clés, viewers JSON/Protobuf/MessagePack/JWT/compression/images, Streams, Pub/Sub, Geo. Prod-safe: tags d’env, read-only, secrets chiffrés localement, zéro télémétrie. Observabilité: métriques, memory analyzer (live ou RDB), Slow Log, MONITOR, cluster. Import depuis Redis Insight / ARDM / Tiny RDM. macOS/Windows/Linux (v0.12.1) plus version WASM self-hostée en Docker avec MCP lecture seule pour les agents.

## e2e: framework de tests IA open source (TesterArmy)

- [Lien](https://tester.army/e2e)
- [Lien](https://github.com/tester-army/e2e)

TesterArmy sort e2e, un runner TypeScript Apache-2.0 pour web (Playwright) et mobile (iOS/Android). Tu mélanges locators/`expect` déterministes et goals agent (`agent.act`, `assert`, `waitFor`, `extract`) dans le même test. Les `act` validés se rejouent depuis un cache (commit `.e2e/cache/`) sans rappel modèle; si l’UI a bougé, l’agent reprend. Bonus: `e2e explore` (scout sans fichier de test), bug bashes, MCP pour Claude Code/Cursor, skill agents, BYO model (Gateway, OpenRouter, abonnements…). `npx e2e init`, Node ≥24.8 (ou 22.22.3+). Différent du SaaS TesterArmy: ici les tests vivent dans le repo.

## Shaders ouvre son moteur WebGPU et ses composants sous licence MIT

- [Lien](https://shaders.com/updates/shaders-is-open-source)

Le 6 octobre 2026, Shaders annonce l’ouverture en open source (licence MIT) de son moteur de rendu, de ses composants shader et des bindings frameworks. L’objectif : rendre les effets WebGPU accessibles aux design engineers sans devenir graphistes GPU, et servir de base pour les humains comme pour les agents IA. On peut utiliser les composants en perso comme en commercial sans licence dédiée, exporter le code depuis l’éditeur gratuitement, et écrire ses propres composants via defineShader (encore expérimental), avec contributions bienvenues. Shaders Pro reste l’offre payante : plus de 1000 presets, sections préfabriquées, rendu vidéo/images, Discord et support prioritaire. Les prix ne changent pas.

## skilld.dev: trouver, tester et suivre des skills d’agents en open source

- [Lien](https://x.com/harlan_zw/status/2107493408709414969)
- [Lien](https://skilld.dev)
- [Lien](https://github.com/skilld-dev/skilld)

Harlan Wilton (@harlan_zw) lance skilld.dev, un écosystème open source de partage d’Agent Skills (des dossiers avec un `SKILL.md` au format Agent Skills) qui se présente comme une alternative à skills.sh. Quatre étapes: Find (skills trending classées selon le nombre de devs distincts qui en parlent dans la semaine, plus `skilld search`), Preview (des démos, chacune un run enregistré: le prompt et ce que l’agent a produit avec la skill), Run (`skilld run` affiche le `SKILL.md` sans rien écrire sur le disque, pour la session en cours; fork pour l’éditer en gardant auteur et licence; `skilld install` pour la garder dans un projet) et Watch (digest mensuel par email quand les skills suivies changent, `skilld changes`). Les skills restent dans les repos GitHub de leurs auteurs: chaque page crédite l’auteur, pointe le fichier exact et note le commit d’origine. Le CLI (MIT, binaire natif, sans télémétrie) installe une même skill pour 19 agents (Claude Code, Codex, Cursor, Gemini CLI, Zed…), épingle chaque install sur un commit dans un lockfile et vérifie digest et attestation avant d’écrire. Côté intégration: serveur MCP (ChatGPT, Claude, Cursor, VS Code…), API décrite en OpenAPI avec SDK TypeScript, plugin Claude Code, et une skill `skilld` qui apprend à l’agent à chercher ses propres skills.

## Yann LeCun à Sciences Po : world models, JEPA et souveraineté IA

- [Lien](https://www.youtube.com/watch?v=Y4s8NadbZfU)

Conférence à Sciences Po (rentrée 2026-2027) avec Yann LeCun, fondateur d’AMI (Advanced Machine Intelligence), et Éric Azan. LeCun critique la pause sur l’IA et le discours d’Anthropic / Effective Altruism sur les risques existentiels, qu’il voit comme un argument pour capturer le marché via la régulation et freiner l’open source. Il rappelle le chemin des réseaux de neurones jusqu’au deep learning, puis le succès des LLM par prédiction du prochain mot, tout en affirmant que le texte seul ne mène pas à une intelligence de niveau humain : un enfant de 4 ans voit autant d’information via la vision que les plus grands LLM via le web. La voie proposée : des world models type JEPA (prédiction dans un espace de représentations abstraites), utiles pour la robotique et moins gourmands en mémoire. Pour l’Europe, il mise sur cette prochaine révolution plutôt que sur la course aux LLM, et sur l’open source / Project Tapestry pour mutualiser les connaissances culturelles. Il privilégie réguler les usages (auto, médical) plutôt que la R&D en amont.
