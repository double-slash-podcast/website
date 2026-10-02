<script setup lang="ts">
import type {CohostLinkType} from '~~/declaration';

/**
 * One host card (photo, name, Twitter), resolved from app config by profile URL.
 * `about` is the article variant: larger photo, website, and intro.
 */
const props = withDefaults(
  defineProps<{
    url: string;
    about?: boolean;
  }>(),
  {
    about: false,
  },
);

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

/**
 * Compare profile URLs ignoring case and a trailing slash.
 */
const sameProfile = (left: string, right: string) =>
  left.trim().replace(/\/+$/, '').toLowerCase() ===
  right.trim().replace(/\/+$/, '').toLowerCase();

const host = computed(() => {
  const cohost = cohosts.find((item) =>
    item.links.some(
      (link) =>
        link.icon === 'mdi:twitter' && sameProfile(link.href, props.url),
    ),
  );
  if (!cohost) {
    return null;
  }
  const website = cohost.links.find((link) => link.icon === 'iconoir:www');
  return {
    ...cohost,
    twitter: twitterOf(cohost.links),
    website: website ? {href: website.href, label: website.title} : undefined,
  };
});
</script>

<template>
  <div v-if="host">
    <div
      class="flex items-start flex-wrap md:flex-nowrap gap-4 bg-purple-200/40 border border-solid border-purple-300/40 p-2 rounded-xl"
    >
      <AppImg
        :src="`${siteUrl}${host.picture}`"
        :alt="host.alt"
        :width="about ? 80 : 64"
        :height="about ? 80 : 64"
        :sizes="about ? '80px' : '64px'"
        loading="lazy"
        decoding="async"
        class="shrink-0 rounded-lg"
        :class="about ? 'h-34 w-34' : 'h-16 w-16'"
      />
      <div class="uppercase">
        <p class="mt-1 mb-0! font-sans font-semibold text-base text-gray-800">
          {{ host.firstName }} {{ host.lastName }}
        </p>
        <div class="flex items-center gap-4">
          <NuxtLink
          v-if="host.twitter"
          :to="host.twitter.href"
          target="_blank"
          :title="host.twitter.label"
          class="mt-1 block font-sans text-sm normal-case text-gray-800 underline-offset-4 hover:text-secondary hover:underline"
          >
          {{ host.twitter.label }}
        </NuxtLink>
        <NuxtLink
        v-if="about && host.website"
        :to="host.website.href"
        target="_blank"
        :title="host.website.label"
        class="mt-1 block font-sans text-sm normal-case text-gray-800 underline-offset-4 hover:text-secondary hover:underline"
        >
        {{ host.website.label }}
        </NuxtLink>
        </div>
        <p
          v-if="about && host.intro"
          class="mt-3 mb-0! font-sans text-sm font-normal normal-case leading-5 text-gray-700"
        >
          {{ host.intro }}
        </p>
      </div>
    </div>
  </div>
</template>
