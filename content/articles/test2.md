---
publicationDate: 2022-11-21
title: Next.js 13, le nouveau système en détails novembre
description: Next.js 13 a été annoncé lors de la Next.js Conf le 25 octobre 2022. Quand on supprime tous les subterfuges marketings et la présentation à la Apple, il reste l'essentiel. C'est-à-dire, une nouvelle structure pour nos applications Next.js.
author: {name: '@patrickfaramaz ',url: 'https://twitter.com/patrickfaramaz'}
---

Next.js 13 a été annoncé lors de la Next.js Conf le 25 octobre 2022.

Quand on supprime tous les subterfuges marketings et la présentation à la Apple, il reste l'essentiel. C'est-à-dire, une nouvelle structure pour nos applications Next.js.
Alors, je vous arrête tout de suite, vos applications développées sous le format classique (dossier pages) vont continuer à fonctionner sans souci. Pas de panique !

Personnellement, j'ai attendu que le tumulte retombe et j'ai enfin pris le temps de bien lire la doc (une bonne journée) et de tester un peu.

D'où l'idée de faire un retour sur cette nouvelle structure et tout ce qui va avec.
Il y aura donc des vidéos et des articles.

Dans un premier temps, nous allons refaire le point sur la façon que je nommerai "classique" de construire des applications depuis quelques versions de Next.js. Pour être précis, c'est dans la version [9.3](https://nextjs.org/blog/next-9-3), que "getStaticProps" a été introduit.

- Le premier article se concentra sur les points faibles de la méthode "classique"
- Le deuxième article expliquera les nouvelles features et la différence avec la "classique"
- Et le troisième article et le dernier, sera une présentation de quelques subtilités de la nouvelle méthode.

Avant de poursuivre, je voulais revenir sur le fait que Next.js était aujourd'hui obligé d'évoluer. Cette nouvelle structure se présente comme un gros changement de conception. Pour les gros projets, la transition ne va pas être simple. Il faudra même peut-être réécrire une bonne partie des applications.
Mais il faut comprendre que l'on rentre dans une nouvelle ère pour les frameworks JS. [Miško Hevery](https://twitter.com/mhevery), parle de 3ème génération.
On pourrait dire, l'âge de raison. Une nouvelle ère, où nous allons envoyer beaucoup moins de JS dans les navigateurs, où uniquement les éléments interactifs le seront.

Bref, un changement obligatoire et peut-être un peu contraignant mais pour le bien de tous !
