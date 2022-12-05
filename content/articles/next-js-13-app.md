---
publicationDate: 2022-12-05
title: Next.js 13, on fait le point de la nouvelle structure "app" (3/3)
description: Le nouveau système de Next.js 13 est entièrement basé sur les server components. Dans la structure "app" de Next.JS, tous les components sont des server components par défaut. Mais c'est quoi un server components ?
author: {name: '@patrickfaramaz ',url: 'https://twitter.com/patrickfaramaz'}
---

::Info
---
type: warning
---
Cet article fait partie d'une série de 3 articles :

- [Next.js 13, introduction (1/3)](/articles/next-js-13-intro/)
- [Next.js 13, pourquoi il était nécessaire d'évoluer (2/3)](/articles/next-js-13-pages/)
::

## Vidéo liée à l'article : Next.js 13, on fait le point de la nouvelle structure "app" [2/2]

::VideoPlayer
---

videoLink: Q_mEE0KRvLI
videoTitle: Next.js 13, on fait le point de la nouvelle structure "app" [2/2]
---

::


## React Server Component

La nouvelle structure "app" de **Next.js 13** est entièrement basé sur les **server components**.
Tous les components sont des **server components** par défaut.

Mais c'est quoi un server components ?

Pour simplifier, ce sont des components générés par le serveur. Ils ne sont pas inclus dans le bundle de l'application envoyé au navigateur. Ils peuvent s'auto-remplacer dans l'arbre des components sans perdre l'état.
[Une explication de la part de Dan Abramov](https://news.ycombinator.com/item?id=25499171)

Si on utilise une majorité de **server component** dans son app, le poids du bundle se réduit considérablement.

Exemple de format d'un server component :

```js
J0:[[["",{"children":["blog",{"children":[["params","948D24C5-725A-2046-19E5-E21F59C6D815","oc"],
{"children":["",{}]}]}]},null,null,true],"@1",[["$","title",null,{"children":"Create Next App"}],
["$","meta",null,{"content":"width=device-width, initial-scale=1","name":"viewport"}], ... enim nisl elementum purus, accumsan interdum libero dui nec ipsum."}]]
```

**Autre avantage des server components, nous pouvons faire des requêtes à l'intérieur des components. Puisque nous sommes cotés serveur \o/.**

```js
async function getPost(id) {
  const res = await fetch(`http://localhost:3000/api/getPost?id=${id}`)
  return res.json()
}

export default async function Post({ params }) {
  const [id] = params.params || []
  const post = await getPost(id)
  if (!post) {
    notFound()
  }
  return (
    <>
      <h1 className="my-8 text-3xl font-bold">{post?.title}</h1>
      <p className="text-gray-600">{post?.body}</p>
    </>
  )
}
```

Par contre, les server components ont une petite limitation.
On ne peut pas utiliser des **hooks** (useState, useEffect...) ou des **événements** à l'intérieur.

```
Error: Event handlers cannot be passed to Client Component props.
  <li onClick={function} children={{...}}>
              ^^^^^^^^^^
If you need interactivity, consider converting part of this to a Client Component.
```

Dans le cas, où l'on a besoin d'interactivité dans un component, nous devons le passer en mode "client" avec une déclaration en haut du fichier :

```js
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

Vous l'avez compris, le fonctionnement pousse à réduire la taille du JavaScript envoyé dans le navigateur.

::Info
Cette particularité risque d'être un peu compliquée au début à prendre en main. Notamment sur les dépendances externes : [third-party-packages](https://beta.nextjs.org/docs/rendering/server-and-client-components#third-party-packages>)
::


## Le streaming ou rendu incrémental

Nouveauté également qui nous vient directement de l'API **React 18**. Le rendu **streaming** ou **rendu incrémental**.

Votre interface est rendue progressivement. Les components apparaissent au fur et à mesure qu'ils sont disponibles sans attendre. En premier les components sans data (juste HTML) et ensuite les autres qui ont nécessité des requêtes.

Attention, notez bien que c'est un rendu serveur. Toutes les data sont dans le code source de la page.

Pour mettre en place le streaming, il faut :

- soit créer le fichier ```loading.[js|tsx|jsx]```
- soit utiliser directement Suspense dans le component.

```js
import { Suspense } from "react";
import { PostFeed } from "./Components";

export default function Posts() {
  return (
    <section>
      <Suspense fallback={<p>Loading feed...</p>}>
        <PostFeed />
      </Suspense>
    </section>
  );
}
```

Plus d'infos : [data-fetching/streaming-and-suspense](https://beta.nextjs.org/docs/data-fetching/streaming-and-suspense)

## La nouvelle structure

Nous disposons d'une nouvelle structure de fichier. La racine se trouve désormais dans le dossier **"app"**.

Première chose, dans le système "classique", tous les fichiers devenaient des routes. Désormais, pour rendre une route publique, il faut un fichier ```page.[js|tsx|jsx]``` dans le dossier.
Autrement dit, même si j'ai un dossier ```/app/blog``` avec des fichiers dedans. Sans fichier ```page.[js|tsx|jsx]``` cette route ne sera pas accessible.

Deuxième chose, logiquement, les routes dynamiques ne sont plus faisables avec les fichiers. ```/pages/blog/[slug].js``` c'est fini. Il faudra utiliser ```/app/blog/[slug]/page.js```.

Troisième chose, on peut faire cohabiter d'autres fichiers dans un dossier. On peut donc mettre des components, stories, etc..

### Les fichiers spéciaux

En plus du fichier ```page.[js|tsx|jsx]```, il existe d'autres [fichiers spéciaux](https://beta.nextjs.org/docs/routing/fundamentals#special-files). A noter que la liste ci-dessous est complètement optionnelle. Votre dossier ne peut contenir que ```page.[js|tsx|jsx]```. Sauf le [premier layout](https://beta.nextjs.org/docs/routing/pages-and-layouts#layouts) à la racine qui est nécessaire pour en avoir d'autres.

- ```layout.[js|tsx|jsx]```
- ```loading.[js|tsx|jsx]```
- ```error.[js|tsx|jsx]```
- ```template.[js|tsx|jsx]```
- ```head.[js|tsx|jsx]```
- ```not-found.[js|tsx|jsx]```

En dehors de ces fichiers, vous pouvez mettre ce que vous voulez.

## Layout, nested s'il vous plaît !

Le layout à la racine remplace les fichiers ```_app.js``` et ```_document.js```.
Il est obligatoire si vous voulez utiliser d'autres layouts dans les dossiers enfants.
Les layouts, comme le reste, sont par défaut des server components. Nous pouvons donc faire des requêtes dedans.

Un détail à bien assimiler : les layouts dans les répertoires enfants, sont incorporés dans les autres layouts, ils sont **nested**.
L'intérêt ? Ajouter des éléments correspondant à la section affichée. Par exemple, une sidebar, un menu de gestion de compte, etc.

C'est désormais facile et natif.


## Statique par défaut.

Comme avec la version classique, le rendu est **statique** par défaut.
Pour avoir un rendu **"serveur"**, sans fichier statique généré donc, il faut :

- avoir une fonction dynamique. Qui utilise ```cookies()``` ou ```header()```
- ou un fetch dynamique. Avec un ```cache : 'no-store'``` ou ```revalidate: 0```
- ou pas de fonction ```generateStaticParams``` dans le fichier pour une route dynamique.

Plus d'infos sur cette page : [static-and-dynamic-rendering](https://beta.nextjs.org/docs/rendering/static-and-dynamic-rendering)

## Migration vers la nouvelle structure

Je vais vous lister les API de la structure "pages" et expliquer comment migrer sur la nouvelle structure "app"

### getStaticProps

Cette fonction n'existe plus dans le dossier "app". On passe directement des requêtes dans les components via la fonction fetch.

Fetch dans Next.js, étend les pouvoirs du fetch natif que l'on connaît dans les navigateurs. On peut gérer le cache et le revalidate directement sur le fetch.

### getStaticPath

Cette fonction n'existe plus dans le dossier "app". On utilise ```generateStaticParams``` pour les routes dynamiques. À noter que s'il n'est pas présent, nous n'avons plus d'erreur au build. Simplement, la route dynamique devient rendue serveur.

### fallback de getStaticPath

Comme la fonction, le fallback passe par une variable exportée nommée **dynamicParams**.
```js
export const dynamicParams = true // true | false,
```

### Revalidate

On peut régler cette valeur directement dans les requêtes fetch ou via une valeur exportée.

```js
export const revalidate = false
// false | 'force-cache' | 0 | number
```

::Info
À noter que cette valeur n'écrase pas les revalidates ajoutés au fetch individuellement. Plus d'infos : [data-fetching/revalidating](https://beta.nextjs.org/docs/data-fetching/revalidating)
::

### On-demand Revalidation

Bonne nouvelle, cette fonctionnalité sera toujours disponible !
[on-demand-revalidation](https://beta.nextjs.org/docs/data-fetching/revalidating#on-demand-revalidation)


## Pour finir

Dans cet article, je me suis concentré sur les gros changements de conceptions.

Je n'ai pas parlé de tous les éléments comme : les images, les fonts, le nouveau système de Head (où l'on peut aussi faire des requêtes) ou même le système de cache pour les fetch qui déduplique et évite d'avoir plusieurs fois la même requête effectuée lors du build.

Pour cela, il y a la documentation qui explique en détail chaque fonctionnalité.
Je vous encourage grandement à passer du temps dessus pour bien tout comprendre.

::Info
- [La documentation (bêta) de Next.js "app"](https://beta.nextjs.org/docs/getting-started)
- [Le site de démo](https://app-dir.vercel.app/)
::
