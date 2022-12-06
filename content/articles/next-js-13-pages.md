---
publicationDate: 2022-12-04
title: Next.js 13, pourquoi il était nécessaire d'évoluer (2/3)
description: Dans ce premier article, nous allons refaire le point sur la façon que je nommerai "classique" de construire des applications depuis quelques versions avec Next.js. Ensemble, nous allons revoir le fonctionnement de la structure "pages" dans Next.js et ensuite dévoiler quelques points bloquants sur cette version.
author: {name: '@patrickfaramaz ',url: 'https://twitter.com/patrickfaramaz'}
---

::Info
---
type: warning
---
Cet article fait partie d'une série de 3 articles :

- [Next.js 13, introduction (1/3)](/articles/next-js-13-intro/)
- [Next.js 13, on fait le point de la nouvelle structure "app" (3/3)](/articles/next-js-13-app/)
::

Dans ce premier article, nous allons refaire le point sur la façon que je nommerai **"classique"** de construire des applications depuis quelques versions avec **Next.js**.
Ensemble, nous allons revoir le fonctionnement de la structure "pages" dans **Next.js** et ensuite dévoiler quelques points bloquants sur cette version.

Une vidéo est liée à cet article, disponible ci-dessous.

## Next.js 13, pourquoi il était nécessaire d'évoluer ! [1/2]

::VideoPlayer
---

videoLink: btOxeMg9gqY
videoTitle: Next.js 13, pourquoi il était nécessaire d'évoluer ! [1/2]
---

::


## Bref historique

Pour rappel, **getStaticProps**, **getStaticPath** et la notion **d'hybride** ont été introduits sur la version [9.3](https://nextjs.org/blog/next-9-3) de Next.js le 9 mars 2020.

S'en sont suivies, plusieurs évolutions sur le mode statique hybride dont la dernière grosse feature (sur la [12.2](https://nextjs.org/blog/next-12-2#on-demand-incremental-static-regeneration-stable)) :
- la possibilité d'invalider une url pour forcer la régénération de la page sans redéployer toute l'application. Pour les grosses applications, c'est une révolution.

**A noter que c'était une demande de la part des gros acteurs.**

## Statique Hybride

En mars 2021, j'écrivais un article sur [Jamstatic.fr](https://jamstatic.fr/2021/03/09/11000-pages-statiques/) concernant la problématique de faire du statique avec un site qui comporte beaucoup de pages.

Depuis, plusieurs meta-framework, ont implémenté des méthodes pour les sites avec un grand nombre de pages :

