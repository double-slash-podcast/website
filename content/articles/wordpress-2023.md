---
publicationDate: 2023-03-08
title: Faut-il utiliser WordPress en 2023 ?
description: WordPress fêtera ses 20 ans le 27 mai de cette année ! Oui, 20 ans déjà ! Bon nombre de CMS aussi anciens que lui ont rejoint le cimetière des CMS depuis bien longtemps. WordPress, quand a lui, est toujours présent. Et bien présent ! Il évolue toujours et sa part de marché ne fait qu'augmenter.
author: {name: '@patrickfaramaz ',url: 'https://twitter.com/patrickfaramaz'}
---

::Info
---

type: warning
---

Retrouvez et écoutez l'épisode lié à l'article : [https://double-slash.dev/podcasts/wordpress/](https://double-slash.dev/podcasts/wordpress/)
::
<br />

# WordPress en 2023

WordPress fêtera ses 20 ans le 27 mai de cette année ! Oui, 20 ans déjà !

Bon nombre de CMS aussi anciens que lui ont rejoint le cimetière des CMS depuis bien longtemps. Certains, je pense à Joomla par exemple, ont déjà  un pied dans la tombe (j'entends déjà grincer les fans).

WordPress, quand a lui, est toujours présent. Et bien présent ! Il évolue toujours et sa part de marché ne fait qu'augmenter.

Alors une question se pose en ce début d'année quand on est développeur :

<strong class="text-2xl">Faut-il utiliser WordPress en 2023 ?</strong>

## WordPress en bref

### Quelques chiffres

- Plus de **40%** des sites dans le monde utilisent WordPress
- Plus de **60 000** plugins. Certains dépassent les 5 millions d'installations.
- **20%** des WordPress utilisent WooCommerce
- Plus de **60%** des sites qui utilisent un CMS sont sur WordPress
- **90%** des sites avec CMS piratés en 2018 étaient sur WordPress.

::Info
La fuite des Panama Papers a été causée par une extension WordPress pas à jour.
::

### Une communauté active

WordPress reste **open-source** et les contributeurs sont tous bénévoles. Certains sont mis à disposition de sociétés qui vendent des produits liés à WordPress, d'autres viennent d'agence web et certains sont de simples contributeurs.
::Info
Attention, ne pas confondre wordpress.org et wordpress.com.
::
Beaucoup d'articles et de forums pour trouver des solutions. Évidemment, il faut faire le tri et beaucoup sont obsolètes.

Organisation d'évènements, notamment les **WordCamps**, où se regroupent les utilisateurs du CMS pour échanger.

## Pourquoi les développeurs détestent WordPress

### Les casseroles de WordPress

#### PHP c'est mort

Ce n'est pas un vrai langage, c'est lent, etc.. On peut tout entendre depuis des années sur ce langage. Alors, oui, à la base ce n'était pas vraiment un langage de programmation. Si vous regardez les premières versions de PHP, c'était assez basique.

Cependant, aujourd'hui PHP vient de sortir sa version 6.2 et il n'a plus à rougir face à d'autres langages de programmation.  Il y a également de nombreux frameworks PHP populaires tels que Laravel, Symfony et CodeIgniter qui offrent des fonctionnalités avancées pour les développeurs et qui sont utilisés sur des gors projets professionnels.

En résumé, PHP est toujours une technologie de programmation pertinente et qui est utilisé par de nombreuses entreprises et développeurs pour construire des applications web.

**PHP est loin d'être mort.**

#### Ah bon, t'es développeur WordPress ?

Comment savoir si un développeur qui développe des sites avec WordPress code vraiment ou installe juste un tas de plugins ?

WordPress est accessible et permet à tout à chacun de concevoir un site web. Et ça même sans connaissance technique. C'est la force du CMS mais c'est aussi sa plus grande faiblesse.

En France, il existe des agences spécialisées WordPress qui fournissent du travail de qualité. Il y a également des développeurs freelances qui codent propre.

Cependant, une grosse majorité des sites conçus par des "Webmasters", les spécialistes en Webmarketing ou même agences de communication sont très mal conçues et concentrent toutes les mauvaises pratiques de la plateforme.

Pour les clients, il est difficile de faire le tri et il y a une grosse disparité aux niveaux des prix.

#### WordPress, c'est pas sécurisé

Effectivement, un WordPress peut être un danger pour les data si on ne suit pas les bonnes pratiques de base. Les mises à jour sont la première chose à effectuer régulièrement.

Installer un plugin de sécurité est aussi une bonne pratique.

Avec une grosse part de marché, WordPress est forcément la cible favorite des hackers. Il est donc nécessaire d'avoir des sauvegardes pour pouvoir réinstaller rapidement une version non hackée de son site.

Oui, le risque d'infection existe et il faut en avoir conscience.

#### WordPress, c'est lent

Tout comme la sécurité, si le site WordPress n'a pas été correctement codé et si l'équipe n'a pas respecté les bonnes pratiques, un site WordPress peut être très lent.

Il n'est pas rare, de voir des sites avec 200 requêtes sur une page et un score en dessous des 20 sur le Page Speed Insight.
Des sites qui traînent plus d'une cinquantaine de plugin, construit avec un page builder tel qu'Elementor et un thème acheté 50$ sur thèmes Forest.

Mais en suivant les bonnes pratiques, il est possible d'avoir un très bon score avec un site WordPress. Personnellement, j'ai des sites à plus de 95 au test Page Speed Insight.

#### WordPress, c'est pour faire des blogs

Si WordPress était une plateforme de blog à la base, ce n'est plus le cas aujourd'hui.

En plus des posts, toujours disponibles, il y a de base la possibilité de faire des pages. Et ensuite vous pouvez ajouter d'autres types via les "custom post type". Il n'y a pas de limite.

#### On peut pas faire des gros sites avec WordPress

Apparemment ce n'est pas ce que se sont dit les créateurs des sites suivants :

- [https://www.whitehouse.gov](https://www.whitehouse.gov/)
- [https://www.nationalarchives.gov.uk/](https://www.nationalarchives.gov.uk/)
- [https://techcrunch.com/](https://techcrunch.com/)

et la liste est longue...

## La vérité sur WordPress

- Beaucoup de sites mal conçus. Et beaucoup viennent malheureusement d'agences web.
- Mélange PHP/HTML toujours aussi horrible (cela change avec le FSE)
- Beaucoup de code legacy dû à une rétrocompatibilité et une dette technique (et oui, 20 ans).
- Uniquement MySQL en base de données. SQLite arrive.
- Structure de dossier (de base) qui donne accès à tout via le navigateur.
- Pas d'outils modernes de base comme composer, etc..
- Pas de structure MVC.
- CMS plus attaqué que les autres. Logique, il est le plus installé.
- Non un site WordPress professionnel n'est pas gratuit. Si l'on a besoin de fonctionnalités (cache, sécurité, multilingue). Il faut rapidement payer des plugins.
- Non, on ne peut pas tout faire avec WordPress. Comme avec les autres solutions d'ailleurs !

## WordPress en 2023

### Les sites builder

Un seul conseil : évitez d'utiliser un site builder (autre que Gutenberg). Malgré tout voici quelques chiffres sur Elementor:

- plus de 5 millions d'installations actives
- 12% des sites avec CMS, utilisent Elementor

On le voit, il est énormément utilisé, il fait partie du paysage et ils ont une grosse force marketing.
C'est un outil no-code qui a son utilité pour certaines personnes. Malheureusement, la qualité des sites qui en sortent, quoi qu'en disent les personnes qui l'utilisent, est très moyenne.

### ACF (Advanced Custom Field)

C'est l'extension indispensable pour tout site WordPress professionnel.

Pour rappel, cela permet de créer des champs custom (pour insérer des valeurs) un peu partout. Dès que vous avez besoin des valeurs personnalisées sur des éléments, ACF vous permet de faire ça.

Évidemment, c'est aussi faisable en programmant. Mais c'est tellement plus simple avec ACF.

Certains développeurs utilisent la partie "flexible content" pour créer l'édition des pages. Cela devient de moins en moins pertinent avec Gutenberg. Cela peut être utile pour des utilisations **headless**

- [https://www.advancedcustomfields.com/](https://www.advancedcustomfields.com/)

### Gutenberg

Gutenberg est un éditeur de contenu intégré dans WordPress, qui a été introduit dans la version 5.0 de WordPress en décembre 2018.

Avant l'arrivée de Gutenberg, l'éditeur de WordPress était un éditeur de texte simple appelé TinyMCE. Bien que TinyMCE ait été efficace pour créer des articles de blog basiques, il présentait des limitations pour les utilisateurs qui souhaitaient créer des mises en page plus élaborées avec des éléments tels que des colonnes, des images en pleine largeur et des styles personnalisés.

Gutenberg a été développé pour résoudre ce problème en permettant aux utilisateurs de créer des mises en page plus avancées à l'aide de blocs. Les blocs sont des éléments de contenu individuels qui peuvent être déplacés et manipulés pour créer des mises en page uniques. Les utilisateurs peuvent également ajouter des blocs de code personnalisé pour ajouter des fonctionnalités avancées.

Le développement de Gutenberg a commencé en 2017, lorsque l'équipe de WordPress a commencé à travailler sur l'idée d'un nouvel éditeur de contenu pour WordPress. Le développement initial de Gutenberg a été axé sur la création de blocs de base, tels que des blocs de texte, des blocs d'image et des blocs de citation.

Depuis sa sortie en 2018, Gutenberg a été continuellement mis à jour pour ajouter de nouvelles fonctionnalités et améliorer l'expérience utilisateur.

En 2023, il est indispensable de connaître et de savoir coder pour Gutenberg pour tout bon développeur qui travail sur WordPress.

L'éditeur est vraiment agréable à utiliser. Il faut savoir que dans la vision, à terme, il sera (est) utilisable en dehors de WordPress.

::Image
---

src: /assets/articles/gutenberg.gif
alt: WordPress Gutenberg
align: 'center'
---

::

#### Fonctionnement de Gutenberg

Gutenberg est basé sur **React.js** et **JavaScript**.

L’éditeur sauve le contenu sous forme de html. Dans ce HTML, il y a des commentaires spéciaux (html) pour identifier les blocs. Coté front, les commentaires ne sont pas rendus. Côté éditeur, Gutenberg parse le html et reconstruit les différents blocs via les commentaires.

```html
<!-- wp:heading -->
<h2 class="wp-block-heading">Convertir une font ttf en woff2</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Nous allons utiliser un outil de compression dont le code source se trouve ici : <a rel="noreferrer noopener" href="https://github.com/google/woff2" target="_blank">https://github.com/google/woff2</a></p>
<!-- /wp:paragraph -->
```

Les blocs que l'on peut créer soi-même, sont basés sur du JS, React et PHP.

::Info
À noter, ACF permet de faire des blocs Gutenberg. Pratique pour les allergiques à React :)
::

#### Les évolutions depuis le début

- Arrivé des patterns (compositions). Des blocs HTML simples. Comme des blocs natifs sans réglages. Plus rapide à créer.
- Full Site Editing (comme les pages builder, on peut contrôler les éléments du site avec Gutenberg)
- Évolution constante de l'éditeur :

  - interface
  - vitesse
  - accessibilité

#### Customisation des blocs

Il est possible via des hooks, de customiser des styles de blocs natifs et d'étendre les blocs natifs en ajoutant des propriétés.
Le bloc query loop peut être aussi modifier. Notamment pour modifier la query spécifiquement au besoin.

### Theme.json

Le fichier theme.json a été introduit dans WordPress 5.8, qui est sorti en juillet 2021. Il s'agit donc d'une fonctionnalité relativement nouvelle dans WordPress.

Avant l'introduction de theme.json, ces paramètres étaient souvent dispersés dans le code du thème et pouvaient être difficiles à trouver et à modifier pour les utilisateurs qui n'ont pas de connaissances en développement. Avec theme.json, les paramètres sont centralisés dans un seul fichier, ce qui facilite leur modification.

Le fichier theme.json permet aux développeurs de thèmes de définir des paramètres globaux pour leur thème, tels que les couleurs, les polices et les styles de blocs. Cela peut aider à améliorer la cohérence de la conception et à simplifier la personnalisation du thème pour les utilisateurs.

Le système est très bien conçu car il génère principalement des variables CSS et il permet d'avoir une cohérence entre la partie back (édition) et la partie front du site.

On peut également gérer les polices via le theme.json avec la Font API.

Il est nécessaire en 2023 de l'utiliser et de le maîtriser. Et c'est compatible avec l'ancien système de template. Pas que FSE.

### FSE (Ful site editing)

Le Full Site Editing (FSE) est une nouvelle fonctionnalité de WordPress qui permet aux utilisateurs de créer et de personnaliser des sites Web entiers, y compris les en-têtes, les pieds de page et les modèles de pages, à l'aide de l'éditeur de blocs de WordPress.
Première chose, avec le FSE, plus de code HTML et PHP mélangé. Les templates sont faits uniquement avec du HTML.

C'est un changement de modèle mental pour les concepteurs de site. Ce n'est donc pas toujours facile de débuter avec le FSE.

On dispose de blocs spéciaux, comme le bloc query, qui permet d'afficher des listes sans devoir coder le moindre code PHP.

Le côté moins cool, c'est que cela donne le contrôle sur des éléments sur lesquels normalement le client ne peut pas toucher.

Le FSE est toujours affiché en bêta mais il est désormais nécessaire de comprendre le fonctionnement pour tout développeur professionnel.

### Headless

On peut utiliser WordPress en mode Headless. Soit pour développer une API, soit pour utiliser un système du type Astro, Next.js.
Déjà l'API Rest de base est utilisable. Ensuite, vous pouvez étendre cette API et ajouter des routes.

Ensuite, il est possible de faire du GraphQL avec l'extension WPGraphQL.

Très clairement, WordPress peut être une option viable pour une API Headless. Et pas que pour un site classique.

Les plugins utiles :

- [WPGraphQL](https://www.wpgraphql.com/)
- [WPGraphQL Smart cache](https://github.com/wp-graphql/wp-graphql-smart-cache)
- [Stellate](https://stellate.co/docs/integrations/wordpress-plugin)
- [Cloudinary](https://cloudinary.com/documentation/wordpress_integration)
- [FaustJS](https://faustjs.org/)
- ...

### WordPress moderne en mode CI/CD

Pour les développeurs habitués a utiliser composer et qui aime déployer automatiquement, il existe des outils pour ça.

- Pour utiliser Twig au niveau des templates, il existe [Timber](https://fr.wordpress.org/plugins/timber-library/).
- Pour avoir une structure plus moderne et les dépendances avec composer : [Bedrock](https://roots.io/bedrock/).
- Avoir Timber et Bedrock : [Lumberjack](https://lumberjack.rareloop.com/)
- Utiliser la puissance de Laravel dans WordPress : [Acorn](https://roots.io/acorn/)
- Utiliser Blade (templating Laravel) : [Sage](https://roots.io/sage/)

### Commander WordPress en ligne de commande

Système super pratique pour tout un tas de chose, [wp-cli](https://wp-cli.org/fr/) est un script qui permet d'effectuer des taches en ligne de commande. Créer des utilisateurs, installer WordPress, installer des plugins, etc..

Évidemment, on peut étendre les commandes pour son propre besoin.

### Développer en local

En local, pour développer, certains utilisent Docker avec un système du type Bedrock et construisent eux-mêmes  la config.

Pour éviter les configs, il existe des tools qui facilitent la création d'environnements virtuels :

- [DDev](https://ddev.readthedocs.io/en/latest/users/quickstart/) **mon favori**
- [Trellis](https://roots.io/trellis)

Mais vous avez également des outils super pratiques avec une interface :

- [Local by Flywheel](https://localwp.com/)
- [DevKinsta](https://kinsta.com/fr/devkinsta/)

### Gestion d'un parc de site

Si vous avez plusieurs sites à gérer, il peut devenir fastidieux de passer sur tous les sites pour effectuer les mises à jour, etc..
Évidemment, il existe des outils pour ça.

Petit favori parce que récent et français, [WP Umbrella](https://wp-umbrella.com/fr/) permet de gérer un site WordPress à distance, d'effectuer les updates, des backups, etc..

D'autres outils :

- [Main WP](https://mainwp.com/)
- [Manage WP](https://managewp.com/)

## Starter theme

Un starter thème est disponible pour développer vos propres thèmes.
Il utilise **vite.js**, **Post CSS**, **Tailwind CSS**.
Plus d'infos sur la doc du projet : [https://presswind-doc.wp-performance.com/](https://presswind-doc.wp-performance.com/)

Greg Sullivan a également développé un thème qui utilise Tailwind CSS, il est disponible ici : [https://underscoretw.com/](https://underscoretw.com/)

## Conclusion

En 2023, WordPress reste une solution très utilisée pour concevoir des sites.

**Que l'on aime ou qu’on aime pas, WordPress fait partie du game.**

WordPress est un outil qui peut correspondre à pas mal de projet. De plus, il bénéficie d'une communauté très active, toujours prête à aider.

Pour ma part, étant donné que l'on ne peut pas lutter contre l’hégémonie de plate-forme, j'ai décidé de diffuser les bonnes pratiques pour essayer de faire remonter la qualité globale des sites WordPress via des vidéos et des exemples. Tout est dispo sur  le site [wp-performance](https://wp-performance.com/) ou le repo [GitHub](https://github.com/WP-Performance).
