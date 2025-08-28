---
publicationDate: 6 Sep 2024
status: published
author: Double Slash
categories:
  - Technology
duration: 9999
episodeNumber: 94
episodeType: full
explicit: false
season: 1
dsSlug: DS_094_news-sept24
title: Les news web dev pour septembre 2024
subtitle: Épisode new web développement pour septembre 2024
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1725614993/episode/ART_94_t1vybx.png
description: Nouvel épisode de news pour la rentrée 2024. Nous parlons de l'IA (comme d'habitude), de la Laracon US avec de nombreuses nouveautés sur Laravel et son écosystème. Nous abordons également les dépendances des frameworks JavaScript, ElasticSearch, Vercel et NuxtScript.
videoLink : NVhq_TvsjmA
links: []
---
## IA - devs

Supermaven, IA pour le dev.
- https://supermaven.com/

Question pour commencer et clore le débat : L’IA va t’elle remplacer les devs ?

## Laracon US

https://laravel-news.com/laracon-us-keynote-2024

- **Extension officielle VS Code** (pour améliorer l’expérience de développement)
Dispo d’ici la fin de l’année 2024
    - Autocomplete
    - Test intégration
    - Diagnostiques
    - ….
- **Laravel Inertia V2**
Dispo en Octobre 2024
https://pascalbaljet.dev/taylor-otwell-announces-inertia-v2-at-laracon-us-2024-heres-whats-new
    - Async Request
    - Pooling (appel régulier pour rafraîchir les data)
    - WhenVisible (charge les data quand le component est visible)
    - Infinite scroll (fonctionne avec WhenVisible)
    - Prefetching (pour les liens, prefetch la page au hover)
    - Defer (charge la page et charge les data en background)
- **Laravel Cloud**
https://cloud.laravel.com/
****Comme Vercel mais pour PHP/Laravel.
Il existe Forge, un système pour gérer un serveur depuis un dashboard. Laravel Cloud va plus loin.
    - connection au Repo
    - ajout de DB
    - auto deploy
    - …
- **Pest 3.0**
    - Task management. Ajouter des infos (issues, assignee, PR,..) et filter les tests avec.
    ex: `pest --assignee=paulredmond --pr=1`
    Lance que les tests de la PR 1
- **Pinkary** devient open-source https://laravel-news.com/pinkary-open-source
https://pinkary.com/@PatrickFaramaz
- **Livewire Flux**
Librairie de composant LiveWire. https://fluxui.dev/.
https://www.youtube.com/watch?v=31pBMi0UdYE.
Design par un français https://x.com/ashugeo !
A priori, plusieurs réaction par rapport au prix et donc Caleb revient en vidéo sur le pourquoi 99 dollars
https://x.com/calebporzio/status/1829188535066472506?s=61

## Web Chaos Graph (JS)

Graph sur qui utilise quoi dans les frameworks JS.

Vixi pour ceux qui ne connaissent pas https://github.com/nksaraf/vinxi

- https://github.com/yoavbls/web-chaos-graph?tab=readme-ov-file


## Elastic Search de nouveau open-source

- https://www.elastic.co/blog/elasticsearch-is-open-source-again

- https://www.silicon.fr/elasticsearch-redevient-open-source-481370.html

En 2021, la société passe sur licence SSPL (Elasticsearch, Kibana, Beats, Logstash) : Elle donne le droit de consulter le code, de créer des tickets et de soumettre des PR. Elle interdit la modification, en tout cas pour un usage en prod. Et la redistribution sauf si partenariat.

En ligne de mire, les fournisseurs de cloud qui se nourrissent du code sans contribuer en retour et principalement Amazon. AWS avait fait un fork appelé OpenSearch fondé sur Elasticsearch 7.10.

Donc Elastic revient à l’open-source en ajoutant l’option AGPLv3. Les contributeurs continuent à céder leurs droits.

Elastic assurent avoir un partenariat avec AWS plus fort que jamais. Mais est-ce que c’est pas un aveu d’échec par rapport à OpenSearch !!

## Vercel ajoute Supabase, Redis, EdgeDB

- https://vercel.com/blog/introducing-the-vercel-marketplace

## V0 supporte Vue

- https://x.com/v0/status/1828469187083202673?s=61

Il faut aller dans le chat https://v0.dev/chat

## Nuxt Script

- https://nuxt.com/blog/nuxt-scripts


Bonne écoute !




