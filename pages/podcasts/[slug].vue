<script setup>
import LiteYouTubeEmbed from 'vue-lite-youtube-embed';
import 'vue-lite-youtube-embed/dist/style.css';
const {path} = useRoute();

const linksTab = ref(['Description']);
const selected = ref(linksTab.value[0]);
const {data: episode} = await useAsyncData(
  `${path.replace(/\/+$/, '')}`,
  () => {
    return queryContent()
      .where({_path: {$eq: path.replace(/\/+$/, '')}})
      .findOne();
  },
);

const {data: transcription} = await useAsyncData(
  `${path}/transcription`,
  () => {
    return queryContent()
      .where({_path: {$eq: `${path}transcript`}})
      .findOne();
  },
);

// links
if (episode?.value?.links?.length > 0) {
  linksTab.value.push('Liens');
}

// video
if (episode.value?.videoLink) {
  linksTab.value.push('Video');
}
// transcript
if (transcription.value?.results) {
  linksTab.value.push('Transcription');
}

if (!episode.value) {
  throw createError({statusCode: 404, statusMessage: 'Page Not Found'});
}

useHeadPodcast({episode, path});

useSchemaOrg([defineWebPage()]);
</script>

<template>
  <div>
    <Header :height="180" class="">
      <template #baseline>
        <EpisodeHeadings :episode="episode" level="1"></EpisodeHeadings>
      </template>
      <template #title>
        <Brand class="mt-6" />
      </template>
    </Header>

    <main class="w-full">
      <div class="tabs">
        <nav class="flex mt-4 mb-4 md:mb-4" role="tablist">
          <button
            v-for="link in linksTab"
            :id="`tab-${link}`"
            :key="link"
            role="tab"
            :aria-selected="selected == link"
            :aria-controls="`panel-${link}`"
            :class="{
              'text-purple-700 font-bold underline': selected == link,
            }"
            type="button"
            class="flex-1 pt-2 pb-1 mx-2 text-base md:text-lg marker:px-2 text-haiti underline-offset-4 focus:outline-none"
            @click="() => (selected = link)"
          >
            {{ link }}
          </button>
        </nav>
        <div class="pt-8 border-t-2 border-gray">
          <div
            id="panel-Description"
            :hidden="selected !== 'Description'"
            role="tabpanel"
            aria-labelledby="tab-Description"
          >
            <p class="mb-3">
              {{ episode.description }}
            </p>
            <ContentRenderer :value="episode" class="prose"> </ContentRenderer>
          </div>
          <div
            v-if="episode?.links?.length > 0"
            id="panel-Liens"
            :hidden="selected !== 'Liens'"
            role="tabpanel"
            aria-labelledby="tab-Liens"
          >
            <ul class="space-y-3">
              <li
                v-for="link in episode.links"
                :key="link.title"
                class="hover:underline underline-offset-4"
              >
                <NuxtLink :to="link.url" target="_blank" class="cursor-pointer"
                  ><span
                    class="font-bold text-purpleDs hover:text-purple-900"
                    >{{ link.title }}</span
                  >
                  -
                  <span class="text-gray-400"
                    >{{ link.url }}
                    <Icon name="ri:external-link-line" size="15"
                  /></span>
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div
            v-if="episode?.videoLink"
            id="panel-Video"
            :hidden="selected !== 'Video'"
            role="tabpanel"
            aria-labelledby="tab-Video"
          >
            <LiteYouTubeEmbed :id="episode.videoLink" :title="episode.title" />
          </div>
          <div
            v-if="transcription?.results"
            id="panel-Transcription"
            :hidden="selected !== 'Transcription'"
            role="tabpanel"
            aria-labelledby="tab-Transcription"
          >
            <div class="prose">
              {{
                transcription.results?.channels[0].alternatives[0].transcript
              }}
            </div>
          </div>
        </div>
      </div>
    </main>
    <Wrapper class="my-16">
      <PodcastList dark />
    </Wrapper>
  </div>
</template>
