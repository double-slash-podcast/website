/* eslint-disable camelcase */
import crypto from 'crypto';
import RSS from 'rss';
import axios from 'axios';
import {globalInfos} from '../../config';
import {serverQueryContent} from '#content/server';
import {PodcastGlobalInfosType} from '~/declaration';

export default defineEventHandler(async event => {
  const _globalInfos: PodcastGlobalInfosType = globalInfos;

  const docs = await serverQueryContent(event)
    .sort({date: -1})
    .where({_partial: false})
    .find();
  const podcasts = docs.filter(doc => doc?._path?.includes('/podcasts'));

  // construct the xml

  // generate RSS
  // get the options for the podcast iteself
  const feedOptions = {
    title: _globalInfos.title,
    description: _globalInfos.description,
    site_url: _globalInfos.siteUrl,
    feed_url: _globalInfos.feedUrl,
    image_url: _globalInfos.imageUrl,
    language: _globalInfos.language,
    copyright: _globalInfos.copyright,
    docs: `https://help.apple.com/itc/podcasts_connect/#/itcb54353390`,
    author: _globalInfos.authorName,
    managingEditor: _globalInfos.managingEditor,
    webMaster: _globalInfos.webMaster,
    categories: [
      _globalInfos.category1,
      //   _globalInfos.category2,
      //   _globalInfos.category3,
    ],
    pubDate: _globalInfos.publicationDate,

    ttl: +_globalInfos.timeToLive,
    // generator: `https://github.com/miller-productions/gatsby-plugin-podcast-feed-mdx`,
    custom_namespaces: {
      itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
      googleplay: 'http://www.google.com/schemas/play-podcasts/1.0',
    },
    custom_elements: [
      {'itunes:title': _globalInfos.title},
      {'itunes:subtitle': _globalInfos.subtitle},
      {'itunes:summary': _globalInfos.summary.substring(0, 3999)},
      {'itunes:type': _globalInfos.podcastType},
      {'itunes:explicit': _globalInfos.explicit},
      {'itunes:author': _globalInfos.authorName},
      {
        'itunes:owner': [
          {'itunes:name': _globalInfos.ownerName},
          {'itunes:email': _globalInfos.ownerEmail},
        ],
      },
      {
        'itunes:image': {
          _attr: {
            href: _globalInfos.imageUrl,
          },
        },
      },
      {
        'itunes:category': {
          _attr: {
            text: _globalInfos.category1,
          },
        },
      },
      //   {
      //     "itunes:category": [
      //       {
      //         _attr: {
      //           text: _globalInfos.category2,
      //         },
      //       },
      //       {
      //         "itunes:category": {
      //           _attr: {
      //             text: _globalInfos.subCategory2,
      //           },
      //         },
      //       },
      //     ],
      //   },
      //   {
      //     "itunes:category": [
      //       {
      //         _attr: {
      //           text: _globalInfos.category3,
      //         },
      //       },
      //       {
      //         "itunes:category": {
      //           _attr: {
      //             text: _globalInfos.subCategory3,
      //           },
      //         },
      //       },
      //     ],
      //   },
      {'googleplay:author': _globalInfos.authorName},
      {'googleplay:description': _globalInfos.summary.substring(0, 999)},
      {'googleplay:explicit': _globalInfos.explicit},
    ],
  };

  // create the rss feed
  const feed = new RSS(feedOptions);

  for await (const podcast of podcasts) {
    const {
      title,
      subtitle,
      url,
      duration,
      //   excerpt,
      slug,
      season,
      episodeNumber,
      episodeType,
      publicationDate,
      author,
      explicit,
      categories,
    } = podcast;

    if (!url) {
      throw new Error(`not found url for episode "${title}"`);
    }

    let response;
    try {
      response = await axios.head(url);
    } catch (e) {
      throw new Error(e.message);
    }
    const {headers} = response;
    const size = +headers['content-length'];

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
            href: feedOptions.image_url,
          },
        },
      },
      // { "googleplay:description": summary },
      {'googleplay:explicit': explicit},
    ];

    if (duration) {
      custom_elements.push({'itunes:duration': duration});
    }
    // add an episode item to the feed using the options
    feed.item({
      guid,
      title: title || '',
      date: publicationDate,
      description: 'html',
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
