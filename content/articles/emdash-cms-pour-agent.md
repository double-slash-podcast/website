---
title: "EmDash CMS 1.0 : pas un nouveau WordPress, mais un vrai bon CMS"
description: "EmDash CMS, le CMS de Cloudflare basé sur Astro, passe en 1.0. Une vraie analyse sans bullshit"
author: {name: '@patrickfaramaz ',url: 'https://twitter.com/patrickfaramaz'}
publicationDate: 2026-10-06
---

EmDash CMS est passé en 1.0 le 28 septembre. Je l'ai pris en main, loin de la hype ou des vidéos rapidement enregistrées pour faire des vues, voici ce que j'en retiens.

## Une communication de lancement maladroite

Rappel du contexte : Cloudflare a annoncé EmDash le 1er avril 2026 avec un titre qui ne laissait pas de place au doute : « le successeur spirituel de WordPress ». Un 1er avril, beaucoup ont cru à une blague, ce que l'équipe reconnaît elle-même.

Le problème, c'était surtout la comparaison. Sur Hacker News, beaucoup ont répondu que WordPress n'a pas gagné grâce à la qualité de son code, mais parce que n'importe qui peut créer et éditer son site. Matt Mullenweg (le créateur de WordPress) a répondu dans un billet que l'esprit de WordPress, c'est de tourner partout.

Six mois plus tard, le discours a changé. La page d'accueil parle maintenant d'« un CMS open source pour Astro, pensé pour les humains et les agents », et l'annonce de la 1.0 le présente comme « le meilleur CMS pour les agents IA ». Et franchement, c'est mieux comme ça.

## La base : taxonomies, menus, widgets, SEO

Si vous venez de WordPress, vous ne serez pas perdu. Il y a des taxonomies : `category` (hiérarchique) et `tag` (à plat) sont fournies d'office, et vous pouvez créer les vôtres. Les menus se gèrent dans l'admin (contenus, liens libres, sous-menus). Les zones de widgets fonctionnent comme on s'y attend : une zone nommée dans le template, et l'éditeur choisit ce qu'il y met par glisser-déposer.

Le SEO est intégré, et c'est un vrai plus. On l'active collection par collection : on a alors un panneau par contenu (titre, description, image, canonical, noindex), les balises Open Graph via `<EmDashHead>`, du JSON-LD, les sitemaps, le `robots.txt` et même les redirections avec un journal des 404. Pas besoin d'un plugin.

Particularité : l'admin ne gère que les données. Un menu ou un widget n'apparaît sur le site que si un composant Astro le récupère et l'affiche.

## Comme WordPress, vraiment ?

Seul souci, c'est que oui, il ressemble à WordPress, mais au WordPress d'il y a 5 ans !\
Depuis l'arrivée de Gutenberg et du mode \*Full Site Editing\*, le CMS est passé sur une autre dimension en termes de gestion de contenu. En tant que développeur de sites WordPress, je peux dire sans rougir que l'éditeur Gutenberg est actuellement le meilleur système existant dans un CMS.\
Les widgets ? Ils sont quasi plus utilisés sur les sites modernes.

Alors oui, emDash corrige certains des défauts de WordPress, comme le SEO et le multilingue natif, mais certaines fonctionnalités ne sont pas disponibles. Il est impossible de modifier la navigation admin, par exemple. Nous y reviendrons plus bas.

## Le contenu : du Portable Text en base

Le contenu riche est stocké en base sous forme de JSON, au format **Portable Text**. Portable Text est un format JSON créé par Sanity.

Un champ `portableText` contient un tableau JSON de blocs. C'est une spécification ouverte : pas de HTML sérialisé à parser, et un contenu réutilisable ailleurs.

```js
[
  {
    "_type": "block",
    "style": "normal",
    "children": [
      {
        "_type": "span",
        "text": "Double Slash Podcast"
      }
    ]
  }
]
```

L'éditeur (TipTap) fonctionne par blocs : titres, listes, images, galeries, vidéos, code, tableaux, HTML, sections réutilisables, et on insère un bloc avec `/`. On peut créer ses propres blocs : via un plugin (que l'on créer) qui déclare le bloc (ses champs passent par le Block Kit) et fournit un composant Astro pour le rendu. Il existe aussi un champ `blocks` pour composer une page à partir de types de blocs définis dans le seed.

Par contre, pour le moment, un bloc custom ne s'édite pas dans le mode "live edit". On remplit un formulaire dans une boîte de dialogue, et le rendu final n'existe que côté Astro.

À noter que chaque collection a sa propre table au lieu de tout mélanger dans une seule table comme c'est le cas sur WordPress.

## Les content types et les champs flexibles.

On peut créer autant de content type que l'on veut. Équivalent aux fameux CPT de WordPress. Avec différentes options : routable, SEO, versioning, on active ou pas ce que l'on veut.
Comme mentionné juste avant, une table est créée pour une nouvelle collection. C'est propre.

