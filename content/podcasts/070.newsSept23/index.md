---
publicationDate: 13 Sep 2023
status: published
author: Double Slash
categories:
  - Technology
duration: 4900
episodeNumber: 70
episodeType: full
explicit: false
season: 1
dsSlug: DS_070_newsSept23
title: Les News Web Dev pour Septembre 2023
subtitle: Un épisode news pour septembre 2023 avec un nouveau gros acteur dans le monde JS.
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1694509731/episode/ART_70_newsSept_ttfzcs.png
description: Un épisode news pour septembre 2023. On parle de la sortie de Bun, la grosse bombe de la rentrée. Mais aussi de la V3 d'Astro, de la fin probable de Gatsby, de React encore et toujours, de Meilisearch qui intègre la puissance de l'AI, des prochaines versions des browsers, de librairies de components.
videoLink : t5aNLrepTiY
tags: [bun,astro,gatsby,vercel,react,ia,search]
---
## Bun, le toolkit tout en un !

Remplace à lui seul : node, npx, nodemon, dotenv, tsc, babel, esbuild, webpack, parcel, rollup, npm, yarn, pnpm, jest, vitest.

### Runtime

Runtime entièrement compatible Node. Rien a changer dans le code.

Fonctionne avec les node_modules.

Intègre la Web API (Fetch, Request, Response, FormData..)

Bun sait lire TypeScript

Bun sait lire le JSX

### Bundler

Bun fait aussi Bundler. 
```bun build ./index.tsx --outdir ./out```

### Packages

Bun est aussi un packages manager

Installation global avec du cache. Pas de duplicate.

API similaire aux autres packagers.

### Test

Bun est aussi un test runner !

API similaire à Jest

DOM API

Mock, etc..

- Article d’annonce https://bun.sh/blog/bun-v1.0
- Vidéo de l’annonce  https://www.youtube.com/watch?v=BsnCpESUEqM
- Site https://bun.sh/
- Framework basé sur Bun https://elysiajs.com/

Réaction de Mateo Collina : https://x.com/jessfraz/status/1700570689257013463?s=12&t=0y1qH6fwr7PTScWalFpUZg

Quelques raisons :

1. Node.js n'a pas de budget propre et npm est géré par une petite équipe. La plupart des investissements réalisés visent à ajouter des capacités ou des éléments plus sécurisés, et non à accélérer les choses. (Rendre les choses plus rapides ne rapporte pas plus d'argent à personne, c'est un peu une tragédie des biens communs).
2. Bun ne se soucie pas de la compatibilité ascendante avec une partie importante de l'écosystème et des spécifications npm (malgré leurs affirmations). Les processus Node.js sont plutôt construits pour ne pas briser l'écosystème.
3. Bun choisit également différents compromis dans quelques domaines, ce qui le rend inadapté à mon propre flux de travail. Mes 2 cents sont que si ces compromis avaient été faits par nœud et npm, ils n'auraient pas atteint le succès qu'ils ont. A titre d'exemple, il ne copie pas les fichiers lors de l'installation des dépendances.
4. Je crois aux normes ouvertes et à la gouvernance ouverte. Les temps d'exécution et l'infrastructure sont meilleurs (voir le fiasco de Terraform). Avoir une gouvernance ouverte signifie un processus de prise de décision plus large, qui permet à tout le monde d'être entendu, mais qui est également plus lent.

## Astro en V3

### Premier framework a supporter la View Transition API.

Image Optimisation (version stable)

Optimisation du rendu des components Astro.

Optimisation et amélioration du serverless.

Optimisation du HMR pour JSX.

Optimisation du bundle de production.

- article de l’annonce https://astro.build/blog/astro-3/

### Astro Studio.

Edge data platform uniquement pour Astro.

- landing page https://studio.astro.build/

## Gatsby C’est fini ?

19 aout : Fred Schott (co-créateur d’astro) s’étonne de ne pas voir de commit sur le projet Gatsby depuis 24 jours.

Aussitôt, Ward Peeters (anciennement dans l’équipe Gatsby) répond :

“C’est mort, Tout le staff est partie sauf un.Tout fonctionne bien mais pas de grosse feature dans les plans.”

Juste après, Netlify répond : “Pas de crainte, Gatsby est très important pour beaucoup de nos clients. React 18 arrive bientôt et des adaptateurs pour Gatsby….”

- Résumé par **Benedicte (Queen) Raae** https://queen.raae.codes/emails/2023-08-28-end-of/

### Gatsby Cloud

Le service va disparaître et tout va être mergé avec Netlify sur un service qui combine le meilleur des deux :  Netlify Cloud

https://www.netlify.com/blog/gatsby-cloud-evolution/

## Vercel

Lee Robinson partage un Tweet pour migrer de Vite vers Next.js.

Aussitôt, Evan You répond :

“Ou vous pouvez utiliser un meta-framework tirant les bénéfices de Vite.”

Et il rappelle que les SPA sont très bien pour les projets où le page load est pas une priorité.

- Le tweet en question https://twitter.com/youyuxi/status/1696868733728530716?s=61&t=K6fNZPLmk08s1xI4CIYLIA

## React

Rappel : React a 10 ans !

- Article intéressant sur le concept de server components : https://www.joshwcomeau.com/react/server-components/
- Lib pour remplacer le Virtual Dom de React et gagner 70% de performance. https://github.com/aidenybai/million

## AI (encore…)

Éditeur Pair Coding avec une AI : https://www.cursor.so/

MOJO le language pour l’IA https://www.modular.com/mojo

## Meilisearch

Meilisearch, le document crawler. 

Le système va crawler les pages et les indexer. Comme le ferais Google Bot : https://blog.meilisearch.com/documentation-crawler-release/

Connecteur Vercel pour Meilisearch Cloud : https://vercel.com/integrations/meilisearch-cloud 
LE GROS STEP EST SUR LA RECHERCHE SEMANTIQUE : https://blog.meilisearch.com/introducing-vector-search/

## Browser

Le W3C invite les navigateurs a implémenter View Transition Module level 1.
https://twitter.com/w3cdevs/status/1699033393596399930?s=61&t=LexZlio37h2pQsYSI-rwZg

- Chrome 117 beta (CSS Subgrid !!!) https://twitter.com/una/status/1691880972759843261?s=61&t=LexZlio37h2pQsYSI-rwZg
- Safari preview 177 (pas des trucs de fou) https://twitter.com/webkit/status/1694105524055445605?s=61&t=LexZlio37h2pQsYSI-rwZg

## Lib

- Formkit en V1 https://formkit.com/
- Radix UI sort des thèmes https://www.radix-ui.com/
- Equivalent de Radix pour Vue https://oku-ui.com/primitives
- Lib de components pour Blade https://blade-ui-kit.com/

## Slidev

Créer des slides pour vos talks ou vos réunions.
- https://github.com/slidevjs/slidev

# VRAC

- [ngrok blog: Static domains for all ngrok users](https://ngrok.com/blog-post/free-static-domains-ngrok-users)
- Remotion 4 https://www.remotion.dev/blog/4-0
- https://expresso-ts.com/ mais NITRO JS c’est mieux

## Conf à venir

- Cond Redwoodjs (27, 28 septembre) [https://ticket.redwoodjs.com](https://ticket.redwoodjs.com/david)
- Vite conf (5 oct) https://viteconf.org/23/speakers



::Sponsor
---
withList: false
---
::
