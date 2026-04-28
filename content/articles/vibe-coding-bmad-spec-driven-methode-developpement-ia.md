---
publicationDate: 2026-04-28
title: "Vibe Coding, BMAD, Spec-Driven: développer avec l'IA est-il vraiment plus simple ?"
description: "Vibe coding, BMAD, Spec-Driven, AWS Kiro, GSD: tour d'horizon des méthodes de développement IA en 2026 et pourquoi les développeurs restent indispensables."
author: {name: '@patrickfaramaz ',url: 'https://twitter.com/patrickfaramaz'}
---
En 2025, Andrej Karpathy popularisait le "vibe coding" avec une idée séduisante: laissez l'IA écrire le code, suivez le flow, ne lisez même pas ce qui est généré. La promesse? N'importe qui pouvait créer un logiciel.

En 2026, pour "bien" développer avec l'IA, il faut maîtriser BMAD et ses 21 agents spécialisés. Ou comprendre les specs EARS de Kiro. Ou orchestrer des subagents avec GSD. Ou versionner des PRD dans OpenSpec. Plus simple, vraiment?

Quelque chose s'est passé entre ces deux moments. Les limites des LLMs, hallucinations, perte de contexte, incohérences à grande échelle, ont provoqué une réponse industrielle massive: des frameworks de plus en plus sophistiqués pour compenser ce que l'IA ne sait pas encore faire seule. La complexité n'a pas disparu. Elle s'est déplacée.

Cet article analyse honnêtement ce paradoxe. On compare les principales méthodes de développement avec l'IA disponibles en 2026, on regarde ce qu'elles apportent vraiment, et on tire une conclusion qui va à contre-courant du discours ambiant: les développeurs n'ont jamais été aussi indispensables.

> **Points clés**
> - Le vibe coding fonctionne pour les prototypes rapides, pas pour les projets en production: la dette technique et le code spaghetti s'accumulent en 3 mois.
> - Les frameworks SDD (BMAD, Spec Kit, GSD, Kiro...) compensent les limites des LLMs en déplaçant la complexité vers la documentation et les specs.
> - Matt Pocock (Ralph Loop) défend l'inverse du vibe coding: les fondamentaux d'ingénierie (TDD, design, revue) comptent plus que jamais avec l'IA.
> - Les développeurs ne sont pas remplacés: ils sont repositionnés comme architectes, relecteurs de code IA, et concepteurs de specs.

---

## Le Vibe Coding: la promesse et ce qu'elle cache

### Qu'est-ce que le vibe coding, exactement?

Le terme "vibe coding" a été popularisé par Andrej Karpathy, membre fondateur de l'équipe technique d'OpenAI et ancien directeur de l'IA chez Tesla, début 2025. Sa définition était claire: on interagit avec l'IA en langage naturel, on accepte les suggestions sans trop analyser, on "vibre" avec le flow plutôt que de lire chaque ligne.

L'idée résonnait avec une réalité: les LLMs avaient fait des progrès spectaculaires en génération de code. Pour un développeur solo avec un projet précis et borné, laisser Claude ou GPT écrire les fonctions de base permettait effectivement d'aller beaucoup plus vite.

Mais Karpathy lui-même avait posé une limite importante, souvent oubliée dans les articles enthousiastes: le vibe coding était conçu pour les "throwaway weekend projects". Pas pour la production.

### Ce pour quoi le vibe coding fonctionne vraiment

Il faut être honnête: le vibe coding est redoutablement efficace dans certains contextes.

**Pour un MVP en 48h**, un prototype pour un client, une landing page, un script interne ou un outil personnel, la méthode fait gagner un temps considérable. Pas besoin de documentation, pas de réunion de conception, on itère en temps réel avec l'IA.

### Les limites concrètes des LLMs qui ont tout changé

Le problème n'est pas l'IA. C'est ce qu'un LLM est, fondamentalement: un modèle qui prédit le texte le plus probable, pas celui qui est correct.

Quatre limites se manifestent de façon répétée sur les projets réels:

**Les hallucinations.** Le modèle invente des fonctions, des APIs, des dépendances qui n'existent pas. Il génère du code qui compile mais fait faux. Sur un projet de 500 lignes, c'est détectable. Sur 50 000 lignes, c'est catastrophique.

