---
publicationDate: 2026-10-02
title: "DHH n'a pas tué Rails. Il a déclaré la fin du code à la main."
description: "À Austin, DHH déclare la fin du code écrit à la main, pas sur Rails. Rebuild HEY en natif + Rust, agents par défaut, et un thread qui a transformé une keynote d'économie du logiciel en faire-part. Voici ce qu'il a vraiment dit."
author: [ { name: '@patrickfaramaz ', url: 'https://twitter.com/patrickfaramaz' }, { name: '@doubleslash_dev ', url: 'https://twitter.com/doubleslash_dev' } ]
---
Retour sur la polémique autour de la keynote d'ouverture de la Rails World 2026.

Le 23 septembre 2026, à 9 h 45, David Heinemeier Hansson a ouvert Rails World au Palmer Events Center d’Austin. Soixante-quinze minutes. Pas de démo Rails 8.x, pas de changelog à la une. **Une keynote sur le métier** : qui écrit encore le code à la main, avec quoi, et ce que ça change pour le prix de fabriquer un produit.

Sur le papier, la session promettait « what’s new in Rails ». Dans la salle, c’est autre chose qui est sorti : le CTO de 37signals qui dit « pencils down » sur le code écrit à la main, un rebuild de HEY en apps natives avec un backend Rust, et un appel assez frontal à l’optimisme. Sur le net, ça a vite tourné au « **Rails is dead** ». Pourtant, ce n’est pas ce qu’il a dit. Voici le résumé.

## Kodak, Opus 4.5, puis « pencils down »

DHH commence par une photo. Son arrière-arrière-grand-père, le peintre danois Laurits Tuxen, passait des années sur un portrait royal. Le Kodak Brownie de 1900 a rendu la photo accessible, les portraitistes ont dû se réinventer. Dans la keynote, il date le Brownie de notre époque au **24 novembre 2025** : la sortie d’**Opus 4.5**, le moment où, pour lui, les agents sont devenus assez bons et assez accessibles pour changer la donne. En gros : Écrire du code de qualité !

Puis le slogan. Chez 37signals, écrire du code à la main n’est plus la méthode par défaut. C’est un mode exceptionnel « like seeing a bug in Sentry ». Quand ça arrive, on sort le crayon, on corrige, puis on **répare la machine** (le setup d’agents). Business Insider reprend la formule : *« We are going, and have gone, pencils down. »*

Il a demandé à la salle qui écrivait encore une quantité matérielle de code à la main chaque semaine. Environ **cinq mains levées**. Dans une salle pleine de développeurs Rails.

Le lendemain sur X, le même DHH enfonce le clou : écrire à la main n’est plus une compétence économiquement viable pour la plupart des programmeurs dans la plupart des entreprises, et, dans le même souffle : *« Don’t you dare black pill this beautiful moment. »*

## Cela ne veut pas dire : « les développeurs sont morts »

« Pencils down » chez 37signals, ce n’est pas « plus besoin de développeurs ». C’est un changement de défaut : l’humain définit le résultat, l’agent produit l’implémentation, l’humain évalue.

