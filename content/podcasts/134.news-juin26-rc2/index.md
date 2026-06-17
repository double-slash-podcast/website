---
publicationDate: 17 Jun 2026
status: published
author: Double Slash
categories:
  - Technology
duration: 
episodeNumber: 134
episodeType: full
explicit: false
season: 2
dsSlug: DS_134_news-juin26-rc2
title: News Juin 2026 RC2, React quitte Meta, VoidZero rejoint Cloudflare et l'IA locale prend du muscle
subtitle: Les news pour la deuxième quinzaine de juin 2026, React Foundation, VoidZero x Cloudflare, WordPress Protect The Shire et toujours plus d'IA.
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1781689392/episode/ART_134_dmbb8r.png
description: Nous évoquons React qui passe sous la Linux Foundation avec la React Foundation, VoidZero et Vite qui rejoignent Cloudflare, l'initiative Protect The Shire pour sécuriser les 78 000 plugins WordPress, TanStack AI en beta, Maizzle 6 et sa refonte Tailwind CSS 4, les nouveaux modèles open-weight de Mistral, Mellum2 qui passe en open source, le Ryzen AI Halo d'AMD avec 128 Go de RAM pour faire tourner 200 milliards de paramètres en local, et les nouveautés Chrome comme WebMCP et les Declarative Partial Updates.
videoLink : 4DUHYPTYipk
tags: ["wordpress", "PHP", "React", "chrome", "Maizzle", "TanStack", "IA", "Mistral", "AMD"]
---

## Protect The Shire – WordPress

