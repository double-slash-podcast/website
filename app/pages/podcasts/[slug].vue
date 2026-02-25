<script setup lang="ts">
import type {PodcastContentType} from '~~/declaration';

const {path} = useRoute();
const pathStr = path.replace(/\/+$/, '');
/** tab links */
const linksTab = ref(['Description']);
const selected = ref(linksTab.value[0]);

// get episode data
const {data} = await useAsyncData(`episode-${pathStr}`, () =>
  queryCollection('podcasts').path(pathStr).first(),
);

if (!data.value?.title) {
  // redirect to 404 page
  navigateTo('/_404');
}

// disable transcription for the moment
// const {data: transcription} = await useAsyncData(
//   `${path}/transcription`,
//   () => {
//     return queryContent()
//       .where({_path: {$eq: `${path}transcript`}})
//       .findOne();
//   },
// );

// links
if (data.value?.links && data.value?.links?.length > 0) {
  linksTab.value.push('Liens');
}

// video
if (data.value?.videoLink) {
  linksTab.value.push('Video');
}

// transcript
// if (transcription.value?.results) {
//   linksTab.value.push('Transcription');
// }

useHeadPodcast({episode: data as {value: PodcastContentType}, path});

useSchemaOrg([
  defineWebPage(),
  defineArticle({
    '@type': 'TechArticle',
    datePublished: data.value?.publicationDate,
    description: data.value?.description,
  }),
]);
</script>

<template>
  <div>
    <Header class="">
      <template #baseline>
        <span class="block h-16" />
        <EpisodeHead v-if="data" :episode="data" />
      </template>
      <template #title>
        <Brand class="mt-6" />
      </template>
    </Header>

    <main class="w-full px-4">
      <div class="tabs">
        <nav class="flex" role="tablist">
          <button
            v-for="link in linksTab"
            :id="`tab-${link}`"
            :key="link"
            role="tab"
            :aria-selected="selected == link"
            :aria-controls="`panel-${link}`"
            :class="{
              'text-purple-700 focus:text-purple-900  after:bg-secondary bg-purple-100/40':
                selected == link,
              'text-gray-600 after:bg-gray-200': selected !== link,
            }"
            type="button"
            class="flex flex-col items-center flex-1 pt-4 text-base after:h-0.5 md:text-lg underline-offset-4 transition-color focus:text-gray-900 focus:outline-hidden after:w-full after:mt-3"
            @click="() => (selected = link)"
          >
            {{ link === 'Video' ? 'Vidéo' : link }}
          </button>
        </nav>
        <div class="pt-8">
          <div
            v-if="data"
            id="panel-Description"
            :hidden="selected !== 'Description'"
            role="tabpanel"
            aria-labelledby="tab-Description"
          >
            <p class="mb-3">
              {{ data.description }}
            </p>
            <!-- error 500 with this component -->
            <ContentRenderer
              v-if="data"
              :value="data"
              class="max-w-full prose"
            />
            <div class="prose">
              <Authors />
              <Sponsor :with-list="false" />
            </div>
          </div>
          <div
            v-if="data?.links && data?.links?.length > 0"
            id="panel-Liens"
            :hidden="selected !== 'Liens'"
            role="tabpanel"
            aria-labelledby="tab-Liens"
          >
            <ul class="space-y-3">
              <li
                v-for="link in data.links"
                :key="link.title"
                class="hover:underline underline-offset-4"
              >
                <NuxtLink :to="link.url" target="_blank" class="cursor-pointer"
                  ><span
                    class="font-bold text-secondary hover:text-purple-900"
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
            v-if="data?.videoLink"
            id="panel-Video"
            :hidden="selected !== 'Video'"
            role="tabpanel"
            aria-labelledby="tab-Video"
          >
            <VideoPlayer
              :video-link="
                typeof data.videoLink === 'string' ? data.videoLink : ''
              "
              :video-title="data.title"
            />
          </div>
          <!-- <div
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
          </div> -->
        </div>
      </div>
      <ShareBtn :text="data?.title || ''" />
    </main>
    <Wrapper class="my-16">
      <PodcastList dark />
    </Wrapper>
  </div>
</template>
