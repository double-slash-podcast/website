---
publicationDate: 16 Nov 2023
status: published
author: Double Slash
categories:
  - Technology
duration: 4617
episodeNumber: 74
episodeType: full
explicit: false
season: 1
dsSlug: DS_074_new11_23
title: Les News Web Dev pour Novembre 2023
subtitle: Un épisode news pour novembre 2023 sur les dernières conférences et des tips CSS.
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1694509731/episode/ART_70_newsSept_ttfzcs.png
description: Un épisode news pour novembre 2023. On parle des dernières conférences en cette fin d'année, la Next JS Conf, Open AI. Mais aussi le retour en force d'Angular. Et aussi des tools et des tips CSS.
videoLink : Bx_358U49Xg
links: []
---
### Next JS Conf

- NextJS 14 https://nextjs.org/blog/next-14
    - Pas de nouvelle API
    - Passage sans souci de la version 13 à 14
    - Turbopack amélioré et stabilisé mais toujours uniquement pour le mode dev
    - Server Action stable https://nextjs.org/docs/app/api-reference/functions/server-actions
    - Partial prerendering (Page statique avec quelques éléments dynamiques chargé en parallèle) https://nextjs.org/learn/dashboard-app/partial-prerendering
    - NextJS Lean https://nextjs.org/learn

[Meme generator pour les serveurs actions](https://samgen.vercel.app/GYVwdgxgLglg9mABAITnA1gWwIYCd0AUA3ogM4A2IA5ogL4CUiRAUIorgKZQi5IGttEAHgBGIKFAQDBiYHFyYAgtHhgAvEWykAnpEQFGagHxNpMxACIQpDmQ64AbvYsBuMzOwB3bDChkAjuQABgCSAHIAygCiAEoAKojhcQDyKGhYeOik%2BhTUjABqigAyAKpREfoAJES5VAwuQW7mdLRmRu7CqBg4%2BCEQCIgA9O0yQoNiEggjiPTMtEA)

- Kent C. Dodds https://www.epicweb.dev/why-i-wont-use-nextjs
    - Plusieurs critiques :
        - Pas possible de le self hosted en mode serverless
        - Trop d’influence sur React
        - Trop magic (override du fetch natif pour le systeme de cache)
        - Devient trop complexe
        - …
- Réponse de Lee Robinson https://leerob.io/blog/using-nextjs

## Angular

Sortie d’un nouveau site pour Angular [http://angular.dev](http://angular.dev/) nouvelle documentation.

> “Say hello {{again}} to angular !”
>

Angular 17 :

- nouvelle syntax dans les templates @if @for https://angular.dev/guide/templates/control-flow
- @defer pour les gros composants https://angular.dev/guide/defer
- View Transitions
- Signal est stable
- Performance améliorée


## OPEN AI Dev Days

https://devday.openai.com/

- GPT-4 Turbo 128K 🚀
- JSON mode 🧩
- GPT-4 Vision dans l'API 👀
- DALL-E 3 dans l'API 🎨
- Synthèse vocale 🗣️
- Whisper 3 🎧
- Limite de token par minute doublé ⏱️
- GPT-4 fine tuning 🎚️
- GPT-4 Turbo 2,75x moins cher

## Symfony Asset Mapper

La doc https://symfony.com/doc/current/frontend/asset_mapper.html

Vidéo de yoan dev https://youtu.be/IbX-7GwEYwo

Deux fonctions :

- versioning des assets
- utilisation d’importmap pour importer les assets dans le navigateur [https://developer.mozilla.org/fr/docs/Web/HTML/Element/script/type/importmap#compatibilité_des_navigateurs](https://developer.mozilla.org/fr/docs/Web/HTML/Element/script/type/importmap#compatibilit%C3%A9_des_navigateurs)

Pas de merge des assets

Pas de minification

2 exemples pour utiliser sass et tailwind

Pas compatible avec les technos typescript, Vue, jsx, etc.. qui nécessite un build.

## Ruby on Rails, documentaire.

Documentaire sur l’origine de Ruby on Rail, pourquoi il a été créé et l’évolution.

https://youtu.be/HDKUEXBF3B4?si=_ZJ23JGyEojlo6Bu

## Laravel Livewire

Vidéo pour apprendre l’utilisation de Livewire

https://laravel-news.com/livewire-learning-screencasts

## IA

Une explication visuelle du fonctionnement des LLM
https://ig.ft.com/generative-ai/

## GSAP AWWWARD

Le nouveau site GSAP gagne un awwward

https://www.awwwards.com/websites/gsap-animation/

## RSPack

Juste pour ne pas oublier que RSPack est compatible WebPack API et peut donc le remplacer.

https://www.rspack.dev/

## Prettier Rust

@vjeux offre 10 000 $ pour faire une version rust de prettier + guillermo ajoute 10 000 $ et Wasmer 2500 $

https://console.algora.io/challenges/prettier

https://twitter.com/vjeux/status/1722733472522142022?s=61&t=mcL37eO_RGMR1hypsPKTfA

## Biome

Rome s’arrête et un fork (Biome) reprend le flambeau. Rome Tools Inc. a baissé le rideau.

https://biomejs.dev/blog/annoucing-biome

## Tools

Outil pour animer son code https://www.hackreels.com/

Le json survitaminé https://github.com/blitz-js/superjson

## Articles

https://www.learnwithjason.dev/blog/oklch-better-color-css-browser

https://developer.chrome.com/en/blog/css-prefers-reduced-transparency/

https://developer.chrome.com/blog/hr-in-select/

https://www.bram.us/2023/10/23/css-scroll-detection/

## Tips

Font variante tabular : https://twitter.com/jh3yy/status/1715409590320288041?s=61&t=UwPamSaFma8DyQED2m4MEg

https://twitter.com/stackblitz/status/1717902407437373458?s=61&t=UwPamSaFma8DyQED2m4MEg

https://codepen.io/jh3y/pen/JjxPKXz

::Sponsor
---
withList: false
---
::
