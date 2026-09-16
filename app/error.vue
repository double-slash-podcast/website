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
          <h1 class="text-5xl text-primary font-brand relative z-1">
            Erreur {{ statusCode }} !
          </h1>
        </template>
      </Header>
      <main class="relative z-10 pb-24 min-h-[350px] px-4">
        <div class="-mt-6 text-center">
          <Icon name="NotFoundIcon" size="250" class="text-secondary" />
        </div>
        <h2 class="mt-16 text-5xl normal-case font-brand text-secondary">
          {{ copy.heading }}
        </h2>
        <p class="my-3 text-xl">{{ copy.description }}</p>
        <NuxtLink class="underline" to="/" @click="goHome">
          <Icon name="mdi:arrow-left" size="20" class="mr-1" />Retourner sur la
          page d'accueil
        </NuxtLink>
      </main>
    </div>
  </NuxtLayout>
</template>
