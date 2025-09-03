---
publicationDate: 29 Oct 2024
status: published
author: Double Slash
categories:
  - Technology
duration: 2269
episodeNumber: 99
episodeType: full
explicit: false
season: 1
dsSlug: DS_099_new_oct24rc3
title: Les news web dev pour octobre 2024 - RC 3.0
subtitle: RC 3.0 - Épisode new web développement pour octobre 2024
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1730052692/episode/ART_99_sdc5ap.png
description: Le podcast présente les nouveautés en développement web. Next.js 15 et ses optimisations, la beta de React Compiler, la refonte e-commerce Medusa.js V2, le framework Pieces.js pour les web components, et des avancées avec Turso en base de données "Local First". WebStorm devient gratuit pour usage non commercial.
videoLink : aHjrmrcNIPk
---

## Next.js

### Keynote d'ouverture de la Next.js Conf

Lien vers la vidéo : https://www.youtube.com/live/WLHHzsqGSVQ

Retour des utilisateurs : Personne n’aime la complexité (même Guillermo).

Next.js, avec ses nombreuses options, est devenu trop complexe. Retour au dynamique par défaut.

TurboPack est maintenant stable pour le développement. Démarrage à froid plus rapide et davantage de compatibilités.

Pour le build : il ne passe pas encore tous les tests, mais bientôt...

Nouvelle directive “use cache” (expérimental) : elle cache tout !
Explication en 1 minute : https://x.com/asidorenko_/status/1850196860230676977?s=61 et la documentation : https://nextjs.org/docs/canary/app/api-reference/directives/use-cache.


### Next.js v15 !

Next.js a 8 ans ! 🥳

Voici un résumé des nouveautés et fonctionnalités introduites dans Next.js 15 :

1. **Stabilité et Mises à Jour** : Next.js 15 est désormais stable pour une utilisation en production. Cette version se concentre sur la stabilité et introduit le `@next/codemod CLI` pour faciliter les mises à jour.
2. **APIs de Requête Asynchrones** : Transition vers des API asynchrones pour `headers`, `cookies`, `params`, et `searchParams`, ce qui constitue un changement majeur.
3. **Sémantiques de Caching** : Les requêtes `fetch`, les Handlers de Route `GET`, et les navigations client ne sont plus mis en cache par défaut, offrant plus de contrôle sur le comportement du caching.
4. **Support de React 19** : Next.js 15 supporte React 19, tout en conservant la compatibilité avec React 18 pour le Pages Router.
5. **Turbopack Dev** : Apporte des améliorations significatives aux performances de développement local, avec un démarrage serveur plus rapide et des mises à jour de code plus rapides.
6. **Nouvelles Fonctionnalités** :
    - Indicateur de Route Statique : Indices visuels pour identifier les routes statiques lors du développement.
    - API `unstable_after` : Permet d'exécuter des tâches après le streaming d'une réponse.
    - API `instrumentation.js` : Observabilité durant le cycle de vie du serveur avec intégrations pour des outils comme Sentry.
    - Composant `<Form>` : Navigation côté client améliorée pour les formulaires HTML.
    - Support TypeScript pour `next.config.ts`.
7. **Sécurité** : Améliorations de la sécurité des actions serveur avec élimination de code mort et identifiants d'endpoints difficilement devinables.
8. **Améliorations de Performance** : Génération statique plus rapide, HMR pour les composants serveur, et autres améliorations de construction.

Ces mises à jour visent à améliorer la performance, renforcer la sécurité, et offrir une meilleure expérience de développement pour les applications Next.js. Pour plus de détails, vous pouvez consulter les annonces et la documentation officielle.


## React Compiler disponible en beta

Il gère la mémorisation (memoization) des parties de l'application qui n'ont pas besoin d'être recalculées lors d'un re-render.

https://react.dev/blog/2024/10/21/react-compiler-beta-release

## Medusa.js V2

https://medusajs.com/v2-launch/

### Admin UI

Nouvelle interface d'administration

### Fonctionnalités e-commerce :

- Expérience omnicanale avec retrait en magasin natif
- Gestion des variantes de produits avec suivi d’inventaire
- Nouveau système d'authentification
- Nouveau système de code promo avec granularité

### Côté développement :

Modules entièrement découplés et indépendants

17 modules : Panier, Client, Paiement, Tarification, Produits, Promotion, Commande, etc.

Chaque module est indépendant et peut être remplacé par un module personnalisé.

## Pieces.js, le framework pour les web components

https://tympanus.net/codrops/2024/10/21/getting-started-with-piecesjs-building-native-web-components-with-a-lightweight-framework/

Permet de créer des web components indépendants qui chargent le code nécessaire uniquement lorsqu'il est utilisé.

Framework intéressant basé sur des fonctionnalités natives.

## Arc va construire un deuxième browser

https://x.com/joshm/status/1849896446113333688?s=61

L'équipe souhaite apporter des évolutions, mais les utilisateurs actuels sont satisfaits. Pour pouvoir continuer dans cette direction sans perturber le projet actuel que nous connaissons tous, ils vont lancer un second projet.

## Editeur WebStorm - Free.

WebStorm devient gratuit pour un usage "non commercial".

https://www.jetbrains.com/webstorm/

## Turso Launch Week 3

https://turso.tech/launch-week

Turso est une base de données compatible SQLite, construite sur libSQL, la version ouverte de SQLite.

- Stockage de vecteurs / SDK (IA)
- Kin : modèle IA, assistant personnel local pour iOS
- Plus de SDK natifs
- Turso sur AWS : zéro démarrage à froid
- Blackouts VEGAS : excellent pour le marketing ! Un jour gratuit, idéal pour éviter les attaques DDoS et pour la montée en charge, ex : facturation Vercel
- Approche encore plus "Local First" – en BETA

### SURREAL DB - University

https://surrealdb.com/learn

Surreal DB university pour apprendre comment utiliser Surreal DB.




