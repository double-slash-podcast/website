---
publicationDate: 15 Jan 2025
status: published
author: Double Slash
categories:
  - Technology
duration:
episodeNumber: 104
episodeType: full
explicit: false
season: 2
dsSlug: DS_104_devia1
title: Développer des projets IA - introduction
subtitle: Développer des services en IA, on s’y met ?
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1736889833/episode/ART_104_x5pfdi.png
description: Dans ce premier épisode de la série IA et dev, nous allons évoquer les différentes possibilités, outils et lexique de l'IA pour les projets de développement IA. En effet, il est aujourd'hui indispensable de s'intéresser aux possibilités d'intégrer l'IA dans nos développements. La demande est croissante tant de la part des entreprises qui ne veulent pas rater le train que des utilisateurs qui commencent à avoir l'habitude de retrouver de l'IA dans tous leurs outils. Nous commencerons par le plus basique, simplement utiliser les API des plus grands modèles (OpenAI, Anthropic, etc.), nous passerons par Hugging Face, nous survolerons les RAG (un épisode entier y sera consacré) et nous évoquerons également les questions de déploiement et d'hébergement.
videoLink: cOrMoLaI5NQ
tags: ['ia', 'dev', 'llm']
---

## Utiliser les API payantes

Plus simple, rapide mais payantes , fermées et souvent américaines

- [OpenAI](https://platform.openai.com/docs/api-reference/introduction)
- [Google](https://ai.google.dev/gemini-api/docs?hl=fr)
- [Anthropic](https://docs.anthropic.com/en/api/getting-started)

Avantage : SDK sur plusieurs languages

## Du coté de l'Open source

### Hugging Face

[https://huggingface.co/](https://huggingface.co/)

Hugging Face se veut le GitHub de l'IA.
Il s'utilise de la même façon que ce dernier : git clone, git push, etc.
Avec HF, vous pouvez utiliser des modèles déjà entraînés, faire du fine-tuning pour spécialiser un modèle, créer des datasets et, cerise sur le gâteau, vous pouvez facilement déployer vos modèles.
Il est clairement indispensable de connaître cette plateforme pour tout développeur sérieux.

- Models
- Datasets
- Spaces

Conseils : pour choisir votre modèle, vous devez filtrer par rapport à vos besoins et surtout choisir la langue française, sous peine d'avoir des résultats inattendus.

### Ollama

[https://ollama.com/](https://ollama.com/)

Ollama permet de faire tourner des modèles open source sur votre machine très facilement. Ainsi, vous disposez d'une API locale pour effectuer des tâches.
Un bon départ pour tester des choses ou même brancher votre VSCode à un assistant IA.

Outil équivalent (j'ai retrouvé !): [https://lmstudio.ai/](https://lmstudio.ai/)

### Licences

Attention sur l’appellation open-source des modèles
[https://www.ictjournal.ch/news/2024-10-31/llama-et-mixtral-ne-peuvent-plus-pretendre-etre-des-modeles-open-source](https://www.ictjournal.ch/news/2024-10-31/llama-et-mixtral-ne-peuvent-plus-pretendre-etre-des-modeles-open-source)

### Quel languages pour coder des services IA

Principalement en Python et en JS/TS.

Les frameworks les plus connus :

- [https://python.langchain.com/docs/introduction/](https://python.langchain.com/docs/introduction/) Python
- [https://js.langchain.com/docs/introduction/](https://js.langchain.com/docs/introduction/) JS

## RAG (Retrieval Augmented Generation)

La génération augmentée de récupération.
On va imposer un contexte dans le prompt pour que le LLM réponde par rapport à ce contexte.

- Limitation des hallucinations.
- Réponse précise par rapport à une question et un domaine.

Les lexiques du RAG :

- Chunk : découpage en morceaux des textes de ressources
- Embedding : conversion du texte en vecteurs
- Base vectorielle : stockage des vecteurs
- Retrieval : recherche des vecteurs correspondant à la requête

## Déporter les processus et utiliser des modèles à distance.

- https://groq.com
- replicate.com
- fal.ai
- https://www.infomaniak.com/fr/hebergement/ai-tools

Les majors :

- [Amazon Bedrock](https://aws.amazon.com/fr/bedrock/)
- [Azure IA](https://azure.microsoft.com/fr-fr/solutions/ai)
- [Google Vertex](https://cloud.google.com/vertex-ai)

Bonne écoute !




