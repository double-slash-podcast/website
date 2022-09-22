<script setup>
import {TabGroup, TabList, Tab, TabPanels, TabPanel} from '@headlessui/vue';
const {path} = useRoute();

definePageMeta({
  layout: 'light',
});

const linksTab = ['Description', 'Notes', 'Liens', 'Video', 'Transcription'];

const {data: episode} = await useAsyncData('OneEpisode', () => {
  return queryContent()
    .where({_path: {$eq: path}})
    .findOne();
});
const {data: transription} = await useAsyncData('Transcription', () => {
  return queryContent()
    .where({_path: {$eq: `${path}/transcript`}})
    .findOne();
});
if (!episode) {
  throw createError({statusCode: 404, statusMessage: 'Page Not Found'});
}
</script>

<template>
  <div>
    <Header :height="250">
      <template #baseline>
        <EpisodeHeadings :episode="episode"></EpisodeHeadings>
      </template>
    </Header>
    <div
      class="bg-purple-500 w-[600px] h-[100px] m-auto transform -translate-y-10 grid place-content-center text-white"
    >
      PLAYER
    </div>
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
                'text-white font-bold underline': selected,
                '': !selected,
              }"
              class="flex-1 py-1 rounded-sm marker:px-2 text-haiti underline-offset-4 focus:outline-none"
            >
              {{ link }}
            </button>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel desciption>{{ episode.description }}</TabPanel>
          <TabPanel notes>
            <ContentRenderer :value="episode"> </ContentRenderer>
          </TabPanel>
          <TabPanel links>
            <ul class="space-y-3">
              <li
                v-for="link in episode.links"
                :key="link.title"
                class="hover:underline underline-offset-4"
              >
                <a :href="link.url" target="_blank"
                  ><span
                    class="font-bold capitalize text-purpleDS hover:text-purple-900"
                    >{{ link.title }}</span
                  >
                  -
                  <span class="text-gray-400"
                    >{{ link.url }}
                    <Icon name="ri:external-link-line" size="15"
                  /></span>
                </a>
              </li>
            </ul>
          </TabPanel>
          <TabPanel video>
            <template v-if="episode.videoLink">
              {{ episode.videoLink }}
            </template>
            <template v-else> Pas de video pour cet episode </template>
          </TabPanel>
          <TabPanel v-show="transription" transription>
            {{ transription.results.channels[0].alternatives[0].transcript }}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  </div>
</template>
