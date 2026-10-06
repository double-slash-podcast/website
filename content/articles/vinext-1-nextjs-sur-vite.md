---
title: "Vinext 1.0 : faire tourner une app Next.js sur Vite, pour de vrai"
description: "vinext, la réimplémentation de Next.js sur Vite signée Cloudflare, passe en 1.0 : Pages Router, ISR, cache warming. Ce qui change et quand l'adopter."
author: {name: '@patrickfaramaz ',url: 'https://twitter.com/patrickfaramaz'}
publicationDate: 2026-10-06
---

En février, Cloudflare racontait comment un ingénieur et un modèle d'IA avaient reconstruit Next.js sur Vite en une semaine, pour environ 1 100 dollars de tokens. Le projet s'appelait vinext (prononcez « vee-next »), et beaucoup d'entre nous l'ont rangé dans la case « démo IA impressionnante, à revoir plus tard ».

Plus tard, c'est maintenant. Le 28 septembre 2026, Cloudflare a annoncé vinext 1.0, suivi d'un premier patch le 1er octobre. Le discours a changé : moins de prouesse IA, plus de compatibilité, de cache et de tests. Le projet devient sérieux et non plus une annonce marketing.

## Ce qui change par rapport à Next.js

Si vous avez déjà déployé du Next.js ailleurs que chez Vercel, vous connaissez le problème. L'outillage est maison, et pour tourner sur Cloudflare, Netlify ou AWS Lambda, il faut remodeler la sortie de `next build`. C'est le rôle d'OpenNext, et Cloudflare, qui y contribue, reconnaît que c'est fragile : chaque version de Next.js peut tout casser.

Sans parler d'un déploiement full Node.js sur plusieurs conteneurs où le partage de cache (ISR) est littéralement un enfer.

Vinext prend le problème par l'autre bout. Ce n'est pas un adaptateur, c'est une réimplémentation de l'API de Next.js sous forme de plugin Vite. Vos dossiers `app/` ou `pages/`, vos composants et la plupart des imports `next/*` restent en place. C'est Vite qui gère le dev et le build : les plugins Vite marchent, mais les plugins webpack et les réglages internes du build Next.js ne se reportent pas automatiquement. Si une app s’appuie sur `@svgr/webpack` ou un loader custom, il faut l’équivalent Vite (`vite-plugin-svgr`, etc.)

Côté déploiement, Cloudflare Workers est la cible principale, avec une sortie Node standalone (`output: "standalone"`) et des adaptateurs pour les autres hébergeurs. Bonus appréciable : en dev, votre code serveur peut tourner dans le runtime de Workers, avec accès direct aux services Cloudflare, là où `next dev` reste cantonné à Node.

Sur les perfs, les seuls chiffres publiés datent de février : un build environ 4 fois plus rapide et un bundle client environ 57 % plus léger que Next.js, mesurés sur une seule app de test. Cloudflare lui-même invite à y voir une tendance, et je n'ai pas trouvé de benchmark mis à jour pour la 1.0.

Tout ne passe pas. Vinext vise l'API stable de Next.js 16, pas chaque feature expérimentale. Cache Components et Partial Prerendering restent incomplets, et l'optimisation des images et des fonts au build ne reproduit pas tout ce que fait Next.js. Sur Cache Components, Cloudflare assume : la plupart des équipes interrogées ne s'en servaient pas, donc le support de `"use cache"` reste limité. Côté compatibilité, le dashboard public, qui fait tourner chaque nuit les tests de Next.js contre vinext, affichait au 6 octobre 99,7 % de réussite sur les fonctionnalités que vinext dit supporter.

## Le Pages Router, la demande que Cloudflare a entendue

Au lancement, le Pages Router existait mais faisait figure de parent pauvre. En mars, quand un utilisateur demande le support d'une vieille API du Pages Router, un mainteneur admet qu'une bonne partie des fonctionnalités de ce router ne marche pas encore correctement.

Ça compte, parce que les applis Pages Router sont souvent anciennes et grosses, et que les migrer vers l'App Router n'a rien d'un après-midi de refacto. Cloudflare le reconnaît dans l'annonce : beaucoup de clients restent attachés au Pages Router, et l'équipe ne voulait pas d'un outil réservé aux dernières features de l'App Router.

La 1.0 supporte donc les deux routers, et même les applis qui mélangent les deux, avec middleware, API routes et navigation côté client. Tout n'est pas parfait : des bugs Pages Router remontent encore, et certains ont été corrigés dès le premier patch. Mais on est loin de l'état de mars.

