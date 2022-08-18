/* eslint-disable camelcase */
import crypto from 'crypto';
import {CompatibilityEvent} from 'h3';
import RSS from 'rss';
// import axios from 'axios';
import {ParsedContent} from '@nuxt/content/dist/runtime/types';
import {serverQueryContent} from '#content/server';
import {PodcastGlobalInfosType} from '~/declaration';

/**
 * get the list of podcasts from content/podcasts
 * @param event
 * @returns array
 */
const getPodcasts = async (event: CompatibilityEvent) => {
  const docs = await serverQueryContent(event)
    .sort({date: -1})
    .where({_partial: false})
    .find();
  // filter for keep only podcast content
  return docs.filter(doc => doc?._path?.includes('/podcasts'));
};

const getFeedBase = (infos: PodcastGlobalInfosType) =>
  // get the options for the podcast iteself
  ({
    title: infos.title,
    description: infos.description,
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
      {'itunes:title': infos.title},
      {'itunes:subtitle': infos.subtitle},
      {'itunes:summary': infos.summary.substring(0, 3999)},
      {'itunes:type': infos.podcastType},
      {'itunes:explicit': infos.explicit},
      {'itunes:author': infos.authorName},
      {
        'itunes:owner': [
          {'itunes:name': infos.ownerName},
          {'itunes:email': infos.ownerEmail},
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
      {'googleplay:author': infos.authorName},
      {'googleplay:description': infos.summary.substring(0, 999)},
      {'googleplay:explicit': infos.explicit},
    ],
  });

/**
 * get the size of remote file
 * @param url
 * @returns
 */
// const getRemoteFileSize = async (url: string) => {
//   let response;
//   try {
//     response = await axios.head(url);
//   } catch (e) {
//     throw new Error((e as Error).message);
//   }
//   const {headers} = response;
//   return +headers['content-length'];
// };

export default defineEventHandler(async (event: CompatibilityEvent) => {
  // global info from config app
  const config = useRuntimeConfig();
  const infos: PodcastGlobalInfosType = config.public.globalInfos;

  // podcast items
  const podcasts = getPodcasts(event);

  // create the rss feed
  const feed = new RSS(getFeedBase(infos));

  for await (const podcast of await podcasts) {
    const {
      title,
      subtitle,
      url,
      duration,
      body,
      slug,
      season,
      episodeNumber,
      episodeType,
      publicationDate,
      author,
      explicit,
      categories,
    }: ParsedContent = podcast;

    if (!url && !title) {
      throw new Error(`not found url for episode "${title}"`);
    }

    // guid
    // #TODO use function in option
    const guid = crypto.createHash('md5').update(`${title}`).digest('hex');

    const custom_elements = [
      {'itunes:title': title},
      {'itunes:subtitle': subtitle},
      season && {'itunes:season': season},
      episodeNumber && {'itunes:episode': episodeNumber},
      {'itunes:episodeType': episodeType},
      {'itunes:explicit': explicit},
      // { "itunes:summary": summary },
      {'itunes:author': author},
      {
        'itunes:image': {
          _attr: {
            href: infos.imageUrl,
          },
        },
      },
      // { "googleplay:description": summary },
      {'googleplay:explicit': explicit},
    ];

    if (duration) {
      custom_elements.push({'itunes:duration': duration});
    }

    // get size of audio files
    // const size = await getRemoteFileSize(url);
    const size = 0;
    if (body && body?.children?.length) {
      // render body
      //   const description = h(ContentRenderer, {value: body});
    }

    // add an episode item to the feed using the options
    feed.item({
      guid,
      title: title || '',
      date: publicationDate,
      description: body,
      url: slug,
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
  return event.res.setHeader('content-type', 'application/xml').end(feed.xml());
});
