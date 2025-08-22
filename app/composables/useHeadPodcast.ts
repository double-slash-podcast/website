
const getDescription = (string: string, length: number = 160): string => {
  if (!string) return '';
  const lg = string.length;
  return `${string.substring(0, length)}${lg > 159 ? '...' : ''}`;
};

const getImgPodcast = ({
  episodeNumber,
  title,
}: {
  episodeNumber: number;
  title: string;
}): string =>
  `https://res.cloudinary.com/doubleslash/image/upload/co_rgb:a700ff,g_east,l_text:mono.otf_120_letter_spacing_-5:%23${episodeNumber},x_54/co_rgb:a700ff,g_east,l_text:mono.otf_120_letter_spacing_-5:${encodeURIComponent(
    title,
  )},x_54,y_150,w_1000/v1597238012/FACEBOOK_-_OG_Card_RAW_eu5xdv.png`;
/**
 * compose head for page podcast
 *
 * @param episode {object}
 * @param path {string}
 */
const useHeadPodcast = ({
  episode,
  path,
}: {
  episode: { value: PodcastContentType };
  path: string;
}) => {
  const {
    $config: {
      public: { isDev },
    },
  } = useNuxtApp();

  const {
    baseInfos: { siteUrl, prefixAudioDev, prefixAudio, titleDefault },
  } = useAppConfig();

  const getMediaUrl = () =>
    `${isDev ? prefixAudioDev : prefixAudio}/${episode.value?.dsSlug}.mp3`;

  useSeoMeta({
    title: `Épisode de podcast //${episode.value.episodeNumber} - ${episode.value.title}`,
    ogTitle: `Épisode de podcast //${episode.value.episodeNumber} - ${episode.value.title}`,
    description: getDescription(episode.value?.description),
    ogDescription: getDescription(episode.value?.description),
    ogImage: getImgPodcast({
      episodeNumber: episode.value?.episodeNumber,
      title: episode.value?.title,
    }),
    twitterCard: 'summary_large_image',
  });

  useHead({
    // title: `//${episode.value.episodeNumber} - ${episode.value.title}`,
    meta: [
      //   {
      //     hid: 'description',
      //     name: 'description',
      //     content: getDescription(episode.value?.description),
      //   },
      //   {
      //     hid: 'og:title',
      //     name: 'og:title',
      //     content: episode.value.title,
      //   },
      //   {
      //     hid: 'og:image',
      //     property: 'og:image',
      //     content: getImgPodcast({
      //       episodeNumber: episode.value?.episodeNumber,
      //       title: episode.value?.title,
      //     }),
      //   },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: `${episode.value.episodeNumber} - ${episode.value.title}`,
      },
      //   {
      //     hid: 'og:description',
      //     property: 'og:description',
      //     content: episode.value.description,
      //   },
      {
        hid: 'og:url',
        property: 'og:url',
        content: `${siteUrl}${path}`,
      },
      { name: 'twitter:site', content: '@doubleslash_dev' },
      //   {name: 'twitter:card', content: 'summary_large_image'},
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
        content: getImgPodcast({
          episodeNumber: episode.value?.episodeNumber,
          title: episode.value?.title,
        }),
      },
      {
        hid: 'twitter:image:alt',
        property: 'twitter:image:alt',
        content: `${episode.value.episodeNumber} - ${episode.value.title}`,
      },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: `{ "@context": "http://schema.org/", "@type": "PodcastEpisode",
        "description": ${JSON.stringify(
          episode.value?.description,
        )}, "image": { "@type": "ImageObject",
        "url": "${getImgPodcast({
          episodeNumber: episode.value?.episodeNumber,
          title: episode.value?.title,
        })}", "height": "630px", "width": "1200px" }, "name":
        ${JSON.stringify(
          episode.value?.title,
        )}, "url": "${siteUrl}${path}", "about": { "@id":
        "https://double-slash.dev/#identity" }, "isPartOf": { "@id":
        "https://double-slash.dev/#website" }, "publisher": { "@id":
        "https://double-slash.dev/#identity" }, "associatedMedia": { "@type":
        "MediaObject", "contentUrl": "${getMediaUrl()}"}, "partOfSeries": {
        "@type": "PodcastSeries", "name": ${JSON.stringify(
          titleDefault,
        )}, "url": "${siteUrl}" } }`,
      },
    ],
  });
};

export default useHeadPodcast;
