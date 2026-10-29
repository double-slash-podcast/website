---
publicationDate: "29 Oct 2026"
status: "published"
author: "Double Slash"
categories:
  - "Technology"
episodeNumber: 145
episodeType: "full"
explicit: false
season: 2
dsSlug: "DS_145_news-oct-26-rc3"
title: "News octobre 2026, adieu Arc, Brotli fait trembler Node et Nuxt souffle ses 10 bougies"
subtitle: "Les news pour octobre 2026, TanStack AI et Redact, Mistral, le coût IA des frameworks et outils du mois."
episodeArtwork: "https://res.cloudinary.com/doubleslash/image/upload/v1793267726/episode/ART_145_o6yatk.png"
type: "news"
description: "Nous évoquons la fin d'Arc au profit de Dia, Sumi.css, les 10 ans de Nuxt, le framework Rust Proa, TanStack Redact, le skill next-bundle-optimizer de Next.js, TanStack AI 1.0, la faille Brotli corrigée dans Node.js et Bun, les certificats eMudhra compromis, GitHub Copilot Fusion, Timestral et la Responses API de Mistral, le benchmark de Nolan Lawson sur le coût IA des frameworks JS, et runonweb pour faire tourner des modèles d'IA dans le navigateur."
videoLink: "6NdvWVH4F9Y"
tags:
  - "agents"
  - "ai"
  - "arc"
  - "bun"
  - "css"
  - "mistral"
  - "nextjs"
  - "nodejs"
  - "nuxt"
  - "python"
  - "react"
  - "rust"
  - "securite"
  - "tanstack"
duration: 3431
fileSize: 54904837
---

## Arc s'arrête définitivement le 22 décembre 2026 au profit de Dia

