---
publicationDate: "25 Nov 2026"
status: "published"
author: "Double Slash"
categories:
  - "Technology"
episodeNumber: 148
episodeType: "full"
explicit: false
season: 2
dsSlug: "DS_148_decision_model"
title: "Modèles de décision, une IA qui répond en 10 ms"
subtitle: "JEV, Clef, D1 et Laya : classer, router et filtrer sans faire écrire un LLM"
episodeArtwork: "https://res.cloudinary.com/doubleslash/image/upload/v1795540127/episode/ART_148_biw0zb.png"
type: "news"
description: "Depuis le marketing de septembre 2026 autour de JEV, une petite famille de decision models s'est formée : JEV, Clef, D1 et Laya. L'idée, c'est un modèle rapide et automatique, qui classe, route, score ou filtre, là où un LLM, plus lent et plus coûteux, reste le bon outil pour écrire, coder, planifier ou dialoguer. Dans l’épisode, nous expliquons : comment ça marche, le prix, les questions typées (NOUL, Choice, Score, et Box pour l'image), la sortie JSON. Comment s'en servir côté dev : routage de tickets, garde-fou d'agents, choix du modèle, audit SEO, test de résultat ou parse de DOM."
videoLink: "bhFtO36oSmA"
tags:
  - "agents"
  - "ai"
  - "clef"
  - "cloudflare"
  - "d1"
  - "jev"
  - "laya"
  - "decision-models"
duration: 2559
fileSize: 40951059
---

## Système de pensée

**Système 1** : rapide, réflexe / automatique, booléen. C'est le jugement qu'on porte sans délibérer. « La chemise est bleue. » « Ce mail a l'air d'un spam. »

**Système 2** : lent, coûteux, étape par étape. C'est le LLM qu'on connaît. Un plan de migration. Une réponse à un client en colère.

## Bon usage

**Decision model** : oui pour classer, router, scorer, garder, filtrer. Non pour écrire, coder, planifier, dialoguer, prouver.

**LLM** : oui pour rédiger, compter, comparer des dates, raisonner. Non pour faire dix mille oui/non par heure.

## Comment ça marche

**Entrée (payante).** Un appel peut poser plusieurs questions. Texte ou JSON, et maintenant image, son ou vidéo. On envoie un state et des questions typées selon les primitives.

**Primitives :**

- NOUL : un score de probabilités, le booléen avec un score (exemple : SPAM)
- Choice : une option prédéfinie, 255 options max
- Score : une échelle
- Box (nouveau) : une image

**Sortie (gratuite).** Du JSON typé.

## Les modèles

Tous passent par la même API, donc migration facile, ou comparaison entre modèles.

- JEV (Typesafe) : closed weight, payant
- Clef (Cloudflare) : poids ouverts, payant
- D1.2 (Liquid IA) : poids ouverts, payant
- Un autre modèle : poids ouverts, OS
- Laya OS : local. Ce n'est pas un BERT figé : la question est posée à l'appel. Plus ou moins juste. Fine tuning possible.
- D'autres modèles non nommés

Prix : 0,02 à 0,05 par million de tokens, uniquement sur l'entrée. Latence : 10 ms à 200 ms.

## Cas d'usage pour les devs

**Routage de tickets.** Questions : équipe (choice), urgence (NOUL), frustration (0 à 3). Selon le score et le résultat : email, humain ou FAQ.

**Garde-fou d'agent.** Est-ce irrémédiable (rm -rf) ou réversible ? SQL injection, DROP, ALTER TABLE en production. Filtrage de ce qu'on envoie dans le contexte : variables d'environnement, données métier sensibles.

**Routage de modèle.** Définir le meilleur modèle pour la tâche demandée : quel modèle, quel niveau de réflexion, sous-agent ou pas.

**SEO.** Audit technique de page, zéro interprétation, avec des champs définis dans le schéma. Limite : la construction reste au LLM, et pas d'accès à la Search Console.

**Test final de résultat.** Mission accomplie ? Un score, une validation auto, un reportage humain.

**Scrape.** Parse de DOM, récursif.

## Par où commencer

Commencer petit : playground, faible enjeu métier. Bien nommer vos questions. Déléguer sa confiance : définir votre scoring acceptable, comparer les résultats entre modèles, et regarder l'impact de la langue française.
