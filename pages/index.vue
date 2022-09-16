<template>
  <div>
    <Header :height="500">
      <template #baseline>
        <h2>le podcast <br class="sm:hidden" />des developpeurs web</h2>
        <p class="font-light text-center text-white">
          par <span class="font-normal">PATRICK FARAMAZ</span> et
          <span class="font-normal">ALEX DUVAL</span>
        </p>
      </template>

      <template #player> <p class="text-white">mon player</p> </template>
    </Header>

    <main>
      <PodcastList />
      <HeadingsSection title="et en vidéo">
        <div class="flex justify-center">
          <a
            href="https://www.youtube.com/channel/UCp5DGBAX2XNJXeOVAo7bICQ"
            target="_blank"
          >
            <Icon name="logos:youtube-icon" size="100" />
          </a>
        </div>
      </HeadingsSection>
      <HeadingsSection title="tous les épisodes précedents">
        <div class="text-center">
          <nuxt-link to="#" class="text-xs text-white uppercase"
            >Voir tous les épisodes -></nuxt-link
          >
        </div>
      </HeadingsSection>

      <LastEpisodes />
    </main>
  </div>
</template>
