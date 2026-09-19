<template>
  <div>
    <div class="min-h-screen bg-linear-to-b from-purple-50 to-purple-100">
      <slot />
      <Footer />
      <div class="fixed bottom-0 left-0 right-0 z-50 bg-dark">
        <!-- <LazyWrapperPlayer /> -->
      </div>
    </div>
    <UpButton />
    <ClientOnly>
      <SearchModal />
    </ClientOnly>
  </div>
</template>

<script setup>
// import LazyWrapperPlayer from '~/components/Player/WrapperPlayer.vue';
import UpButton from '~/components/global/UpButton.vue';
import {agentDiscoveryLinks} from '~/utils/agentDiscovery';
const {path} = useRoute();
const {
  baseInfos: {siteUrl, titleDefault, twitterUrl},
} = useAppConfig();

useHead({
  htmlAttrs: {lang: 'fr-FR'},
  link: [
    ...agentDiscoveryLinks.map(link => ({
      rel: link.rel,
      href: link.href,
      ...(link.type ? {type: link.type} : {}),
      ...(link.title ? {title: link.title} : {}),
    })),
    {
      key: 'canonical',
      rel: 'canonical',
      href: `${siteUrl}${path}`,
    },
    {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5'},
  ],
});
useSchemaOrg([
  defineOrganization({
    name: 'Double Slash Dev',
    logo: `${siteUrl}/logo.png`,
    sameAs: [twitterUrl],
  }),
  defineWebSite({
    name: titleDefault,
  }),
  defineWebPage(),
]);
</script>
