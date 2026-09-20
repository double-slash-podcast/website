<script setup lang="ts">
const bigSlash = ref<{svg: SVGSVGElement} | null>(null);
const tinySlash = ref<{svg: SVGSVGElement} | null>(null);

onMounted(async () => {
  const {animate, scroll} = await import('motion');
  if (bigSlash.value?.svg) {
    scroll(animate(bigSlash.value.svg, {x: 0, y: 100}));
  }
  if (tinySlash.value?.svg) {
    scroll(animate(tinySlash.value.svg, {x: 0, y: 100}));
  }
});

const {path} = useRoute();

const {
  baseInfos: {siteUrl},
} = useAppConfig();

const {data} = await useAsyncData('lastOne', () => {
  return queryCollection('podcasts').order('id', 'DESC').first();
});

useSeoMeta({
  title: 'Double Slash, le podcast sur le développement web en français',
  ogTitle: 'Double Slash, le podcast sur le développement web en français',
  description:
    'Double Slash, le podcast audio et vidéo sur le développement web en français. Retrouvez un épisode deux fois par mois avec Patrick Faramaz et Alex Duval.',
  ogUrl: `${siteUrl}${path}`,
  ogImage: '/android-chrome-512x512.png',
});
useSchemaOrg([defineWebPage()]);
</script>

<template>
  <div class="relative bg-haiti">
    
    <main class="relative z-10 pb-24">
      <PodcastList class="mb-20" />
      <HeadingsSection title="et en vidéo" class="mb-24">
        <div class="flex items-center justify-center mt-6 space-x-12">
          <a
            href="https://www.youtube.com/channel/UCp5DGBAX2XNJXeOVAo7bICQ"
            target="_blank"
            title="Chaine YouTube"
          >
            <Icon name="logos:youtube-icon" size="45" />
          </a>
          <a
            href="https://www.twitch.tv/doubleslash_dev"
            target="_blank"
            title="Chaine Twitch"
          >
            <Icon name="fa-brands:twitch" size="50" class="text-[#9146ff]" />
          </a>
        </div>
      </HeadingsSection>

      <HeadingsSection
        title="Les épisodes précédents"
        class="mb-14"
        level="2"
      />
      <LastEpisodes class="mb-8" />
      <div class="mt-12 mb-24 text-center">
        <nuxt-link
          to="/podcasts/"
          class="flex items-center justify-center text-xl uppercase group text-primary"
          >Voir tous les épisodes
          <Icon
            class="ml-1 transition-all group-hover:translate-x-1"
            name="mdi:arrow-right"
            size="24"
        /></nuxt-link>
      </div>
      <Cohost class="mb-28" />
      <LastArticle class="mb-28" />
      <SocialList class="mb-28" />
    </main>
    <!-- <LazySlashIcon
      ref="bigSlash"
      size="350"
      class="hidden md:block fixed top-[25%] md:left-[-10%] z-8 opacity-20"
      inside-class="fill-purple-800"
    />
    <LazySlashIcon
      ref="tinySlash"
      size="200"
      class="hidden md:block fixed top-[10%] right-0 z-8 opacity-20"
      inside-class="fill-purple-800"
    /> -->
  </div>
</template>
