---
publicationDate: 7 Apr 2025
status: published
author: Double Slash
categories:
  - Technology
duration:
episodeNumber: 109
episodeType: full
explicit: false
season: 2
dsSlug: DS_109_rag
title: Développer des projets IA - Comprendre les RAG
subtitle: Développer des services en IA, les RAG (Retrieval Augmented Generation)
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1743966112/episode/ART_109_licbwc.png
description: Dans ce deuxième épisode de notre série IA, nous allons parler des RAG (Retrieval Augmented Generation). En effet, avec la puissance des LLM combinée aux bases vectorielles, nous pouvons contrôler le contexte du LLM et ainsi avoir un meilleur contrôle des réponses. Pas d'obligation de fine-tuning et nous pouvons spécialiser un modèle dans un domaine ultra-spécifique. C'est le retour des chatbots, mais des chatbots qui fournissent des réponses pertinentes. Mais attention, si cela semble simple sur le papier, l'exécution est parfois compliquée pour obtenir des résultats acceptables.
videoLink: 5vrWcZR26ho
tags: ['ia', 'dev', 'llm', 'rag', 'db', 'vectoriel']
---

Le RAG, ou Retrieval Augmented Generation, est une technique comportant deux étapes clés : la recherche d’informations pertinentes et la génération de contenu.

1. **Recherche de contenu**

   Nous allons rechercher du contenu en rapport avec la requête de l’utilisateur.

2. **Génération de réponse**

   Une fois l’information récupérée (le contexte), nous allons l’insérer dans le prompt de l’inférence pour demander au modèle de générer une réponse avec ce contexte.

3. **Avantages du RAG**
   - Contrôle du contexte
   - Limitation des hallucinations
   - On spécialise un modèle sans avoir à l’entraîner ou à le fine-tuner.

## Chunk ou traitement du contenu

On va découper le contenu en morceaux avant de le vectoriser. Les modèles ne peuvent pas forcément gérer énormément de tokens. BERT = 512 tokens.

Pour améliorer la précision : trop grand, imprécis ; trop petit, perte de contexte.

Optimiser les performances de recherche. Des morceaux plus petits sont plus rapides.

C'est une phase très critique, car les résultats de recherche dépendront de la façon dont le contenu est découpé.

Différentes techniques :

basées sur la longueur, sur les phrases, sur les paragraphes, sur la sémantique (avec IA)

https://chunkers.vercel.app/

## Embedding

Un **embedding** est une **représentation numérique dense** d’un objet sous forme de vecteur.

On va convertir un texte en représentation numérique pour l’insérer dans la base.

Attention, on utilise un modèle. Donc cette étape peut être potentiellement coûteuse.

Les modèles proposent différentes dimensions. OpenAI text-embedding-3-small 1536

Attention : Un embedding de **512 dimensions** prend **deux fois plus de mémoire** qu’un embedding de **256 dimensions**.

https://huggingface.co/spaces/mteb/leaderboard

## Retrieval et DB

Dans cette partie, les bases de données vectorielles ont une grande importance.

Une base de données vectorielle stocke des **représentations mathématiques** d’objets sous forme de **vecteurs**. Ces vecteurs permettent de comparer rapidement des éléments entre eux.

Un vecteur est une liste de nombres qui représente un élément dans un espace mathématique.

- Exemple : un point dans un espace 3D est représenté par un vecteur (x, y, z).
- Dans les bases vectorielles, on peut avoir des **vecteurs à plusieurs centaines ou milliers de dimensions** !

Par exemple, une phrase peut être transformée en un vecteur de 512 dimensions, capturant son sens et sa structure.

### Recherche par similarités :

- **Le produit scalaire** : plus la valeur est grande, plus les vecteurs sont proches.
- **La distance euclidienne** : mesure la distance "physique" entre deux points.
- **La similarité cosinus** (très utilisée !) : elle mesure l’angle entre deux vecteurs.
  - Si l’angle est **proche de 0°** → les vecteurs sont très similaires.
  - Si l’angle est **proche de 90°** → ils sont très différents.

A noter que la plupart des bases de données prennent en charge le vectoriel :
Postgres, Redis, Cloudflare, etc.

## Le code !

Faire une API pour recevoir les requêtes du chatbot et les passer à la pipeline :

- Récupérer le contexte si besoin
- Stocker en mémoire la conversation
- Générer la réponse
- Gérer les erreurs
- Etc.

Heureusement, nous avons des frameworks pour faciliter les choses :

https://github.com/LLPhant/LLPhant (PHP)

https://www.restack.io/ (Python/TypeScript)

https://mastra.ai/ (TypeScript)

https://sdk.vercel.ai

https://www.langchain.com/ (Python, JavaScript)

https://www.llamaindex.ai/ (Python/TypeScript)

Évidemment, on ne parlera pas du chatbot client qu'il faut coder.

## Évaluation

Partie qui peut prendre du temps. Évaluer les réponses et effectuer un suivi des conversations pour ajuster le système.

https://www.langchain.com/evaluation

[https://docs.confident-ai.com](https://docs.confident-ai.com/)

## Outils Low Code

https://flowiseai.com/

https://dify.ai/

Bonne écoute !

::authors
::

## ::Sponsor

## withList: false

::
