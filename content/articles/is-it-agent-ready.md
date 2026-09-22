---
publicationDate: 2026-09-17
title: 'Agent-ready à 100 %, les checks content qu’on a passés sur Double Slash'
description: 'On a scanné double-slash.dev avec Is It Agent Ready (profil site de contenu, sans auth ni e-commerce). Voici ce que chaque check mesure, quoi mettre en place, et pourquoi ça compte.'
author: {name: '@patrickfaramaz ',url: 'https://twitter.com/patrickfaramaz'}
---

Le web a appris à parler aux navigateurs, puis aux moteurs de recherche. Il doit maintenant parler aux agents IA.

En avril 2026, Cloudflare a lancé [isitagentready.com](https://isitagentready.com/) pour mesurer ça. Le constat global n’est pas flatteur : beaucoup de sites ont un `robots.txt`, très peu déclarent des Content Signals, encore moins servent du Markdown aux agents, et des briques comme l’API Catalog restent rares.

Cloudflare lance évidemment ce service pour mettre en avant que sur le dashboard Cloudflare, plusieurs éléments peuvent se configurer en un clic !

**Point important :** Double Slash est un **site de contenu** (podcast + blog). On s’est donc concentré sur les indicateurs du profil *Content Site*. Pas d’auth / connexion agent, pas d’e-commerce. Ces checks existent dans le scanner (OAuth, Auth.md, x402, UCP, ACP, etc.), mais ils ne correspondent pas à ce qu’on est. Les viser pour “gonfler” un score n’aurait aucun sens.

Le profil content, c’est : `robots.txt`, sitemap, en-têtes `Link`, DNS-AID, négociation Markdown, règles bots IA, Content Signals, API Catalog, WebMCP.

Sur double-slash.dev, on est à **100 %** sur ce périmètre, niveau *Agent-Integrated*. Voici ce que chaque check vérifie, quoi mettre en place, et pourquoi ça compte, d’après le [blog Cloudflare Agent Readiness](https://blog.cloudflare.com/agent-readiness/), le [scan réel](https://isitagentready.com/double-slash.dev?checks=robotsTxt%2Csitemap%2ClinkHeaders%2CdnsAid%2CmarkdownNegotiation%2CrobotsTxtAiRules%2CcontentSignals%2CapiCatalog%2CwebMcp), et les specs associées.

::Image
---

src: /assets/articles/bot-ai-web.jpg
alt: "Agent qui aime un site web"
align: 'center'
---

::


Pour chaque check, on ajoute trois indicateurs (évaluation éditoriale, pas un score officiel du scanner) :

- **Difficulté** : effort pour le mettre en place sur un site content type Nuxt / CMS / CDN.
- **Navigateur** : s’il faut une API navigateur native, ou si c’est purement serveur / DNS / lu par les agents.
- **Maturité** : standard établi, pratique émergente, ou early stage (draft / incubation / adoption encore faible).


## 1. `robots.txt`

**Indicateurs**  
- Difficulté : **facile**  
- Navigateur : **100 % (pas besoin d’API)** (fichier lu par crawlers et agents, pas une API web)  
- Maturité : **établie** (convention depuis 1994, écosystème RFC 9309)

**Ce que le test vérifie**  
Un fichier `/robots.txt` en HTTP 200, en `text/plain`, avec au moins une directive `User-agent:` valide.

**À mettre en place**  
Un `robots.txt` qui dit qui peut crawler quoi, et qui pointe vers la sitemap. Chez nous, il est généré via **nuxt-robots** (le commentaire `# START nuxt-robots` apparaît dans le fichier). Extrait du scan :

```txt
User-agent: *
Allow: /
Content-Signal: ai-train=no, search=yes, ai-input=yes

User-agent: OAI-SearchBot
Allow: /
Content-Signal: ai-train=no, search=yes, ai-input=yes

Sitemap: https://double-slash.dev/sitemap.xml
```

**Pourquoi**  
Pour un agent, le `robots.txt` joue deux rôles : les règles de crawl, et le lien vers les sitemaps. C’est le premier fichier qu’un bot bien élevé lit. Sans lui, pas de politique claire, pas de fil d’Ariane. Cloudflare Radar estime qu’environ 78 % des sites en ont un, mais la plupart sont encore écrits pour Googlebot, pas pour l’IA.

---

## 2. Sitemap

**Indicateurs**  
- Difficulté : **facile**  
- Navigateur : **100 % (pas besoin d’API)**  
- Maturité : **établie** (sitemaps XML classiques, largement supportées par les crawlers)

**Ce que le test vérifie**  
Une sitemap XML joignable, idéalement annoncée par une ligne `Sitemap:` dans le robots (sinon `/sitemap.xml` à la racine). Sur Double Slash : directive trouvée, puis `GET /sitemap.xml` en 200 avec `content-type: text/xml`.

**À mettre en place**  
Une sitemap à jour (épisodes, articles, pages utiles) + la référence dans `robots.txt`. Du XML classique suffit.

**Pourquoi**  
La sitemap donne à l’agent la liste des URLs à lire. Il n’a pas à tout découvrir en suivant des liens dans le HTML. Sur un podcast avec des années d’épisodes et d’articles, ça évite les trous : nouveaux numéros, archives, pages de soutien, index LLM, etc.

---

## 3. Link headers (RFC 8288)

**Indicateurs**  
- Difficulté : **facile à moyenne** (selon que tu touches le serveur, le CDN, ou le framework)  
- Navigateur : **100 % (pas besoin d’API)** (en-tête HTTP. Les agents le lisent sans API JS)  
- Maturité : **établie** (RFC 8288, Web Linking, usage “agent-useful” encore peu répandu)

**Ce que le test vérifie**  
Des en-têtes HTTP `Link:` utiles aux agents : `api-catalog`, `describedby`, `sitemap`, `alternate`, etc.

**À mettre en place**  
Ces liens dans la réponse HTTP, pas seulement dans le `<head>`. Sur la home, le scan lit :

```http
Link: </llms.txt>; rel="describedby"; type="text/markdown"; title="Site index for LLMs",
      </.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json",
      </sitemaps.xml>; rel="sitemap"; type="application/xml",
      </podcast-rss-feed.xml>; rel="alternate"; type="application/rss+xml"; title="Podcast RSS feed"
```

Les relations `describedby`, `api-catalog` et `alternate` sont validées (4 liens au total).

**Pourquoi**  
Contrairement à un lien noyé dans le markup, le header `Link` fait partie de la réponse HTTP. Un agent peut découvrir `llms.txt`, le catalogue et le flux RSS sans télécharger ni parser tout le HTML. Moins de tokens, moins d’erreurs, découverte plus prévisible.

---

## 4. DNS-AID

**Indicateurs**  
- Difficulté : **moyenne** (records DNS + DNSSEC / DS chez le registrar)  
- Navigateur : **100 % (pas besoin d’API)** (découverte DNS avant HTTP)  
- Maturité : **early stage** Internet-Draft individuel ([draft-mozleywilliams-dnsop-dnsaid](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/), maj. mai 2026), pas encore RFC. En dessous, SVCB/HTTPS (RFC 9460) est déjà standard.

**Ce que le test vérifie**  
Des enregistrements DNS SVCB/HTTPS sous `_index._agents.<domaine>` (et éventuellement `_a2a._agents`, `_mcp._agents`), avec DNSSEC si possible. Le scanner passe par DNS-over-HTTPS et regarde notamment le flag `AD=true` (Authenticated Data).

**Ce qu’on a sur Double Slash** (d’après le scan) :

- `_index._agents.double-slash.dev` → SVCB, priorité 1, cible `double-slash.dev`, `alpn=h2,http/1.1`, `port=443`, DNSSEC OK  
- `_a2a._agents.double-slash.dev` → même schéma  
- pas de `_mcp._agents` (NXDOMAIN) cohérent si on n’expose pas de serveur MCP public dédié  
- zone signée côté OVH (`dns17.ovh.net` apparaît dans les réponses DNS)

**À mettre en place**  
Chez le DNS autoritaire :

1. publier au minimum `_index._agents` en mode service (priorité ≥ 1), pas en alias (priorité 0).  
2. inclure `alpn` et `port`.
3. activer DNSSEC et publier le DS chez le registrar, sinon la chaîne de confiance est cassée.

**Pourquoi**  
La résolution DNS est déjà sur le chemin critique. Annoncer que le domaine est agent-aware avant le premier HTTP ne coûte presque rien. Avec DNSSEC, ce n’est plus un simple hint : la réponse est authentifiée. Sans DNSSEC, le record reste au mieux une indication. isitagentready.com en fait un check de discoverability à part entière.

**Pour les nuls**  
Quand tu tapes `double-slash.dev` dans un navigateur, ton appareil pose d’abord une question au DNS : « où est ce site ? ». Le DNS répond avec l’adresse du serveur. DNS-AID réutilise ce même premier échange pour dire aussi : « et au fait, ce domaine est pensé pour les agents IA ».

Concrètement, on ajoute des enregistrements DNS spéciaux, pas sur `double-slash.dev` tout seul, mais sur des noms du type `_index._agents.double-slash.dev`. Ce sont des records SVCB (ou HTTPS) : ils pointent vers le site (`double-slash.dev`), indiquent le port (`443`) et les protocoles HTTP acceptés (`h2`, `http/1.1`). Un agent peut donc découvrir ça **avant** même de faire une requête HTTP vers la homepage.

DNSSEC, c’est la signature de la zone DNS. Sans ça, n’importe qui pourrait théoriquement fabriquer une fausse réponse. Avec DNSSEC (et le DS bien publié chez le registrar), le validateur peut vérifier que la réponse vient bien de la vraie zone. Sur isitagentready.com, le check DNS-AID regarde justement ces records `_agents` et si la réponse est authentifiée (`AD=true`).

En résumé : le DNS sert déjà à trouver le site. DNS-AID y ajoute une petite étiquette « agent-ready », lisible tout de suite, sans scraper la page. C’est encore early stage (Internet-Draft, pas encore une RFC figée), mais le mécanisme en dessous (SVCB/HTTPS) existe déjà.

---

## 5. Négociation Markdown

**Indicateurs**  
- Difficulté : **moyenne** (négociation à l’origine, règles CDN, ou fallback `/index.md`)  
- Navigateur : **100 % (pas besoin d’API)** ce sont les **clients / agents** qui envoient `Accept: text/markdown` (les navigateurs grand public ne le font pas par défaut)  
- Maturité : **émergente** la négociation HTTP est ancienne, “Markdown for Agents” (Cloudflare, fév. 2026) et l’usage réel par les agents sont encore récents (~3,9 % des sites au scan Radar cité par Cloudflare).

**Ce que le test vérifie**  
Quand le client envoie `Accept: text/markdown`, le serveur répond en `text/markdown`. Chez nous : `text/markdown; charset=utf-8` sur la home.

**À mettre en place**  
Deux approches dans l’esprit “Markdown for Agents” :

1. négociation de contenu à l’origine ou au CDN.  
2. fallback URL (comme Cloudflare Docs) : chaque page aussi en `/chemin/index.md`, pour les agents qui ne négocient pas encore correctement.

Cloudflare a mesuré sur un article de blog : 16 180 tokens en HTML contre 3 150 en markdown, environ 80 % de tokens en moins. Leur produit convertit à la volée, on peut aussi le faire soi-même à l’origine. Des agents de coding (Claude Code, OpenCode, Cursor selon leurs docs) envoient déjà cet `Accept` sur une partie de leurs requêtes.

**Pourquoi**  
Le HTML du web “humain” est bruyant : navigation, scripts, layout. Pour un LLM, chaque balise inutile coûte du contexte. Servir le markdown à la source évite une conversion HTML→MD approximative côté agent, réduit le coût et accélère la lecture. Sur un site content, après robots + sitemap, c’est souvent le levier le plus concret.

---

## 6. Règles bots IA dans `robots.txt`

**Indicateurs**  
- Difficulté : **facile**  
- Navigateur : **100 % (pas besoin d’API)**  
- Maturité : **mécanisme établi, usage IA émergent** (même fichier robots, user-agents et politiques IA encore en train de se stabiliser)

**Ce que le test vérifie**  
Des politiques pour des user-agents IA connus (GPTBot, ChatGPT-User, OAI-SearchBot, Google-Extended, Claude, Perplexity, Bytespider, etc.). Une règle explicite ou un wildcard `*` cohérent peut suffire, le scanner remonte aussi quels bots ont une règle nommée.

**Sur Double Slash**  
Règle explicite pour `OAI-SearchBot` (`Allow: /`), plus le wildcard `*` qui autorise le reste. Message du check : *Found rules for AI bots: oai-searchbot*.

**À mettre en place**  
Décider une politique, puis l’écrire : blocs dédiés si les droits diffèrent selon les bots, sinon un `User-agent: *` clair. Le scanner évalue notamment `gptbot`, `chatgpt-user`, `oai-searchbot`, `google-extended`, `ccbot`, `anthropic-ai`, `claude-web`, `bytespider`, `perplexitybot`, etc.

**Pourquoi**  
Les bots IA ne sont pas un Googlebot de plus. Sans règles, on dépend de comportements par défaut opaques. Avec des règles, on peut autoriser la recherche conversationnelle et restreindre un crawler d’entraînement, chemin par chemin. Le `robots.txt` reste le contrat de premier niveau : les bots bien élevés le respectent encore.

---

## 7. Content Signals

**Indicateurs**  
- Difficulté : **facile** (quelques lignes dans `robots.txt`)  
- Navigateur : **100 % (pas besoin d’API)**  
- Maturité : **émergente** déployé en prod via Cloudflare / [contentsignals.org](https://contentsignals.org/). Vocabulaire AI preferences encore en Internet-Draft côté IETF ([draft-ietf-aipref-vocab](https://datatracker.ietf.org/doc/draft-ietf-aipref-vocab/)). Adoption encore faible (~4 % selon Radar / blog Agent Readiness).

**Ce que le test vérifie**  
Des directives `Content-Signal:` dans le `robots.txt` ([contentsignals.org](https://contentsignals.org/), aussi côté Cloudflare AI Crawl Control).

Trois axes indépendants, tels que décrits par Cloudflare :

- `search`: le contenu peut apparaître dans les résultats / la découverte type search  
- `ai-input`: le contenu peut servir d’entrée pour l’inférence, le grounding, l’usage agentique  
- `ai-train`: le contenu peut entrer dans des corpus d’entraînement de modèles  

**Sur Double Slash** (2 directives détectées) :

```txt
Content-Signal: ai-train=no, search=yes, ai-input=yes
```

…sous `User-agent: *` et sous `User-agent: OAI-SearchBot`. En clair : oui à la découverte et à l’usage comme contexte de réponse, non à l’entraînement.

**À mettre en place**  
Ajouter la ligne sous chaque groupe `User-agent` concerné. On peut aussi cibler bot par bot (exemples sur contentsignals.org avec des mixes search/train/input différents).

**Pourquoi**  
`Allow` / `Disallow` répondent à “peux-tu crawler ?”. Content Signals répondent à “à quoi as-tu le droit d’utiliser ce que tu as lu ?”. Pour un podcast ou un média, c’est la nuance qui compte : rester trouvable et citable sans offrir le catalogue comme dataset d’entraînement. Radar place encore cette déclaration autour de ~4 % des sites.

---

## 8. API Catalog (RFC 9727)

**Indicateurs**  
- Difficulté : **facile à moyenne** (un well-known JSON + éventuellement le header `Link`)  
- Navigateur : **100 % (pas besoin d’API)**  
- Maturité : **standard publié, adoption early** [RFC 9727](https://www.rfc-editor.org/rfc/rfc9727.html) (IETF). Cloudflare note que ce genre de signal reste encore extrêmement rare sur le web.

**Ce que le test vérifie**  
`GET /.well-known/api-catalog` qui renvoie un document Linkset (`application/linkset+json`, RFC 9264), conforme à l’esprit de la [RFC 9727](https://www.rfc-editor.org/rfc/rfc9727.html).

**Sur Double Slash**  
Une entrée de linkset, content-type correct. Contenu réel :

```json
{
  "linkset": [
    {
      "anchor": "https://double-slash.dev/",
      "describedby": [
        {
          "href": "https://double-slash.dev/llms.txt",
          "type": "text/markdown",
          "title": "Site index for LLMs"
        }
      ],
      "sitemap": [
        {
          "href": "https://double-slash.dev/sitemap.xml",
          "type": "application/xml"
        }
      ],
      "alternate": [
        {
          "href": "https://double-slash.dev/podcast-rss-feed.xml",
          "type": "application/rss+xml",
          "title": "Podcast RSS feed"
        }
      ]
    }
  ]
}
```

Le même catalogue est aussi annoncé via `Link: … rel="api-catalog"`.

**À mettre en place**  
Servir `/.well-known/api-catalog` en linkset JSON, lister les ressources machine utiles (`llms.txt`, sitemap, RSS…), et idéalement répéter la découverte via le header `Link`.

**Pourquoi**  
Avant d’utiliser une ressource machine, un agent doit savoir qu’elle existe et où elle vit. Sans catalogue, il scrape une homepage ou une doc humaine. Avec un well-known unique, la découverte est automatisable. Ce n’est pas réservé aux plateformes SaaS : un podcast qui expose index LLM + sitemap + RSS a déjà de quoi remplir un linkset utile. Cloudflare note que ce signal reste encore extrêmement rare.

---

## 9. WebMCP

**Indicateurs**  
- Difficulté : **moyenne à élevée** (JS client, schemas d’outils, descriptions pensées pour un agent)  
- Navigateur : **early / expérimental** API native en incubation (W3C WebML CG). Chrome : origin trial / flag (`chrome://flags/#enable-webmcp-testing`, autour de Chrome 149–150+), Edge à partir d’environ 150. Firefox et Safari : pas de support natif annoncé. L’API a aussi bougé (`navigator.modelContext` → `document.modelContext` en 2026).  
- Maturité : **early stage** (incubation, surface encore instable, le scanner isitagentready détecte déjà l’enregistrement impératif)

**Ce que le test vérifie**  
Des tools enregistrés via l’API navigateur WebMCP (`navigator.modelContext` / `document.modelContext`). Pas un fichier `.well-known` : le scanner charge la page et inspecte ce qui est déclaré.

**Sur Double Slash**  
Cinq tools détectés, chacun avec un schéma :

| Tool | Titre | Rôle |
|------|-------|------|
| `search_content` | Rechercher sur Double Slash | chercher épisodes et articles |
| `list_episodes` | Lister les épisodes | du plus récent au plus ancien |
| `open_page` | Ouvrir une page | naviguer vers un chemin du site |
| `play_episode` | Lire un épisode | lancer le player |
| `control_player` | Contrôler le lecteur | play / pause / statut |

**À mettre en place**  
Du JavaScript côté client qui, au chargement, enregistre ces tools auprès de `navigator.modelContext` / `document.modelContext`. Descriptions rédigées pour un agent : verbe d’action, paramètres attendus, périmètre du site. Prévoir un fallback si l’API n’existe pas (la plupart des navigateurs grand public ne l’exposent pas encore).

**Pourquoi**  
Markdown et sitemap, c’est consommer. WebMCP, c’est agir dans le navigateur : chercher, ouvrir, lancer un épisode, contrôler le player, sans sélecteurs CSS fragiles ni scraping du DOM. Pour un podcast, c’est la différence entre une page indexée quelque part et une expérience réellement utilisable par un agent. Ce check est distinct d’une MCP Server Card en `.well-known` (autre check, plutôt niveau suivant).

---

## Tableau récap

| Check | Difficulté | Navigateur | Maturité |
|-------|------------|------------|----------|
| `robots.txt` | Facile | 100 % (pas besoin d’API) | Établie |
| Sitemap | Facile | 100 % (pas besoin d’API) | Établie |
| Link headers | Facile → moyenne | 100 % (pas besoin d’API) | Établie (usage agent encore rare) |
| DNS-AID | Moyenne | 100 % (pas besoin d’API) | Early stage (I-D) |
| Markdown | Moyenne | 100 % (pas besoin d’API) | Émergente |
| Règles bots IA | Facile | 100 % (pas besoin d’API) | Mécanisme établi / usage IA émergent |
| Content Signals | Facile | 100 % (pas besoin d’API) | Émergente |
| API Catalog | Facile → moyenne | 100 % (pas besoin d’API) | RFC publiée / adoption early |
| WebMCP | Moyenne → élevée | Chrome/Edge expérimental | Early stage |

---

## Comment lire le 100 % content

Le 100 % sur le profil *Content Site* signifie que tous les checks sélectionnés pour un site éditorial passent. Pas que tous les standards agent du web sont présents sur le domaine.

Sur un scan plus large, Double Slash est au niveau 4 (*Agent-Integrated*). Le palier 5 (*Agent-Native*) irait chercher Auth.md, MCP Server Card, A2A Agent Card, Agent Skills, utile si on expose un vrai serveur d’outils ou de l’auth agent-to-agent. Pour un podcast + blog, ce n’est pas le premier chantier.

Les checks commerce (x402, UCP, ACP…) restent neutres : ce n’est pas une boutique. Web Bot Auth est surtout pertinent si le site fait lui-même des requêtes signées en tant que bot, pas le cœur d’un site content.

---

## Ordre de mise en place

1. `robots.txt` + sitemap  
2. Content Signals + règles bots IA  
3. Négociation Markdown  
4. En-têtes `Link` + `llms.txt` + API Catalog  
5. DNS-AID + DNSSEC  
6. WebMCP  

---

## En bref

Être agent-ready sur un site de contenu, c’est trois choses mesurables :

1. être trouvable : `robots.txt`, sitemap, `Link`, DNS-AID.
2. être lisible à bas coût, avec une licence d’usage claire : Markdown, Content Signals, règles bots.  
3. être actionnable : API Catalog pour les ressources machine, WebMCP pour les gestes dans le navigateur.

C’est ce que le profil Content de [Is It Agent Ready](https://isitagentready.com/double-slash.dev?checks=robotsTxt%2Csitemap%2ClinkHeaders%2CdnsAid%2CmarkdownNegotiation%2CrobotsTxtAiRules%2CcontentSignals%2CapiCatalog%2CwebMcp) mesure, et ce qu’on a verrouillé à 100 % sur Double Slash, sans tirer vers l’auth ni le commerce.

Une partie des briques (robots, sitemap, Link) est du socle web classique. Une autre (Content Signals, Markdown for Agents, DNS-AID, WebMCP) est encore early : utile à adopter tôt, mais à présenter pour ce qu’elle est, des standards et pratiques en train de se fixer.

---

## Sources

- [blog Cloudflare Agent Readiness](https://blog.cloudflare.com/agent-readiness/)
- [Markdown for Agents](https://blog.cloudflare.com/markdown-for-agents/)
- [RFC 9727](https://www.rfc-editor.org/rfc/rfc9727.html)
- [contentsignals.org](https://contentsignals.org/)
- [draft DNS-AID](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/)
- [Chrome WebMCP – Imperative API](https://developer.chrome.com/docs/ai/webmcp/imperative-api)
- Rapport de scan de `double-slash.dev`