L'autre grosse demande de la communauté, c'était le pré-rendu au build. La 1.0 y répond aussi, et ça nous amène à l'ISR.

## L'ISR, expliqué simplement

L'ISR (Incremental Static Regeneration), c'est un compromis entre site statique et rendu à chaque requête. Une page est générée une fois, stockée, puis servie depuis le cache. Quand elle devient périmée, le visiteur reçoit encore l'ancienne version pendant qu'une nouvelle est générée en arrière-plan. Vous pouvez aussi forcer la régénération à la demande, par exemple après une mise à jour dans votre CMS. C'est l'une des forces de Next.js !

Vinext reprend exactement les conventions de Next.js. Avec le Pages Router, la durée de vie se règle dans `getStaticProps()` :

```tsx
// pages/index.tsx
export async function getStaticProps() {
  return {
    props: { generatedAt: new Date().toISOString() },
    revalidate: 60,
  };
}

export default function Page({ generatedAt }: { generatedAt: string }) {
  return <p>Generated at {generatedAt}</p>;
}
```

Ici, la page est régénérée au plus toutes les 60 secondes. Côté App Router, on retrouve `revalidatePath()` et `revalidateTag()` pour invalider à la demande.

Où est stocké ce cache ? Il passe par des adaptateurs, et sur Cloudflare la doc recommande le Workers Response Store. Un piège à connaître : avec cet adaptateur, `res.revalidate()` du Pages Router n'invalide pas encore les pages stockées. L'appel peut aboutir sans changer ce que voient les visiteurs ; l'ISR sur intervalle continue de marcher.

Ce que la 1.0 ajoute, c'est d'abord le pré-rendu au build. En février, une page n'entrait dans le cache qu'après sa première visite. Désormais, vinext peut générer les pages à l'avance, pour les deux routers, et même produire un site entièrement statique.

Et puis il y a le cache warming, l'idée la plus intéressante de la release. Ce n'est pas automatique : au deploy, vinext peut uploader la nouvelle version à 0 % de trafic, remplir le cache avec les pages éligibles, puis basculer les visiteurs dessus. Un second mode s'appuie sur vos analytics Cloudflare pour prioriser les plus visitées. Le build reste rapide, et le cache est chaud dès la mise en ligne.

## Alors, pourquoi passer à vinext ?

Le cas évident : vous voulez faire tourner une app Next.js sur Cloudflare Workers sans passer par OpenNext. Cloudflare recommande d'ailleurs vinext comme méthode par défaut pour ça. Vous gagnez l'outillage Vite, les services Cloudflare dès le dev et un cache pensé pour l'edge.

Tester ne coûte pas cher. `npx vinext check` scanne votre projet, puis `npx vinext init` ajoute la config sans toucher à vos scripts Next.js, et vous pouvez faire tourner les deux en parallèle pour comparer.

Les limites sont réelles, cela dit. Malgré le « 1.0 », la doc Cloudflare parle encore de beta. Si votre appli repose sur Cache Components, PPR ou l'optimisation d'images au build, restez sur Next.js pour l'instant. Et un bon score de tests ne garantit pas que vos cas limites à vous sont couverts.

Mon avis : pour un projet Next.js « classique » destiné à Cloudflare, que ce soit en Pages Router ou en App Router, vinext 1.0 mérite un essai sur une branche. Pour un projet qui suit Next.js au plus près de ses nouveautés, ou qui tourne très bien chez Vercel, je ne vois pas de raison urgente de bouger. Lancez `vinext check`, regardez le dashboard de compatibilité, et décidez avec vos propres données.

## Sources

1. [Next.js applications, powered by Vite: introducing Vinext 1.0 - Cloudflare Blog (28 septembre 2026)](https://blog.cloudflare.com/vinext-nextjs-on-vite/)
2. [How we rebuilt Next.js with AI in one week - Cloudflare Blog (24 février 2026)](https://blog.cloudflare.com/vinext/)
3. [Differences from Next.js - documentation vinext](https://vinext.dev/docs/reference/differences)
4. [Caching on Cloudflare - documentation vinext](https://vinext.dev/docs/guides/caching)
5. [Next.js compatibility dashboard - vinext.dev](https://vinext.dev/compatibility)
6. [getInitialProps support - issue GitHub cloudflare/vinext](https://github.com/cloudflare/vinext/issues/675)
7. [Release vinext@1.0.1 - GitHub](https://github.com/cloudflare/vinext/releases/tag/vinext%401.0.1)
8. [Next.js - Cloudflare Workers docs](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)
9. [Migrate a Next.js app - documentation vinext](https://vinext.dev/docs/getting-started/migrating)
