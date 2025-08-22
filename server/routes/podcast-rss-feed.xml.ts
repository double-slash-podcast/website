/* eslint-disable camelcase */
import crypto from 'node:crypto';
import { H3Event, NodeIncomingMessage } from 'h3';
import RSS from 'rss';
import { useRedis } from '../../app/composables/useRedis';
import estimateMP3DurationAxios from '~/helpers/duration/estimateMP3DurationAxios';

/**
 * get the list of podcasts from content/podcasts
 * @param event
 * @returns array
 */
const getPodcasts = async (event: H3Event | NodeIncomingMessage) => {
  // @ts-ignore
  const docs = await queryCollection(event, 'podcasts').order('id', 'DESC').all();
  return docs
};

const getFeedBase = (infos: PodcastInfosType) =>
// get the options for the podcast iteself
({
  title: infos.title,
  description: infos.description,
  generator: 'double slash',
  site_url: infos.siteUrl,
  feed_url: infos.feedUrl,
  image_url: infos.imageUrl,
  language: infos.language,
  copyright: infos.copyright,
  docs: `https://help.apple.com/itc/podcasts_connect/#/itcb54353390`,
  author: infos.authorName,
  managingEditor: infos.managingEditor,
  webMaster: infos.webMaster,
  categories: [
    infos.category1,
    //   infos.category2,
    //   infos.category3,
  ],
  pubDate: infos.publicationDate,

  ttl: +infos.timeToLive,
  custom_namespaces: {
    itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
    googleplay: 'http://www.google.com/schemas/play-podcasts/1.0',
  },
  custom_elements: [
    { 'itunes:title': infos.title },
    { 'itunes:subtitle': infos.subtitle },
    { 'itunes:summary': infos.summary.substring(0, 3999) },
    { 'itunes:type': infos.podcastType },
    { 'itunes:explicit': infos.explicit },
    { 'itunes:author': infos.authorName },
    {
      'itunes:owner': [
        { 'itunes:name': infos.ownerName },
        { 'itunes:email': infos.ownerEmail },
      ],
    },
    {
      'itunes:image': {
        _attr: {
          href: infos.imageUrl,
        },
      },
    },
    {
      'itunes:category': {
        _attr: {
          text: infos.category1,
        },
      },
    },
    { 'googleplay:author': infos.authorName },
    { 'googleplay:description': infos.summary.substring(0, 999) },
    { 'googleplay:explicit': infos.explicit },
  ],
});

/**
 * get the size of remote file
 * @param url
 * @returns
 */
const getRemoteFileInfos = async (url: string) => {
  const redis = useRedis();
  let estimate;
  // from cache
  const dbEstimate = await redis.get(url);

  if (dbEstimate) {
    return dbEstimate;
  }
  try {
    estimate = await estimateMP3DurationAxios(url);
    // save in DB
    await redis.set(url, estimate);
  } catch (e) {
    throw new Error((e as Error).message);
  }
  return estimate || { duration: undefined, size: undefined };
};

export default defineEventHandler(
  async (event: H3Event | NodeIncomingMessage) => {
    const {
      baseInfos: { siteUrl, prefixAudio },
      podcastInfos,
    } = useAppConfig();

    // podcast items
    const podcasts = await getPodcasts(event);

    // sort by date
    const _podcasts = podcasts.sort((a, b) => {
      const _a = new Date(a.publicationDate);
      const _b = new Date(b.publicationDate);
      if (_a.getTime() > _b.getTime()) return 1;
      if (_a.getTime() < _b.getTime()) return -1;
      return 0;
    })

    // create the rss feed
    const feed = new RSS(getFeedBase(podcastInfos));

    for await (const podcast of await _podcasts) {
      const {
        title,
        subtitle,
        dsSlug,
        path,
        season,
        episodeNumber,
        episodeType,
        publicationDate,
        author,
        explicit,
        categories,
        description,
        guid,
        episodeArtwork,
      } = podcast;

      if (!title) {
        throw new Error(`not found title for episode "${dsSlug}"`);
      }
      if (!dsSlug) {
        throw new Error(`not found dsSlug for episode "${title}"`);
      }
      // remove end slash
      const _path =
        path?.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
      // create url of file
      const url = `${prefixAudio}/${dsSlug}.mp3`;

      const _description = `${description} Retrouvez toutes les notes et les liens de l'épisode sur cette page : ${siteUrl}${_path}/`;

      // generate guid
      const guidFresh = crypto
        .createHash('md5')
        .update(`${dsSlug}`)
        .digest('hex');

      const custom_elements = [
        { 'itunes:title': title },
        { 'itunes:subtitle': subtitle },
        season && { 'itunes:season': season },
        episodeNumber && { 'itunes:episode': episodeNumber },
        { 'itunes:episodeType': episodeType },
        { 'itunes:explicit': explicit },
        { 'itunes:summary': description },
        { 'itunes:author': author },
        {
          'itunes:image': {
            _attr: {
              href: episodeArtwork || podcastInfos.imageUrl,
            },
          },
        },
        { 'googleplay:description': description },
        { 'googleplay:explicit': explicit },
      ];

      // get size of audio files

      const { duration, size } = await getRemoteFileInfos(url);

      if (duration) {
        custom_elements.push({ 'itunes:duration': duration });
      }

      // add an episode item to the feed using the options
      feed.item({
        guid: guid || guidFresh,
        title: title || '',
        date: publicationDate,
        description: _description,
        url: `${siteUrl}${_path}/`,
        categories,
        author,
        custom_elements,
        enclosure: {
          url,
          size,
          type: 'audio/mpeg',
        },
      });
    }

    // return xml type
    return event.res
      .setHeader('content-type', 'application/xml')
      .end(feed.xml());
  },
);
