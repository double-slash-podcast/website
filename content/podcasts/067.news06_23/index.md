---
publicationDate: 28 Jun 2023
status: published
author: Double Slash
categories:
  - Technology
duration: 4809
episodeNumber: 67
episodeType: full
explicit: false
season: 1
dsSlug: DS_067_news06
title: Les News Web Dev pour Juin 2023
subtitle: Un épisode news pour juin 2023 un peu plus long que d'habitude pour prolonger le plaisir !
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1687790575/episode/ART_65_news_juin_23_x7lgq4.png
description: Un épisode news pour juin 2023 un peu plus long que d'habitude pour prolonger le plaisir. Nous allons évoquer Apple qui s'occupe enfin de Webkit (Safari), de React.js qui se retrouve dans la polémique avec les servers components. Évidemment de CSS. De services d'envoi d'emails. De Netlify connect. De PHP qui prépare sa version 8.3. De Zod, de Javascript, etc.. Un épisode riche en news !
videoLink : vIf3cOQnI1Y
links: []
---
### Safari et Apple APNS

Apple met à disposition une nouvelle console  pour tester les notifications <https://developer.apple.com/notifications/push-notifications-console/>

Une vidéo pour comprendre l'utilisation ⇒ <https://developer.apple.com/videos/play/wwdc2023/10025/>

## Webkit (Safari)

- dans macOS Sonoma, la possibilité de pouvoir mettre une web app dans le dock
(Support web push, badge,..)
- "Add to Home Screen" disponible dans les webviews Safari
- Nouveau tag html <model> pour afficher des éléments en 3d.
- Arrivé de ****WebXR**** pour créer des expériences immersives. Basé sur WebGL
- JPEG XL dans safari 17. Excellent compromis poids/qualité
- Arrivé du format ****HEIC**** dans Safari 17, format utilisé dans IOS pour les photos.
- ****Image set dans**** Safari 17. Propriété CSS pour permettre de choisir l’image la plus adaptée
- ****Popover attribute****
- ```<hr>``` dans les select, ok !
- ****Counter styles.**** Définir des styles de liste
- Developper Tools améliorations
- etc…

::Info
[JPEG XL format ouvert abandonné par Google](https://web.developpez.com/actu/345394/JPEG-XL-Apple-adopte-dans-Safari-le-format-d-image-sans-redevance-que-Google-a-abandonne-L-editeur-de-Chrome-subit-la-pression-des-utilisateurs-qui-lui-demandent-de-revenir-sur-sa-decision/)

[https://caniuse.com/?search=jpeg xl](https://caniuse.com/?search=jpeg%20xl)
::

## Article à lire

React Angular moment <https://marmelab.com/blog/2023/06/05/react-angularjs-moment.html>
Résumé de l'article :
**Sur l’arrivée des React Server component :**

- pas de `useState`, `useContext`, `useEffect`
- pas de CSS in JS
- pas de React query parce que le fetch est propre à React (deduplication)
- le modèle mental n’est pas la même. Il faut réapprendre (sauf si tu fais du PHP)

Ce qu’il dit :

- React dissuade de faire des SPA
- React force la main pour utiliser un Framework et surtout un qui est SSR
- Les servers components sont la voie par défaut.
- Vidéo de Robinson <https://youtu.be/6jM_0wDOw4g> sur les clients components.

## CSS

- 50 types d’unité disponibles pour la taille en CSS !
CSS Sizing unit <https://nerdy.dev/new-relative-units-ric-rex-rlh-and-rch?twitter-syndication>

- Snippets for modern layout <https://smolcss.dev/>

- Nouvelle librairie <https://panda-css.com/>

- Wrap Balance supporté par chrome [https://caniuse.com/?search=wrap balance](https://caniuse.com/?search=wrap%20balance)

## Envoyer des emails programmatiquement

Avec maintenant **3000** gratuits par mois !

- Email for dev <https://resend.com/>

- MailPace <https://mailpace.com/>

- Faire des templates emails avec React EMAIL <https://react.email/examples>

## Netlify

- Après le rachat de Gatsby Inc. Netlify Connect !
  Netlify Connect <https://www.netlify.com/products/connect/>
- CLI Switch pour changer de compte <https://cli.netlify.com/commands/switch/>

## Base de données

- <https://www.edgedb.com/>

## Vercel

### Starter NextJS

Starter NextJS payment subscription : <https://github.com/vercel/nextjs-subscription-payments>

Kit pour créer une app pour des abonnements. Nécessite Supabase, Stripe et Vercel.
J’en parle parce que le projet est passé sur NextJS 13 version APP.

**SDK AI**

<https://vercel.com/blog/introducing-the-vercel-ai-sdk>

## Docker sur Mac plus performant

Docker desktop en mode moins gourmand :) <https://orbstack.dev/>

## Valider les variables d’environnement avec Zod

Zod avec les vars d’env <https://www.jacobparis.com/content/type-safe-env>

## En vrac

- PHP 8.3 alpha <https://stitcher.io/blog/new-in-php-83>

- NativePHP package Laravel pour créer des apps desktop. <https://twitter.com/marcelpociot/status/1656196877384130562>

- Livewire 3 arrive <https://twitter.com/calebporzio/status/1671870294930206720?cxt=HHwWgMC9_ZvL1rMuAAAA>

"Précision sur Livewire de @danielrmc “Petite précision pour Livewire. Livewire doit être pluggé avec alpine JS pour une plus grande réactivitée et créativitée. Création de composants très complexes, (genre une select multi avec recherche, ou encore un calendrier multi-ressources ...), demande une très bonne compréhension du JS”"

- Figma mode dev <https://web.developpez.com/actu/345818/Figma-renforce-son-offre-pour-les-developpeurs-avec-le-mode-Dev-un-plugin-VS-Code-et-plus-encore-La-plupart-de-ces-fonctionnalites-seront-reservees-aux-clients-payants/>

- Nuxt 3.6 <https://nuxt.com/blog/v3-6>

- Utiliser Chat GPT en tant que dev <https://www.builder.io/blog/ai-prompts-for-web-developers-chatgpt>
- Afficher un QR Code en mode HDR <https://notes.dt.in.th/HDRQRCode>

- video Cost of Javascript <https://youtu.be/ZKH3DLT4BKw>

- Web Perf snippets <https://webperf-snippets.nucliweb.net/>

- Chrome dev tools 115 <https://developer.chrome.com/blog/new-in-devtools-115/>

Bonne écoute !

::authors
::

::Sponsor
---

withList: false
---

::
