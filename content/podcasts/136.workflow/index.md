---
publicationDate: 17 Jul 2026
status: published
author: Double Slash
categories:
  - Technology
duration: 2637
episodeNumber: 136
episodeType: full
explicit: false
season: 2
dsSlug: DS_136_workflow
title: Workflow SDK, orchestrer des tâches asynchrones sans usine à gaz
subtitle: Un processus intelligent ?
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1784274696/episode/ART_136_zvafgr.png
description: Présentation de Workflow SDK, la librairie Vercel pour orchestrer
  simplement des tâches asynchrones en JavaScript/TypeScript, avec retries,
  pauses, webhooks, actions humaines et observabilité, en partageant son retour
  d’expérience et des cas concrets.
videoLink: r8gtqImnrCk
tags:
  - workflow
  - javascript
  - queue
  - vercel
fileSize: 42197125
---

## Workflow SDK : orchestrer simplement sans réinventer les queues

Comment enchaîner des étapes métier fiables : retry, pause, webhook, reprise après erreur. Sans monter une usine Kafka/Redis à la main ?

Dans cet épisode, Alex partage son retour d’expérience sur **Workflow** (initié par Vercel, utilisable hors Vercel) : séquençage de tâches avec "useWorkflow" / "useStep", sleeps en langage humain, observabilité, et le **World** qui abstrait runtime, queues et persistance. via Self-host ou le dashboard Vercel, des cas concrets (autorépondeurs, paniers abandonnés, agents).

## Workflow SDK

**Workflow SDK** permet de transformer de simples fonctions TypeScript en processus fiables capables de durer dans le temps. Il gère automatiquement les interruptions, les reprises, les nouvelles tentatives en cas d’erreur, la conservation de l’état et le suivi de chaque étape. Cela facilite notamment la création d’automatisations, de traitements asynchrones et d’agents IA, sans avoir à mettre en place soi-même des files d’attente ou une infrastructure complexe.

- https://workflow-sdk.dev

### Code exemple

On ajoute "use workflow" dans une fonction async

```js
import { sleep } from "workflow";
export async function handleUserSignup(email: string) {
  "use workflow";
  const user = await createUser(email);
  await sendWelcomeEmail(user);
  await sleep("5s"); // Pause for 5s - doesn't consume any resources
  await sendOnboardingEmail(user);
  return { userId: user.id, status: "onboarded" };
}
```

Dans les fonctions qui font partie du workflow, on ajoute « use step » pour les rendre gérables par le workflow.

```ts
import { FatalError } from "workflow"
// Our workflow function defined earlier
async function createUser(email: string) {
  "use step";
  console.log(`Creating user with email: ${email}`);
  // Full Node.js access - database calls, APIs, etc.
  return { id: crypto.randomUUID(), email };
}
async function sendWelcomeEmail(user: { id: string; email: string; }) {
  "use step";
  console.log(`Sending welcome email to user: ${user.id}`);
  if (Math.random() < 0.3) {
  // By default, steps will be retried for unhandled errors
   throw new Error("Retryable!");
  }
}
async function sendOnboardingEmail(user: { id: string; email: string}) {
  "use step";
  if (!user.email.includes("@")) {
    // To skip retrying, throw a FatalError instead
    throw new FatalError("Invalid Email");
  }
  console.log(`Sending onboarding email to user: ${user.id}`);
}
```

Bonne écoute !
