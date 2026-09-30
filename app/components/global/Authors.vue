<script setup lang="ts">
import type {CohostLinkType} from '~~/declaration';

/**
 * Episode credits: hosts stacked from app config (photo, name, Twitter).
 */
const {
  baseInfos: {siteUrl},
  cohosts,
} = useAppConfig();

/**
 * Twitter profile for a host, with the @handle taken from the profile URL.
 */
const twitterOf = (links: CohostLinkType[]) => {
  const twitter = links.find((link) => link.icon === 'mdi:twitter');
  if (!twitter) {
    return undefined;
  }
  const handle = twitter.href.split('/').filter(Boolean).pop();
  return {href: twitter.href, label: handle ? `@${handle}` : twitter.title};
};

const hosts = computed(() =>
  cohosts.map((cohost) => ({
    ...cohost,
    twitter: twitterOf(cohost.links),
  })),
);
</script>

<template>
  <div>
    <h3 class="mt-2!">Podcast présenté par :</h3>
    <ul class="not-prose mt-4 flex flex-wrap gap-5">
      <li
        v-for="host in hosts"
        :key="host.lastName"
        class="flex items-start gap-4 bg-purple-200/40 border border-solid border-purple-300/40 p-2 rounded-lg min-w-full md:min-w-68"
      >
        <AppImg
          :src="`${siteUrl}${host.picture}`"
          :alt="host.alt"
          width="64"
          height="64"
          sizes="64px"
          loading="lazy"
          decoding="async"
          class="h-16 w-16 shrink-0 rounded-lg "
        />
        <div class="uppercase">
          <p class="mt-1 mb-0! font-sans font-semibold text-sm text-gray-800">{{ host.firstName }} {{ host.lastName }}</p>
          <NuxtLink
            v-if="host.twitter"
            :to="host.twitter.href"
            target="_blank"
            :title="host.twitter.label"
            class="mt-1 inline-block font-sans text-sm normal-case text-gray-800 underline-offset-4 hover:text-secondary hover:underline"
          >
            {{ host.twitter.label }}
          </NuxtLink>
        </div>
      </li>
    </ul>
  </div>
</template>
