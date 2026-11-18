---
publicationDate: 18 Nov 2026
status: published
author: Double Slash
categories:
  - Technology
episodeNumber: 147
episodeType: full
explicit: false
season: 2
dsSlug: DS_147_news-nov26
title: News novembre 2026, Discord lâche Electron, OVH lance son premier LLM et
  Cactus met l'IA dans une montre
subtitle: Rust à la place d'Electron, un LLM français open source, des modèles
  de moins de 30 Mo et des agents en production.
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1794997906/ART_147_lyu4f7.png
type: news
description: Nous évoquons un répertoire des newsletters tech francophones,
  Discord qui prépare Project Phoenix en Rust et GPUI, Kiri et Colima pour se
  passer de Docker Desktop, KiviDB compatible Redis, my-bad de Daniel Roe, eve
  1.0 de Vercel, les modèles Cactus de moins de 30 Mo, Olala mini d'OVHcloud,
  SkipLabs qui rejoint Mistral, Meta qui rachète Conductor, Infinity d'AWS pour
  faire tourner des milliers d'agents en parallèle, et quelques outils comme
  Kodza.
videoLink: t3srvy8pz6o
tags:
  - agents
  - ai
  - aws
  - discord
  - docker
  - mcp
  - meta
  - mistral
  - open-source
  - ovhcloud
  - redis
  - rust
  - vercel
duration: 2733
fileSize: 43728133
---

## Un répertoire ouvert des newsletters tech francophones

