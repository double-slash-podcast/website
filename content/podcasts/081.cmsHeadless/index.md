---
publicationDate: 7 Feb 2024
status: published
author: Double Slash
categories:
  - Technology
duration: 9999
episodeNumber: 81
episodeType: full
explicit: false
season: 1
dsSlug: DS_081_cmsHeadless
title: Dans la jungle des CMS Headless
subtitle: Comment bien choisir son CMS
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1707292580/episode/ART_81_vtawjb.png
description: Le sujet des CMS Headless est très vaste. Les solutions disponibles sont impressionnantes. Il y a une quantité d’acteurs importants. Et surtout, les offres sont toutes différentes. En mode Saas, auto-hébergé, Git based ! Comment faire son choix.
videoLink : OrpmNlsQvXo
tags: ["cms","cms headless"]

---
Sans parler des fonctionnalités, multilingue, gestion des accès, preview…

Nous allons essayer de vous aider à faire un choix dans la jungle de CMS Headless. Vous expliquez les choses à vérifier. Nous allons tenter de vous faire comprendre qu’en fonction du client et du projet, il y a des CMS plus adaptés que d’autres.

### Les attentes ou fonctionnalités à ne pas négliger

- Multilingue
- Gestions accès/rôles (très utile pour les entreprises avec différents services. Marketing, rédaction,…)
- Éditeurs (WYSIWIG ou champs classiques)
- Preview (vue des changements avant mise en ligne) Très important pour les sites statiques.
- Gestion des médias (interne, externe, redimensionnement…) Souvent oublié mais primordial !
- Process de validation (draft, review, validation etc… ) Certaines entreprises ont des relectures avant publication.
- La simplicité d’utilisation et l’ergonomie. En tant que dev, on ne pense jamais à ça mais c’est aussi très important.
- La vitesse (pour un éditeur qui passe du temps dans l’admin, c’est vite frustrant d’attendre)
- Les librairies disponibles pour l’intégration. Fort couplage ou pas dans le code.
- La customisation (le code est-il hookable pour exécuter des tâches spécifiques)
- Webhook pour lancer les déploiements
- Système d’import ou d’export. Le client ne va pas recréer tout le contenu.
- Système de hub (import d’autres services pour intégration dans le contenu) e-commerce par exemple.

## Les types de CMS

## GIT based CMS

### Fonctionnement

Le CMS ajoute une couche au-dessus de l’application et rend les éléments éditables ou le CMS propose un dashboard pour éditer les fichiers de contenu.

Dans tous les cas, ce sont les fichiers de contenu qui sont édités (MD, JSON, CSV).

On parle de Git parce que toutes les data sont stockées au même endroit que le code source du projet.

Quels types de projet :

Très adapté aux sites statiques de par le fonctionnement. Mais il est possible de faire aussi du dynamique SSR. Avec Nuxt content par exemple.

### Quels type de client

En fonction du CMS utilisé ça peut être plus ou moins simple. Un CMS visuel peut être agréable pour les clients. A contrario, un système plus basique conviendrait plus à des personnes techniques.
Le retour régulier des clients est la compréhension du déploiement par rapport à Git et l’automatisation qui va derrière. Généralement, les utilisateurs aiment voir les modifications rapidement et ne comprennent pas qu’il faille attendre.

### Avantages

Stockage simple

Certains frameworks gèrent bien les fichiers md.

### Inconvénients

Design limité sauf si on utilise du mdx/mdc mais ça complique les choses

A quels éléments prêter attention :

Mélange code CMS/front (Tina CMS).

Gestion des images

Gestion des accès

### Offres

- Statamic (basé sur Laravel) Rest, GraphQL, Live Preview, Revisions, Multisite,…) <https://statamic.com/features> (propriétaire)
- Nuxt Studio (seulement Nuxt) <https://nuxt.studio/> (Preview) Non open-source
- Decap CMS <https://decapcms.org/> (Workflow, preview)  (open-source)
- Sveltia CMS <https://github.com/sveltia/sveltia-cms> (Comme Decap CMS en plus light)  (open-source)
- KeyStatic <https://keystatic.com/>  (open-source)
- Static CMS <https://www.staticcms.org/> (open-source)
- Tina CMS <https://tina.io/> (open-source et cloud) Media (S3, cloudinary,..)
- Yama CMS <https://yama-cms.com/>  (propriétaire)

## Warning ! BAAS (Backend As A Service)

### Fonctionnement

Les services Backend as a Service (BAAS) sont des solutions cloud qui simplifient le développement d'applications en fournissant une infrastructure backend prête à l'emploi.

Ces services gèrent les aspects tels que les serveurs, les bases de données, les APIs et la sécurité, permettant aux développeurs de se concentrer sur la création de fonctionnalités frontales.

Avec des fonctionnalités telles que la mise à l'échelle automatique, la gestion des utilisateurs, et des coûts basés sur l'utilisation, les BAAS offrent une approche efficace et rentable pour le développement d'applications, en éliminant la nécessité de gérer directement l'infrastructure backend.

### Quels types de projet

Tous les projets. Nécessite d’avoir un minimum de connaissances techniques pour exploiter correctement les fonctionnalités.

### Quels type de client

Clients plutôt startup avec des projets poussés et qui évoluent rapidement.

### Avantages

Services faciles à utiliser avec des mises en place rapide d’authentification, etc..

### Inconvénients

**Ce n’est pas un CMS !** Bien que l’on dispose d’une interface qui permet de gérer des data, on tape directement dans la base de données. C’est très dangereux et pas adapté pour les clients.

### Offres

- PocketBase <https://pocketbase.io/>  (open-source)
- Hasura <https://hasura.io/>  (open-source)
- Supabase <https://supabase.com/>  (open-source)
- Firebase <https://firebase.google.com/>

