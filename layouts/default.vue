<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
    <div class="">
      <slot />
    </div>
    <Footer />
    <div class="fixed bottom-0 left-0 right-0 z-50 bg-darkPurple">
      <LazyWrapperPlayer />
    </div>
  </div>
</template>

<script setup>
import LazyWrapperPlayer from '~/components/Player/WrapperPlayer.vue';
const {path} = useRoute();
const {
  baseInfos: {siteUrl, titleDefault, twitterUrl},
} = useAppConfig();

useHead({
  htmlAttrs: {lang: 'fr-FR'},
  link: [
    // {
    //   hid: 'preload-font-mono',
    //   rel: 'preload',
    //   as: 'font',
    //   // i don't know how to import this dynamically
    //   href: '/_nuxt/mono45.90bc7bc8.woff2',
    //   type: 'font/woff2',
    // },
    {
      hid: 'canonical',
      rel: 'canonical',
      href: `${siteUrl}${path}`,
    },
    {rel: 'icon', type: 'image/png', href: '/favicon.png'},
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