**La perte de contexte.** Les LLMs ont une fenêtre de contexte limitée. Quand le projet grandit, le modèle perd le fil. Il réécrit des fonctions existantes, crée des incohérences entre modules, contredit ses propres choix d'architecture d'une session à l'autre.

**L'incohérence temporelle.** L'IA n'a pas de mémoire entre les sessions. Chaque conversation repart de zéro. Sans mécanisme pour maintenir un contexte partagé et persistant, le code produit diverge inexorablement.

**Le code spaghetti structurel.** C'est peut-être la limite la plus insidieuse. Un LLM optimise pour satisfaire la demande immédiate, pas pour produire un code maintenable sur la durée. Il génère des solutions localement correctes mais globalement incohérentes: des fonctions dupliquées avec des noms légèrement différents, des logiques métier éparpillées sans architecture claire, des couplages implicites entre modules qui rendent chaque modification risquée. Le code "marche" mais personne ne peut le lire, le tester, ni le faire évoluer sans tout casser. La maintenance devient exponentiellement coûteuse, et paradoxalement, même l'IA finit par ne plus comprendre ce qu'elle a elle-même produit quelques sessions plus tôt.

### La "3-month wall": quand le projet vibe-codé s'effondre

Red Hat Developer a publié en février 2026 "The uncomfortable truth about vibe coding": un constat documenté sur des dizaines de projets. La dette technique générée par le vibe coding ne se voit pas dans les premières semaines. Elle explose aux alentours du troisième mois, précisément quand le code spaghetti accumulé session après session rend chaque nouvelle fonctionnalité plus coûteuse que la précédente.

---

## La réponse de l'industrie: une prolifération de frameworks

Face à ces limites, l'industrie n'a pas attendu. En l'espace de quelques mois, des dizaines de frameworks ont émergé avec la même ambition: donner à l'IA les rails dont elle a besoin pour rester cohérente. Voici les principaux.

### Le Spec-Driven Development: le principe fondateur

Avant de parler des frameworks, il faut comprendre le principe qui les sous-tend tous: le Spec-Driven Development (SDD).

L'idée est simple mais radicale. Au lieu de laisser le code être la source de vérité, on donne ce rôle à la spécification. Le code devient un artefact dérivé de la spec, pas l'inverse.

Concrètement, le workflow SDD suit trois phases: **Requirements** (définir précisément ce qu'on veut construire), **Design** (l'architecture et les choix techniques), puis seulement **Tasks** et **Code**. L'IA intervient à chaque étape, mais toujours contrainte par les artefacts des étapes précédentes.

Le Thoughtworks Tech Radar a classé le spec-driven development en catégorie "Adopt" en 2026. C'est la recommandation la plus forte du radar. Autrement dit: ce n'est plus une tendance, c'est une pratique mainstream.

### BMAD Method: le framework le plus ambitieux

**BMAD** (Breakthrough Method for Agile AI-Driven Development) est le framework SDD le plus complet disponible. Il est open source, gratuit, et s'intègre directement dans Claude Code, Cursor et Windsurf.

Sa spécificité: il orchestre une équipe virtuelle de **21 agents spécialisés**. Chaque agent a un rôle défini (Product Manager, Architect, Developer, Scrum Master, UX Designer...) et des responsabilités précises. Ils communiquent via des artefacts standardisés: PRDs, user stories, documents d'architecture.

Le concept central de BMAD est "Agent as Code": chaque agent est défini dans un fichier Markdown versionnable. Comme l'Infrastructure as Code, mais pour les comportements IA. Cela signifie que la configuration de votre équipe d'agents peut être commitée, reviewée et partagée comme du code ordinaire.

