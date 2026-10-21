---
publicationDate: "21 Oct 2026"
status: "published"
author: "Double Slash"
categories:
  - Technology
episodeNumber: 144
episodeType: "full"
explicit: false
season: 2
dsSlug: "DS_144_news-oct-rc2"
title: "News octobre 2026 RC2, Deno file chez Cloudflare, qui possède l'open source JS et PHP sonne l'alerte"
subtitle: "Les news pour octobre 2026 RC2, compilateurs TypeScript, OpenCode 2.0, Bootstrap 6, PrimeNG et outils du mois."
episodeArtwork: "https://res.cloudinary.com/doubleslash/image/upload/v1792571027/episode/ART_144_xz4non.png"
type: "news"
description: "Nous évoquons Deno qui rejoint Cloudflare et la fin annoncée de Deno Deploy, la vague de rachats de l'open source JS par Cloudflare, Vercel, Anthropic et OpenAI, la course aux compilateurs TypeScript avec tsgo, bun check, tsc-rs, tsrs et tsc-ts, les deux failles critiques annoncées côté PHP, OSS Scanner d'Anthropic, OpenCode 2.0, Bootstrap 6 alpha, PrimeNG 22 qui quitte l'open source, les agent skills dans pnpm, et quelques outils comme Nuxt Fonts, TanStack Hotkeys ou lessrusty."
videoLink: "vrsxxLde0TY"
tags:
  - agents
  - angular
  - anthropic
  - bootstrap
  - cloudflare
  - deno
  - nuxt
  - open-source
  - php
  - pnpm
  - rust
  - securite
  - tanstack
  - typescript
duration: 2698
fileSize: 43180549
---

## pnpm installe les skills d'agents IA embarqués dans les paquets npm

