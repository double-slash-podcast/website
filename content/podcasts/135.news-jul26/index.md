---
publicationDate: 01 Jul 2026
status: published
author: Double Slash
categories:
  - Technology
duration: 3169
episodeNumber: 135
episodeType: full
explicit: false
season: 2
dsSlug: DS_135_news-jul26
title: News Juillet 2026, TypeScript 7 RC, Astro 7 et des pièges pour agents IA
subtitle: Les news pour juillet 2026, TypeScript 7 RC, Astro 7, agents IA et
  outils du mois.
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1782901023/ART_135_m3vbav.png
description: Nous évoquons TypeScript 7.0 RC jusqu'à 10 fois plus rapide, Astro
  7.0 avec Sätteri et Rolldown, l'astuce de Mitchell Hashimoto pour piéger les
  PR sans review de code, Cursor sur iOS, Docker sur Vercel, Deno Desktop, Babel
  8, le framework d'agents Eve, les modèles IA Fugu et Ornith, le nouveau
  Mistral OCR 4, Firecrawl Keyless, LightOn, Linkup et Proxae.
videoLink: zap1n9Sb_B4
tags:
  - typescript
  - astro
  - satteri
  - cursor
  - vercel
  - docker
  - deno
  - babel
  - eve
  - ai
  - agents
  - mistral
  - ocr
  - firecrawl
  - fugu
  - ornith
  - linkup
  - lighton
fileSize: 50707717
---

## Mitchell Hashimoto et les pièges à agents

https://x.com/mitchellh/status/2067970516951150721

Mitchell Hashimoto (créateur de HashiCorp) partage une astuce pour détecter les agents IA qui ne relisent pas leur code : il **empoisonne** ses fichiers `AGENTS.md` et commentaires de code avec des **prompt injections** pour piéger ceux qui envoient du code non relu à un humain. Résultat : détection immédiate et bannissement. Une méthode radicale pour garantir la qualité des contributions.

## TypeScript 7.0 RC

https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/

Microsoft annonce la **Release Candidate de TypeScript 7.0**, une version majeure construite sur une nouvelle base en Go. Cette version est **jusqu'à 10 fois plus rapide** que TypeScript 6.0, tout en conservant une compatibilité totale avec les projets existants. 

TypeScript 7.0 introduit également des améliorations comme la parallélisation du type-checking, un mode `--watch` repensé, et des changements de comportement pour aligner JavaScript et TypeScript. La version stable est attendue dans le mois.

## Astro 7.0

https://astro.build/blog/astro-7/

Astro 7.0 est là, avec des **builds jusqu'à 61 % plus rapides** grâce à un compilateur Rust, un pipeline Markdown/MDX optimisé, et Vite 8 avec son nouveau bundler **Rolldown**. 

Cette version introduit aussi :

- **Advanced Routing** : Contrôle total du pipeline de requêtes via `src/fetch.ts`.
- **Route Caching** : Cache CDN pour Netlify, Vercel et Cloudflare (bêta privée).
- **Améliorations IA** : Serveur de développement en arrière-plan et logs JSON pour les agents de codage.

Astro 7.0 est conçu pour les workflows modernes, y compris l'intégration avec les agents IA.

## Sätteri

https://satteri.bruits.org

**Sätteri** est un moteur de traitement **Markdown/MDX ultra-rapide écrit en Rust**, combiné à une API flexible en JavaScript pour les plugins. Il offre le meilleur des deux mondes : la performance du Rust et l'extensibilité de l'écosystème JS.

- **~8 700 documents/seconde** (benchmark sur machine standard).
- **Compatibilité** : CommonMark, GFM, MDX, et extensions personnalisées.
- **Plugins** : Architecture modulaire pour ajouter des fonctionnalités (math, directives, etc.).
- **WASM** : Fonctionne dans le navigateur ou en Node.js.

Sätteri est le moteur utilisé par Astro 7 pour son pipeline Markdown/MDX par défaut.