[Lire l'article](https://wordpress.org/news/2026/06/pts/)

WordPress lance l'initiative **Protect The Shire** pour sécuriser les 78 000 plugins et thèmes de son répertoire. Une période de refroidissement de 24 heures est introduite pour les mises à jour automatiques, permettant une revue approfondie des changements. L'objectif est de concilier rapidité et sécurité, en s'appuyant sur l'IA pour analyser les codes et prévenir les attaques de la chaîne d'approvisionnement.


## La React Foundation : Un nouveau foyer pour React sous la Linux Foundation

[Lire l'article](https://react.dev/blog/2026/02/24/the-react-foundation)

React, React Native et les projets associés comme JSX ne sont plus détenus par Meta, mais par la **React Foundation**, une fondation indépendante hébergée par la Linux Foundation. Les membres fondateurs incluent Amazon, Callstack, Expo, Huawei, Meta, Microsoft, Software Mansion et Vercel. Cette transition vise à garantir une gouvernance technique indépendante et à soutenir l'écosystème React.


## The Story of PHP : La bande-annonce du documentaire

[Voir la vidéo](https://www.youtube.com/watch?v=4W4y46WVdCU)

CultRepo annonce la sortie prochaine d'un **documentaire sur l'histoire de PHP**, avec des témoignages exclusifs de figures majeures comme Nils Adermann (créateur de Composer), Taylor Otwell (créateur de Laravel), Nikita Popov (contributeur principal de PHP), Fabien Potencier (créateur de Symfony), et Roman Pronskiy (directeur fondateur de The PHP Foundation). Ce documentaire retrace l'évolution de PHP, depuis ses débuts improvisés jusqu'à son rôle central dans les plateformes de contenu, les CMS, et les infrastructures gouvernementales.


## Rejoignez l'essai d'origine de WebMCP dans Chrome 149

[Lire l'article](https://developer.chrome.com/blog/ai-webmcp-origin-trial)

Chrome 149 lance un **essai d'origine pour WebMCP**, une fonctionnalité permettant aux développeurs de définir des règles d'interaction entre les applications web et les agents IA. Cela permet de déclarer explicitement la fonction des éléments d'interface (boutons, champs de formulaire, etc.) et de gérer l'état de la page, pour un remplissage plus précis des formulaires ou un débogage efficace.


## TanStack AI en version bêta : L'outil agnostique pour l'IA

[Lire l'article](https://tanstack.com/blog/tanstack-ai-beta)

TanStack annonce la version **bêta de TanStack AI**, un outil **agnostique de framework et de fournisseur** conçu pour les développeurs qui veulent garder le contrôle de leur stack. Après une phase alpha riche en apprentissages, cette version bêta propose une API stable, une documentation complète et une prise en charge multi-modale (texte, audio, vidéo, images, chat vocal en temps réel). TanStack AI permet de basculer facilement entre les fournisseurs (OpenAI, Anthropic, Google, etc.) tout en conservant une typage TypeScript strict et des outils intégrés comme les appels de fonctions, la génération structurée, et le Model Context Protocol (MCP).

## Maizzle 6 est disponible

[Lire le thread](https://x.com/cossssmin/status/2064351831782838539)

Maizzle 6 est enfin là avec une **refonte complète** : passage à **Tailwind CSS 4**, des templates en **Vue**, un plugin **Vite**, des composants dédiés, une expérience développeur repensée, et même des compétences pour les agents IA. Une version majeure pour construire des emails HTML comme on construit des applications.

## GLM-5.2

Le modèle chinois rivalise avec les meilleurs modèles tout en étant open source/weight

[Lire le thread](https://x.com/Zai_org/status/2066938937344495629?s=20)


## Mellum2 passe en open source : un modèle rapide pour les workflows d'IA

[Lire l'article](https://blog.jetbrains.com/ai/2026/06/mellum2-goes-open-source-a-fast-model-for-ai-workflows/)

JetBrains annonce que **Mellum2**, un modèle de 12 milliards de paramètres, passe en open source sous licence Apache 2.0. Conçu pour résoudre les défis les plus difficiles de l'IA en production (latence, débit, coût), Mellum2 utilise une architecture **Mixture-of-Experts (MoE)** où seulement 2,5 milliards de paramètres sont actifs par token. Idéal pour le routage, les pipelines RAG à faible latence, les sous-agents rapides et les déploiements locaux ou privés.


## VoidZero rejoint Cloudflare

[Lire l'article](https://voidzero.dev/posts/voidzero-cloudflare)

VoidZero annonce son intégration à Cloudflare. Les projets phares comme Vite, Vitest, Rolldown, Oxc et Vite+ resteront open-source et sous licence MIT. Evan You et son équipe continueront de diriger ces projets, avec un engagement total de Cloudflare pour soutenir leur mission. Cette collaboration vise à renforcer l'écosystème Vite et à améliorer l'expérience de déploiement sur Cloudflare, tout en respectant les valeurs de l'open source et de la communauté.

## Declarative Partial Updates & Out-of-Order Streaming dans Chrome 148

[Lire l'article](https://developer.chrome.com/blog/declarative-partial-updates)

Chrome 148 introduit les **Declarative Partial Updates**, une fonctionnalité permettant de charger et afficher des parties spécifiques d'une page HTML de manière asynchrone et hors ordre. Cela optimise les performances des applications web en utilisant des balises `<template>` et des instructions de traitement (`<?marker>`, `<?start>`, `<?end>`), ainsi que de nouvelles API JavaScript pour insérer ou remplacer dynamiquement du contenu.

## Considérations de sécurité pour les agents WebMCP

[Lire l'article](https://developer.chrome.com/docs/agents/security)

L'article de Chrome aborde les **considérations de sécurité pour les développeurs d'agents utilisant WebMCP**, avec des recommandations pour se protéger contre les contenus malveillants et les attaques par injection de prompts, notamment via des garde-fous déterministes et probabilistes.

## Quel est le meilleur modèle économique pour un laboratoire d'IA : abonnement ou API ?

[Lire le thread](https://x.com/SemiAnalysis_/status/2064815044085318040)

[Lire le thread](https://x.com/Hesamation/status/2066615113998553111?s=20)

SemiAnalysis a comparé les plans d'abonnement d'Anthropic et d'OpenAI en testant des tâches de codage longues jusqu'à épuisement des limites hebdomadaires. Contrairement à l'idée reçue, les abonnements offrent des marges bien plus généreuses que prévu : un abonnement à 200 $/mois permet d'obtenir une valeur équivalente à bien plus que 2 000 $/mois en tokens (au tarif API). Cependant, les laboratoires d'IA pourraient limiter les nouvelles fonctionnalités ou modèles aux abonnements, pour éviter de réduire explicitement leurs avantages et ainsi éviter un retour de bâton public.

## Mistral AI annonce un nouveau modèle open-weight et des outils pour l'autonomie des systèmes d'IA
[Lire le thread](https://x.com/arthurmensch/status/2066913353860018596)

Mistral AI prépare un **nouveau modèle** pour cet été, marquant le début d'une famille de modèles grands mais "sparse". Tous les modèles à venir seront **open-weight**, avec un accent sur la confiance des clients et l'autonomie des communautés. **Studio** (déploiement) et **Forge** (entraînement) sont des produits portables, hébergés sur une infrastructure contrôlée par Mistral. L'objectif : permettre aux entreprises et gouvernements de déployer des systèmes d'IA **indépendants**, avec une structure de coûts efficace et un entraînement continu basé sur les interactions humain-IA.


## AMD lance le Ryzen AI Halo : un monstre d'IA locale pour Windows 11

[Lire l'article](https://www.neowin.net/news/amd-launches-4000-ryzen-ai-halo-local-ai-monster-for-windows-11-with-128gb-ram/)

AMD présente le **Ryzen AI Halo**, une plateforme conçue pour simplifier le déploiement de l'IA locale sous Windows 11. Avec **128 Go de RAM**, ce PC à **4 000 $** est optimisé pour les charges de travail d'IA générative, prenant en charge des modèles jusqu'à **200 milliards de paramètres**. Grâce à sa plateforme **ROCm 7.2** et son **Ryzen AI Development Center**, il offre une solution clé en main pour les développeurs, avec des performances supérieures de **14 % en TPS/$** par rapport à Nvidia DGX Spark (Linux uniquement). Une alternative puissante pour les créateurs et entreprises souhaitant exécuter des modèles d'IA localement.

## GMKtec Evo X2 : Un mini-PC puissant pour l'IA locale

[Voir sur Amazon](https://www.amazon.fr/GMKtec-Evo-X2-5-1GHz-LPDDR5X-Display/dp/B0F6X332N6?th=1)

Le **GMKtec Evo X2** est un mini-PC compact mais puissant, équipé d'un processeur performant (jusqu'à **5,1 GHz**), de **LPDDR5X**, et conçu pour les tâches exigeantes comme l'IA locale. Idéal pour les développeurs et les utilisateurs cherchant une solution portable et efficace pour exécuter des modèles d'IA sans sacrifier la puissance.
