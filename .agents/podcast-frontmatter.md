# Skill : Génération de frontmatter pour un épisode de podcast

Ce skill permet de générer le **title**, **subtitle**, **description** et les **tags** d'un nouvel épisode du podcast Double Slash, en s'inspirant du style des épisodes précédents.

## Règles

### Title
- Format : `News [Mois] [Année], [sujet 1], [sujet 2] et [sujet 3]`
- Toujours commencer par `News [Mois] [Année]`
- Ajouter 3 sujets accrocheurs/phares séparés par des virgules, le dernier précédé de `et`
- Mélanger français et termes techniques anglais (ex: « package npm compromis », « agent Cursor destructeur »)
- Privilégier les sujets à fort impact : drama, sécurité, nouvelles versions majeures

### Subtitle
- Format : `Les news pour [mois] [année], [thème 1], [thème 2] et [thème 3].`
- Une phrase courte qui résume les grandes thématiques
- Toujours commencer par `Les news pour [mois] [année]`

### Description
- Format : `Nous évoquons [sujet 1], [sujet 2], [sujet 3], et quelques outils comme [outil 1], [outil 2] ou [outil 3].`
- Une seule phrase, en français conversationnel
- Commencer par `Nous évoquons` ou `Dans cet épisode, nous évoquons`
- Lister les sujets importants avec un peu de contexte (pas juste le nom)
- Terminer par `et quelques outils comme X, Y ou Z.` pour regrouper les sujets plus légers
- Ton décontracté mais informatif

### Tags
- Format : `['tag1', 'tag2', 'tag3', ...]`
- 8 à 12 tags maximum
- Tout en **lowercase**
- Privilégier les noms de technos, outils, concepts clés
- Inclure les sujets transversaux : `ai`, `security`, `open source` quand pertinent
- Pas d'accents, pas d'espaces (utiliser des tirets si nécessaire, ex: `react-email` → `react email`)

## Exemples

### Épisode 130 — News avril 2026

```yaml
title: News avril 2026, Cursor et Copilot dans la tourmente, Axios compromis et Arrow JS
subtitle: Les news pour avril 2026, nouveau modèle, nouveau framework JS et IA.
description: Un épisode où l'on évoque le drama pour la sortie du nouveau modèle de Cursor, Copilot qui injecte des bugs dans les PR et qui va utiliser vos données pour s'entraîner, un nouveau framework JS — Arrow JS — qui s'adapte enfin aux autres providers, Axios qui se fait injecter du code malveillant, et quelques outils.
tags: ['cursor', 'composer 2', 'copilot', 'axios', 'arrowjs', 'nextjs']
```

### Épisode 129 — News Mars 2026

```yaml
title: News Mars 2026, Vite+, Void Cloud, du drama et de l'IA
subtitle: Les news pour le mois de mars 2026, du dev, du js et de l'IA
description: Nous évoquons le média L'Équipe qui repasse en MPA, Void Zero qui arrive avec plusieurs sorties. Vite 8, Vite Plus et Void Cloud. Datagouv nous propose du MCP, Mistral vous donne la possibilité d'avoir votre propre modèle, un DB vectoriel embarqué et des études sur l'IA.
tags: ['mcp', 'laravel', 'vite', 'vercel', 'cloudflare']
```

### Épisode 127 — News Février 2026

```yaml
title: News Février 2026, du WebMCP, des agents spammeurs et du Markdown.
subtitle: Les news sur le développement web et l'IA pour février 2026 RC1
description: Nous évoquons l'arrivée des WebMCP, l'option Cloudflare qui permet de retourner du markdown sur une requête, NativePHP qui devient open-source et gratuit, un jeu éducatif pour les enfants, TransformerJS qui arrive en V4, les projets open-source qui se font spammer et la perte de confiance des marchés envers les SaaS.
tags: ['cloudflare', 'ui', 'php', 'nativephp', 'picoclaw', 'transformerjs', 'souverainete', 'webmcp']
```

### Épisode 131 — News Mai 2026

```yaml
title: News Mai 2026, TypeScript 7 en beta, faux package TanStack et agent Cursor destructeur
subtitle: Les news pour mai 2026, TypeScript 7, sécurité npm, IA et outils du mois.
description: Nous évoquons TypeScript 7 qui débarque en beta, NPMX et son indicateur « You might not need this dependency », un agent Cursor qui détruit une base de prod en neuf secondes, le faux package TanStack qui volait les fichiers .env, Laravel qui glisse des publicités dans le contexte des agents IA, et quelques outils comme React Email 6, Starship ou Patterns.dev.
tags: ['typescript', 'cursor', 'tanstack', 'npmx', 'laravel', 'react email', 'starship', 'ai', 'flue', 'security', 'claude']
```

## Utilisation

Pour générer le frontmatter d'un nouvel épisode :

1. Fournir le contenu Markdown de l'épisode (les sujets traités)
2. Demander à l'IA de générer `title`, `subtitle`, `description` et `tags` en suivant les règles ci-dessus
3. Ajuster manuellement si nécessaire