## SAAS (Software As A Service)

### Fonctionnement

Les systèmes de gestion de contenu en tant que service (CMS SAAS) sont des plateformes cloud qui simplifient la création, la gestion et la publication de contenus en ligne.

Ces CMS SAAS fournissent une interface conviviale pour la création de sites web, la gestion de contenu et l'organisation des données, éliminant la nécessité de gérer des serveurs ou des logiciels complexes localement.

Ils offrent généralement des fonctionnalités telles que la gestion des utilisateurs, et la mise à jour automatique du logiciel.

Les utilisateurs peuvent accéder à ces CMS via un navigateur web, ce qui facilite la collaboration à distance.

Avec des coûts basés sur un modèle d'abonnement, les CMS SAAS sont une option pratique pour les entreprises cherchant une solution tout-en-un sans se soucier de l'infrastructure sous-jacente.

### Quels types de projet

Tous les projets. Pour les entreprises qui n’ont pas envie de gérer une infrastructure ou qui n’ont pas de personnel technique (dev) en interne. Le coût du CMS est très faible par rapport à des coûts d’un salarié.

### Quels type de client

Entreprise, de la PME à la grande multinationale.

Startup.

### Avantages

Services utilisables en quelques clics/heures (pour la partie back).

Pas de gestion de versions, pas de mise à jour à faire.

Pas de gestion de serveur.

Auto-scaling automatique souvent disponible.

### Inconvénients

Le coût de certains CMS est très exclusif.

Parfois, le couplage très fort avec le CMS qui fait que c’est difficile de sortir du système et de migrer vers un autre CMS.

Les coûts qui peuvent changer sans que l’on puisse rien faire. Augmentation dans la plupart des cas.

Les data sont dans le CMS.

A quels éléments prêter attention :

- Multilingue
- Hook pour effectuer des actions au déclenchement d’un événement
- Gestions des droits et des rôles
- Import de data (exemple importer des data e-commerce)
- Gestion des images (resize, optimisations, hosting)
- Preview
- ….

### Offres SAAS

- Prismic <https://prismic.io/>
- ContentFull <https://www.contentful.com/>
- DatoCMS <https://www.datocms.com/>
- Builder IO <https://www.builder.io/>
- StoryBlock <https://www.storyblok.com/>
- Plasmic <https://www.plasmic.app/features>
- ButterCMS <https://buttercms.com/>
- Agility <https://agilitycms.com/>
- Kontent.ai <https://kontent.ai/>
- Apito <https://apito.io/> Existe en version community (beta)
- Sanity Studio <https://www.sanity.io/> (open-source)

### Offre Hybride (Offres d’hébergement du CMS open-source)

Les créateurs des projets open-sources proposent des offres dites “Cloud”. C’est à dire, qu’il propose de s’occuper de l’hébergement pour vous. Un solution intéressante entre deux.

Les offres tournent entre 35$ et 199$ pour Payload,  99 dollars pour Strapi et Directus.

- Strapi Cloud <https://strapi.io/cloud> (open-source)
- Directus Cloud <https://directus.io/> (open-source)
- Payload Cloud <https://payloadcms.com/> (open-source)

## CMS Self-hosted

### Fonctionnement

Les systèmes de gestion de contenu auto-hébergés (CMS Self-hosted) sont des solutions où l'utilisateur déploie et gère le CMS sur ses propres serveurs ou une infrastructure hébergée de manière indépendante.

Contrairement aux CMS en tant que service (CMS SAAS), ces CMS offrent un contrôle plus direct sur l'ensemble du système, permettant une personnalisation approfondie et une adaptation aux besoins spécifiques.

Les utilisateurs ont la responsabilité de la maintenance, des mises à jour, et de la sécurité du CMS, ainsi que de la gestion de l'infrastructure sous-jacente. Bien que cela offre une flexibilité accrue, cela nécessite également une expertise technique plus avancée et une responsabilité plus importante en matière de gestion.

Les CMS auto-hébergés sont souvent choisis par ceux qui recherchent un niveau élevé de personnalisation et de contrôle sur leur environnement en ligne.

### Quels types de projet

Tous les projets. Pour les entreprises qui ont du personnel technique (dev) en interne et des devs.

Ou qui passe par un prestataire externe (agence).

### Quels type de client

Entreprise, de la PME à la grande multinationale.

Startup.

### Avantages

Personnalisation du CMS sans limite

Pas de changement de prix.

On reste propriétaire des data, elles sont chez nous.

### Inconvénients

On reste responsable de l’infrastructure

On doit gérer les mises à jour et la sécurité.

### Offres

- Strapi <https://strapi.io/> (open-source)
- Directus self-hosted <https://directus.io/> (open-source)
- KeyStone <https://keystonejs.com/> (open-source)
- Craft CMS <https://craftcms.com/> (propriétaire)
- WordPress <https://fr.wordpress.org/> (open-source)
- Ghost <https://ghost.org/>  (open-source)
- Payload <https://payloadcms.com/> (self hosted) (open-source)
basé sur la config pour générer l’admin
- Webiny Self-hosted <https://www.webiny.com/> Free et payant ?!? (open-source)
- Cockpit <https://getcockpit.com/> Free et version Pro Addons (open-source)

## Quelques Précisions

Pour Strapi, les fondateurs sont français. Épisode du podcast a écouter : <https://double-slash.dev/podcasts/strapi/>

Vidéo : Installer Strapi sur Scalingo <https://www.youtube.com/watch?v=XxU1nbOsIWM>

A noter pour Directus, Alexandre Chopin est le Director of engineering
<https://directus.io/team/alex-chopin>


Bonne écoute !




