---
title: "RTK ne vous fait peut-être pas économiser tant de tokens que ça !"
description: "RTK promet 60 à 90 % de tokens en moins pour vos agents de code. Les benchmarks indépendants et le prompt caching racontent une autre histoire."
author: {name: '@patrickfaramaz ',url: 'https://twitter.com/patrickfaramaz'}
publicationDate: 2026-11-23
---

RTK est l'un des outils les plus partagés de l'année chez ceux qui codent avec des agents. La promesse est simple : vous l'installez, et votre agent consomme 60 à 90 % de tokens en moins. Le chiffre circule partout, souvent avec une capture d'écran de ses statistiques en guise de preuve.

Plusieurs équipes ont regardé ce que ça donne sur la facture. Leurs résultats sont beaucoup moins spectaculaires.

## Ce que fait RTK

RTK (Rust Token Killer) est un petit outil open source écrit en Rust. Il se place entre votre agent de code (Claude Code, Codex, OpenCode…) et le terminal. Quand l'agent lance une commande comme `git status` ou une suite de tests, RTK raccourcit la sortie avant que le modèle la lise : quelques lignes au lieu de quarante, seulement les tests en échec au lieu de toute la liste.

La commande `rtk gain` affiche ensuite le nombre de tokens "économisés". Le README est d'ailleurs honnête là-dessus : réduire de 90 % la sortie des commandes, ce n'est pas réduire de 90 % le coût. C'est surtout sur les articles que la nuance est oubliée.

## Les études ne voient pas d'économie

JetBrains a testé RTK sur 86 tâches avec Claude Code, en comparant à chaque fois la même tâche avec et sans l'outil. Résultat : aucune économie. En effort de raisonnement bas, la facture était même légèrement plus élevée avec RTK, et la qualité restait identique.

Quesma a fait le même exercice sur un benchmark très orienté terminal, avec plus de 1 700 tentatives. Pas d'économie fiable non plus, et un surcoût net avec OpenCode et DeepSeek . Deux tests plus modestes, chez Glia et sur le projet TokenTrial, arrivent à la même conclusion.

Aucune de ces mesures ne montre une baisse claire de la facture. Elles ont toutes leurs limites (modèles, versions, types de tâches), mais elles vont toutes dans le même sens.

## La sortie du terminal pèse peu

Première explication : RTK ne touche qu'une petite partie de ce que lit le modèle. À chaque tour, l'agent envoie aussi le prompt système, les définitions d'outils, les fichiers lus et tout l'historique de la conversation. Une étude sur des centaines de tâches SWE-bench confirme que c'est cette entrée, relue encore et encore, qui fait l'essentiel du coût.

Dans les sessions analysées par Quesma, la sortie du terminal ne représentait qu'environ 7 % de ce que Claude Code envoyait au modèle. Les agents récents sont déjà assez sobres : ils utilisent souvent `head` ou `tail` d'eux-mêmes.

## Le cache change le calcul

Deuxième explication : le prompt caching. Le fournisseur garde en mémoire le début de la requête, tant qu'il ne change pas d'un tour à l'autre. Au tour suivant, cette partie est relue à prix cassé : un dixième du tarif normal chez Anthropic, jusqu'à 95 % de remise chez OpenAI. Seul ce qui a été ajouté à la fin est payé plein pot.

Conséquence : un token retiré par RTK ne fait gagner le plein tarif qu'une seule fois, au moment où la sortie entre dans la conversation. Ensuite, il ne coûtait déjà presque plus rien. Bon point quand même : RTK filtre avant que la sortie entre dans l'historique, donc il ne casse pas le cache.

## Un compteur trop optimiste

Troisième explication : `rtk gain` compare la sortie brute à la sortie filtrée, sans se demander ce que l'agent aurait vraiment lu. Or Claude Code coupe déjà les sorties trop longues. JetBrains a vu un seul fichier volumineux compté comme des centaines de milliers de tokens "économisés", alors que l'agent n'en aurait jamais reçu autant . Sur l'ensemble de leurs tests, le compteur affichait 96 millions de tokens gagnés pendant que la facture montait.

Le compteur ignore aussi la suite. Si la sortie raccourcie ne suffit pas, l'agent relance la commande ou prend un tour de plus, et chaque tour relit tout le contexte. Quesma et TokenTrial ont observé exactement ça : des tours en plus qui effacent l'économie.

## Alors, à quoi ça sert ?

RTK compresse vraiment, et proprement. Il peut avoir du sens si vos commandes crachent des milliers de lignes : gros logs de build, suites de tests énormes. Les sorties sont aussi plus agréables à lire.

Mais si votre objectif est de payer moins, ne vous fiez pas à `rtk gain`. Regardez votre vraie consommation avant et après, sur plusieurs jours. Les études suggèrent que les vrais leviers sont ailleurs : la taille du contexte, le nombre d'outils branchés et la longueur des sessions.

## Sources de l'article.

- [rtk-ai/rtk – README (GitHub)](https://github.com/rtk-ai/rtk)
- [JetBrains AI Blog – Does “rtk” really cut agent tokens by 60–90%? We tested it (juillet 2026)](https://blog.jetbrains.com/ai/2026/07/rtk-claude-code-token-savings/)
- [Quesma – RTK reports huge token savings, but our cost benchmarks disagree (septembre 2026)](https://quesma.com/blog/does-rtk-make-ai-coding-cheaper/)
- [Glia Intelligence – RTK reported 76% less shell output. Did that make Claude Code cheaper to run? (juillet 2026)](https://gliai.com/research/rtk-token-savings-benchmark)
- [TokenTrial – Independent benchmark of rtk v1.1.0 in Claude Code (GitHub, novembre 2026)](https://github.com/rtk-ai/rtk/issues/5087)
- [Bai et al. – How Do AI Agents Spend Your Money? (arXiv 2604.22750)](https://arxiv.org/html/2604.22750v3)
- [Anthropic – Prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching)
- [OpenAI – Prompt caching](https://platform.openai.com/docs/guides/prompt-caching)
- [Claude Code – Tools reference](https://code.claude.com/docs/en/tools-reference)