- [pnpm installe les skills d'agents IA embarqués dans les paquets npm](https://pnpm.io/agent-skills)

pnpm sait maintenant gérer les agent skills : des dossiers avec un `SKILL.md` que les agents de code IA chargent comme instructions. Un paquet peut en livrer dans un dossier `skills/`, voire ne contenir que ça, et pnpm les relie dans le projet pour que l'agent qui bosse dans le repo les voie.

Côté sécurité, rien n'est lié sans validation. Une skill est suivie par l'agent à chaque session et peut contenir des scripts. À l'install, pnpm liste les paquets en attente et `pnpm approve` permet de trancher. La décision est enregistrée dans `permissions` du `pnpm-workspace.yaml` et vaut pour toutes les versions suivantes du paquet.

Les liens arrivent dans les dossiers d'agents déjà présents, comme `.claude/skills` ou `.cursor/skills`. pnpm peut aussi créer le bon dossier quand l'agent s'identifie par variable d'environnement : Claude Code, Cursor, Gemini CLI, Copilot, Codex et d'autres. On choisit ses dossiers avec `skills.dirs`, une liste vide coupe tout. Les liens sont ajoutés au `.gitignore` et retirés quand le paquet disparaît ou que l'approbation est révoquée.

## PHP : deux failles critiques en approche, patch d'urgence le 21 octobre

- [PHP : deux failles critiques en approche, patch d'urgence le 21 octobre](https://cert.europa.eu/publications/security-advisories/2026-018/)
- [PHP : deux failles critiques en approche, patch d'urgence le 21 octobre](https://www.php.net/archive/2026.php#2026-10-20-1)

Alerte rouge côté PHP. Le 20 octobre 2026, l'équipe sécurité de PHP a prévenu d'une release de sécurité programmée le mercredi 21 octobre à 14:00 UTC (16 h à Paris). Elle corrige deux vulnérabilités critiques, CVE-2026-109618 et CVE-2026-109619, toutes les deux notées 9.2 en CVSS v4.0.

Petit rappel au passage : une CVE (Common Vulnerabilities and Exposures), c'est un catalogue public qui donne un identifiant unique à chaque faille connue, pour que tout le monde parle bien de la même. Le format est simple : CVE, l'année d'attribution, puis un numéro d'ordre, comme le fameux CVE-2021-44228 de Log4Shell. Le programme est piloté par l'organisme américain MITRE, et beaucoup d'éditeurs peuvent attribuer leurs propres numéros. Attention, le numéro ne dit rien de la gravité : c'est le score CVSS, de 0 à 10, qui s'en charge. Et 9.2, c'est très haut.

Pour l'instant, aucun détail technique n'est public. Le CERT-EU indique que ces scores laissent craindre une exécution de code à distance sans authentification, et que toutes les versions depuis PHP 5 pourraient être touchées. Les versions affectées et corrigées seront précisées avec la release. PHP se réserve aussi le droit de publier plus tôt si les détails fuitent ou si une exploitation active apparaît.

Le conseil est simple : faites l'inventaire de vos apps PHP dès maintenant et préparez-vous à mettre à jour dans la foulée. Si vous ne pouvez pas patcher tout de suite, le CERT-EU recommande d'isoler du réseau public les applications exposées sur Internet en attendant le correctif.

## OSS Scanner : Anthropic scanne gratuitement les failles des projets open source

- [OSS Scanner : Anthropic scanne gratuitement les failles des projets open source](https://red.anthropic.com/oss-scanner/)

Anthropic lance OSS Scanner, un service gratuit et sur inscription qui scanne les dépôts open source à la recherche de vulnérabilités avec ses modèles les plus puissants. Il prolonge le travail fait pendant Project Glasswing. Jusqu'ici, Anthropic envoyait ses rapports après une relecture humaine, dans le cadre de son programme de divulgation coordonnée (plus de 6 000 rapports relus à octobre 2026), ce qui prend du temps. OSS Scanner propose une voie rapide : les projets inscrits reçoivent par email les rapports bruts, sans relecture humaine, avec vérification par agents, analyse de cause et proposition de patch. Il n'y a pas de délai de divulgation de 90 jours sur ces résultats non validés. Les critères d'éligibilité reprennent ceux d'OSS-Fuzz : projets établis, critiques pour l'infrastructure ou la sécurité, capables de traiter des rapports high ou critical. Pour s'inscrire, un mainteneur ouvre une PR sur github.com/anthropics/oss-scanner avec un project.yaml et un Dockerfile qui permet à l'agent d'auditer le projet hors ligne. Un fichier de threat model optionnel oriente le scanner, et on peut chiffrer les emails avec une clé PGP ou mettre le service en pause avec disabled: true.

## Nuxt Fonts : des web fonts auto-hébergées sans configuration

- [Nuxt Fonts : des web fonts auto-hébergées sans configuration](https://fonts.nuxt.com/)

Nuxt Fonts est le module officiel qui gère les polices web dans une appli Nuxt. On écrit juste un `font-family` dans son CSS, et le module trouve la police, génère les règles `@font-face` avec les bonnes graisses, styles et plages unicode, puis l'injecte dans la feuille de style. Rien à importer, aucun composant à ajouter.

Huit providers intégrés : `local`, `google`, `googleicons`, `bunny`, `fontshare`, `fontsource`, `npm` et `adobe`, combinables dans un même projet, et on peut écrire le sien. Les fichiers sont téléchargés au build et servis depuis son propre domaine avec du cache long, donc zéro requête tierce en production.

Pour limiter le décalage de mise en page, une police système est recalibrée sur les métriques de la web font pendant le chargement. L'option `glyphs` permet aussi de réduire une police aux seuls caractères utilisés. Le tout repose sur les paquets unjs unifont et fontaine, et existe aussi en plugin Vite pour les projets hors Nuxt.

## Bootstrap 6 alpha : Sass modules, CSS moderne, ESM only et préfixes à la Tailwind

- [Bootstrap 6 alpha : Sass modules, CSS moderne, ESM only et préfixes à la Tailwind](https://blog.getbootstrap.com/2026/10/08/bootstrap-6-alpha/)

Bootstrap revient avec une première alpha de la v6, une refonte complète du framework. Elle est déjà sur npm via `bootstrap@6.0.0-alpha.1` et sur jsDelivr.

Côté CSS, tout passe au système de modules Sass (`@use` et `@forward`, `@import` n'est plus supporté). Presque toutes les variables Sass de la v5 deviennent des variables CSS rangées dans des token maps, qu'on peut donc modifier au runtime. Le framework s'appuie sur les CSS layers, `oklch()`, `color-mix()`, `light-dark()` pour le mode sombre, les container queries et les éléments natifs dialog et details. Grosse rupture : les variantes responsive passent en préfixe, façon Tailwind, par exemple `.md:d-none` au lieu de `.d-md-none`.

Côté JS, les plugins sont ESM only, sans bundle UMD ni global `window.bootstrap`. Les sources passent en TypeScript avec leurs propres types, et Rolldown remplace Rollup et Babel. La doc arrive avec `llms.txt`, `llms-full.txt` et un dossier `skills/` pour les agents IA.

Prix à payer : il faut au minimum Chrome et Edge 130, Firefox 132 et Safari 18. La v5 reste supportée et une 5.4.0 est prévue.

## TanStack Hotkeys : des raccourcis clavier typés qui gèrent AZERTY, Mac et dialogs

- [TanStack Hotkeys : des raccourcis clavier typés qui gèrent AZERTY, Mac et dialogs](https://tanstack.com/hotkeys/latest)

TanStack Hotkeys est une librairie typée pour les raccourcis clavier dans les apps web. Le cœur est indépendant du framework, avec des adaptateurs pour React, Vue, Solid, Svelte, Angular et d'autres. L'idée : remplacer le listener keydown bricolé par une ligne comme useHotkey('Mod+S', save). Mod donne ⌘ sur Mac et Ctrl ailleurs, et ⌘S sauvegarde ton doc plutôt que la page. La lib gère aussi les cas pénibles : les raccourcis à lettre attendent quand on tape dans un champ, les boutons gardent Entrée et Espace, les dispositions Dvorak, AZERTY ou cyrilliques sont prises en compte, et AltGr ou la saisie en japonais ne déclenchent rien par erreur. Les chaînes de raccourcis sont typées, donc ton éditeur les autocomplète et les combinaisons impossibles cassent à la compilation. Les scopes permettent à une dialog de prendre le clavier pour elle seule. On peut afficher les raccourcis quand on maintient une touche modificatrice, et générer depuis une seule liste une cheat sheet et une page de réglages où l'utilisateur choisit ses touches, avec détection des conflits. Des devtools montrent tous les raccourcis enregistrés et ce qui se déclenche.

## OpenCode 2.0 : service local, nouvelle API, Code Mode et sous-agents en tâche de fond

- [OpenCode 2.0 : service local, nouvelle API, Code Mode et sous-agents en tâche de fond](https://x.com/opencode/status/2109649032931119362)
- [OpenCode 2.0 : service local, nouvelle API, Code Mode et sous-agents en tâche de fond](https://t.co/xJrKUZjYtu)

OpenCode, l'agent de code open source, sort sa version 2.0, une grosse refonte nourrie par les retours de ses millions d'utilisateurs quotidiens.

Le serveur tourne désormais automatiquement comme un seul process en arrière-plan : TUI, interface web et appli desktop parlent tous au même service local, qu'on peut aussi exposer à d'autres machines avec `opencode pair`. L'API a été réécrite de zéro, avec un nouveau client `@opencode/client` en JavaScript et en Effect.

Grosse nouveauté, le Code Mode : un mini interpréteur JavaScript (`@opencode/codemode`) transforme les serveurs MCP et les endpoints OpenAPI en fonctions que l'agent appelle dans un script. Il enchaîne plusieurs outils en un seul aller-retour, et tous les MCP y passent par défaut pour limiter la saturation du contexte.

Au menu aussi : sous-agents et commandes shell en tâche de fond, plus de 80 plugins internes, plugins TUI stables et hot reload, et un SDK `@opencode/sdk` pour embarquer OpenCode comme bibliothèque, jusque dans des Durable Objects. Attention aux breaking changes : les plugins 1.0 ne marchent plus et l'API serveur change complètement. Mise à jour via `opencode upgrade --major`.

## Prime NG 22 quitte l'open source avec la nouvelle licence PrimeUI

- [Prime NG 22 quitte l'open source avec la nouvelle licence PrimeUI](https://angular.fr/news/primeng-primeui-licence)
- [Prime NG 22 quitte l'open source avec la nouvelle licence PrimeUI](https://primeui.store/primeui)

PrimeTek change de modèle avec PrimeUI, une nouvelle licence qui couvre les futures versions majeures de PrimeNG, PrimeReact et PrimeVue. À partir de PrimeNG 22, la bibliothèque de composants Angular n'est plus publiée en open source. Le dépôt GitHub historique est archivé et le développement continue dans l'écosystème PrimeUI.

Le changement n'est pas rétroactif : PrimeNG 21 et toutes les versions déjà sorties restent sous licence MIT, donc utilisables et forkables. Une licence Community gratuite est prévue pour les individus, étudiants, associations, projets open source non commerciaux et petites structures éligibles. Gratuit sous conditions ne veut pas dire open source pour autant.

PrimeTek justifie ce choix par la soutenabilité : le modèle libs gratuites plus add-ons payants ne finançait plus la maintenance attendue. Pour les équipes, monter en v22 devient aussi une question de licence, de budget et de clé à gérer. L'article cite des alternatives comme Angular Material, Taiga UI, Spartan, Flowbite ou DaisyUI.

## Deno rejoint Cloudflare, le runtime et Deno Deploy vont s'arrêter

- [Deno rejoint Cloudflare, le runtime et Deno Deploy vont s'arrêter](https://deno.com/blog/cloudflare)

Ryan Dahl annonce que toute l'équipe Deno rejoint Cloudflare. Elle va travailler avec les équipes Workers et Durable Objects sur celld, un projet basé sur le modèle de programmation des Workers. L'idée : construire des applis distribuées dès le départ, avec le scaling intégré au modèle, sur le réseau Cloudflare ou sur sa propre infra.

Le revers de la médaille : Deno arrête de développer un runtime et un hébergement séparés. Le runtime Deno sera maintenu encore un an, avec des releases mensuelles de corrections et de sécurité, puis son développement s'arrêtera. Il reste open source et d'autres peuvent le reprendre. Deno Deploy ferme dans six mois, avec un accompagnement des clients payants vers Cloudflare Workers.

JSR continue, avec son infra qui passe chez Cloudflare, et `rusty_v8` reste maintenu en vue d'une intégration dans `workerd`. Ryan Dahl voit dans les Durable Objects une bonne base pour les agents IA : exécution serverless pas chère, état persistant, WebSockets et une interface JavaScript haut niveau.

## Cloudflare, Vercel, Anthropic, OpenAI : les gros rachètent l'open source JS

- [Cloudflare, Vercel, Anthropic, OpenAI : les gros rachètent l'open source JS](https://www.cloudflare.com/press/press-releases/2026/cloudflare-acquires-astro-to-accelerate-the-future-of-high-performance-web-development/)
- [Cloudflare, Vercel, Anthropic, OpenAI : les gros rachètent l'open source JS](https://voidzero.dev/posts/voidzero-cloudflare)
- [Cloudflare, Vercel, Anthropic, OpenAI : les gros rachètent l'open source JS](https://blog.cloudflare.com/the-story-of-web-framework-hono-from-the-creator-of-hono/)
- [Cloudflare, Vercel, Anthropic, OpenAI : les gros rachètent l'open source JS](https://vercel.com/blog/vercel-acquires-turborepo)
- [Cloudflare, Vercel, Anthropic, OpenAI : les gros rachètent l'open source JS](https://vercel.com/blog/vercel-welcomes-rich-harris-creator-of-svelte)
- [Cloudflare, Vercel, Anthropic, OpenAI : les gros rachètent l'open source JS](https://vercel.com/blog/nuxtlabs-joins-vercel)
- [Cloudflare, Vercel, Anthropic, OpenAI : les gros rachètent l'open source JS](https://better-auth.com/blog/better-auth-joins-vercel)
- [Cloudflare, Vercel, Anthropic, OpenAI : les gros rachètent l'open source JS](https://bun.com/blog/bun-joins-anthropic)
- [Cloudflare, Vercel, Anthropic, OpenAI : les gros rachètent l'open source JS](https://shopify.engineering/remix-joins-shopify)
- [Cloudflare, Vercel, Anthropic, OpenAI : les gros rachètent l'open source JS](https://tailwindcss.com/blog/tailwind-is-joining-shopify)

Les équipes derrière nos outils open source préférés changent de patron les unes après les autres. Cloudflare mène la danse. Après PartyKit en 2024 et l'embauche du créateur de Hono, il a racheté Astro le 16 janvier 2026, puis VoidZero le 4 juin, soit l'équipe de Vite, Vitest, Rolldown et Oxc. Le 9 octobre, il a annoncé l'arrivée de Deno. Deno Deploy doit fermer et le runtime ne serait maintenu qu'environ un an, mais les conditions exactes restent floues.

Vercel a commencé plus tôt, avec Turborepo et l'embauche de Rich Harris, le créateur de Svelte, en 2021, puis NuxtLabs en juillet 2025. Better Auth a annoncé le 7 juillet 2026 qu'il rejoignait Vercel, sans préciser la forme de l'accord.

Côté IA, Anthropic a racheté Bun le 2 décembre 2025 et OpenAI a annoncé le rachat d'Astral, l'équipe de uv, Ruff et ty, le 19 mars 2026. La FTC a donné son feu vert le 21 avril. Shopify avait déjà Remix depuis 2022, et Tailwind Labs a annoncé le 9 septembre 2026 « rejoindre Shopify », sans parler de rachat et sans communication de Shopify. Netlify, de son côté, avait repris Gatsby en 2023.

Aucun montant n'a été rendu public, et les projets restent très majoritairement open source sous licence MIT. Reste à savoir combien de temps ils resteront neutres.

Le graphe « qui possède quoi » (état au 10 octobre 2026) : https://hub.double-slash.dev/_emdash/api/media/file/01M5D1VHEQ2MHBRS02SJ84EE5T.png

## Go, Rust, et retour au TypeScript : la course aux compilateurs TypeScript

- [Go, Rust, et retour au TypeScript : la course aux compilateurs TypeScript](https://blog.cloudflare.com/typescript-rust-port/)
- [Go, Rust, et retour au TypeScript : la course aux compilateurs TypeScript](https://bun.com/blog/bun-v1.4.3)
- [Go, Rust, et retour au TypeScript : la course aux compilateurs TypeScript](https://www.infoq.com/news/2026/09/bun-AI-rewrite-zig-rust-4-months/)
- [Go, Rust, et retour au TypeScript : la course aux compilateurs TypeScript](https://github.com/pingdotgg/ts-rust)
- [Go, Rust, et retour au TypeScript : la course aux compilateurs TypeScript](https://tsz.dev/)
- [Go, Rust, et retour au TypeScript : la course aux compilateurs TypeScript](https://github.com/vercel-labs/tsc-ts)
- [Go, Rust, et retour au TypeScript : la course aux compilateurs TypeScript](https://news.ycombinator.com/item?id=50132911)

En octobre 2026, les réécritures du compilateur TypeScript s'enchaînent. La référence reste le portage Go officiel : TypeScript 7 (tsgo, typescript@7.0.2) est environ 10x plus rapide que TS 6, et la 7.1 beta gagne jusqu'à 2,5x de plus, en partie grâce à des optimisations venues de tsrs.

Bun 1.4.3 (10 octobre) ajoute bun check, un vérificateur de types en Rust porté de typescript-go. Il passe 100 % de la conformité TS 7.0.2 et serait 3 à 6,4x plus rapide que tsc 7.0.2, selon Bun. Il ne fait que vérifier les types : pas d'émission JS ou .d.ts, pas de LSP. Bun lui-même a été réécrit de Zig en Rust avec l'aide de l'IA dans sa version 1.4.0.

Côté Rust, Theo (t3.gg) a publié tsc-rs (ts-rust) le 7 octobre : compilateur, checker et LSP, sous licence MIT. Il a été écrit entièrement par des agents IA, pour plus de 420 000 $ de tokens, et Theo dit n'en avoir lu aucune ligne. Le 20 octobre, Cloudflare et VoidZero annoncent tsrs, porté par Max Schwenk (Owner.com) et incubé dans Oxc, en lien avec l'équipe TypeScript. Il serait jusqu'à 8x plus rapide que TS 7.0 avec environ 70 % de mémoire en moins, et il vise WebAssembly. Une fusion avec tsc-rs est prévue. tsz, lui, réécrit un checker en Rust de zéro (Apache 2.0, pas encore 100 % compatible).

Enfin, Vercel Labs sort tsc-ts : le compilateur Go reporté en TypeScript et compilé en natif avec scriptc, 2 à 4x plus rapide que tsgo selon Chris Tate. Sur Hacker News, on rappelle qu'il s'agit d'un sous-ensemble de TS propre à scriptc. Un bench indépendant sur le monorepo de Framer donne tsrs à 5,5 s, bun check à 7,3 s, tsc-rs à 10,3 s et tsgo 7.0 à 25 s. Ces chiffres sont à prendre avec précaution, chaque projet mesurant avec ses propres réglages.

Pour s'y retrouver, voici la chronologie des compilateurs et checkers TypeScript alternatifs :

- Octobre 2022 : stc, par kdy1 (le créateur de SWC), en Rust. Projet abandonné depuis.
- Mars 2025 : annonce de tsgo (Project Corsa), le portage officiel de Microsoft en Go, sorti en stable sous le nom TypeScript 7.0 le 8 juillet 2026.
- Janvier 2026 : tsz, lancé par Mohsen Azimi, en Rust.
- 7 octobre 2026 : tsc-rs (ts-rust), par Theo Browne (t3.gg), en Rust.
- 10 octobre 2026 : bun check, par l'équipe Bun (Jarred Sumner), en Rust.
- 17 octobre 2026 : tsc-ts, par Vercel Labs (Chris Tate), en TypeScript compilé en natif avec scriptc.
- 20 octobre 2026 : tsrs, par Max Schwenk (Owner.com) avec Cloudflare et VoidZero, en Rust.

## lessrusty: apprendre Rust par petites stories de vrai code et révisions espacées

- [lessrusty: apprendre Rust par petites stories de vrai code et révisions espacées](https://lessrusty.com)

lessrusty.com (« learn rust, a little every day ») est un site pour apprendre ou réviser Rust par petites doses, à partir de « stories » tirées de vrai code: une situation concrète (par exemple un handler d’inscription qui ne compile pas à cause d’une valeur déplacée), une question à choix, puis un explorateur qui permet de zoomer sur une ligne ou un symbole et explique le pourquoi (ownership, move, borrow, clone…). Le parcours part de la syntaxe, des variables et des fonctions, puis passe par ownership, borrowing, lifetimes, traits, gestion d’erreurs, collections et async Rust, avec aussi concurrence et Serde sur la carte de connaissances. Côté méthode: une courte pratique quotidienne, des révisions espacées qui ramènent une story quand le rappel estimé baisse (les questions ratées reviennent plus tôt), une revue des erreurs, de la pratique par thème et des examens chronométrés où les réponses sont verrouillées, avec score et explications à la fin. Pratique, exploration du code et examens sont gratuits et accessibles sans compte; se connecter sert à garder réponses et progression d’une visite à l’autre. Le site ne dit en revanche ni qui est derrière, ni s’il est open source, ni ce que recouvre son « free to start ».
