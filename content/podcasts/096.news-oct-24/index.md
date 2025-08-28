---
publicationDate: 2 Oct 2024
status: published
author: Double Slash
categories:
  - Technology
duration: 4087
episodeNumber: 96
episodeType: full
explicit: false
season: 1
dsSlug: DS_096_news-oct
title: Les news web dev pour octobre 2024
subtitle: Épisode new web développement pour octobre 2024
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1727863067/ART_96_sjwwkf.png
description: Dans cet épisode, nous revenons sur la keynote d'ouverture de DHH, qui n'a pas manqué de secouer l'industrie en critiquant vivement les fournisseurs de cloud, tout en esquissant les grandes tendances pour les années à venir. L'intelligence artificielle avec des navigateurs et des éditeurs de code. Nous abordons également les nouvelles versions des frameworks populaires comme Astro et Fastify, sans oublier l'importance croissante des projets open source et des outils qui transforment notre quotidien de développeurs.
videoLink: 0Cqksl85_4M
---

## Tendances et orientations

### Rails World 2024 Keynote d’ouverture de DHH

- https://youtu.be/-cEn_83zRFw
- https://kyrylo.org/rails/2024/09/27/notes-from-the-opening-keynote-by-david-heinemeier-hansson-at-rails-world-2024.html

::Image
---
src: /assets/articles/aws-vercel.jpg
alt: AWS Vercel
align: 'center'
---
::

- Rails 8 (Mission Rails 8 : NoBuild, NoPaaS)
- #NOPASS Rails will not require a commercial vendor for production deployment.
- Nouveau Adapter basé sur sqlite
  - Solid Cable
  - Solid Cache
  - Solid Queue (20 millions de tâches sur HEY)
- Approche #NOBUILD
  - HEY est passé 100% no build
  - Arrivée de Propshaft https://github.com/rails/propshaft (livraison, cache, manifest, Importmaps)
- Cloud

  - L'industrie a cultivé une peur de la gestion des serveurs
  - AWS a résolu un problème spécifique pour les pics d'utilisation extrêmes d'Amazon
  - La plupart des développeurs n'ont pas besoin de solutions aussi complexes
  - AWS 40% de marge et des acteurs ont ajouté juste une couche (Vercel)

  Comparaison des coûts

  - Performance M d'Heroku (1 cœur/2 threads/2,5 Go de RAM/250 $ par mois) par rapport à la boîte de loisirs Hetzner (48 cœurs/96 threads/256 Go de RAM/220 $ par mois)
  - DHH critique la marge sur des services comme Vercel (AWS) +500% de marge)

- Kamal 2 https://kamal-deploy.org/
  - Outil de déploiement pour les applications Rails
  - Fonctionnalités Auto SSL via Let's Encrypt
  - Permet d'exécuter plusieurs applications sur un seul serveur
  - Inclut un nouveau proxy écrit en Go

## IA

### Editor IA

https://zed.dev/

### Supermaven

https://supermaven.com/blog/funding-announcement

### Générateur de schéma

Pour les présentations

[http://napkin.ai](http://napkin.ai/)

Un exemple que j’ai généré :

::Image
---
src: /assets/articles/rendermodesnapkin.png
alt: Napkin IA
align: 'center'
---
::

## Open Source

### Drama WordPress vs WP Engine

Beaucoup de contenu en 1 semaine mais voici un article de Korben

https://korben.info/wp-engine-vs-wordpress-guerre-declaree.html

### Eleventy chez Font Awesome

https://www.11ty.dev/blog/eleventy-font-awesome/

### Open Source pledge

https://blog.stackblitz.com/posts/stackblitz-joins-osspledge/?social

https://opensourcepledge.com/

### **Oracle, it’s time to free JavaScript.**

https://javascript.tm/

Le texte appelle Oracle à abandonner le contrôle du nom "JavaScript", affirmant que ce dernier est devenu un terme générique qui ne devrait plus être sous la tutelle d'une entreprise privée. JavaScript, aujourd'hui le langage de programmation le plus utilisé dans le monde, n'a plus de lien direct avec Oracle, qui en détient toujours la marque en raison de son acquisition de Sun Microsystems en 2009. Cependant, Oracle n'a jamais réellement commercialisé de produit JavaScript et a cessé de l'utiliser activement, ce qui, selon la loi américaine, constitue un abandon de marque.

Les auteurs soulignent que cette situation cause de la confusion, empêchant même la tenue d'événements sous le nom de "JavaScript" sans risquer de violer la marque. En conclusion, ils demandent qu'Oracle relâche le nom dans le domaine public et menacent de lancer une procédure légale pour annuler la marque si aucune action n'est prise.

### Code Scanning Copilot Autofix

Free pour tous les repositories publics

https://github.blog/changelog/2024-09-18-now-available-for-free-on-all-public-repositories-copilot-autofix-for-codeql-code-scanning-alerts/

Sur le site Double Slash pas d’alerte ! ouf !

## Nouvelles versions

### Astro 5 Beta

https://astro.build/blog/astro-5-beta/

- Content layer Stable
- Server island stable
- Astro:env stable
- Static et Hybrid mode merged

### Fastify 5

https://www.youtube.com/embed/M57Vi8NnxUM

Deux objectifs d’après Matteo Collina

- Simplify long-term maintenance by dropping support for outdated Node.js versions, with Fastify v5 now targeting Node.js v20 and above.
- Streamline the framework by removing all deprecated APIs that have accumulated over the past two years of improvements.

### Surreal DB 2.0

https://surrealdb.com/2.0

## Tools

### CPX comme NPX mais en PHP

https://cpx.dev/

### Browser

[https://zen-browser.app](https://zen-browser.app/)

### Librairie de components partagées

https://uiverse.io/

Bonne écoute !


