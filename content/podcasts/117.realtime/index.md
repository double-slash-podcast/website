---
publicationDate: 21 Aug 2025
status: published
author: Double Slash
categories:
  - Technology
duration: 2593
episodeNumber: 117
episodeType: full
explicit: false
season: 2
dsSlug: DS_117_realtime
title: Développer des applications Realtime
subtitle: Développer des applications Realtime avec rafraîchissement des données
  automatiques
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1755771163/episode/ART_117_evajtf.png
description: Pour offrir une meilleure expérience à vos utilisateurs, il est
  possible d'implémenter un rafraîchissement des données automatique.
  L'utilisateur voit donc les informations se mettre à jour sans faire aucune
  action.
videoLink: E-cxziu6zBg
tags: []
fileSize: 41601573
---

Un exemple d'utilisation : dans une application de commande de pizza, le pizzaiolo n'a pas la possibilité d'interagir avec l'écran puisqu'il a les mains dans les ingrédients. Un tableau de bord qui affiche les commandes au fur et à mesure est une bonne solution pour l'aider.

D'autres exemples : chat, résultats sportifs, trading, collaborations en direct.

### Les points clés

- Afficher les informations en temps réel dès qu'un événement survient.
- Éviter les rafraîchissements de page inutiles.


## Les différentes approches pour implémenter du temps réel

1. **WebSockets**
   - Fonctionnement bi-directionnel : 1 client vers 1 serveur et N clients.
   - Problèmes potentiels : gestion des connexions, déconnexion automatique par le navigateur, nécessité d'auto-reconnexion.
   - Limitations : serveur centralisé, problèmes avec les serveurs sans état.

2. **PUB/SUB (Publication/Abonnement) avec Redis**
   - Utilisation de Redis comme système de message.
   - Problèmes liés aux clients non connectés et aux événements perdus.

3. **SSE (Server-Sent Events)**
   - protocole HTTP
   - Fonctionnement uni-directionnel : 1 serveur vers N clients.
   - Avantages : simple à mettre en œuvre, possibilité de stocker temporairement les abonnés.
   - Limitations : uniquement pour l'envoi de serveur à client.

4. **Solutions Toutes Prêtes**
   - **Pusher** : offre une surcouche de WebSocket, client JS disponible, protocole supporté, mais limitations sur le free tier.
   - **Ably** : similaire à Pusher, avec un free tier disponible.
   - **Soketi** : solution open source, auto-hébergée, avec une installation en un clic.


Les développeurs web disposent de plusieurs technologies et solutions pour implémenter des fonctionnalités en temps réel. Le choix dépendra des besoins spécifiques du projet, de la scalabilité requise et des compétences de l'équipe.

### Les défis techniques
- Gestion des déconnexions et reconnexions.
- Persistence des messages et gestion des conflits d'états.
- Sécurité et authentification.
- Afficher les informations à la bonne personne.


## Quelques Liens

- Nitro Websocket https://nitro.build/guide/websocket
- Laravel Reverb https://reverb.laravel.com
- Redis Pub/Sub https://redis.io/docs/latest/develop/pubsub
- Server Sent Event MDM https://developer.mozilla.org/fr/docs/Web/API/Server-sent_events/Using_server-sent_events
- SSE example avec Laravel https://dev.to/ayowandeapp/real-time-notifications-with-server-sent-events-sse-in-laravel-and-vuejs-40pf
- Ably Laravel https://laravel.com/docs/12.x/broadcasting#ably


## Quelques services disponibles

### Pusher
- Surcouche de web socket
- +/ - opensource
	- Client JS
	- Pas server
	- Protocol oui
- $$
- Free tier

### ABLY
- https://ably.com
- $$$$
- Free Tier

### SOKETI
- https://soketi.app
- Full open source
- Self hosted
	- Coolify one click install  😜


Bonne écoute !