- [Gatsby DSG](https://www.gatsbyjs.com/docs/reference/rendering-options/deferred-static-generation/)
- [Eleventy Serverless](https://www.11ty.dev/docs/plugins/serverless/)
- ...

Mais à ce jour, Next.js reste une seule solution simple qui permet en production de générer à la demande une page statique et donc de déployer une app sans générer toutes les pages. Nous parlons de génération incrémentale.

Et c'est pour cela que l'on parle de statique "hybride" car il est nécessaire de faire tourner une runtime pour permettre ce fonctionnement contrairement à du pur statique qui une fois généré se pose sur un CDN et basta.


## Les points bloquants de la structure "pages"

Nous sommes nombreux à avoir développé des applications plus ou moins complexes. À s'être accoutumé au fonctionnement de Next.js.

Ensemble nous allons faire le tour des points bloquants sur la version que je nommerai "classique".

### Le layout

Dans **Next.js** "classique", la notion de layout est déjà existante. En effet, nous avons la possibilité de créer un layout en passant un component dans le fichier ```_app.js```.

```js
import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout navigation={pageProps.navigation}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
```

Ce layout ne changera pas au fil des navigations dans le browser et seul le contenu sera modifié.

- Première limitation : on ne peut pas faire de requête dans ce layout. Pas moyen de récupérer les data de navigation ou autre directement dedans. Il est dépendant de la page qui le contient.

- Deuxième limitation : si je veux avoir des variantes de mon layouts, ce n'est pas natif, il faudra jouer d'astuce pour parser l'url et déterminer quelle est la page courante.

### "getStaticProps", la seule source de data et la cascade

Dans la version "classique", tout est basé sur les pages. C'est uniquement dans une page via **getStaticProps** ou **getServerSideProps**, que l'on peut récupérer des data coté serveur.

```js
export async function getStaticProps({ params }) {
  // slug in first param
  const [slug] = params.slug || []
  // get navigation items
  const navigation = await getNav()
  // not slug === home
  const page = await getPage(slug || '')
  if (!page) {
    return {
      notFound: true,
    }
  }
  return {
    props: { navigation, page },
  }
}
```

D'un côté, c'est une bonne chose de n'avoir qu'un point d'entrée pour les data, c'est centralisé. De l'autre, ce point d'entrée, se retrouve à gérer toute la data de la page. Layout compris.

L'inconvénient, c'est que l'on obtient une cascade de data entre les components. Les components se passent les data de parent à enfant. La page devient responsable de la data affichée dans la navigation, le footer, la sidebar.

Autre inconvénient, les requêtes sont répétées pour chaque page générée même si elles sont identiques. Pas de système de cache en natif.

Cela peut très vite, mettre à mal votre API via de très nombreuses requêtes lors d'un déploiement.
Mais ce n'est pas tout, même lors du fonctionnement en production, il peut y avoir des frictions.

**Première friction** : Le prefetch des liens. Sur une page de liste par exemple, cela peut lancer beaucoup d'appels en même temps, puisque Next.js va générer les pages liées aux liens. Si vous avez des **getStaticProps** assez conséquents cela peut ralentir votre API.

::Info
**Link Prefetch** : Quand Next.js découvre des liens dans un page, il prefetch les pages liées automatiquement. Il est possible de désactiver le prefetch et passer sur le mode hover. Quand le curseur passe sur le link, le prefetch se lance.
::

**Deuxième friction** : sur une page générée à la demande en réglant le callback sur true ou blocking, après avoir cliqué sur un lien interne, on peut parfois observer une transition de page assez lente où il ne se passe rien. Jusqu'à avoir l'impression que le clic n'a pas fonctionné.
C'est un comportement que l'on retrouve parfois quand on a des fonctions getStaticProps assez conséquentes.

::Image
---

src: /assets/articles/nextjs-lag.gif
alt: nextjs 13 slow
align: 'center'
---

::


### Réhydratation

L'**hydratation**, c'est l'étape où l'application parse le html pour intégrer le côté interactif de l'application.
Problème, c'est une étape coûteuse en ressource et plus ou moins longue en fonction de la taille de l'application et du bundle. Cela peut réellement impacter le "**Time to Interactive**" et le "**Total Blocking Time**" dans les tests de performances.

::Image
---

src: /assets/articles/blocking-time.jpg
alt: Total blocking time
align: 'center'
---

::

**La conséquence**: Désormais de tous les frameworks n'ont qu'un seul objectif : envoyer le minimum de **JavaScript** possible dans le navigateur. Le comble pour des web apps JavaScript.

Un des concepts qui semble être majoritairement adopté: l'**island architecture**. La majorité du code repasse sur du HTML classique et seulement les éléments qui doivent être interactifs, embarquent du JavaScript.

Actuellement l'API de rendu React, par sa conception, ne fonctionne pas comme ça. L'application est réhydratée complètement dans le navigateur avant de pouvoir être utilisable.

Aujourd'hui dans les tests de performances, les applications Next.js sont pénalisées par un bundle trop lourd, du javascript trop long à parser et donc un **Time to Interactive** catastrophique.

Next.js dans sa version "classique", ne peut pas changer ce système !

Bonne nouvelle ! **React 18**, introduit de nouveau concept de rendu et nous allons en parler dans le prochain article :

::Info
**Lire le dernier article**

- **[Next.js 13, on fait le point de la nouvelle structure "app" (3/3)](/articles/next-js-13-app/)**
::
