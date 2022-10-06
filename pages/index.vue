<script setup>
import {animate, scroll} from 'motion';
onMounted(() => {
  scroll(animate('#bigSlash', {x: 0, y: 100}));
});
</script>

<template>
  <div class="relative">
    <Icon
      id="bigSlash"
      name="SlashIcon"
      size="400"
      insideClass="fill-purple-800"
      class="fixed top-[25%] md:-left-[10%] z-8 opacity-20 md:scale-150"
    />
    <Icon
      id="tinySlash"
      name="SlashIcon"
      size="200"
      insideClass="fill-purple-800"
      class="hidden md:fixed top-[10%] right-0 z-8 opacity-20"
    />
    <Header :height="400">
      <template #title>
        <Brand slash />
      </template>
      <template #baseline>
        <h2>le podcast <br class="sm:hidden" />des developpeurs web</h2>
        <p class="font-light text-center text-white">
          par <span class="font-normal">PATRICK FARAMAZ</span> et
          <span class="font-normal">ALEX DUVAL</span>
        </p>
      </template>

      <template #player> <p class="text-white">mon player</p> </template>
    </Header>
    <main class="relative">
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

      <HeadingsSection title="tous les épisodes précedents" class="mb-24">
        <div class="text-center">
          <nuxt-link to="#" class="text-xs text-white uppercase"
            >Voir tous les épisodes -></nuxt-link
          >
        </div>
      </HeadingsSection>

      <LastEpisodes class="mb-24" />

      <Cohost></Cohost>
    </main>
  </div>
</template>
