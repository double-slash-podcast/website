<script setup>
import {TabGroup, TabList, Tab, TabPanels, TabPanel} from '@headlessui/vue';
import LiteYouTubeEmbed from 'vue-lite-youtube-embed';
import 'vue-lite-youtube-embed/dist/style.css';
const {path} = useRoute();

const linksTab = ref(['Description']);
const {data: episode} = await useAsyncData('episode', () => {
  return queryContent()
    .where({_path: {$eq: path}})
    .findOne();
});

const {data: transcription} = await useAsyncData('transcription', () => {
  return queryContent()
    .where({_path: {$eq: `${path}/transcript`}})
    .findOne();
});

// links
if (episode?.value?.links?.length > 0) {
  linksTab.value.push('Liens');
}

// video
if (episode.value?.videoLink) {
  linksTab.value.push('Video');
}

// transcript
if (transcription.value) {
  linksTab.value.push('Transcription');
}

if (!episode) {
  throw createError({statusCode: 404, statusMessage: 'Page Not Found'});
}
</script>

<template>
  <div>
    <Header :height="180" class="">
      <template #baseline>
        <EpisodeHeadings :episode="episode" level="1"></EpisodeHeadings>
      </template>
      <template #title>
        <Brand />
      </template>
    </Header>

    <main class="w-full">
      <!-- navbart TAB -->
      <TabGroup>
        <TabList class="flex mb-8">
          <Tab
            v-for="link in linksTab"
            v-slot="{selected}"
            :key="link"
            as="template"
          >
            <button
              :class="{
                'text-purple-700 font-bold underline': selected,
              }"
              class="flex-1 py-1 mx-2 text-xl marker:px-2 text-haiti underline-offset-4 focus:outline-none"
            >
              {{ link }}
            </button>
          </Tab>
        </TabList>
        <TabPanels class="pt-4 border-t-2 border-gray">
          <TabPanel notes>
            {{ episode.description }}
            <ContentRenderer :value="episode" class="prose"> </ContentRenderer>
          </TabPanel>
          <TabPanel links>
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
          </TabPanel>
          <TabPanel video>
            <template v-if="episode.videoLink">
              <LiteYouTubeEmbed
                :id="episode.videoLink"
                :title="episode.title"
              />
            </template>
            <template v-else> Pas de video pour cet episode </template>
          </TabPanel>
          <TabPanel v-show="transcription" transcription>
            <div class="prose">
              {{ transcription.results.channels[0].alternatives[0].transcript }}
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>

    <Wrapper class="my-16">
      <PodcastList dark />
    </Wrapper>
  </div>
</template>
