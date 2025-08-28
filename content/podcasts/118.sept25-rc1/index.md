---
publicationDate: 3 sept 2025
status: published
author: Double Slash
categories:
  - Technology
duration: 
episodeNumber: 118
episodeType: full
explicit: false
season: 2
dsSlug: DS_118_sept25-rc1
title: News de la rentree
subtitle: RC1
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1756369528/episode/ART_118_no3sns.png
description:
videoLink : XXXX
tags: []
---
## News de la rentree

### Attention Malt

**Schéma d’attaque identifié**

- Durée des projets **très courte** (souvent une seule journée)
- Rémunération **anormalement élevée** par rapport à la simplicité apparente de la mission
- Présenté comme une **aide rapide ou une simple tâche de débogage**
- Avec une demande d’**exécuter un programme suspect**

• Ne téléchargez pas, ni n’exécutez de fichiers dont l’origine ou le contenu vous semblent suspect

## Les dernières sorties

### Gel DB

https://www.geldata.com/blog/edgedb-is-now-gel-and-postgres-is-the-future

EdgeDB, deviens Gel.

Opens source, PostgreSQL, ses fonctionnalités avancées et son extensibilité en font un outil unique et puissant.

Gel offrira désormais un support complet pour **SQL**, en plus de son langage de requête existant, **Gel**. Ce changement permet une plus grande compatibilité et flexibilité, permettant aux utilisateurs d'intégrer Gel avec divers outils et bibliothèques, tels que **Drizzle**, **Prisma** et **SQLAlchemy**.

Le rebranding vise à fournir de la clarté et de la simplicité, car le nom "EdgeDB" était considéré comme potentiellement trompeur. L'entreprise reste engagée dans sa mission et ses valeurs fondamentales, sans changement pour son équipe, ses outils ou ses bibliothèques.

Points clés :

- **Rebranding** : EdgeDB est désormais Gel.
- **Focus sur PostgreSQL** : Gel utilisera PostgreSQL comme fondation.
- **Support SQL** : Gel supportera nativement SQL.
- **Compatibilité** : Gel sera compatible avec divers outils et bibliothèques.
- **Pas de changement** : La mission de l'entreprise, son équipe et ses outils restent inchangés.

## On développe !

### Laracon US 2025

- Laravel Forge : refresh interface, ameliorations déploiement.
- Laravel Cloud : Mysql, Tarifs simplifiés, preview PR…
- Starter Kits : https://laravel.com/starter-kits 
Des starters basés sur 3 environnements : React et Vue (Inertia) ou Livewire.

### Inertia 2.1.0

Form component https://laravel-news.com/inertia-form-component

https://inertiajs.com/forms#form-component

### Livewire 4 :

https://www.youtube.com/watch?v=M60-nxlrePc

- Aucun Breaking changes !
- Single File Component par défaut
- Les components peuvent être
- Slot (comme les composants Blade) avec attributs personnalisables
- Loading attribute auto pour gérer l’affichage d’une icône par exemple
- Moteur de rendu Blaze, blade sur-vitaminé
- Island component, Component isolé et lazy load pour améliorer la performance

### Laravel Boost

https://www.youtube.com/watch?v=sUtRcpma8iU

AI MCP assistant pour le dev. Spécialisé sur Laravel, connaît le context, etc..

### Pest 4

https://www.youtube.com/watch?v=f5gAgwwwwOI

- Tests de navigateur intégrés (Playwright) avec `visit()`, nous pouvons lancer un scénario de navigation complet depuis Pest.
- Test visuel avec comparaison et régression
- Detection d’erreur JS dans la console
- Emulation Mobile, etc..
- Exécution en parallèle et sharding.

## Tools !

## JS File uploader

https://uppy.io/

## CSS Layout generator (encore..)

