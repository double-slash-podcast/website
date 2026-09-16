/**
 * Truncate a string so it fits typical meta description length.
 */
const getDescription = (string: string, length: number = 160): string => {
  if (!string) return '';
  const lg = string.length;
  return `${string.substring(0, length)}${lg > 159 ? '...' : ''}`;
};

/**
 * Cloudinary OG card URL with episode number and title burned in.
 */
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
 * Set Unhead SEO, social cards and PodcastEpisode JSON-LD for an episode page.
 */
const useHeadPodcast = ({
  episode,
  path,
}: {
  episode: {value: PodcastsCollectionItem};
  path: string;
}) => {
  const {
    $config: {
      public: {isDev},
    },
  } = useNuxtApp();

  const {
    baseInfos: {siteUrl, prefixAudioDev, prefixAudio, titleDefault},
  } = useAppConfig();

  const getMediaUrl = () =>
    `${isDev ? prefixAudioDev : prefixAudio}/${episode.value?.dsSlug}.mp3`;

  const ogImage = getImgPodcast({
    episodeNumber: +episode.value?.episodeNumber,
    title: episode.value?.title,
  });
  const pageTitle = `Épisode de podcast //${episode.value.episodeNumber} - ${episode.value.title}`;
  const description = getDescription(episode.value?.description);
  const imageAlt = `${episode.value.episodeNumber} - ${episode.value.title}`;

  useSeoMeta({
    title: pageTitle,
    ogTitle: pageTitle,
    description,
    ogDescription: description,
    ogImage,
    ogImageAlt: imageAlt,
    ogUrl: `${siteUrl}${path}`,
    twitterCard: 'summary_large_image',
    twitterSite: '@doubleslash_dev',
    twitterTitle: episode.value.title,
    twitterDescription: episode.value.description,
    twitterImage: ogImage,
    twitterImageAlt: imageAlt,
  });

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: `{ "@context": "http://schema.org/", "@type": "PodcastEpisode",
        "description": ${JSON.stringify(
          episode.value?.description,
        )}, "image": { "@type": "ImageObject",
        "url": "${ogImage}", "height": "630px", "width": "1200px" }, "name":
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
