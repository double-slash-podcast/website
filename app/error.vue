<script setup lang="ts">
/**
 * Global error view for generate/runtime 404s and unexpected failures.
 */
const props = defineProps<{
  error: {
    statusCode?: number;
    status?: number;
    statusMessage?: string;
  };
}>();

const statusCode = computed(() => getErrorStatusCode(props.error));
const copy = computed(() => getErrorPageCopy(statusCode.value));

useSeoMeta({
  title: () => copy.value.title,
  description: () => copy.value.description,
});

/**
 * Clear the error state and send the user back to the homepage.
 */
function goHome() {
  clearError({redirect: '/'});
}
</script>

<template>
  <NuxtLayout>
    <div>
      <Header>
        <template #title>
          <h1 class="text-5xl md:text-8xl text-primary font-brand relative z-1 text-center">
            Erreur {{ statusCode }} !
          </h1>
        </template>
      </Header>
      <main class="relative z-10 pb-24 min-h-[80vh] px-4 flex flex-col items-center justify-start gap-6">
        <div class="mt-6 text-center">
          <img
            src="/404-mp3-casse.jpg"
            width="512"
            height="512"
            alt="Lecteur MP3 avec un casque cassé dont le fil est coupé"
            class="mx-auto w-full max-w-88 h-auto rounded-3xl"
          />
        </div>
        <h2 class="mt-8 text-3xl md:text-5xl font-brand text-secondary">
          {{ copy.heading }}
        </h2>
        <p class="my-3 text-xl text-gray-600">{{ copy.description }}</p>
        <NuxtLink class="flex items-center justify-center border border-secondary rounded-md bg-secondary text-primary hover:opacity-80 transition-all duration-300 px-4 py-2" to="/" @click="goHome">
          <Icon name="mdi:arrow-left" size="20" class="mr-1" />Retourner sur la
          page d'accueil
        </NuxtLink>
      </main>
    </div>
  </NuxtLayout>
</template>