BMAD propose plus de **50 workflows guidés** qui s'adaptent à la complexité du projet. Son cycle principal: Analysis (capter le problème en une page) → Planning (user stories avec critères d'acceptation) → Solutioning (architecture + plan d'implémentation) → Implementation (itérations courtes, story par story).

La documentation officielle résume bien le changement de paradigme: "Source code is no longer the sole source of truth, documentation is. Code becomes merely a downstream derivative of specifications."

Projet GitHub: [github.com/bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD)

### GitHub Spec Kit: le plus adopté, le plus accessible

Créé et maintenu par GitHub, le **Spec Kit** a dépassé les 75 000 étoiles sur GitHub, c'est le framework SDD le plus adopté par la communauté. Son avantage principal: il est compatible avec GitHub Copilot, Claude Code et Gemini CLI, ce qui le rend accessible aux équipes qui utilisent déjà ces outils.

Son workflow est plus simple que BMAD. On part d'une idée, on génère une spec structurée, on la décompose en tâches, et l'IA implémente tâche par tâche. Moins d'agents, moins de cérémonie, mais la même philosophie: la spec prime sur le code.

Pour les équipes qui cherchent à adopter le SDD sans une courbe d'apprentissage trop raide, le Spec Kit est souvent le bon point d'entrée.

Documentation: [github.blog](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)

### GSD (Get Shit Done): la complexité cachée derrière la simplicité affichée

**GSD** (Get Shit Done) adopte une philosophie différente: "Move complexity into the system, not the workflow." Pour l'utilisateur, l'interface est simple, quelques commandes qui "just work". Mais en coulisses, GSD orchestre du context engineering avancé, du prompt XML, des subagents et de la gestion d'état.

GSD est utilisé par des ingénieurs chez Amazon, Google, Shopify et Webflow. Il est particulièrement adapté aux développeurs solo qui veulent aller vite sans gérer eux-mêmes la complexité de l'orchestration.

La nuance importante: GSD est simple à utiliser, pas simple à comprendre. Quand quelque chose ne fonctionne pas comme prévu, debugger le système peut être délicat.

Projet GitHub: [github.com/gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done)

### OpenSpec: pour les projets existants

**OpenSpec** répond à un problème différent: comment utiliser l'IA sur un projet brownfield, un codebase existant avec de la dette technique, sans introduire de nouvelles incohérences?

Sa clé conceptuelle: "version control for intent". OpenSpec sépare physiquement l'état actuel du projet (dans un répertoire `specs/`) des modifications proposées (dans un répertoire `changes/`). Avant d'écrire une seule ligne de code, on s'accorde sur ce qu'on veut construire. L'IA ne peut pas "dériver" parce que les frontières entre l'existant et le proposé sont explicites.

Pour les agences web qui travaillent sur des sites WordPress par exemple ou des applications existantes et veulent commencer à intégrer l'IA sans tout casser, OpenSpec mérite sérieusement d'être évalué.

Projet GitHub: [github.com/Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec)

### Claude Task Master: la gestion de tâches pour l'IA

**Claude Task Master** est un système de task management pensé spécifiquement pour le développement assisté par l'IA. Il s'installe directement dans Cursor, Windsurf, Lovable ou Roo sans changer fondamentalement votre workflow.

Son principe: décomposer automatiquement une fonctionnalité en tâches granulaires, les prioriser par dépendances, et permettre à l'IA de les adresser une par une avec un contexte précis. Plutôt que de donner à l'IA une user story complexe et espérer un résultat cohérent, Claude Task Master découpe le problème en unités que le LLM peut traiter de façon fiable.

C'est un outil complémentaire plus qu'un framework complet. Il s'intègre bien avec BMAD ou le Spec Kit.

Projet GitHub: [github.com/eyaltoledano/claude-task-master](https://github.com/eyaltoledano/claude-task-master)

### AWS Kiro: le seul IDE nativement spec-driven

**Kiro** est une catégorie à part. Ce n'est pas un framework à installer dans votre IDE existant: c'est un IDE complet construit par AWS autour du spec-driven development.

Son workflow: vous décrivez une fonctionnalité en langage naturel, Kiro génère automatiquement des **requirements formalisés** (en notation EARS, un standard pour les spécifications d'ingénierie), puis une architecture, puis un plan d'implémentation avec des tâches séquencées par dépendances. Vous validez chaque étape avant que le code soit écrit.

Kiro introduit aussi deux concepts originaux:

Les **Agent Hooks**: des triggers automatiques qui exécutent des actions prédéfinies sur des événements (save, create, delete). Par exemple, à chaque fois que vous sauvegardez un fichier, Kiro peut automatiquement mettre à jour la documentation correspondante.

Les **Steering files**: des fichiers Markdown qui décrivent les conventions, librairies et standards de votre projet. Au lieu de répéter vos préférences à chaque session, vous les définissez une fois. Kiro les intègre en contexte persistant.

Pour les projets qui démarrent de zéro avec une volonté forte de structure dès le départ, Kiro est probablement la solution la plus mature.

Site officiel: [kiro.dev](https://kiro.dev/)

### TDD avec l'IA: la méthode classique qui retrouve une nouvelle jeunesse

Le **Test-Driven Development** n'est pas nouveau, c'est une pratique des années 1990. Mais avec l'IA, il prend une dimension nouvelle et particulièrement pertinente.

Le principe du TDD: écrire les tests avant le code. On définit ce que le code doit faire (les assertions), puis on écrit le code qui fait passer ces tests.

Avec un LLM, les tests deviennent une spec exécutable. On donne à l'IA les tests à passer, elle génère le code correspondant. L'avantage majeur: les tests agissent comme garde-fou contre les hallucinations. Si l'IA génère du code incorrect, les tests échouent immédiatement et visiblement.

Le site codemanship.wordpress.com l'exprime bien: "TDD works so well in AI-assisted programming because the developer can set the quality barriers and define the design." L'IA écrit le code, le développeur définit les critères de succès. Chacun fait ce qu'il fait le mieux.

En pratique, TDD et SDD convergent: les specs deviennent des tests, les tests deviennent des specs. C'est d'ailleurs ce qu'AWS Kiro fait nativement avec les critères d'acceptation de ses Feature Specs.

### Ralph Loop (Matt Pocock) — les fondamentaux d'abord, l'autonomie ensuite

Matt Pocock, formateur TypeScript et créateur d'AI Hero, défend une position qui résonne directement avec la thèse de cet article. Sa conférence "It Ain't Broke" (AI Engineer Europe, 2026) est explicite: les fondamentaux du développement logiciel ne sont pas rendus obsolètes par l'IA. Ils sont devenus encore plus critiques.

Son workflow complet: **Idea → `/write-a-prd` → PRD → `/prd-to-issues` → Kanban → Ralph Loop → Manual QA**.

Le coeur de sa méthode est le **Ralph Loop**, une technique pour faire tourner des agents IA en boucles autonomes prolongées. L'idée: au lieu de superviser chaque échange avec l'IA, on configure un agent qui lit le backlog, choisit la prochaine tâche, l'implémente en TDD (red-green-refactor), fait tourner les tests et les vérifications de types, committe si ça passe, et recommence. On revient quelques heures plus tard à du code fonctionnel et committé.

Deux concepts structurent son approche:

**La "Smart Zone".** Les LLMs ont une fenêtre de performance optimale, autour de 100 000 tokens de contexte. En dessous, ils sont efficaces. Au-delà, ils entrent dans la "dumb zone": la qualité chute, les hallucinations augmentent. Sa règle: ne jamais donner à l'IA plus qu'elle ne peut "chew" à la fois. Décomposer les tâches en unités atomiques plutôt que de tout envoyer en une seule requête.

**Le prompt "Grill me".** Avant d'écrire une spec, Pocock utilise un skill qui demande à l'IA de challenger ses hypothèses de conception. L'IA joue l'avocat du diable sur l'architecture envisagée. L'objectif: découvrir les angles morts avant de committer une direction, pas après avoir codé 500 lignes dans le mauvais sens.

Sa collection de 21 skills Claude Code (installables via `npx`) formalisent ces pratiques: `to-prd`, `to-issues`, `grill-me`, `tdd`, `improve-codebase-architecture`, `git-guardrails-claude-code`... Chaque skill impose une discipline de workflow à l'agent, pas juste au développeur.

Ce qui distingue l'approche Pocock des autres frameworks: elle ne cherche pas à remplacer les pratiques d'ingénierie par des specs IA. Elle les renforce. Le TDD reste du TDD, le design reste du design. L'IA s'insère dans un processus éprouvé plutôt que de proposer un nouveau paradigme.

Vidéo d'explication : https://www.youtube.com/watch?v=v4F1gFy-hqg

Skills: [everydev.ai/tools/mattpocock-skills](https://www.everydev.ai/tools/mattpocock-skills) — Ralph Loop: [github.com/snwfdhmp/awesome-ralph](https://github.com/snwfdhmp/awesome-ralph)

---

## Le paradoxe: a-t-on vraiment simplifié le développement?

Posons la question franchement. En 2025, vibe coding = ouvrir un chat et taper une demande. En 2026, "bien développer avec l'IA" = choisir entre 8 frameworks, apprendre leurs concepts (agents, PRDs, specs EARS, steering files, agent hooks...), configurer des dizaines de fichiers, et maintenir une documentation qui précède le code.

Est-ce vraiment plus simple?

### La complexité s'est déplacée, pas disparue

Ce qui a changé: vous écrivez moins de code bas niveau. Ce qui n'a pas changé: vous devez comprendre exactement ce que vous voulez construire, comment l'architecturer, et comment vérifier que ce qui est produit est correct.

En fait, les frameworks SDD ont révélé quelque chose d'intéressant. Les LLMs échouent précisément là où les développeurs juniors échouent aussi: sur les parties floues, mal définies, sans spécification claire. Quand le problème est précisément formulé, comme dans un bon test unitaire ou une user story bien rédigée, l'IA performe remarquablement. Quand c'est vague, elle hallucine.

Les frameworks SDD ne compensent pas les limites de l'IA. Ils compensent les limites de la formulation humaine. Ils forcent à définir précisément ce qu'on veut, et c'est exactement ce qu'un bon développeur senior faisait déjà avant même d'écrire la première ligne.

### Ce qui a changé pour les développeurs

Le repositionnement des compétences développeur avec l'IA est réel:

- **Avant**: savoir écrire du code, connaître les patterns, débugger à la main
- **Maintenant**: savoir architecturer un système, rédiger des specs précises, et surtout **relire et valider du code généré par l'IA**

Cette dernière compétence est critique et sous-estimée. Un LLM peut produire du code qui compile, passe les tests basiques, et reste pourtant fondamentalement défaillant sur des edge cases ou des problèmes de sécurité. Un développeur qui ne sait pas lire du code, qui délègue entièrement la compréhension à l'IA, ne peut pas détecter ces défaillances.

### Ce qui n'a absolument pas changé

Savoir comment un projet devrait fonctionner reste indispensable. Écrire une bonne spec ou un bon PRD demande de comprendre les cas d'usage, les contraintes techniques, les dépendances entre composants. Ça, aucune IA ne peut le faire à votre place, elle n'a pas accès à vos clients, à votre contexte métier, à vos contraintes d'infrastructure.

La dette technique existe toujours. Elle se génère même plus vite avec l'IA qu'à la main, précisément parce que la vitesse de production augmente. Si la direction est mauvaise, on va plus vite dans le mauvais sens.

Et savoir relire du code reste la compétence numéro un qui sépare un bon développeur d'un utilisateur d'IA. Les frameworks aident, mais ils ne remplacent pas le jugement.

---

## Conclusion: l'IA a transformé le développement, pas simplifié

Ce n'est pas une tendance, c'est un mouvement de fond. L'industrie a collectivement reconnu que laisser l'IA "vibe" sans contraintes ne fonctionnait pas à l'échelle.

Mais voilà ce qu'il faut retenir: la complexité des frameworks n'est pas un échec de l'IA. C'est la preuve que le développement logiciel est intrinsèquement complexe, et que cette complexité ne disparaît pas, elle se déplace vers la conception, la spécification, la review.

Les développeurs qui prospèrent dans cet environnement ne sont pas ceux qui ont abandonné la lecture du code à l'IA. Ce sont ceux qui savent architecturer des systèmes, rédiger des specs précises, et valider ce que l'IA produit.

Le développeur du futur n'est pas remplacé. Il est repositionné. Chef d'orchestre d'une équipe d'agents, architecte des contraintes, relecteur critique de la production IA. C'est un rôle différent, plus stratégique, et qui demande encore plus de compétence réelle.

Choisissez votre framework selon la complexité de votre projet, pas selon l'effet de mode. Et si vous ne savez pas lire le code que l'IA génère pour vous, commencez par apprendre ça.

---

*Sources: [BMAD Method](https://docs.bmad-method.org/), [GitHub Spec Kit](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/), [AWS Kiro](https://kiro.dev/), [GSD](https://github.com/gsd-build/get-shit-done), [OpenSpec](https://github.com/Fission-AI/OpenSpec), [Claude Task Master](https://github.com/eyaltoledano/claude-task-master), [Thoughtworks Tech Radar](https://www.thoughtworks.com/radar/techniques/spec-driven-development), [Red Hat Developer](https://developers.redhat.com/articles/2026/02/17/uncomfortable-truth-about-vibe-coding), [The New Stack](https://thenewstack.io/vibe-coding-spec-driven/)*