Et dans ces content types, on peut modéliser les champs dont on a besoin. On a les champs par défaut : ID, slug, statut, etc. Et à nous de définir si l'on veut un champ pour telle valeur, etc. 17 types de champs pour le moment : texte court, texte long, nombre, JSON, liste déroulante, répéteur (9 champs possibles). Ici, pas besoin d'ACF ou de coder. C'est natif et très pratique.

## Le multilingue, natif

Le multilingue est intégré, et il s'appuie directement sur l'i18n d'Astro. Par défaut, il est désactivé. Pour l'activer, on ajoute un bloc `i18n` dans la config Astro, et EmDash y lit la liste des langues, la langue par défaut et les fallbacks :

```js
// astro.config.mjs
export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "es"],
    fallback: { fr: "en", es: "en" },
  },
  integrations: [emdash({ /* database, storage… */ })],
});
```

Chaque traduction est une entrée à part entière, avec son slug, son statut et son historique. On peut donc publier l'anglais et garder le français en brouillon. Dans l'éditeur, un panneau « Translations » permet de créer chaque version.

## Le front avec Astro

Côté front, pas de surprise : c'est du Astro. EmDash est une intégration Astro, et votre thème est un projet Astro classique avec des pages, des layouts et des composants. EmDash fournit surtout des helpers pour récupérer les contenus : `getEmDashCollection()` pour une liste, `getEmDashEntry()` pour une entrée.

```astro
---
import { getEmDashCollection } from "emdash";

const { entries: posts } = await getEmDashCollection("posts", {
  orderBy: { published_at: "desc" },
  limit: 7,
});
---
<ul>
  {posts.map((post) => <li><a href={`/posts/${post.id}`}>{post.data.title}</a></li>)}
</ul>
```

Pour le reste, il y a des composants dans `emdash/ui` comme `<PortableText>` ou `<Image>`, `getMenu()` pour les menus, et des types TypeScript générés à partir de votre modèle de contenu.

## L'authentification de l'admin

Point fort d'EmDash, pas de mot de passe. La méthode par défaut, ce sont les **passkeys** (WebAuthn). On peut ajouter des fournisseurs de connexion : GitHub, Google et Microsoft sont inclus, Atmosphere (les comptes AT Protocol, comme Bluesky) s'installe à part, et l'interface est ouverte à d'autres fournisseurs. Il existe aussi le magic link par e-mail, à condition d'avoir configuré un fournisseur d'e-mail. Sur Cloudflare, on peut enfin confier toute l'authentification à Cloudflare Access.

Côté rôles, on retrouve le classique : Subscriber, Contributor, Author, Editor, Admin.

## Les plugins

C'est ici qu'EmDash tient vraiment sa promesse de départ. Un plugin « sandboxé » tourne dans un environnement isolé. Par défaut, il n'a accès ni au contenu ni au réseau. Il déclare ce dont il a besoin dans son manifeste (lire le contenu, envoyer un e-mail, appeler un domaine précis), et l'administrateur valide ces permissions à l'installation, comme pour une app mobile. En vrai, qui va vérifier les permissions ? Pas grand monde.

Grosse nouveauté de la 1.0 : le sandbox fonctionne aussi sur Node.js, et plus seulement sur Cloudflare. La critique du lancement tombe donc en grande partie. La 1.0 apporte aussi un registre de plugins décentralisé, construit sur AT Protocol : les auteurs gardent la maîtrise de leurs publications. Avant la v1, le répertoire contenait 9 plugins. Au moment où j'écris ces lignes, il y en a une cinquantaine. Il ne faut pas hésiter à chercher sur GitHub pour trouver des plugins.

Il existe aussi des plugins « natifs », qui tournent dans le même processus que le site et ont accès à tout. Ce sont eux qui permettent les pages d'admin en React ou les composants de rendu.

- https://plugins.emdashcms.com/

## Le déploiement

Deux options officielles. Sur Cloudflare Workers, avec D1 pour la base et R2 pour les médias. Ou sur n'importe quel serveur Node.js, avec SQLite, PostgreSQL ou libSQL et un stockage local ou compatible S3. MySQL n'est pas pris en charge, ce qui est étonnant puisque c'est l'une des bases de données les plus répandues.

Les hébergements Node.js sont devenus courants, mais pas autant que les hébergements PHP/MySQL. En revanche, grâce au MCP, un agent peut accéder facilement à la documentation et déployer seul sur Cloudflare.

Un détail à connaître : sur Cloudflare, les plugins sandboxés demandent le plan Workers Paid. Sans lui, le site fonctionne, mais sans ces plugins.

## x402 !