- [Site d'Arc](https://arc.net/)
- [Calendrier de fin d'Arc (centre d'aide)](https://resources.arc.net/hc/en-us/articles/44412972248471-Arc-Sunset-Key-Dates-and-What-to-Expect)
- [Annonce d'Arc sur X](https://x.com/arcinternet/status/2113301454597640570)

C'est la fin officielle pour Arc : annoncé le 22 octobre, le navigateur s'arrêtera définitivement le 22 décembre 2026. L'équipe explique vouloir concentrer tous ses efforts d'ingénierie et de sécurité sur Dia, son nouveau navigateur reparti de zéro pour répondre aux standards de sécurité actuels à l'ère de l'IA.

Le calendrier est serré. Depuis le 22 octobre, on ne peut plus créer de compte Arc. Le 23 novembre, les fonctions IA (dont Browse for Me) et la synchro s'arrêtent sur Arc Search mobile. Et le 22 décembre, Arc sur macOS et Windows cessera carrément de fonctionner : impossible de se connecter ou d'ouvrir ses onglets, tous les comptes seront désactivés et les données personnelles supprimées sous 30 jours (date limite au 15 décembre pour en demander une copie). Sur mobile, Arc Search iOS restera utilisable en navigateur allégé, mais l'application Android sera retirée du Play Store et des appareils.

Pour récupérer ses billes avant le 22 décembre, deux options : exporter ses Spaces et onglets en liste de liens depuis les réglages, ou tout importer en quelques clics dans Dia (gratuit sur macOS et Windows, avec IA optionnelle), qui reprend la sidebar verticale, les onglets épinglés, les dossiers (Tab Groups) et transforme les Spaces en Profiles.

## Sumi.css : un framework CSS classless de 6,7 Ko, dark mode inclus

- [Documentation Sumi.css](https://vladocar.github.io/Sumi.css/docs.html#theming)
- [Dépôt GitHub Sumi.css](https://github.com/vladocar/Sumi.css)

Sumi.css, c'est le nouveau framework CSS minimaliste de Vladimir Carrer (vladocar). Le principe est simple : tu écris du HTML sémantique propre et la page a déjà l'air finie. Titres, formulaires, tableaux, cartes (`<article>`), accordéons (`<details>`), modales (`<dialog>`), navigation, barres de progression ou toggles sont stylés directement depuis l'élément, sans la moindre classe. Les classes ne servent que quand tu veux un truc précis, comme `.grid`, `.prose`, `.striped` ou `.callout`.

Le tout tient dans un seul fichier de 6,7 Ko minifié et gzippé, sans JavaScript, sans dépendance et sans étape de build. Les styles des éléments ont une spécificité nulle, donc ton CSS gagne toujours, sans `!important`.

Côté theming, tout passe par des variables CSS préfixées `--s-*` (`--s-primary`, `--s-bg`, `--s-text`, `--s-radius`, `--s-font-sans`...) que tu surcharges sur `:root` ou sur n'importe quel élément pour thémer juste une zone. Le mode clair ou sombre suit automatiquement le réglage système, et `data-theme="light"` ou `"dark"` permet de forcer l'un ou l'autre. La v1.0 est sortie en octobre 2026, sous licence MIT, installable en copiant `sumi.min.css` ou via jsDelivr.

## Nuxt fête ses 10 ans : d'un prototype en une semaine à 1 294 contributeurs

- [Vidéo anniversaire de Nuxt sur X](https://x.com/nuxt_js/status/2114768565261988080)
- [Dépôt GitHub Nuxt](https://github.com/nuxt/nuxt)
- [Interview de Sébastien Chopin (Monterail)](https://www.monterail.com/blog/the-future-of-nuxt-interview-with-sebastien-chopin)
- [Blog Nuxt](https://nuxt.com/blog)

Nuxt a 10 ans. Le premier commit du dépôt nuxt/nuxt date du 26 octobre 2016, et l'équipe a marqué le coup le 26 octobre 2026 avec une courte vidéo qui raconte le projet par ses contributeurs : 1 en octobre 2016, 85 à la sortie de Nuxt 1.0 en janvier 2018, 620 au moment de Nuxt 3.0 en novembre 2022, 1 156 après Nuxt 4.0 à l'été 2025, et 1 294 aujourd'hui.

Au départ, c'est un défi que s'était lancé Sébastien Chopin : construire en une semaine l'équivalent de Next.js pour Vue.js. Le prototype a vite trouvé son public dans la communauté Vue. Ensuite, Nuxt 2.0 en septembre 2018, Nuxt 3 reconstruit sur Vue 3, Vite et Nitro, puis Nuxt 4 en juillet 2025, le mois où NuxtLabs a rejoint Vercel.

Le dépôt dépasse aujourd'hui les 61 000 étoiles sur GitHub. Pas d'annonce produit avec l'anniversaire : la dernière version en date reste Nuxt 4.6, sortie le 5 octobre 2026.

## Proa: un framework web en Rust qui rend un même composant en HTML, Markdown et plus

- [Site de Proa](https://proa.so)
- [Dépôt GitHub Proa](https://github.com/proa-labs/proa)
- [Documentation Proa](https://proa.so/docs)
- [Proa UI](https://ui.proa.so)
- [Benchmarks Proa](https://github.com/Proa-Labs/proa-benchmarks)

Proa est un framework web en Rust « batteries incluses », open source sous licence Apache 2.0, construit autour d’une idée: un seul composant typé peut produire plusieurs rendus, du HTML complet pour les humains, du JavaScript ciblé pour le navigateur et du Markdown dense pour les agents, d’autres cibles (JSON, backend natif) pouvant être ajoutées. Les composants s’écrivent avec des macros html_sync! ou md_sync! validées à la compilation, et le framework réunit dans un même WebContext le routing, les layouts, les formulaires, le chargement de données via DataLoader et le streaming SSR, dans l’ordre ou désordonné avec des boundaries Suspense. L’interactivité passe par des îles RSJS: on écrit signaux et handlers en Rust, et le compilateur ne génère que le JavaScript de ces îles, avec un runtime partagé d’environ 1,3 Ko gzippé. Pas besoin de tout réécrire: Proa s’utilise nativement avec Axum ou via FFI depuis Node, Python, Ruby, Go ou Java, et on peut lui confier une seule route à côté d’une app Next.js ou Rails. Sécurité par défaut (échappement automatique, protection cross-origin, en-têtes) et vérifications WCAG/WAI-ARIA au cargo build complètent le tableau, avec Proa UI, 58 composants façon shadcn dont le code vit dans votre dépôt, certains gratuits, d’autres payants. Côté performances, Proa avance un rendu médian de 23,5 µs contre 5,56 ms pour renderToString de React, soit 237 fois plus rapide selon ses propres mesures sur des reproductions de GitHub, Sentry et Airbnb. Le projet est très jeune: dépôt créé en septembre 2026 et crates en version 0.3.

## TanStack Redact : un runtime React plus léger, sans toucher au code de l'app

- [Documentation TanStack Redact](https://tanstack.com/redact/latest)
- [Dépôt GitHub TanStack Redact](https://github.com/TanStack/redact)
- [Paquet npm @tanstack/redact](https://www.npmjs.com/package/@tanstack/redact)
- [Annonce de TanStack sur X](https://x.com/tan_stack/status/2114748369470128216)
- [Post de Tanner Linsley sur X](https://x.com/tannerlinsley/status/2114749335766475259)

TanStack sort Redact 0.2, un runtime alternatif pour les applis React existantes. On garde ses composants, ses hooks et ses imports, on ajoute le plugin à la config de build (un `redact()` dans `vite.config.ts`, par exemple) et le bundle client maigrit, sans changer une ligne de code applicatif. Redact s'intègre à TanStack Start, Vite, Vinext et Next.js.

Les chiffres annoncés par TanStack, sur des applis de démarrage (JS + CSS client, gzip) : de 110 Ko à 60-63 Ko avec TanStack Start (43 % de moins), de 69 Ko à 13-21 Ko avec Vite (70 %), de 139 à 99 Ko avec Vinext (28 %) et de 176 à 140 Ko avec Next.js (20 %). Avec Vinext et Next.js, le serveur reste en React : rendu serveur, Server Components, cache et actions. Redact prend le relais dans le navigateur pour l'hydratation et les composants client. Sur Start et Vite, on peut descendre encore en coupant des features, ou partir du preset `nano`.

Le compromis : Redact rend de façon synchrone, sans le time slicing ni les rendus interruptibles de React. Une suite de compatibilité tourne dans Chromium, Firefox et WebKit, App Router et Pages Router compris. Tanner Linsley explique que l'équipe s'en sert tous les jours et que d'autres le font déjà tourner en production. Le paquet `@tanstack/redact` est sous licence MIT.

## next-bundle-optimizer : le skill qui fait maigrir les bundles Next.js avec ton agent

- [Annonce sur le blog Next.js](https://nextjs.org/blog/ship-less-javascript-with-ai)
- [Skill next-bundle-optimizer (GitHub)](https://github.com/vercel/next.js/tree/canary/skills/next-bundle-optimizer)
- [Guide Next.js sur le bundling](https://nextjs.org/docs/app/guides/package-bundling)
- [Annonce de Next.js sur X](https://x.com/nextjs/status/2115502355554951335)

Chez Vercel, des agents de code ont retiré près de 2 Mo de JavaScript compressé sur v0 et vercel.com. L'outil derrière, c'est le Bundle Analyzer de Turbopack, arrivé dans Next.js 16.1, et un nouveau skill d'agent livré avec Next.js 16.4 : next-bundle-optimizer.

Pour l'installer : npx skills add vercel/next.js --skill next-bundle-optimizer, puis /next-bundle-optimizer dans ton agent. Il faut Turbopack, le bundler par défaut depuis Next.js 16.

La méthode est réutilisable. L'agent exporte les snapshots de next analyze en JSON, reconstruit le graphe des modules et des chunks, repère les gros groupes de modules connectés et remonte leurs chaînes d'import. Il cherche ensuite le plus petit ensemble de frontières d'import à couper pour différer ce code. Exemple classique : un composant chargé en lazy, mais qu'un autre module importe en statique. Résultat, il part quand même dans le bundle initial. Le skill détecte aussi les dépendances en double, le tree shaking raté et la logique qui pourrait passer en Server Components.

Par défaut, il fait un audit et propose des correctifs sans toucher au code. Avec /next-bundle-optimizer fix, il applique les changements, relance l'analyse et compare les snapshots.

Quelques cas concrets chez Vercel : un éditeur de code expérimental chargé sur presque toutes les pages de v0 (150 Ko de gagnés), le rendu markdown et les graphiques de Vercel Agent envoyés même panneau fermé (255 Ko sur le dashboard), ou un utilitaire de parsing d'URL qui embarquait tout le moteur de requêtes d'observabilité (125 Ko sur la page des déploiements).

Pour ceux qui préfèrent regarder eux-mêmes, next analyze affiche maintenant les routes les plus lourdes, compare les snapshots et isole le chemin critique de rendu. Next.js est open source sous licence MIT, et le skill est public dans le dépôt vercel/next.js.

## TanStack AI 1.0 passe en stable, avec un harness d'agents expérimental

- [Annonce sur le blog TanStack](https://tanstack.com/blog/tanstack-ai-1-0)
- [Documentation TanStack AI](https://tanstack.com/ai/latest)
- [Annonce de TanStack sur X](https://x.com/tan_stack/status/2113571142539878687)
- [Post de Tanner Linsley sur X](https://x.com/tannerlinsley/status/2113587483065962811)
- [Second post de Tanner Linsley sur X](https://x.com/tannerlinsley/status/2114445362765398319)

TanStack AI sort en 1.0 stable le 23 octobre 2026. Le SDK TypeScript couvre le chat, les tools, la voix, la génération d'images, le MCP, la persistance, les sandboxes et les agents, toujours avec la même promesse : pas de lock-in. Tu choisis ton modèle, ton framework UI et ton infra. Au compteur : 23 adaptateurs de providers (plus un `openaiCompatible` pour toute API façon OpenAI), React, Vue, Solid, Svelte, Preact, Angular, Octane, Remix et vanilla JS côté UI, et 11 providers de sandbox.

La 1.0 n'ajoute pas de nouveau concept : elle fige les API du core et supprime tout ce que la 0.x marquait comme déprécié. Pour migrer, un codemod gère les renommages (`body` devient `forwardedProps`, `conversationId` devient `threadId`), `threadId` devient obligatoire côté client comme côté serveur, et tu dois monter tous les paquets `@tanstack/ai*` stables en même temps.

La grosse nouveauté, c'est `@tanstack/ai-harness`, encore expérimental et en 0.x : des sessions durables qui survivent à un redéploiement, des agents typés, des plugins, et de quoi monter ton propre agent de code utilisable en terminal, en HTTP, en agent ACP ou en serveur MCP. Depuis la RC, on note aussi les sous-agents, le prompt caching automatique et WebMCP dans les deux sens. Et Tanner Linsley laisse entendre qu'une autre annonce arrive mardi.

## Node.js 22, 24 et 26 : release de sécurité avec une RCE dans le décodeur Brotli

- [Bulletin de sécurité Node.js](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases)
- [Bulletin Vercel](https://vercel.com/kb/bulletin/node-js-security-advisory)
- [Post de Vercel sur X](https://x.com/vercel_dev/status/2113048861526852004)
- [Post de Guillermo Rauch sur X](https://x.com/rauchg/status/2113050053724221732)
- [Post de Daily CyberSec sur X](https://x.com/Daily_CyberSec/status/2112934202412826673)
- [Fiche CVE-2026-111497](https://www.cve.org/CVERecord?id=CVE-2026-111497)
- [Avis GitHub GHSA-9v8h-qqgm-4m35](https://github.com/advisories/GHSA-9v8h-qqgm-4m35)
- [Commit du correctif Brotli](https://github.com/google/brotli/commit/0ed4268a4401abcb4472096340477cf4af7d1a2b)
- [Release Brotli 1.2.1](https://github.com/google/brotli/releases/tag/v1.2.1)
- [Release Node.js 24.22.1](https://nodejs.org/en/blog/release/v24.22.1)
- [Annonce de Bun 1.4.4](https://bun.com/blog/bun-v1.4.4)
- [Issue GitHub Bun](https://github.com/oven-sh/bun/issues/46352)

Le 21 octobre, Node.js a sorti 22.23.4, 24.22.1 et 26.12.1 avec dix CVE corrigées. La plus grave, CVE-2026-111497, n'est pas dans le code de Node lui-même : elle vient de Brotli, la lib de décompression de Google que Node embarque dans ses dépendances.

Le bug : quand le décodeur tombe sur un « block switch » invalide, il le prend pour un simple besoin de données supplémentaires au lieu d'une erreur de format définitive. En streaming, il continue donc d'empiler les octets reçus dans un buffer interne de 8 octets, et déborde. C'est une écriture hors limites : crash, fuite de mémoire du process, voire exécution de code à distance. Node la classe « high », la fiche CVE publiée par Google lui met 9,2 en CVSS 4.0, donc critique.

Qui est exposé : toute app qui décompresse du Brotli venu de l'extérieur avec `node:zlib`. Et ça arrive plus souvent que tu crois. `fetch()` décompresse tout seul les réponses en `Content-Encoding: br`, donc un serveur malveillant que ton app appelle (webhook, URL fournie par un utilisateur) suffit. Côté serveur, Express 5 et body-parser 2 décompressent les corps de requête en `br`. Un serveur `node:http` nu, lui, ne le fait pas.

La chronologie vaut le détour. Le correctif est arrivé dans le repo public de Brotli le 27 février 2026, sous un message anodin : « Detect and report invalid stream earlier ». La faille, signalée par Khai Tran et Sylvie Mayer d'OpenAI Codex Security, n'a été traitée comme telle qu'en octobre : pré-annonce Node le 14, CVE réservée par Google le 16, release Node le 21 avec ce commit, Brotli 1.2.1, 1.1.1 et 1.0.10 le même jour, fiche CVE publique le 22. Au 23 octobre, la CISA ne signalait aucune exploitation active.

Bun embarquait le même décodeur sans patch : toutes ses versions sont touchées jusqu'à Bun 1.4.4, sortie le 22 octobre avec le correctif. Et ça dépasse le JS : Envoy, les paquets Python brotli et brotlicffi ou le paquet brotli de Debian ont aussi dû être patchés.

Ce que tu fais maintenant :

- Passe sur Node 22.23.4, 24.22.1 ou 26.12.1, ou plus récent. Les lignes en fin de vie (20, 23, 25) n'auront pas de correctif.
- Côté Bun, 1.4.4 minimum.
- Vérifie tes images Docker : un tag figé comme `node:24.22.0` reste vulnérable, même rebuildé. Change le tag et redéploie.
- Recompile tout ce qui embarque le runtime, comme les exécutables SEA ou `bun build --compile` : ils gardent le Node ou le Bun avec lequel ils ont été construits.
- Si ton Node vient d'un paquet de distro lié à la libbrotli système, mets aussi à jour le paquet brotli.
- En attendant, tu peux rejeter les requêtes `Content-Encoding: br` au niveau du proxy ; Vercel a d'ailleurs déployé des règles WAF dans ce sens le 21. Mais ça ne protège pas des réponses que ton code va chercher : seul le patch du runtime le fait.

## Certificats eMudhra compromis (clé privée = 4) : mise à jour urgente de pip, uv, certifi et des runtimes

- [Discussion Python.org](https://discuss.python.org/t/information-for-python-users-regarding-emudhra-emsign-ca-certificate-security-incident/109576)
- [Site d'analyse de l'incident eMudhra](https://emudhra.we-have-a-problem.com)
- [Avis de sécurité uv](https://github.com/astral-sh/uv/security/advisories/GHSA-hq85-5cpj-mr62)
- [Post de L4UR3N7 sur X](https://x.com/L4UR3N7/status/2113291274664976774)

Huit certificats intermédiaires de l'autorité indienne eMudhra (racine `emSign ECC Root CA - G3`) ont été générés avec des clés privées ECC ridiculement faibles : toutes ont une valeur `d < 256`, et l'une vaut carrément `4`. N'importe qui peut donc recalculer la clé privée et signer un faux certificat TLS valide pour n'importe quel domaine, comme `pypi.org`.

Les navigateurs sont déjà protégés via leurs listes de révocation et Certificate Transparency, mais pas les clients en ligne de commande ni les gestionnaires de paquets qui embarquent leur propre bundle de certificats (`certifi`, `webpki-root-certs`). Côté Python, le piège est vicieux : `pip` charge toujours son `certifi` embarqué en plus du magasin système, sans option pour le désactiver. Mettre à jour l'OS ne suffit donc pas à protéger un `pip install` contre une attaque man-in-the-middle.

Il faut mettre à jour dans chaque environnement virtuel, sur les machines et dans les images Docker (à reconstruire sans cache) : `pip 26.2.2`, `certifi 2026.10.19`, `uv 0.13.4` (ou `0.13.5`, qui embarque aussi CPython `3.15.1`, `3.14.9` et `3.13.17`), `conda 26.9.4` et `pixi 0.82.1`. L'incident dépasse largement Python : Bun `1.4.4`, Deno `2.9.8`, Node.js (`26.12.1`, `24.22.1`, `22.23.4`), Go (`1.27.3`, `1.26.10`), `rustup 1.29.2` et les paquets `ca-certificates` Linux ont aussi publié des correctifs.

## GitHub Copilot Fusion : un routeur de modèles à 2 points de Claude Code, pour moitié prix selon Artificial Analysis

- [Changelog GitHub](https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/)
- [Documentation Copilot Fusion](https://docs.github.com/en/copilot/concepts/models/copilot-fusion)
- [Classement Artificial Analysis](https://artificialanalysis.ai/agents/coding-agents?routers=true)
- [Post d'Artificial Analysis sur X](https://x.com/ArtificialAnlys/status/2115477376981508419)

GitHub sort Copilot Fusion en disponibilité générale. Dans le sélecteur de modèles, tu ne choisis plus un modèle, tu choisis un système qui décide pour toi, à chaque prompt, quels modèles utiliser et avec quel niveau de raisonnement. C'est la fusion de Project HydraFusion, l'orchestration multi-modèles, et de la sélection automatique de modèle de Copilot.

Trois schémas d'exécution. Single : un seul modèle fait le boulot. Cascade : un modèle efficace fait un premier jet, un juge l'accepte ou escalade vers un modèle plus fort. Critique : un modèle rédige, plusieurs autres le relisent en parallèle, puis il corrige. Toi, tu règles juste l'effort : Standard, High ou Max.

Artificial Analysis a passé Fusion en mode Max, dans Copilot CLI, sur son Coding Agent Index v2.0. Ce sont leurs propres mesures. Résultat : 60 points, contre 62 pour Claude Code avec Opus 5.5 en max. Mais 5,59 dollars par tâche, contre 11,42. Et environ deux fois moins de tokens. Devin Fusion, avec Opus 5.5 et GPT-6 Luna, fait 62 pour 8 dollars par tâche.

Dans le détail, Fusion est devant sur Terminal-Bench 4.0 avec 71. Il fait 51 sur FrontierCode, derrière Claude Code à 56, et 57 sur SWE-Atlas-QnA, où il est plus loin.

À garder en tête : l'index est une moyenne simple de trois benchmarks, chaque score est la moyenne de trois essais par tâche, et Artificial Analysis prévient que les résultats dépendent du modèle, des réglages et de la configuration de l'agent. Le coût affiché est un coût API par tâche, pas ce que tu paies avec ton abonnement Copilot. Et le pool de modèles de Fusion change avec le temps, donc le score aussi.

## Timestral: Mistral lance ses modèles de fondation pour séries temporelles, qui tournent sur CPU

- [Annonce Mistral (FR)](https://mistral.ai/fr/news/timestral/)
- [Annonce Mistral (EN)](https://mistral.ai/news/timestral/)
- [Collection Hugging Face Timestral](https://huggingface.co/collections/mistralai/timestral)
- [Dépôt GitHub Timestral](https://github.com/mistralai/timestral)
- [Documentation Timestral](https://docs.mistral.ai/models/timestral-1-0)

Mistral sort de son terrain habituel des LLM avec Timestral, sa première famille de modèles de fondation pour séries temporelles: télémétrie de capteurs, métriques d’observabilité, prix, volumes ou demande. Le principe est celui du préentraînement appliqué aux séries: là où ARIMA ou PatchTST sont ajustés sur chaque jeu de données, Timestral apprend sur un vaste corpus (majoritairement synthétique) et produit des prévisions zero-shot sur des données qu’il n’a jamais vues. Il sort des prévisions probabilistes (21 quantiles plutôt qu’une valeur unique), multivariées, avec des covariables passées, futures connues (planning de production, météo) ou catégorielles, et un contexte de 32 768 pas de temps. La famille compte quatre tailles, 5M, 28M, 123M et 209M de paramètres, publiées sur Hugging Face sous licence MIT modifiée. Selon les chiffres de Mistral, le 209M se classe premier parmi les modèles préentraînés zero-shot sur GIFT-Eval, TIME et fev-bench, avec deux tiers des paramètres de l’ancien état de l’art, et le 28M bat Chronos-2, environ quatre fois plus gros. Surtout, pas besoin de GPU: toujours selon Mistral, prévoir une journée à partir de trois semaines d’historique au pas de 15 minutes prend 10 ms avec le 5M et 140 ms avec le 209M sur un CPU serveur 8 threads. Mistral le voit comme une brique à brancher dans un pipeline de monitoring ou à combiner avec ses LLM dans des workflows agentiques (détection d’anomalie puis analyse des causes), avec fine-tuning sur données propriétaires via Mistral Forge et déploiement sur site, en VPC ou air-gapped; un dépôt GitHub permet de le lancer sur ses propres données, et le rapport technique est annoncé.

## Mistral lance une Responses API et héberge DeepSeek V4.1 Flash et GLM 5.3 Flash

- [Documentation Responses API](https://docs.mistral.ai/studio/conversations/responses)
- [Fiche DeepSeek V4.1 Flash (Mistral)](https://docs.mistral.ai/models/deepseek-v4-flash-1017)
- [Fiche GLM 5.3 Flash (Mistral)](https://docs.mistral.ai/models/zai-glm-5-3-flash)
- [DeepSeek V4.1 Flash sur Hugging Face](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017)
- [GLM 5.3 Flash sur Hugging Face](https://huggingface.co/zai-org/GLM-5.3-Flash)
- [Annonce de Mistral sur X](https://x.com/MistralAI/status/2115443720371814478)
- [Second post de Mistral sur X](https://x.com/MistralAI/status/2115443720883454191)

Mistral sort une Responses API en preview publique, pensée pour construire des agents. Elle reprend le format Responses d'OpenAI, sur l'endpoint POST /v1/responses. Si tu as déjà une intégration Responses, tu peux la brancher sur Mistral.

La différence avec Chat Completions : chaque réponse renvoie la réponse du modèle, son raisonnement et ses appels d'outils comme des éléments séparés. Plus simple à gérer étape par étape dans ton app. L'API est stateless : c'est toi qui gardes l'historique et qui le renvoies à chaque requête. En preview, on a le texte, les images et les fichiers en entrée, les sorties structurées en JSON Schema, le streaming, le function calling côté client, le niveau de raisonnement selon le modèle et le comptage des tokens d'entrée. D'après Mistral, ça marche avec tous les modèles de chat qu'il héberge, Large 4 compris.

En parallèle, Mistral sert deux modèles rapides et pas chers qui ne sont pas les siens, sans modification :

DeepSeek V4.1 Flash, en preview publique. 763 milliards de paramètres dont 37 milliards actifs, texte uniquement, contexte d'un million de tokens. 0,30 dollar le million de tokens en entrée, 1,20 en sortie. Mistral le conseille pour le code sur de longs contextes et les tâches agentiques.

GLM 5.3 Flash de Z.ai, disponible en GA. Multimodal texte et image, 320 milliards de paramètres dont 18 milliards actifs, contexte d'un million de tokens. 0,15 dollar en entrée et 0,50 en sortie. Il vise les sous-agents, les appels d'outils et le code.

Les deux sont open weights sous licence MIT, avec les poids sur Hugging Face. Tu peux donc aussi les faire tourner toi-même, si tu as le matériel.

## Le coût IA des frameworks JS : Nolan Lawson fait construire la même app 5 fois par framework

- [Article de Nolan Lawson](https://nolanlawson.com/2026/10/28/the-ai-cost-of-javascript-frameworks/)
- [Dépôt GitHub du benchmark](https://github.com/nolanlawson/agent-framework-benchmark)
- [Post de Yusuke Wada sur X](https://x.com/yusukebe/status/2115653031941517484)

« Ce framework est meilleur pour les agents. » Nolan Lawson en a eu marre des affirmations sans preuve, alors il a écrit un benchmark. L'article a été relayé par Yusuke Wada, le créateur de Hono, mais c'est bien Nolan Lawson qui l'a écrit.

Le principe : une petite app Pokémon basée sur la PokéAPI, avec liste, recherche et filtres. Claude Code avec Opus 5.5 en effort élevé la construit dans 12 stacks : Next.js, Nuxt, SvelteKit, Astro, Angular, Hono + htmx, Qwik, SolidStart, React Router, TanStack Start, Gracile + Lit et du Vanilla avec Vite. Chaque framework a son MCP ou ses skills officiels quand ils existent. L'app doit passer une suite de tests de conformité. On mesure le coût, le temps, les tokens, les lignes de code et les scores Lighthouse. Cinq runs par framework, on garde la médiane. Angular n'en a que trois, deux runs ayant échoué.

Côté coût, Hono + htmx arrive en tête avec 2,67 dollars par run, devant Astro à 2,76 et Nuxt à 2,82. Next.js est à 3,14 et Angular ferme la marche à 4,97. Mais le classement change selon le critère. Astro est le plus rapide, avec 8,2 minutes, et n'envoie quasiment aucun JS. Nuxt consomme le moins de tokens. Hono + htmx écrit le moins de code, avec environ 1 370 lignes contre 2 000 pour Angular.

Les scores Lighthouse de performance et d'accessibilité sont presque tous à 100, donc peu parlants. Les écarts se voient sur le JS envoyé (0 Ko pour Astro, 142 Ko pour Next.js), le Total Blocking Time et le LCP.

L'auteur prévient lui-même des limites. C'est une seule app, petite, orientée contenu, plus proche de Wikipédia que de Figma. Lighthouse et les Core Web Vitals pénalisent les SPA, donc les frameworks multipages partent avec un avantage. C'est le biais « site statique » que souligne Yusuke Wada. Les résultats varient beaucoup d'un run à l'autre. Il n'y a qu'un seul modèle et un seul agent. Et les agents n'utilisaient pas toujours les MCP ou skills fournis : celui de Nuxt n'a jamais été appelé, et celui de Next.js n'a été lu qu'une fois sur cinq.

Ce n'est donc pas un classement définitif. C'est surtout une invitation à choisir sa stack sur des données plutôt qu'à l'instinct. Le benchmark est sur GitHub, à forker.

## runonweb: 13 modèles d’IA open source qui tournent dans le navigateur, en un import npm

- [Site de runonweb](https://runonweb.ai)
- [Documentation runonweb](https://runonweb.ai/docs)
- [Liste des modèles runonweb](https://runonweb.ai/models)
- [Paquet npm runonweb](https://www.npmjs.com/package/runonweb)

runonweb est un paquet npm sous licence MIT (pnpm add runonweb) qui emballe 13 modèles d’IA open source en modules JavaScript exécutés entièrement dans le navigateur, en WebGPU quand c’est possible ou en WASM sur CPU, sans serveur ni clé d’API: rien ne quitte l’appareil. Chaque tâche a son import et une API minimale (new OCR(), load(), read()): OCR, détourage d’image, transcription audio, légende d’image en neuf langues, carte de profondeur, détection d’objets, embeddings pour la recherche sémantique, classification de texte par questions typées, traduction, nettoyage de dictée, conversion en emojis, synthèse vocale en streaming et génération d’image, plusieurs modules étant encore en bêta. Le projet ne réentraîne rien: il fait tourner dans un onglet des poids existants (Whisper, RF-DETR, Depth Anything, MiniLM, OPUS-MT, Kokoro, BEN2, PP-OCR, Florence-2, Bonsai Image), crédite leurs auteurs et ne retient que des modèles sous Apache 2.0 ou MIT. Chaque module détecte ce que supporte le navigateur, choisit une précision testée et met les poids en cache après le premier chargement. Le site publie ses propres mesures sur un Mac Apple Silicon sous Chrome, poids en cache: environ 0,6 s pour un OCR en WebGPU, 0,4 s pour transcrire 11 s d’audio, 14 ms par phrase pour les embeddings. Le revers, ce sont les téléchargements: de 4 Mo pour les emojis à plusieurs centaines de Mo pour la légende ou la synthèse vocale, et 3,4 Go pour la génération d’image. Projet tout neuf, en version 0.1.0.