[layout.bradwoods.io](http://layout.bradwoods.io/)

## Nuxt UI theme builder

[https://www.nuxtlify.com](https://www.nuxtlify.com/)

https://github.com/Rareer/nuxt-ui-theme-builder

### Laravel Hub

[https://laravel-hub.com](https://laravel-hub.com/) 

## Font pour le code from Google

https://github.com/googlefonts/googlesans-code

## Les articles

## Pourquoi les LLM ne peuvent pas écrire de logiciel complet

https://zed.dev/blog/why-llms-cant-build-software

Ils sont doués pour écrire du code. Mais ils échouent à maintenir une cohérence entre le modèle mental attendu et la réalité du code produit.

- Les LLMs **supposent automatiquement que le code fonctionne**, sans jamais le vérifier vraiment.
- En cas d’échec de tests, ils hésitent entre corriger le code ou les tests ou, dans le doute, **repartent de zéro**, effaçant tout. Loin de la rigueur et de la flexibilité d’un développeur humain.

Pour être plus tard mais uniquement si l’architecture et l’entraînement des models évoluent  fondamentalement.

## Rubrique IA

### Prism PHP, Lib pour LLM

https://www.youtube.com/watch?v=TsEeIjWrPhI

[https://prismphp.com](https://prismphp.com/)

- **Package Laravel** qui fournit une **interface fluide et unifiée** pour appeler différents LLM (OpenAI, Anthropic, Google Gemini, etc.) sans toucher aux appels HTTP bruts.
- Conçu autour du **pattern “driver”** : chaque fournisseur possède son propre driver, mais l’API que vous utilisez reste la même, ce qui facilite le **switch** entre fournisseurs ou l’ajout de nouveaux services.
- Disponible sur GitHub : https://github.com/prism-php/prism et sur le site officiel https://prismphp.com/

### FireCrawl V2

https://www.firecrawl.dev/blog/firecrawl-v2-series-a-announcement

### Browser Echo MCP

https://github.com/instructa/browser-echo

Corriger les erreurs grâce aux logs du navigateur

### Agend.md

[https://agents.md](https://agents.md/)

### Lumo AI

https://proton.me/blog/fr/lumo-ai

### GPT OSS

https://openai.com/fr-FR/index/introducing-gpt-oss

- OpenAI annonce deux nouveaux modèles à poids ouverts (**open-weight**) : **gpt‑oss‑120b** et **gpt‑oss‑20b**, sous licence **Apache 2.0** [cdn.openai.com+15OpenAI+15OpenAI+15](https://openai.com/index/introducing-gpt-oss/?utm_source=chatgpt.com).
- Ces modèles sont des transformeurs à architecture **Mixture‑of‑Experts (MoE)**, optimisés pour le raisonnement avancé, l’utilisation d’outils externes et un déploiement efficace sur du matériel avec ressources limitées [arXiv+6OpenAI+6Cinco Días+6](https://openai.com/index/introducing-gpt-oss/?utm_source=chatgpt.com).
- **gpt‑oss‑120b** s’avère quasi à égalité avec le modèle propriétaire **OpenAI o4‑mini** sur des benchmarks de raisonnement, tout en tournant efficacement sur un unique GPU de 80 GB [OpenAI Cookbook+15OpenAI+15IT Pro+15](https://openai.com/index/introducing-gpt-oss/?utm_source=chatgpt.com).
- **gpt‑oss‑20b** offre une performance comparable à **o3‑mini** et peut s’exécuter sur des appareils avec seulement 16 GB de mémoire, ce qui le rend idéal pour des usages embarqués ou à faible coût [Hugging Face+9OpenAI+9IT Pro+9](https://openai.com/index/introducing-gpt-oss/?utm_source=chatgpt.com).
- Ces modèles sont conçus pour être facilement déployés et personnalisés par les développeurs, chercheurs et entreprises, grâce à leur transparence (poids accessibles, documentation, modèles d’exemple…)

Bonne écoute !

::authors
::

::Sponsor
---
withList: false
---
::