- [Dépôt GitHub des newsletters tech FR](https://github.com/numeodev/newsletters-tech-fr-a-la-french)

numeodev publie un dépôt GitHub collaboratif qui liste les newsletters tech en français, qu’elles viennent de France, de Belgique, de Suisse ou du Québec. Au lancement, 18 titres sont classés par thématiques : développement, DevOps et cloud, IA, sécurité, open source et tech généraliste, avec lien, rythme de publication et auteur pour chacune.

On y retrouve entre autres Human Coders News, La Craft Letter, RudeOps, Erreur 403 ou Cafétech. Les ajouts passent par un formulaire d’issue ou une pull request, les données sont en CC BY 4.0 et le code en MIT. Un bon point d’entrée pour enrichir sa veille sans tout chercher à la main.

## Discord prépare Project Phoenix, un client Rust et GPUI à la place d'Electron

- [Annonce du CTO de Discord sur X](https://x.com/svishnevskiy/status/2118081920194203799)
- [Vidéo officielle Project Phoenix](https://www.youtube.com/watch?v=y1PDr15raAA)
- [Post du CTO sur le démarrage (X)](https://x.com/svishnevskiy/status/2118398632236073156)
- [Article de Developpez](https://rust.developpez.com/actu/388813/Discord-abandonne-son-application-Electron-basee-sur-le-framework-web-qui-peut-consommer-jusqu-a-4-Go-de-RAM-sous-Windows-11-la-nouvelle-version-reecrite-en-Rust-ne-consomme-quant-a-elle-que-290-Mo/)

Le 4 novembre 2026, Stanislav Vishnevskiy, cofondateur et CTO de Discord, a confirmé la réécriture complète du client en Rust. Electron quitte le bureau au profit de GPUI, le framework d'interface native de l'équipe de Zed, pas de Tauri. React Native s'en va aussi sur mobile : l'UI reste native, le code applicatif est partagé avec le desktop via Rust. Discord utilise déjà ce langage depuis 2018 pour une partie de son infra, de la voix et du client actuel. Une capture du Gestionnaire des tâches publiée par le CTO montre une build Windows appelée Discord Phoenix à 290,2 Mo de RAM, avec deux comptes connectés en parallèle : ce n'est pas une comparaison contrôlée avec Electron. Le « 4 Go » souvent mis en face par la presse, Developpez compris, vient d'un test de décembre 2025, où Discord expérimentait un redémarrage auto au-delà de ce seuil et indiquait qu'un usage normal restait sous 1 Go. Vishnevskiy met surtout en avant un démarrage et une navigation qu'il décrit comme instantanés. Une vidéo officielle baptise le projet Project Phoenix : des tests auprès de quelques centaines d'utilisateurs sont prévus « bientôt », sans date de sortie publique.

## Kiri: une alternative Rust à Docker Desktop, un seul démon, compatible docker et Compose

- [Site de Kiri](https://runkiri.com)
- [Documentation Kiri](https://docs.runkiri.com)
- [Dépôt GitHub Kiri](https://github.com/libracoder/kiri)
- [Benchmarks Kiri](https://runkiri.com/benchmarks/)

Kiri est une alternative à Docker Desktop écrite en Rust, gratuite, en bêta et publiée sous licence Apache 2.0, pour Mac, Windows et Linux. Elle fait tourner des conteneurs Docker avec un seul démon, « built from scratch » plutôt que sur les pièces de Docker, tout en restant compatible avec le CLI docker, Compose, buildx et l’API Docker Engine. Sur macOS, une seule VM Linux démarre via Virtualization.framework (noyau custom, init Rust en PID 1, dialogue en vsock); sur Linux le démon parle directement au noyau; sur Windows il tourne dans WSL2. Selon les mesures de Kiri, sur un Mac limité à 2 CPU et 8 Go, docker run alpine true prend 22 ms contre 178 ms pour Docker Desktop, 152 ms pour Colima et 279 ms pour OrbStack; un cycle de vie complet via l’API Docker est annoncé à 3,1 ms. Autour des conteneurs: noms locaux (web.kiri.local) avec HTTPS via sa propre autorité de certification, un cluster Kubernetes (k3s en environ 20 secondes, kind aussi), des machines Linux, un scan de vulnérabilités à la build, une migration depuis OrbStack ou Docker Desktop, et Kiri Share pour exposer un conteneur en HTTPS sur runkiri.cloud. Le site indique aussi que le démon reste autour de 15 Mo, que la VM rend la mémoire inutilisée et s’endort après une minute d’inactivité, pour un réveil en 0,15 s. La version actuelle est 0.2.0; le Mac est sorti (Apple silicon ou Intel, macOS 14 ou plus), Windows et Linux sont proposés en bêta.

## Colima : Docker, containerd, Incus et k3s en local sur macOS et Linux

- [Site de Colima](https://colima.run/)
- [Dépôt GitHub Colima](https://github.com/abiosoft/colima)
- [Release Colima 0.10.3](https://github.com/abiosoft/colima/releases/tag/v0.10.3)
- [Documentation Colima](https://colima.run/docs/)

Colima (pour « Containers on Lima ») est un projet open source, licence MIT, qui fait tourner des runtimes de conteneurs sur macOS et Linux avec un minimum de configuration. On l'installe avec Homebrew, MacPorts, Nix ou Mise : `brew install colima`, puis `colima start`. Par défaut, c'est Docker, et le client `docker` déjà présent fonctionne sans réglage de plus. On peut aussi lancer containerd avec nerdctl, Incus (conteneurs et VMs, ces dernières seulement sur Apple Silicon M3 ou plus récent), ou un cluster Kubernetes local en k3s via `colima start --kubernetes`. Depuis la 0.10.0, sur Apple Silicon et macOS 13 ou plus, le type de VM krunkit accélère des workloads IA (krunkit doit être installé à part) et permet de lancer des modèles depuis le Docker AI Registry, Hugging Face ou Ollama. La VM par défaut alloue 2 CPU, 2 Gio de mémoire et 100 Gio de disque, et plusieurs instances isolées peuvent tourner ensemble. La version actuelle est la 0.10.3, publiée le 4 juin 2026 : un correctif pour une régression au redémarrage de k3s.

## KiviDB, une base in-memory compatible Redis avec vector search intégré

- [Site de KiviDB](https://kividb.io/)

KiviDB est une base de données in-memory open source écrite en Rust, compatible avec le protocole Redis : vous changez l'adresse de connexion et vous gardez votre client et votre code existants. L'originalité est ailleurs : la recherche vectorielle, le full-text search, les documents JSON, les time series et les streams sont intégrés au serveur, sans aucun module à installer. De quoi couvrir le retrieval pour du RAG, la recherche sémantique, les recommandations ou le cache de réponses LLM avec un seul moteur.

Côté perfs, l'architecture est multi-thread par défaut : chaque cœur a son event loop sur un keyspace shardé, là où Redis reste sur un seul thread. Les benchmarks maison annoncent 21,2 M ops/s en lecture pipelinée sur 32 cœurs, contre 9,1 M pour Dragonfly et 2,4 M pour Redis 8.10, avec une latence au 99e centile de 0,42 ms.

KiviDB se déploie en une commande Docker, en self-hosted (binaire, Helm chart, operator Kubernetes) ou en version managée sur AWS, GCP et Azure, avec une base gratuite de 100 Mo.

## my-bad 1.2 de Daniel Roe : des pages d'erreur de dev qui se mettent à jour en live

- [Dépôt GitHub my-bad](https://github.com/danielroe/my-bad)
- [Blog Nuxt, Nuxt 4.6](https://nuxt.com/blog/v4-6)

Daniel Roe publie my-bad en v1 (déjà en 1.2.0, licence MIT). C'est une lib TypeScript pour les pages d'erreur des serveurs de dev. Elle transforme une erreur en rapport avec stack traces sourcemappées, extraits de code, causes et contexte de requête. On peut le rendre en page HTML, en overlay, en ANSI dans le terminal, en Markdown ou en JSON.

Le plus utile : un canal live en SSE. La page se met à jour pendant que tu corriges, et elle se recharge une fois l'erreur réglée. Le canal peut aussi afficher les warnings d'un type checker ou d'un linter. Indépendant du framework, avec une entrée `my-bad/vite` pour brancher le plugin Vite. Nuxt s'en sert pour ses pages d'erreur de dev depuis la 4.6, à la place de Youch.

## eve 1.0 de Vercel : le framework open source pour mettre des agents en production passe en stable

- [Annonce eve 1.0 (blog Vercel)](https://vercel.com/blog/eve-is-now-generally-available)
- [Annonce eve sur X](https://x.com/eve/status/2122757457101681075)
- [Post de Guillermo Rauch sur X](https://x.com/rauchg/status/2122771609261879478)
- [Documentation eve](https://eve.dev/docs)
- [Dépôt GitHub eve](https://github.com/vercel/eve)

Vercel annonce le 17 novembre 2026 eve 1.0, la version stable de son framework open source (licence Apache 2.0) pour construire des agents prêts pour la production, en TypeScript. Le paquet npm s'appelle `eve`, il demande Node.js 24 ou plus, et `npx eve@latest init mon-agent` crée un projet. La préversion publique datait de juin.

Le principe : tu possèdes le harness, la boucle qui appelle les modèles, lance les outils et délègue aux sous-agents. Tu choisis le modèle, tu ajoutes ou remplaces les outils, et tu décides quelles actions demandent une validation. Le Workflow SDK sauvegarde la progression, donc l'agent reprend à sa dernière étape après un plantage. Pour l'hébergement géré, Vercel propose de déployer l'agent sur Vercel Workflows et Sandbox.

La 1.0 apporte surtout :
- le multi-tenant : un même déploiement peut servir plusieurs clients, chacun avec sa mémoire, ses identifiants de connexion et ses règles d'approbation ;
- le multijoueur : plusieurs personnes dans une même session, avec des approbations routées vers la bonne personne ;
- des canaux natifs (Slack, Teams, Discord, Telegram, GitHub, Linear, iMessage et d'autres) ;
- des interfaces avec Next.js, Nuxt, SvelteKit, TanStack Start et Vite ;
- une mémoire entre sessions ;
- un tracing OpenTelemetry. Sur Vercel, Agent Runs reprend ces traces dans le dashboard : sessions, appels de modèle, outils, sous-agents, approbations ;
- des extensions pour partager outils et skills entre agents.

Côté performance, Vercel mesure sur son propre test de charge (réponses de modèle simulées, sans outils) une latence médiane par tour de 414 ms contre 3,036 s en septembre.

Les chiffres d'adoption viennent des intéressés. Guillermo Rauch, le CEO de Vercel, affirme dans un post que eve atteint 2,4 millions de téléchargements par semaine et qu'il a fait en 142 jours ce que Next.js a mis 5 ans à faire. Le registre npm affiche bien 2 410 226 téléchargements du 10 au 16 novembre, mais la comparaison avec Next.js reste la sienne.

## Cactus: des modèles d’IA de moins de 30 Mo pour téléphones, montres et microcontrôleurs

- [Site de Cactus](https://cactuscompute.com)
- [Cactus Needle](https://cactuscompute.com/needle)
- [Cactus Hybrid](https://cactuscompute.com/hybrid)
- [Dépôt GitHub Cactus](https://github.com/cactus-compute/cactus)
- [Cactus sur Hugging Face](https://huggingface.co/Cactus-Compute)

Cactus Compute, une startup soutenue par Y Combinator, conçoit des modèles d’IA assez petits pour tourner en local sur des téléphones, des montres, des lunettes AR, des robots, des voitures ou des microcontrôleurs, sans envoyer les données hors de l’appareil. Trois modèles ouverts, compressés en 2 bits avec Cactus Quants, partagent le même moteur (paquet Python cactus-compute, licence Apache 2.0, y compris les binaires). Needle 3, annoncé comme un « Automation Foundation Model », tient en un seul binaire de 8 à 29 Mo (29 à 121 millions de paramètres, de 2 à 20 couches au choix): il choisit et remplit des appels d’outils, extrait des champs typés et calcule des embeddings, le tout hors ligne. Selon Cactus, il bat des modèles dix fois plus gros sur les appels d’outils mobiles, et décode entre 400 et 4 000 tokens/s sur un Raspberry Pi 5. Whistle est un modèle de reconnaissance vocale de 16,9 Mo, CPU uniquement, pour sept langues (anglais, allemand, français, espagnol, italien, néerlandais, polonais), avec horodatage des mots; le blog annonce un premier token en 11 ms. Mirage, environ 22 Mo (51,3 millions de paramètres), décrit une image, détecte des objets, lit du texte, segmente et remplit des formulaires; Cactus indique 74 ms de bout en bout sur le NPU d’un Galaxy S26, 107 ms sur son CPU. La même méthode de quantification a aussi servi à compresser le Nemotron-3.5-SuperVL-120B de NVIDIA à 22,06 Go (1,418 bit effectif par poids). Côté cloud, Cactus Hybrid ajoute à certains checkpoints (dont Gemma 4) un score de confiance pour n’envoyer au cloud que les requêtes trop incertaines. Pebble utilise déjà Needle en local dans ses montres et bagues.

## Olala mini 7A1B : le premier LLM d'OVHcloud, open source et prévu le 19 novembre

- [Communiqué d'OVHcloud](https://corporate.ovhcloud.com/fr/newsroom/news/ovh-olala-mini/)
- [Post d'Octave Klaba sur X](https://x.com/olesovhcom/status/2122573582911869173)
- [Article d'ActuIA](https://www.actuia.com/actualite/ovhcloud-devoile-olala-mini-son-premier-llm-des-debits-pas-de-scores/)

OVHcloud a annoncé le 17 novembre 2026 Olala mini 7A1B, premier LLM de sa famille Olala, entraîné de zéro. C'est un mélange d'experts de 7 milliards de paramètres, dont 1 milliard seulement sert à chaque requête, avec 256 experts par couche, une attention hybride Differential-TPA et Mamba-3, et 32 000 tokens de contexte. OVH le destine au local : dès 8 Go de mémoire GPU, 160 tokens par seconde sur une RTX A4500, et 50 tokens par seconde sur un processeur non précisé. Les poids, le modèle de base, un rapport technique et une doc de conformité à l'AI Act sont promis le 19 novembre sur Hugging Face, sous licence Apache 2.0, jour du lancement officiel à l'OVHcloud AI Summit. Au 17 novembre au soir, rien n'était encore en ligne sur Hugging Face, et aucun score de benchmark n'est publié, seulement ces débits. L'entraînement s'est fait sur les supercalculateurs européens Jupiter, MeluXina et Jean Zay, avec des GPU GH200, A100 et H100, pour l'équivalent de 7 millions d'euros d'heures de calcul, au lab OVHai LLM. Dans son post et le communiqué, Octave Klaba affirme aussi que le coût d'un entraînement a été divisé par 20 en trois ans. Qwant l'utilise déjà pour ses réponses flash, 20 % plus rapides et trois fois moins chères selon OVH. ActuIA rappelle que Qwant appartient au groupe familial d'Octave Klaba, et que les 8 Go laissent penser à une version quantifiée, non confirmée par OVH. Une v1.1 est prévue d'ici fin 2026, avec 128 000 tokens de contexte et de meilleurs résultats en raisonnement mathématique. La v2.0 dépassera les 100 milliards de paramètres, avec des déclinaisons agentique (dont OVHai Workspace en local), DevOps cloud et cybersécurité.

## Mistral rachète SkipLabs et lance une équipe Language pour fiabiliser le code des agents

- [Annonce de SkipLabs sur LinkedIn](https://www.linkedin.com/posts/skiplabs-joins-mistral-to-make-ai-generated-share-7524101049830490113-V0vk/)
- [Dépôt GitHub Skip](https://github.com/SkipLabs/skip)
- [Documentation Skip](https://skiplabs.github.io/skip/)
- [Article de LeMagIT](https://www.lemagit.fr/actualites/366653932/IA-agentique-et-programmation-reactive-pourquoi-Mistral-AI-acquiert-SkipLabs)
- [Article de Maddyness](https://www.maddyness.com/2026/11/05/mistral-ai-soffre-une-cinquieme-acquisition-depuis-le-debut-de-lannee/)

SkipLabs rejoint Mistral. Annonce LinkedIn du 5 novembre 2026, confirmée sur X par Julien Verlaguet, concepteur du typechecker de Hack et ex-Meta. L'équipe crée le groupe Language, pour rendre le code généré par l'IA plus rapide, plus sûr et plus fiable, avec typage, compilateurs et analyse assez rapides pour tourner dans la boucle du modèle. Elle recrute. Montant non public. Pas de billet sur mistral.ai/news ; selon LeMagIT, Mistral a confirmé.

Verlaguet : « Tous les outils que nous avons construits partaient du principe qu'il y avait un humain de l'autre côté. Avec l'IA, l'auteur n'est plus une personne. »

Skip est un framework MIT pour des back-ends réactifs, API TypeScript : on ne recalcule que ce qui change, un React pour le back-end, bâti sur Skiplang. Le dépôt contient aussi SKDB. V1 début 2025. Amplify a mené le seed le 25 mars 2025, sans montant. Le repo reste public, non archivé, commits jusqu'au 10 novembre, sans annonce sur son avenir.

Selon Maddyness et LeMagIT, c'est la 5e acquisition de Mistral en 2026, après Koyeb, Emmi AI, Pimento et New Material, la première axée langages et fiabilité du code des agents. LeMagIT évoque Skipper, un agent SkipLabs qui génère des back-ends, pas une intégration Mistral.

## Meta rachète Conductor : calendrier d'arrêt et comment exporter ses données

- [Annonce de Conductor](https://www.conductor.build/announcement)
- [Changelog Conductor 0.93.0](https://www.conductor.build/changelog/0.93.0-conductor-is-joining-meta)
- [Article de TechCrunch](https://techcrunch.com/2026/11/04/meta-acquires-ai-coding-startup-conductor/)
- [Export des chats vers Delta](https://delta.dev/blog/import-conductor-chats)
- [Migration vers Orca](https://www.onorca.dev/docs/migrate-from-conductor)
- [Série A de Conductor](https://www.conductor.build/blog/series-a)
- [Changelog Conductor Cloud 0.78.0](https://www.conductor.build/changelog/0.78.0-introducing-conductor-cloud)

Conductor, l'app Mac qui lance Claude Code, Codex ou Cursor en parallèle dans des worktrees Git, avec revue des diffs avant PR, rejoint Meta le 4 novembre 2026. Montant non public, confirmé par Meta à TechCrunch, sans communiqué détaillé. Fondée en 2024 par Charlie Holtz (CEO) et Jackson de Campos (YC S24), lancée en juillet 2025, elle a levé 22 M$ le 30 mars 2026 auprès de Spark et Matrix, et parlait alors d'une croissance 10x depuis janvier. Conductor Cloud (30 juillet 2026) tourne en microVM, même laptop fermé. Holtz promet « the next interface » et un outil début 2027, avec Alexandr Wang et Nat Friedman à Superintelligence Labs, d'après TechCrunch.

Depuis le 4 novembre : plus d'inscriptions ni de téléchargements, fonctions pro gratuites pour les abonnés. Les abonnements actifs seront remboursés. Le 13 novembre, le Cloud passe en lecture seule (chats et export, plus de messages). Le 20 novembre, il s'éteint et la suppression des données cloud commence. L'app locale reçoit encore modèles et correctifs critiques jusqu'à début 2027, puis s'arrête, données effacées.

Export à faire avant le 20 novembre pour le Cloud : clic droit sur un workspace, Transfer to local, ramène workspace et chats sur le Mac. Archive complète : Settings > Account > Export data. Conductor dit n'avoir jamais vendu ces données ni entraîné de modèles dessus. Delta (Zed) importe les chats depuis le 10 novembre, pas les workspaces, via Delta > Import Conductor Chats, la sidebar, ou `delta thread import conductor`. Orca ouvre les worktrees directement. T3 Code (open source, MIT) n'a pas d'import officiel.

## Infinity: un runtime open source pour faire tourner des dizaines de milliers d’agents en parallèle

- [Annonce Infinity (blog AWS Open Source)](https://aws.amazon.com/blogs/opensource/introducing-infinity-a-runtime-for-extreme-agent-concurrency/)
- [Site d'Infinity](https://infinity.hydro.run)
- [Dépôt GitHub Infinity](https://github.com/hydro-project/infinity)
- [Quickstart Infinity](https://infinity.hydro.run/docs/infinity-runtime/quickstart/launching-your-first-agent/)

AWS et UC Berkeley publient Infinity, un runtime d’agents open source (Apache 2.0) issu du projet Hydro, encore en phase de recherche. L’idée: un agent passe l’essentiel de son temps à attendre un outil (build de 20 minutes, prochain pull request, validation humaine le lendemain), et la plupart des harnesses bloquent alors un processus et sa mémoire. Infinity traite l’agent comme une coroutine sans pile: à chaque appel d’outil, il enregistre la conversation, suspend l’agent et ne le reprend que quand le résultat arrive, en tranches bornées (une complétion modèle, au plus un outil, rien de bloquant). Un agent suspendu n’occupe donc que son historique. Selon les mesures d’AWS, environ 100 Ko par agent inactif, soit 75 000 agents concurrents dans les 8 Go d’un Raspberry Pi 5. Même logique côté serveur: en « step mode », une fonction serverless peut s’arrêter pendant l’attente; le déploiement de référence sur AWS enchaîne SQS FIFO, Lambda, Aurora DSQL et DynamoDB, et un agent qui attend trois jours de CI ne consomme aucun calcul. Pour livrer des événements asynchrones (sortie d’une commande longue, abonnement GitHub) sans casser le protocole des modèles, Infinity injecte des appels d’outils synthétiques receive_event__injected; le même mécanisme sert à spawn_thread pour créer des agents enfants dont les rapports arrivent en événements. Le dépôt Rust ajoute aussi le Reactive Agent Protocol (RAP) pour servir des outils sans garder de connexion ouverte, avec une couche de compatibilité MCP, et Infinity Code, un agent de code bâti sur ce runtime.

## Kodza : 244 composants UI en HTML, CSS et JS que l'IA récupère via MCP

- [Site de Kodza](https://kodza.dev/)
- [Documentation Kodza](https://kodza.dev/docs/)
- [Catalogue de composants Kodza](https://kodza.dev/components/)
- [Dépôt GitHub Kodza](https://github.com/kodza-dev/kodza)

Kodza est une bibliothèque de composants d'interface en HTML, CSS et JavaScript, sans framework, sans étape de build et sans dépendance. Le site en recense 244, à coller dans une page HTML, WordPress, Shopify, React, ou n'importe quelle autre stack. Le plus simple, c'est de brancher le serveur MCP hébergé (https://kodza.dev/api/mcp) dans Claude Code, Codex, Cursor, VS Code ou Windsurf : l'assistant cherche le composant, récupère le code réel plutôt qu'une approximation, et les notes d'intégration pour la cible choisie. Tout est gratuit, sans compte ni clé API. On peut aussi copier le code à la main, ou lancer le même serveur en local avec `npx -y kodza-mcp` (Node 18 ou plus). La licence Kodza autorise un usage perso ou commercial, y compris en presta, sans attribution obligatoire. En revanche, on n'a pas le droit de revendre la bibliothèque ni de la redistribuer via un autre catalogue ou un autre serveur MCP. C'est un projet solo de Florent Cleron, qui vise les 1 000 composants, à raison d'un nouveau par jour.
