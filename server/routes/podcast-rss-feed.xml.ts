/* eslint-disable camelcase */
import crypto from 'crypto';
import {H3Event, NodeIncomingMessage} from 'h3';
import RSS from 'rss';
import {ParsedContent} from '@nuxt/content/dist/runtime/types';
import estimateMP3DurationAxios from '~/helpers/duration/estimateMP3DurationAxios';
import {serverQueryContent} from '#content/server';
import DB from '~/cache/index';

/**
 * get the list of podcasts from content/podcasts
 * @param event
 * @returns array
 */
const getPodcasts = async (event: H3Event | NodeIncomingMessage) => {
  const docs = await serverQueryContent(event)
    .sort({publicationDate: 1})
    .where({_partial: false})
    .find();

  // test add transcript in doc
  //   docs.forEach(doc => {
  //     const {_path} = doc;
  //     if (_path?.includes('/transcript')) {
  //       // find name of dir
  //       const [, , name] = _path.split('/');
  //       if (name) {
  //         // find index of podcast
  //         const i = docs.findIndex(
  //           d =>
  //             d._path?.includes(`/${name}`) && !d._path?.includes('/transcript'),
  //         );
  //         if (i) {
  //           // add transcript in doc podcast
  //           docs[i].transcript = doc;
  //         }
  //       }
  //     }
  //   });

  // filter for keep only podcast content
  return docs
    .filter(doc => doc?._path?.includes('/podcasts'))
    .filter(doc => !doc?._path?.includes('/transcript'));
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
const getRemoteFileInfos = async (url: string) => {
  let estimate;
  // from cache
  const dbEstimate = DB.get(url);
  if (dbEstimate) {
    return dbEstimate;
  }
  try {
    estimate = await estimateMP3DurationAxios(url);
    // save in DB
    DB.set(url, estimate);
  } catch (e) {
    throw new Error((e as Error).message);
  }
  return estimate || {duration: undefined, size: undefined};
};

export default defineEventHandler(
  async (event: H3Event | NodeIncomingMessage) => {
    // global info from config app
    const config = useRuntimeConfig();
    const {podcastInfos, siteUrl, prefixAudio} = config.public;

    // podcast items
    const podcasts = await getPodcasts(event);

    // create the rss feed
    const feed = new RSS(getFeedBase(podcastInfos));

    for await (const podcast of await podcasts) {
      const {
        title,
        subtitle,
        dsSlug,
        _path,
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
      }: ParsedContent = podcast;

      if (!title) {
        throw new Error(`not found title for episode "${dsSlug}"`);
      }
      if (!dsSlug) {
        throw new Error(`not found dsSlug for episode "${title}"`);
      }
      // remove end slash
      const path =
        _path?.charAt(_path.length - 1) === '/' ? _path.slice(0, -1) : _path;
      // create url of file
      const url = `${prefixAudio}/${dsSlug}.mp3`;

      // generate guid
      const guidFresh = crypto
        .createHash('md5')
        .update(`${dsSlug}`)
        .digest('hex');

      const custom_elements = [
        {'itunes:title': title},
        {'itunes:subtitle': subtitle},
        season && {'itunes:season': season},
        episodeNumber && {'itunes:episode': episodeNumber},
        {'itunes:episodeType': episodeType},
        {'itunes:explicit': explicit},
        {'itunes:summary': description},
        {'itunes:author': author},
        {
          'itunes:image': {
            _attr: {
              href: episodeArtwork || podcastInfos.imageUrl,
            },
          },
        },
        {'googleplay:description': description},
        {'googleplay:explicit': explicit},
      ];

      // get size of audio files

      const {duration, size} = await getRemoteFileInfos(url);

      if (duration) {
        // duration is * 2, don't find why !
        custom_elements.push({'itunes:duration': Math.round(duration / 2)});
      }

      // add an episode item to the feed using the options
      feed.item({
        guid: guid || guidFresh,
        title: title || '',
        date: publicationDate,
        description,
        url: `${siteUrl}${path}`,
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