x402 est un protocole de paiement natif HTTP qui existe depuis le début du web ! Un client demande une ressource payante, le serveur répond `402 Payment Required` avec des instructions de paiement lisibles par une machine, et le client (souvent un agent) paie puis relance la requête. Le code 402 dormait dans la spec HTTP depuis des années, et voilà enfin quelqu'un qui s'en sert !

Avec EmDash, cela se fait via le package `@emdash-cms/x402`. On configure son portefeuille et le réseau, puis on protège une page avec `enforce()`. Le prix peut même venir d'un champ numérique de votre collection, donc chaque article a son tarif, réglé par l'éditeur :

```astro
---
const { x402 } = Astro.locals;
const result = await x402.enforce(Astro.request, {
  price: entry.data.price ?? "$0.01",
  description: entry.data.title,
});
if (result instanceof Response) return result;
x402.applyHeaders(result, Astro.response);
---
```

Et sur Cloudflare, il existe un mode `botOnly` : seuls les robots paient, les humains lisent gratuitement. Faire payer les crawlers IA sans mettre de paywall pour les lecteurs, je trouve l'idée géniale. Une nuance quand même : l'annonce d'avril parlait d'un x402 intégré « sans aucun travail d'ingénierie ». Dans la doc actuelle, c'est une intégration séparée, et il faut ajouter quelques lignes par route.

À noter que le paiement utilise la crypto et la blockchain, ce qui le limite aux personnes qui maîtrisent ces technologies.

## L'IA et le MCP

Chaque site EmDash embarque un serveur MCP, actif par défaut sur `/_emdash/api/mcp` et protégé par OAuth. On y branche Claude, ChatGPT,Codex ou n'importe quel agent via un token API. On leur demande en langage naturel de rédiger un brouillon, de planifier une publication, de comparer deux versions, de gérer les médias, les menus ou les taxonomies, ou de créer une traduction. Les droits dépendent à la fois des permissions accordées et du rôle de l'utilisateur.

Ajoutez une CLI et des Agent Skills livrées avec les templates, plus un MCP connecté à la documentation, et on comprend le nouveau positionnement.

## Les défauts

Voici ce qui me gêne à l'usage :

- **Le menu de l'admin n'est pas modifiable.** Il se construit à partir des collections et des plugins, et je ne peux pas le réorganiser comme je veux. Les plugins peuvent ajouter leurs propres pages, mais pas remplacer un écran du core.
- **On ne peut pas désactiver des fonctionnalités.** Les commentaires, par exemple. La doc indique qu'ils s'activent collection par collection, et que le serveur MCP se coupe avec `mcp: false`, mais il n'existe pas de moyen général d'alléger l'admin.
- **Peu de personnalisation des e-mails.** Un hook `email:beforeSend` permet de modifier les messages envoyés par les plugins, mais pas les e-mails d'authentification du système.
- **Peu de personnalisation de l'admin.** On peut changer le logo, le nom et le favicon (option `admin`), mais ça ne va pas beaucoup plus loin.
- **Impossible de créer de nouveaux rôles**. On doit se cantonner aux rôles par défaut.

**Gros point noir**, mais je suis certain que cela va être corrigé prochainement :  quand on ajoute un champ sur notre installation locale, on pousse sur le repository et le site est redéployé. Eh bien, accrochez-vous ! 
Les champs ne sont pas ajoutés en production. Le fichier seed n'est pas appliqué. Il faut donc ajouter ou modifier les champs manuellement. Pourtant, ce sont des fonctionnalités qui existent sur ACF ou sur Craft CMS : un schéma de champs qui peut s'appliquer en production.


## Conclusion

Malgré ses défauts, EmDash est un bon produit. Finalement, il n'est pas vraiment comparable à WordPress : ce n'est ni le même écosystème, ni le même public. C'est un CMS pour les devs Astro, sûr par défaut, pensé pour les agents, avec des idées vraiment neuves comme x402.

C'est un bon CMS qui ne demande qu'à grandir. Et au rythme où il évolue (la 1.1 est déjà sortie trois jours après la 1.0), je pense qu'il va grandir vite.

## Sources

1. [Introducing EmDash - the spiritual successor to WordPress that solves plugin security (Cloudflare Blog)](https://blog.cloudflare.com/emdash-wordpress/)
2. [EmDash 1.0: the stable CMS with a secure plugin registry (Cloudflare Blog)](https://blog.cloudflare.com/emdash-cms-plugin-registry/)
3. [EmDash 1.0: an open source CMS for Astro (blog EmDash)](https://emdashcms.com/blog/emdash-1-0)
4. [CHANGELOG du package emdash (GitHub)](https://github.com/emdash-cms/emdash/blob/main/packages/core/CHANGELOG.md)
5. [Fil Hacker News sur l'annonce d'EmDash](https://news.ycombinator.com/item?id=47602832)
6. [EmDash Feedback, Matt Mullenweg](https://ma.tt/2026/04/emdash-feedback/)
7. [Page d'accueil EmDash CMS](https://emdashcms.com/)