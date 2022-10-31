<script setup>
import {animate, scroll} from 'motion';
onMounted(() => {
  scroll(animate('#bigSlash', {x: 0, y: 100}));
});

const {data} = await useAsyncData('lastOne', () => {
  return queryContent('podcasts')
    .where({_extension: {$eq: 'md'}})
    .sort({episodeNumber: -1, $numeric: true})
    .limit(1)
    .find();
});

useHead({
  title: 'Double Slash, le Podcast des développeur web modernes',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content:
        "Double Slash, c'est le Podcast des développeur web modernes. Patrick et Alex explore les Web et racontent leurs visions des technos, des lib , des tendances..",
    },
  ],
});
</script>

<template>
  <div class="relative bg-haiti">
    <Icon
      id="bigSlash"
      name="SlashIcon"
      size="350"
      inside-class="fill-purple-800"
      class="fixed top-[25%] md:-left-[10%] z-8 opacity-20 md:scale-150"
    />
    <Icon
      id="tinySlash"
      name="SlashIcon"
      size="200"
      inside-class="fill-purple-800"
      class="fixed top-[10%] right-0 z-8 opacity-20"
    />
    <Header :height="300">
      <template #title>
        <Brand slash />
      </template>
      <template #baseline>
        <h1
          class="text-2xl tracking-wider text-center uppercase text-yellowDs font-headings"
        >
          le podcast <br class="sm:hidden" />des developpeurs web
        </h1>
        <p class="font-light text-center text-white">
          par <span class="font-normal">PATRICK FARAMAZ</span> et
          <span class="font-normal">ALEX DUVAL</span>
        </p>
        <EpisodeHeadings :episode="data[0]"></EpisodeHeadings>
      </template>
    </Header>
    <main class="relative pb-24">
      <PodcastList class="mb-24" />
      <HeadingsSection title="et en vidéo" class="mb-24">
        <div class="flex items-center justify-center space-x-6">
          <a
            href="https://www.youtube.com/channel/UCp5DGBAX2XNJXeOVAo7bICQ"
            target="_blank"
          >
            <Icon name="logos:youtube-icon" size="100" />
          </a>
          <a href="https://www.twitch.tv/doubleslash_dev" target="_blank">
            <Icon name="fa-brands:twitch" size="90" class="text-[#9146ff]" />
          </a>
        </div>
      </HeadingsSection>

      <HeadingsSection title="Les épisodes précédents" class="mb-24">
        <div class="text-center">
          <nuxt-link to="/podcasts" class="text-xs text-white uppercase"
            >Voir tous les épisodes -></nuxt-link
          >
        </div>
      </HeadingsSection>

      <LastEpisodes class="mb-24" />

      <Cohost class="mb-24" />
    </main>
  </div>
</template>
