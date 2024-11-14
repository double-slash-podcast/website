<script setup>
import {animate, scroll} from 'motion';

const bigSlash = ref();
const tinySlash = ref();
onMounted(() => {
  if (bigSlash.value) {
    scroll(animate(bigSlash.value.svg, {x: 0, y: 100}));
  }
  if (tinySlash.value) {
    scroll(animate(tinySlash.value.svg, {x: 0, y: 100}));
  }
});

const {path} = useRoute();

const {
  $config: {
    public: {siteUrl},
  },
} = useNuxtApp();

const {data} = await useAsyncData('lastOne', () => {
  return queryContent('podcasts')
    .where({_extension: {$eq: 'md'}})
    .sort({episodeNumber: -1, $numeric: true})
    .limit(1)
    .find();
});

useHead({
  title: 'Double Slash, le Podcast des développeurs web modernes',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content:
        "Double Slash, c'est le Podcast des développeurs web modernes. Patrick et Alex racontent leurs visions des technos, des libs , des tendances du développement Web.",
    },
    {
      hid: 'og:title',
      name: 'og:title',
      content: 'Double Slash, le Podcast des développeurs web modernes',
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: `${siteUrl}${path}`,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: '/android-chrome-512x512.png',
    },
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: siteUrl,
    },
  ],
});
useSchemaOrg([defineWebPage()]);
</script>

<template>
  <div class="relative bg-haiti">
    <Header class="z-10">
      <template #title>
        <Brand slash />
      </template>
      <template #baseline>
        <h1
          class="relative z-10 mt-2 text-2xl tracking-wider text-center uppercase text-yellowDs font-headings"
        >
          le podcast <br class="sm:hidden" />des developpeurs web
        </h1>
        <p class="font-light text-center text-white">
          par <span class="font-normal">PATRICK FARAMAZ</span> et
          <span class="font-normal">ALEX DUVAL</span>
        </p>
        <EpisodeHeadings :episode="data[0]" class="mt-20"></EpisodeHeadings>
      </template>
    </Header>
    <main class="relative z-10 pb-24">
      <PodcastList class="mb-24" />
      <HeadingsSection title="et en vidéo" class="mb-24">
        <div class="flex items-center justify-center space-x-6">
          <a
            href="https://www.youtube.com/channel/UCp5DGBAX2XNJXeOVAo7bICQ"
            target="_blank"
            title="Chaine YouTube"
          >
            <Icon name="logos:youtube-icon" size="100" />
          </a>
          <a
            href="https://www.twitch.tv/doubleslash_dev"
            target="_blank"
            title="Chaine Twitch"
          >
            <Icon name="fa-brands:twitch" size="90" class="text-[#9146ff]" />
          </a>
        </div>
      </HeadingsSection>

      <HeadingsSection title="Les épisodes précédents" class="mb-8" />
      <LastEpisodes class="mb-8" />
      <div class="mb-24 text-center">
        <nuxt-link
          to="/podcasts/"
          class="flex items-center justify-center text-xl uppercase group text-yellowDs"
          >Voir tous les épisodes
          <Icon
            class="ml-1 transition-all group-hover:translate-x-1"
            name="mdi:arrow-right"
            size="24"
        /></nuxt-link>
      </div>
      <Cohost class="mb-28" />
    </main>
    <LazySlashIcon
      ref="bigSlash"
      size="350"
      class="hidden md:block fixed top-[25%] md:-left-[10%] z-8 opacity-20 md:scale-150"
      inside-class="fill-purple-800"
    />
    <LazySlashIcon
      ref="tinySlash"
      size="200"
      class="hidden md:block fixed top-[10%] right-0 z-8 opacity-20"
      inside-class="fill-purple-800"
    />
  </div>
</template>
