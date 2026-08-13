---
publicationDate: 21 Nov 2024
status: published
author: Double Slash
categories:
  - Technology
episodeNumber: 101
episodeType: full
explicit: false
season: 2
dsSlug: DS_101_newsNov
title: Les news web dev pour novembre 2024 - RC 1.0
subtitle: RC 1.0 - Épisode new web développement pour novembre 2024
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1732181644/episode/ART_101_evr0de.png
description: Dans ce nouvel épisode, nous allons évoquer le nouveau edge de
  Bunny, Framer Motion qui devient Motion, PHP 8.4, Docusaurus 3.6, Angular 19,
  Python qui détrône JavaScript sur GitHub, le débats sur JS0/JSSugar, et le
  soutien accru pour l’open source par GitHub et Sentry.
videoLink: fiDd5dqHYnA
duration: 2847
fileSize: 45559221
---

## Bunny Edge

Bunny Edge Scripting est une nouvelle plateforme serverless basée sur Deno, permettant aux développeurs de créer, déployer et exécuter des applications JavaScript sur le réseau mondial de [bunny.net](http://bunny.net/) sans se soucier de la gestion du matériel, de la scalabilité ou de l'équilibrage de charge. En connectant simplement votre dépôt GitHub, vous pouvez déployer automatiquement votre application à la périphérie du réseau, offrant une facilité, une rapidité et une scalabilité inégalées.

https://bunny.net/blog/introducing-bunny-edge-scripting-a-better-way-to-build-and-deploy-applications-at-the-edge/

## Framer motion fusionne avec Motion

Le 12 novembre 2024, Matt Perry a annoncé que Framer Motion devient un projet indépendant sous le nom de Motion. Cette transition, soutenue par Framer, vise à élargir l'utilisation de la bibliothèque au-delà de React, en proposant des API pour JavaScript pur et d'autres frameworks comme Vue. Motion dispose désormais d'un nouveau site web, motion.dev, offrant une documentation améliorée et une fonctionnalité de recherche. Cette indépendance permettra à Motion de mieux servir la communauté des développeurs en se concentrant sur des fonctionnalités innovantes et une compatibilité étendue.

https://motion.dev/blog/framer-motion-is-now-independent-introducing-motion

https://motion.dev/

## PHP 8.4 21 novembre 2024

https://stitcher.io/blog/new-in-php-84

PHP 8.4, sorti le 21 novembre 2024, introduit plusieurs fonctionnalités notables :

**Property hooks** : Cette fonctionnalité permet de définir des comportements personnalisés lors de l'accès ou de la modification des propriétés d'une classe, réduisant ainsi le besoin de méthodes getter et setter explicites.

**Fonction `array_find`** : Cette nouvelle fonction permet de rechercher le premier élément d'un tableau qui satisfait une condition donnée, simplifiant ainsi certaines opérations sur les tableaux.

…

## Docusaurus 3.6, des sites 2 à 4 fois plus rapide 🚀

Le 4 novembre 2024, Docusaurus a annoncé la sortie de la version 3.6, mettant l'accent sur des améliorations significatives des performances de construction grâce au projet "Docusaurus Faster". Cette initiative vise à réduire les temps de compilation et la consommation de mémoire en intégrant des outils basés sur Rust, tels que Rspack, SWC et Lightning CSS. Les benchmarks indiquent une accélération des temps de construction de 2 à 4 fois pour les sites de production. Bien que ces changements soient importants, ils sont optionnels et peuvent être adoptés progressivement sans nécessiter de mise à jour majeure.

https://docusaurus.io/blog/releases/3.6

## Angular 19 🎉

https://angular.fr/news/angular19

https://blog.angular.dev/meet-angular-v19-7b29dfd05b84

- hydratation incrementale
- Standalone par défaut
- Migration automatique vers les signaux
- Rendu Hybride dans Angular 19

## Python passe devant JS

https://github.blog/news-insights/octoverse/octoverse-2024/

Le rapport Octoverse 2024 de GitHub met en lumière plusieurs tendances clés dans le développement logiciel :

- Python a surpassé JavaScript en tant que langage le plus utilisé sur GitHub
- **Croissance de l'IA** : Les contributions aux projets d'IA générative ont augmenté de 59 %, avec une hausse de 98 % du nombre de projets, reflétant l'adoption rapide de l'IA par les développeurs.
- **Expansion mondiale des développeurs** : Le nombre de développeurs a considérablement augmenté, notamment en Inde, au Brésil et au Nigeria. L'Inde est en passe de devenir la plus grande communauté de développeurs sur GitHub d'ici 2028.

## Doit-on séparer JS en 2 versions ?

https://devclass.com/2024/10/22/should-javascript-be-split-into-two-languages-new-google-driven-proposal-divides-opinion/

Discussions vives sur HN https://news.ycombinator.com/item?id=41955353

En octobre 2024, lors d'une réunion du comité de standardisation ECMAScript TC39, Shu-yu Guo, ingénieur chez Google, a proposé de scinder JavaScript en deux langages distincts :

- **JS0** : Un noyau minimal implémenté par les moteurs d'exécution, visant à simplifier la base du langage pour améliorer la sécurité et les performances.
- **JSSugar** : Une version enrichie nécessitant des outils de compilation pour être convertie en JS0, permettant l'ajout de nouvelles fonctionnalités sans alourdir les moteurs d'exécution.

Cette proposition, soutenue par des représentants de Mozilla, Apple, Moddable et Sony, vise à réduire la complexité croissante de JavaScript, qui peut compromettre la sécurité et les performances des applications. Cependant, elle suscite des débats au sein de la communauté des développeurs, certains craignant une dépendance accrue aux outils de compilation et une fragmentation du langage.

## De Next.JS vers HTMX

Pouria Ezzati recode son application de Next.JS vers HTMX et passe de 24 dépendances à 3 !

https://htmx.org/essays/a-real-world-nextjs-to-htmx-port/

## Plugin Tailwind CSS Clamp generator

Pour utiliser des classes avec un tilde (~) et générer des valeurs avec clamp.

Permet d’éviter l’utilisation des md: lg:,….

https://fluid.tw/

## Dev Fest Nantes 2024

17, 18 octobre 2024

- Quoi de neuf dans ES2026 [https://youtu.be/syiwlrtp5iw](https://youtu.be/syiwlrtp5iw?feature=shared)
- React Compiler [https://youtu.be/\_edOnkr8Yy4](https://youtu.be/_edOnkr8Yy4?feature=shared)
- Amazing CSS in 2024 [https://youtu.be/D79TND9w_AY](https://youtu.be/D79TND9w_AY?feature=shared)
- Server Side WASM [https://youtu.be/ziBaoZTOj0Q](https://youtu.be/ziBaoZTOj0Q?feature=shared)

## Github open-source fund

GitHub a récemment annoncé la création du **GitHub Secure Open Source Fund**, un programme visant à renforcer la sécurité de l'écosystème open source. Ce fonds offre un soutien financier aux projets open source pour améliorer leur sécurité, en couvrant des aspects tels que les audits de sécurité, la correction de vulnérabilités et la formation des mainteneurs. Les candidatures sont ouvertes jusqu'au 7 janvier 2025, avec des financements et des programmes débutant au début de l'année 2025.

https://github.blog/news-insights/company-news/announcing-github-secure-open-source-fund/

## Sentry distribue 750 000$ pour l’open-source

En novembre 2024, Sentry a annoncé une contribution de 750 000 dollars aux mainteneurs de projets open source, marquant une augmentation de 50 % par rapport à l'année précédente. Cette initiative s'inscrit dans le cadre de l'**Open Source Pledge**, une démarche collective visant à soutenir la durabilité des projets open source. Parmi les bénéficiaires figurent des projets tels que Django, Python, OpenJS et Rust, ainsi que des plateformes comme thanks.dev, utilisées pour distribuer les fonds de manière automatisée aux mainteneurs individuels.

https://blog.sentry.io/we-just-gave-750-000-dollars-to-open-source-maintainers/

## [Bolt.new](http://Bolt.new) $ 4 millions ARR en 4 semaines

StackBlitz a intégré Claude, le modèle d'IA d'Anthropic, dans sa plateforme de développement web Bolt, permettant aux utilisateurs de créer des applications web sophistiquées via des instructions en langage naturel, sans nécessiter de compétences en programmation. Cette collaboration a conduit à une croissance rapide, atteignant 4 millions de dollars de revenus récurrents annuels en seulement quatre semaines après le lancement. L'intégration de Claude 3.5 Sonnet a également permis une réduction de 99 % des coûts de développement pour les utilisateurs de Bolt, facilitant le passage de l'idée au déploiement en production en un seul clic.

https://www.anthropic.com/customers/stackblitz

## [Ikea.com](http://Ikea.com) sur Astro

https://www.ikea.com/

Bonne écoute !