Et ce n’est pas l’annonce de la mort de Rails. L’analyse de Daniel Bergholz : DHH sépare deux formes de produit. HEY, on l’utilise toute la journée : le natif a du sens. Basecamp, on y passe pour une tâche ponctuelle : le web sans installation reste roi. Pour ce second cas, il défend Rails et notamment la **convention over configuration** comme avantage pour les agents (moins de tokens à brûler dans un codebase prévisible). La page [rubyonrails.org/ai](https://rubyonrails.org/ai) pousse exactement cette ligne, avec des benchmarks sur Fizzy et Writebook.

## HEY : six apps natives, backend Rust

Le cas concret, c’est HEY. D’après la keynote : le produit ne sera plus principalement une web app. Rebuild en **six applications natives**, démarré environ une semaine avant Austin, donc rien de livré en production à ce stade. Backend mail réécrit en **Rust**.

DHH dit détester Rust pour un humain (« pouring acid »). Il l’aime quand les agents l’écrivent et qu’il n’a jamais à le lire. Lui spécifie, l’agent code, le compilateur et les tests filtrent, lui juge le résultat depuis l’extérieur.

Les chiffres qu’il avance (**ses** chiffres, pas un bench public) : environ **99 % de CPU en moins**, **95 % de mémoire en moins**, une dizaine de machines gardées surtout pour la redondance, et une estimation au doigt mouillé selon laquelle le pic de trafic HEY pourrait tenir sur un Raspberry Pi. Des observateurs le rappellent : rewrite encore en cours, pas de benchmark indépendant publié.

Il cite aussi Shopify : le Shop app reconstruit en natif par une petite équipe, loin de React Native. The New Stack documente ça de son côté (10 septembre 2026) : 12 semaines du POC à la prod, système interne Helix, hypothèse 2020 invalidée par les LLM. **37signals n’est pas seul à dire que le coût du natif a chuté.**

## Omarchy, Hype, le logiciel perso

La fin de la keynote ressemble à un progress report Omarchy, la distro Linux opinionated de DHH. Install : 3 min 33 s à Rails World 2025, 35 secondes sur une machine AMD Strix Halo la semaine d’avant, 9 secondes « in the lab » (chiffres rapportés par Jared Smith). Apps one-shot générées par des agents : calculatrice C++/Qt, app d’écriture façon iA Writer, trimmer vidéo, et **Hype**, un logiciel de présentation Markdown qu’il a construit en préparant cette même keynote. Binaire annoncé autour d’un demi-mégaoctet.

Ça prolonge *The malleable computer* (avril 2026) : l’open source promettait qu’on pouvait modifier son logiciel, l’IA rend enfin la promesse utilisable, y compris pour le bureau Linux. Et ça prolonge *Basecamp becomes agent accessible* (mars 2026) : API, CLI, skills. Pas un chatbot concierge dans l’app, mais la possibilité d’amener **son** agent. Dans la keynote, la démo HEY CLI + agent qui retrouve un vieux mail par concept (« sneakers and a podcast ») là où Elasticsearch keyword échoue, c’est exactement cette thèse.

## Où ça accroche

Le coût relatif des apps natives et d’un backend bas niveau a bougé pour une petite équipe. Les conventions Rails restent un atout quand un agent doit naviguer dans un codebase prévisible. L’initiative Rails AI le documente avec des évals. Travailler en async avec un agent (assigner, revenir plus tard) ressemble plus à du management qu’à du pair-programming obsessionnel. Et « ship a CLI » est une consigne produit concrète, pas une métaphore.

Jared Smith tire le fil rouge sur Basecamp 5 : au printemps, des designers ont vibe-codé les dernières features. Chaque PR paraissait raisonnable, l’ensemble a laissé une archi « Swiss cheese ». L’équipe est revenue à la review manuelle. DHH dit maintenant que c’était la mauvaise conclusion, qu’un meilleur modèle aurait suffi. Smith (et Makers’ Den dans le même esprit) objectent : le problème n’est pas la qualité locale d’une PR, c’est **qui possède l’agrégat**. Un modèle plus fort accélère le même échec d’ownership.

Les multiplicateurs 10× / 1 000× et le volume de lignes (DHH évoque \~30 000 lignes de Ruby de prod par an pendant deux décennies, puis \~150 000 lignes en août seulement, selon les recaps) mesurent un débit. Pas forcément de la valeur. Plus de code n’est pas plus de produit. Les chiffres ATM / Jevons cités sur scène ont aussi été corrigés par Smith côté sources historiques : l’idée (l’automatisation ne tue pas toujours l’emploi) tient, les deux nombres, non.

Et puis il y a HN : facile d’être optimiste quand on n’a pas à payer les abonnements frontier sur un salaire médian, facile de dire « pencils down » quand on n’est plus le junior qui apprend en tapant. DHH n’a pas résolu le chemin d’apprentissage dans la keynote. Il a offert de l’enthousiasme. Startup Fortune le dit sans détour : *That’s the deal.*

## Rails dans tout ça

**Rails n’est pas mort à Austin**. Il est repositionné. Pour le web distribué sans install, pour les monolithes conventionnels que les agents savent déjà lire, pour le « one person framework » branché sur un agent. La fondation investit clairement (page AI, évals Evil Martians mentionnées dans la keynote). Pour un client mail haute fidélité multi-plateforme, 37signals choisit natif + Rust. Ce n’est pas une contradiction si on accepte que **le coût de fabrication a changé** : on ne choisit plus la stack seulement pour le confort de frappe humaine, mais pour le résultat système qu’un agent peut produire sous contrainte.

> Le danger pour la communauté, ce n’est pas que DHH aime Rust. C’est de transformer une keynote d’économie du logiciel en panique identitaire ou, à l’inverse, d’avaler « pencils down » sans se demander qui relit le code que personne ne lit plus.

## Pour finir

Rails World 2026 a ouvert sur un pari : le goulot n’est plus la frappe, c’est le jugement. Agents, CLI, conventions, natif quand ça vaut le coup, Rust quand les perfs le justifient et qu’on accepte de ne pas le lire soi-même. Les sources primaires (vidéo, pages officielles, blog DHH) et les recaps critiques (Rustify, Makers’ Den, Jared Smith, Business Insider, HN) convergent sur les faits. Elles divergent sur le niveau d’optimisme raisonnable.

Regardez la keynote, pas le thread. Testez un vrai ticket avec un critère d’acceptation. Comptez le temps passé à expliquer, relire, corriger, déployer. Gardez l’architecture humaine. Et si votre app n’a pas de CLI… DHH vous a déjà donné une deadline rhétorique. Le reste, c’est du métier, le même qu’avant, juste avec un levier plus long.

---

## Sources

1. [Rails World 2026 - page officielle](https://rubyonrails.org/world/2026/)
2. [Rails World 2026 Opening Keynote - session](https://rubyonrails.org/world/2026/sessions/opening-keynote)
3. [Rails World 2026 - fiche speaker DHH](https://rubyonrails.org/world/2026/speakers/dhh)
4. [Rails World 2026 - Agenda](https://rubyonrails.org/world/2026/agenda)
5. [Rails World 2026 Opening Keynote - app.railsworld.com](https://app.railsworld.com/talks/rails-world-2026-opening-keynote)
6. [Rails World 2026 Opening Keynote - DHH (YouTube)](https://www.youtube.com/watch?v=vDjW_dRyKXY)
7. [Opening Keynote - RubyEvents.org](https://www.rubyevents.org/talks/opening-keynote-rails-world-2026)
8. [Rails World 2026 Keynote: DHH, HEY, Rust, and AI Coding Agents - Rustify](https://rustify.rs/articles/rails-world-2026-keynote-dhh-hey-rust-ai-agents)
9. [DHH’s Rails World 2026 Keynote - Makers' Den](https://makersden.io/blog/dhh-rails-world-2026-ai-agents)
10. [DHH's Rails World 2026 Keynote: Pencils Down, Now What - Jared Smith](https://sublimecoding.com/blog/dhh-rails-world-2026-keynote)
11. [Ruby on Rails Creator Declares 'Pencils Down' - Business Insider](https://www.businessinsider.com/ruby-on-rails-creator-no-more-handwritten-code-2026-9)
12. [DHH says 37signals has gone pencils down - Startup Fortune](https://startupfortune.com/dhh-says-37signals-has-gone-pencils-down-on-writing-code-by-hand/)
13. [Rails World 2026 Opening Keynote [video\] - Hacker News](https://news.ycombinator.com/item?id=49817680)
14. [Promoting AI agents - DHH / world.hey.com](https://world.hey.com/dhh/promoting-ai-agents-3ee04945)
15. [The malleable computer - DHH / world.hey.com](https://world.hey.com/dhh/the-malleable-computer-7c187a9b)
16. [Basecamp becomes agent accessible - DHH / world.hey.com](https://world.hey.com/dhh/basecamp-becomes-agent-accessible-3ae6b949)
17. [Endless execution - DHH / world.hey.com](https://world.hey.com/dhh/endless-execution-4157e065)
18. [Rails is built for AI - rubyonrails.org/ai](https://rubyonrails.org/ai)
19. [O DHH disse que o Rails morreu? - DEV Community (Daniel Bergholz)](https://dev.to/danielbergholz/o-dhh-disse-que-o-rails-morreu-fui-ver-o-que-ele-falou-de-verdade-oll)
20. [Pencils Down: DHH Says the Age of Writing Code Is Ending - Medium](https://medium.com/@bojanmajed/pencils-down-dhh-says-the-age-of-writing-code-is-ending-57644fe73713)
21. [Shopify spent years on React Native - then rebuilt everything in 12 weeks - The New Stack](https://thenewstack.io/shopify-native-ai-agents/)
22. [Rails World 2026 - Palmer Events Center](https://www.palmereventscenter.com/events/rails-world-2026)
23. [Video Summary - Rails World 2026 Opening Keynote](https://youtubesummary.com/summary/vDjW_dRyKXY)
24. [DHH on X (archive Tech Twitter) - It's pencils down…](https://www.techtwitter.com/tweet/795e73ca-8ebd-42cd-9a6a-0f54979cb027)
25. [Post X @dhh/status/2102936073642869121](https://x.com/dhh/status/2102936073642869121)
26. [Pencils down: DHH declares the end of hand-written code - Dealroom](https://dealroom.co/news/talk-vDjW_dRyKXY-pencils-down-dhh-declares-the-end-of-hand-written-code/)
27. [Dissecting DHH's RailsWorld 2026 Keynote - DEV Community (Andy Maleh)](https://dev.to/andyobtiva/dissecting-dhhs-railsworld-2026-keynote-speech-from-a-software-engineering-point-of-view-2l78)
