---
publicationDate: 2022-12-01
title: Next.js 13, introduction (1/3)
description: Vous le savez certainement, Next.js 13 a été annoncé lors de la Next.js Conf le 25 octobre 2022.Alors, quand on supprime tous les subterfuges marketings et la présentation à la Apple, c'est une annonce très importante dans la communauté React.js. Des grands changements à commencer par le principal, une nouvelle structure pour nos applications Next.js !
author: {name: '@patrickfaramaz ',url: 'https://twitter.com/patrickfaramaz'}
---

Vous le savez certainement, **Next.js 13** a été annoncé lors de la **Next.js Conf** le 25 octobre 2022.

::Image
---

src: /articles/nextjs-presentation.jpg
alt: nextjs 13
align: 'center'
---

::

Alors, quand on supprime tous les subterfuges marketings et la présentation  à la Apple, c'est une annonce très importante dans la communauté **React.js**. Des grands changements à commencer par le principal : une nouvelle structure pour nos applications **Next.js** !

Alors, je vous arrête tout de suite, vos applications développées précédemment sous le format classique (dossier pages) vont continuer à fonctionner sans souci. Pas de panique !

Personnellement, j'ai attendu que l'effervescence retombe un peu et j'ai enfin pris le temps de bien lire la doc (une bonne journée) et de tester un peu en codant.

D'où l'idée de faire un retour par écrit et en vidéo sur cette nouvelle structure et tout ce qui va avec.

- Dans un [premier article](/articles/next-js-13-pages/), nous allons refaire le point sur la façon que je nommerai **"classique"** de construire des applications depuis quelques versions avec Next.js.
Ce premier article se concentra sur la méthode "classique" qui utilise l'API "pages".
- S'en suivra, un [deuxième article](/articles/next-js-13-app/) sur cette nouvelle structure via de dossier **"app"**. Nous regarderons ensemble ce que cela change et nous allons surtout regarder si nos applications continueront à fonctionner de la même façon avec cette nouvelle version.

Avant que vous passiez au premier article, je voulais revenir sur le fait que Next.js était quasiment obligé **d'évoluer**.

Cette nouvelle structure se présente comme un gros changement de conception et même de **modèle mental**.

Pour les gros projets, la transition ne va pas être simple. Il faudra même peut-être réécrire une bonne partie des applications !

Ce qu'il faut comprendre, c'est que l'on entre dans une nouvelle ère pour les frameworks JS. [Miško Hevery](https://twitter.com/mhevery), le créateur de Qwik, parle de framework **3ème génération**.

On pourrait même dire, que l'on entre dans l'âge de raison. Une nouvelle ère, où nous allons envoyer beaucoup moins de JS dans les navigateurs, où uniquement les éléments interactifs embarqueront le code pour l'être.

::Image
---

src: /articles/bundle-size.jpg
alt: bundle size js
align: 'center'
---

::

Bref, un changement obligatoire, peut-être un peu contraignant mais pour le bien de tous !

::Info
**Lire la suite**

- **[Next.js, le point sur l'API "pages" (2/3)](/articles/next-js-13-pages/)**
::