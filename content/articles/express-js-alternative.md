---
publicationDate: 2024-01-08
title: 6 alternatives à ExpressJS, la 4ème va vous surprendre !
description: ExpressJS a été créé en 2010 par TJ Holowaychuk. Il a été conçu pour être un "framework" minimaliste et flexible pour les applications web et mobiles.ExpressJS a été créé pour faciliter la vie des développeurs avec des fonctions simples pour créer un serveur web.
author: {name: '@patrickfaramaz ',url: 'https://twitter.com/patrickfaramaz'}
---

ExpressJS a été créé en 2010 par TJ Holowaychuk. Un peu plus d'un an après la création de NodeJS. Il a été conçu pour être un "framework" minimaliste et flexible pour les applications web et mobiles.

NodeJS étant un peu rude à utiliser aux premiers abords avec les streams, pipes et autres callbacks.

ExpressJS a été créé pour faciliter la vie des développeurs avec des fonctions simples pour créer un serveur web.

Exemple de code ExpressJS :

```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

Aujourd'hui encore, 13 ans après sa première version, il est encore le framework Node.js le plus populaire malgré les reproches qu'on lui fait :

- lenteur
- plus maintenu
- pas de support natif de TypeScript

Qu'est ce qui fait que la plupart des développeurs Node.js utilisent encore ExpressJS en 2023 ?

- la facilité ? il est simple et rapide à prendre en main
- les formations ? il est enseigné dans la plupart des formations javascript
- les ressources ? il y a beaucoup de tuto disponible sur internet

On ne sait pas vraiment. Malgré cela, il existe aujourd'hui des vraies alternatives à ExpressJS.
Nous allons vous présenter 6 alternatives à ExpressJS.

## Les frameworks minimalistes

### 1. H3

Crée par l'équipe UnJS (derrière NuxtJS), H3 est un framework minimaliste qui se veut simple et rapide à prendre en main. Un peu comme ExpressJS.

Il est parfaitement portable en étant compatible en environnement serverless, workers et NodeJS.

Exemple de code H3 :

```javascript
import { createApp, eventHandler, toNodeListener } from "h3";
import { listen } from "listhen";

const app = createApp();
app.use(
  "/",
  eventHandler(() => "Hello world!"),
);

listen(toNodeListener(app));
```

Plus d'infos sur H3 : <https://unjs.io/packages/h3>

### 2. Fastify

Fastify est un framework Node.js qui se veut rapide et léger. De base il est ultraléger et ne contient que le strict minimum.

La vitesse est son point fort et sa plus grande force.

Il est très facilement extensible avec des plugins, des hooks et des décorateurs. Il offre une très bonne expérience de développement.

Exemple de code Fastify :

```javascript
// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// Declare a route
fastify.get('/', function handler (request, reply) {
  reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
```

Plus d'infos sur Fastify : <https://fastify.dev/>

### 3. Hono

Hono est un framework minimaliste qui se veut rapide et léger.

Il a l'avantage d'être compatible avec une multitude d'environnements : Cloudflare, Fastly, Deno, Bun, AWS, Lagon, etc.

Il dispose de toutes les fonctionnalités de base : routing, middleware, etc. et il supporte nativement TypeScript.

Exemple de code Hono :

```javascript
import { Hono } from 'hono'
const app = new Hono()

app.get('/', (c) => c.text('Hono!'))

export default app
```

Plus d'infos sur Hono : <https://hono.dev/>

## Les frameworks plus complets


### 4. Nitro

Nitro est un framework 100% Typescript. Tout comme H3, il nous vient de l'écosystème UnJS.

Il embarque un tas de fonctionnalité pour vous simplifier la vie : routing basé sur les fichiers, auto-import, système de cache, middleware, plugins, etc.

Tout comme H3, il est compatible avec les environnements serverless, workers et NodeJS.

C'est notre framework préféré dans cette liste !

Vidéo de Daniel Roe sur Nitro. Construire un framework React avec Nitro durant une présentation : https://www.youtube.com/watch?v=hdHLU0qHKhA

Exemple de code Nitro :

```javascript
// api/hello.ts
export default defineEventHandler(() => {
  return { hello: 'world' }
})
```

Plus d'infos sur Nitro : <https://unjs.io/packages/nitro>


### 5. Nest JS

NestJS est un framework Node.js qui se veut robuste et performant. Il supporte nativement TypeScript. Avec lui vous pouvez faire de l'orienté objet, du fonctionnal et de la programmation réactive.

Par défaut, il utilise ExpressJS sous le capot mais il est possible de le faire fonctionner avec Fastify.

Pour être honnête, Nest JS est plus compliqué à prendre en main mais il est beaucoup plus puissant.

Exemple de code NestJS :

```javascript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, world!';
  }
}
```

Plus d'infos sur NestJS : <https://nestjs.com/>

### 6. AdonisJS

AdonisJS est un framework très complet qui vous permet de créer toutes sortes de projets, de l'application web complète à l'API.

Il est basé lui aussi sur TypeScript. Il offre tout un tas de fonctionnalités de base comme les controllers, les middlewares, les gestions des fichiers en uploads, les cookies, etc.

Il embarque aussi un ORM pour gérer vos bases de données.

C'est un framework très complet équivalent à Laravel pour PHP.

Exemple de code AdonisJS :

```javascript
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', () => {
  return 'Hello world'
})
```

Plus d'infos sur AdonisJS : <https://adonisjs.com/>

## A voir aussi

-
- Koa : <https://koajs.com/>
- Sails : <https://sailsjs.com/>
- Hapi : <https://hapi.dev/>
- Derby : <https://derbyjs.com/>

Pour conclure, même si ExpressJS est encore une solution viable pour développer une petite API, il existe aujourd'hui des alternatives plus modernes et tout aussi simples à prendre en main.
