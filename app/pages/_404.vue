<script setup>
// setResponseStatus(404);
</script>

<template>
  <Header>
    <template #title>
      <h1 class="text-5xl text-primary font-brand">Erreur 404 !</h1>
    </template>
  </Header>
  <main class="relative z-10 pb-24 min-h-[350px] px-4">
    <div class="-mt-6 text-center">
      <Icon name="NotFoundIcon" size="250" class="text-secondary" />
    </div>
    <h2 class="mt-16 text-5xl normal-case font-brand text-secondary">
      Page non trouvée !
    </h2>
    <p class="my-3 text-xl">
      Désolé, la page que vous cherchez ne semble pas/plus exister.
    </p>
    <nuxt-link class="underline" href="/"
      ><Icon name="mdi:arrow-left" size="20" class="mr-1" />Retourner sur la
      page d'accueil</nuxt-link
    >
  </main>
</template>
