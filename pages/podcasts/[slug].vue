<script setup>
import {TabGroup, TabList, Tab, TabPanels, TabPanel} from '@headlessui/vue';
import LiteYouTubeEmbed from 'vue-lite-youtube-embed';
import 'vue-lite-youtube-embed/dist/style.css';
const {path} = useRoute();

const {
  $config: {
    public: {siteUrl},
  },
} = useNuxtApp();

const linksTab = ref(['Description']);
const {data: episode} = await useAsyncData(`${path}`, () => {
  return queryContent()
    .where({_path: {$eq: path}})
    .findOne();
});

const {data: transcription} = await useAsyncData(
  `${path}/transcription`,
  () => {
    return queryContent()
      .where({_path: {$eq: `${path}/transcript`}})
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
if (transcription.value) {
  linksTab.value.push('Transcription');
}

if (!episode) {
  throw createError({statusCode: 404, statusMessage: 'Page Not Found'});
}

useHead({
  title: `//${episode.value.episodeNumber} - ${episode.value.title}`,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: episode.value.description.slice(0, 160),
    },
    {
      hid: 'og:title',
      name: 'og:title',
      content: episode.value.title,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: `https://res.cloudinary.com/doubleslash/image/upload/co_rgb:a700ff,g_east,l_text:mono.otf_120_letter_spacing_-5:%23${episode.value.episodeNumber},x_54/co_rgb:a700ff,g_east,l_text:mono.otf_120_letter_spacing_-5:${episode.value.title},x_54,y_150,w_1000/v1597238012/FACEBOOK_-_OG_Card_RAW_eu5xdv.png`,
    },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: `${episode.value.episodeNumber} - ${episode.value.title}`,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: episode.value.description,
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: `${siteUrl}${path}`,
    },
    {name: 'twitter:site', content: '@doubleslash_dev'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: siteUrl,
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: episode.value.title,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: episode.value.description,
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: `https://res.cloudinary.com/doubleslash/image/upload/co_rgb:a700ff,g_east,l_text:mono.otf_120_letter_spacing_-5:%23${episode.value.episodeNumber},x_54/co_rgb:a700ff,g_east,l_text:mono.otf_120_letter_spacing_-5:${episode.value.title},x_54,y_150,w_1000/v1597238012/FACEBOOK_-_OG_Card_RAW_eu5xdv.png`,
    },
    {
      hid: 'twitter:image:alt',
      property: 'twitter:image:alt',
      content: `${episode.value.episodeNumber} - ${episode.value.title}`,
    },
  ],
});
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
          <TabPanel v-if="episode.links.length > 0" links>
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
          <TabPanel v-if="episode.videoLink" video>
            <LiteYouTubeEmbed :id="episode.videoLink" :title="episode.title" />
          </TabPanel>
          <TabPanel v-if="transcription" transcription>
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