## Cursor iOS

https://cursor.com/blog/ios-mobile-app

Cursor lance son **application mobile iOS**, permettant de coder en mobilité avec une réduction de 75 % sur la consommation de tokens. Idéal pour développer en déplacement.

Retour d’expérience perso : 5 heures de route (voiture en passager), mobile only, et une grosse fonctionnalité/service en sortie.

Pour souscrire à cursor (lien affilié) : https://cursor.com/referral?code=B1WRHVRW4SCM

## Docker chez Vercel !

https://vercel.com/blog/dockerfile-on-vercel

Vercel permet désormais d’exécuter **n’importe quel serveur HTTP directement depuis un Dockerfile**. Ajoutez un fichier `Dockerfile.vercel` à votre projet, et Vercel construit, stocke, déploie et met à l’échelle automatiquement l’image sur Fluid Compute, avec une tarification basée sur l’utilisation réelle du CPU. Idéal pour les apps Rails, Django, Spring Boot, Go, ou tout autre serveur HTTP.

## Deno Desktop : Créez des applications de bureau avec Deno

https://docs.deno.com/runtime/desktop/

Deno 2.9 introduit `deno desktop`, un outil pour transformer un projet Deno (fichier TypeScript, Next.js, Astro, etc.) en une application de bureau autonome. Il propose une détection automatique des frameworks, un rechargement à chaud, des liaisons en processus pour une communication fluide entre le backend et l'interface, ainsi qu'un système de mise à jour automatique par diff binaire.

## Babel 8.0.0 : ESM-only, fin du support ES5 par défaut et migration fluide

https://babeljs.io/blog/2026/06/16/8.0.0/

Babel 8.0.0 est enfin sorti après 8 ans sans version majeure. Cette mise à jour modernise Babel en le rendant **ESM-only**, en arrêtant la compilation par défaut vers ES5 (désormais basée sur les navigateurs modernes via Browserslist), et en intégrant des types TypeScript pour tous ses packages. Babel 8 nécessite Node.js 22+ et vise à simplifier la migration pour les utilisateurs.

## Introducing eve

https://vercel.com/blog/introducing-eve

Vercel introduit **eve**, un framework open-source pour construire, exécuter et scalabiliser des agents en production. Eve simplifie le développement d'agents en fournissant des fonctionnalités intégrées comme l'exécution durable, le sandboxing, les approbations humaines, les sous-agents, le traçage et les évaluations. Le framework est conçu pour éviter de réinventer la roue à chaque projet, tout comme Next.js l'a fait pour le web.

https://www.openui.com/docs/openui-lang/examples/harnesses/vercel-eve

## Sakana Fugu

https://sakana.ai/fugu-release/

Sakana AI lance **Fugu** et **Fugu Ultra**, une famille de modèles basés sur une **orchestration multi-agents autonome**. Fugu agit comme un seul modèle API, mais coordonne dynamiquement les meilleurs modèles du monde pour résoudre des tâches complexes en plusieurs étapes. 

Fugu Ultra rivalise avec des modèles comme **Fable 5** et **Mythos Preview** sur des benchmarks exigeants en ingénierie, raisonnement et sciences, tout en évitant les risques liés aux contrôles d'exportation. Le système est conçu pour offrir une **souveraineté IA**, en permettant de contourner les restrictions d'accès d'un fournisseur unique.
https://www.usine-digitale.fr/intelligence-artificielle/ia-generative/fugu-ultra-ce-modele-dia-de-pointe-venu-du-japon-qui-atteindrait-des-performances-dignes-de-claude-mythos-5-en-orchestrant-dautres-modeles-de-facon-autonome.BMZ3SVCHV5FVHNRJ3ZW4O4K44M.html

## Ornith 1.0

https://deep-reinforce.com/ornith_1_0.html

