---
publicationDate: 2022-12-02
title: Next.js, le point sur l'API "pages" (2/3)
description: Nous sommes nombreux à avoir développé des applications plus ou moins complexes. À s'être accoutumé au fonctionnement de Next.js. Ensemble nous allons faire le tour des points bloquants sur la version "classique".
author: {name: '@patrickfaramaz ',url: 'https://twitter.com/patrickfaramaz'}
---

::Info
---
type: warning
---
Cet article fait partie d'une série :

- [Next.js 13, introduction (1/3)](/articles/next-js-13-intro/)
- [Next.js 13, la nouvelle API 'app' (3/3)](/articles/next-js-13-app/)
::

## Bref historique

Pour rappel, **getStaticProps**, **getStaticPath** et la notion **d'hybride** ont été introduits sur la version [9.3](https://nextjs.org/blog/next-9-3) de Next.js le 9 mars 2020.

S'en sont suivies, plusieurs évolutions sur le mode statique hybride dont la dernière grosse feature (sur la [12.2](https://nextjs.org/blog/next-12-2#on-demand-incremental-static-regeneration-stable)) :
- la possibilité d'invalider une url pour forcer la régénération de la page sans redéployer toute l'application. Pour les grosses applications, c'est une révolution.

**A noter que c'était une demande de la part des gros acteurs.**

## Statique Hybride

En mars 2021, j'écrivais un article sur [Jamstatic.fr](https://jamstatic.fr/2021/03/09/11000-pages-statiques/) concernant la problématique de faire du statique avec un site qui comporte beaucoup de pages.

Depuis, l'écosystème m'a donné raison puisqu'une majorité de framework a sorti une solution pour contourner cette problématique. Le problème existait bien !

Cependant, Next.js reste la seule solution simple qui permet en production de générer à la demande une page statique et donc de déployer une app sans générer toutes les pages.

On parle donc de statique hybride car il est nécessaire de faire tourner une runtime pour gérer tout ça contrairement à du pur statique qui une fois généré se pose sur un CDN et basta.


## Les points bloquants de l'API "pages"

Nous sommes nombreux à avoir développé des applications plus ou moins complexes. À s'être accoutumé au fonctionnement de Next.js.

Ensemble nous allons faire le tour des points bloquants sur la version que je nommerai "classique".

### Le layout

Dans **Next.js** "classique", la notion de layout est déjà existante. En effet, nous avons la possibilité de créer un layout en passant un component dans le fichier ```_app.js```.

Ce layout ne changera pas au fil des navigations dans le browser et seul le contenu sera modifié.

- Première limitation : on ne peut pas faire de requête dans ce layout. Pas moyen de récupérer les data de navigation ou autre directement dedans. Il est dépendant de la page qui le contient.

- Deuxième limitation : si je veux plusieurs layouts, pour créer des espaces différents dans la même app (espace client ou shop), ça devient compliqué. Ce n'est pas impossible à faire mais ça demande plus de code pour gérer tout ça, ce n'est donc pas natif.

### "getStaticProps", seule source de data et cascade

Dans la version "classique", tout est basé sur les pages. C'est uniquement dans une page via **getStaticProps** ou **getServerSideProps**, que l'on peut récupérer des data coté serveur.

D'un côté, c'est une bonne chose de n'avoir qu'un point d'entrée pour les data, c'est centralisé. De l'autre, ce point d'entrée, se retrouve à gérer toute la data de la page. Layout compris.

L'inconvénient, c'est que l'on obtient une cascade de data entre les components. Les components se passent les data de parent à enfant. La page devient responsable de la data affichée dans la navigation, le footer, la sidebar.

Autre inconvénient, les requêtes sont répétées pour chaque page générée même si elles sont identiques. Pas de système de cache en natif.

Cela peut très vite, mettre à mal votre API via de très nombreuses requêtes lors d'un déploiement.
Mais ce n'est pas tout, même lors du fonctionnement en production, il peut y avoir des frictions.

- Première friction : le système de prefetch des liens dans les pages peut ralentir votre API. En effet, sur une page de liste, cela peut rapidement ralentir la page s'il s'agit de pages générées à la demande. Un grand nombre de pages est généré et donc beaucoup d'appels à un instant T.

- Deuxième friction : sur une page générée à la demande en réglant le callback sur true ou blocking, après avoir cliqué sur un lien interne, on peut parfois observer une transition de page assez lente où il ne se passe rien. Jusqu'à avoir l'impression que le clic n'a pas fonctionné.
C'est un comportement que l'on retrouve parfois quand on a des fonctions getStaticProps assez conséquentes.

::Image
---

src: /articles/nextjs-lag.gif
alt: nextjs 13 slow
align: 'center'
---

::

::Info
**Prefetch** : Quand Next.js découvre des liens dans un page, il prefetch les pages liées. Heureusement, il est possible de passer sur un prefetch en mode hover pour éviter ça.
::

### Réhydratation

L'**hydratation**, c'est l'étape où l'application parse le html pour intégrer le côté interactif de l'application.
Problème, c'est une étape coûteuse en ressource et plus ou moins longue en fonction de la taille de l'application. Cela peut réellement impacter le "**Time to Interactive**" et le "**Total Blocking Time**" dans les tests de performances.

La conséquence: Désormais de tous les frameworks n'ont qu'un seul objectif : envoyer le minimum de **JavaScript** possible dans le navigateur. Le comble pour des web apps JavaScript.

Un des concepts qui semble être majoritairement adopté: l'**island architecture**. La majorité du code repasse sur du HTML classique et seulement les éléments qui doivent être interactifs, embarquent du JavaScript.

Actuellement l'API de rendu React, par sa conception, ne fonctionne pas comme ça. L'application est réhydratée complètement dans le navigateur avant de pouvoir être utilisable.

Bonne nouvelle ! **React 18**, introduit de nouveau concept de rendu et c'est justement ce que nous allons voir dans le prochain article :

::Info
**Lire le dernier article**

- **[Next.js 13, la nouvelle API 'app' (3/3)](/articles/next-js-13-app/)**
::
