<script setup lang="ts">
/**
 * Episode credits: every host from app config, one card each.
 */
const {cohosts} = useAppConfig();

const hosts = computed(() =>
  cohosts.flatMap((cohost) => {
    if (cohost.onlyArticle) {
      return [];
    }
    const url = cohost.links.find((link) => link.icon === 'mdi:twitter')?.href;
    return url ? [{key: cohost.lastName, url}] : [];
  }),
);
</script>

<template>
  <div>
    <h3 class="mt-2!">Podcast présenté par :</h3>
    <ul class="not-prose mt-4 flex flex-wrap gap-5">
      <li
        v-for="host in hosts"
        :key="host.key"
        class="min-w-full md:min-w-68"
      >
        <Author :url="host.url" />
      </li>
    </ul>
  </div>
</template>