Deep Reinforce introduit **Ornith-1.0**, une famille de modèles open-source auto-améliorants spécialement conçus pour les tâches de codage agentique. Disponible en plusieurs tailles (9B Dense, 31B Dense, 35B MoE, 397B MoE), Ornith-1.0 atteint des performances de pointe sur divers benchmarks de codage, rivalisant avec des modèles comme Claude Opus 4.7. 

Le framework d'entraînement auto-améliorant permet aux modèles d'optimiser conjointement les solutions et les structures qui les guident, offrant ainsi des gains de capacité durables sans conception manuelle de harnais.

https://goodtech.info/deepreinforce-ornith-llm-open-source-code-agentique/

## Mistral OCR 4

https://mistral.ai/news/ocr-4/

Mistral annonce la sortie de **Mistral OCR 4**, un modèle de reconnaissance optique de caractères (OCR) de pointe pour l'intelligence documentaire. Il prend en charge **170 langues**, offre des boîtes englobantes, une classification des blocs et des scores de confiance intégrés, et peut être déployé en auto-hébergement. Idéal pour les workflows RAG, les agents et les pipelines de données structurées.


## Firecrawl Keyless

https://www.firecrawl.dev/blog/firecrawl-keyless-launch

Firecrawl lance **Firecrawl Keyless**, une solution pour rechercher, scraper et interagir avec le web **sans clé API**. Chaque développeur bénéficie de **1 000 crédits gratuits par mois**, automatiquement. 

Avec Firecrawl Keyless, vous pouvez rechercher des résultats en direct, scraper n'importe quelle URL pour obtenir du markdown propre, et interagir avec des pages dynamiques. Disponible via MCP, CLI et API.

## LightOn

https://lighton.ai

**LightOn** est une plateforme d'**OCR et de retrieval avancé** pour les documents, conçue pour les workflows IA en production. Elle propose trois endpoints clés :

- **/parse** : Extraction de texte structuré (PDF, images, tableaux, écriture manuscrite) avec **LightOnOCR-2** (SOTA sur OLMOCR-Bench).
- **/extract** : Récupération de champs spécifiques (numéros de facture, dates, etc.) en JSON structuré.
- **/search** : Recherche hybride (dense + sparse + late-interaction) avec **citations précises** et contrôle d'accès au niveau des chunks.

Points forts :

- **Modèles open-source** (LateOn, NextPlaid, PyLate, DenseOn) en production.
- **MCP-native** : Intégration directe avec les agents via Model Context Protocol.
- **Gouvernance** : Workspaces isolés, ACLs au niveau des chunks, et conformité RGPD/SOC 2.
- **Tarification transparente** : Gratuite pour démarrer, puis à l'usage.

Idéal pour les applications nécessitant une **recherche fiable, auditable et sécurisée** sur des corpus documentaires.

## Linkup

https://www.linkup.so

**Linkup** est une **API de recherche web de grade production** pour l'IA, utilisée par McKinsey, SNCF, Cohere, Legora, Polymarket et Artisan AI. **#1 sur le benchmark SimpleQA d'OpenAI**.

Fonctionnalités :

- **Recherche web optimisée pour l'IA** : Réponses sourcées et citées, avec extraits complets.
- **Index privé** : Créez un index dédié pour vos données propriétaires, avec contrôle d'accès.
- **Déploiement flexible** : Cloud managé ou **Bring Your Own Cloud** (BYOC) pour une conformité maximale.
- **Intégrations** : Compatible avec OpenAI SDK, LangChain, CrewAI, et bien d'autres.
- **Performances** : Précision de pointe, latence sous la seconde, SLA de 99,9%.

Cas d'usage : Agents de vente, veille corporate, détection de fuites de données, monitoring de réputation, etc.

## Proxae

https://proxae.com

**Proxae** permet de certifier vos idées, textes et fichiers dans la blockchain Bitcoin. Créez des preuves infalsifiables et vérifiables à vie, sans confiance requise. Idéal pour protéger vos créations et prouver leur antériorité.
