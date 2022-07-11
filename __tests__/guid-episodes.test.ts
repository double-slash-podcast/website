/* eslint-disable n/handle-callback-err */
import {fileURLToPath} from 'node:url';
import fs from 'fs';
import path from 'path';
import {setup} from '@nuxt/test-utils-edge';
import {toJson} from 'xml2json';
import {describe, expect, test} from 'vitest';

type Feed = {
  rss: {
    channel: {
      item: [{title: string; guid: {$t: string}}];
    };
  };
};

const data = fs.readFileSync(
  path.join(__dirname, '/assets/old-podcast-feed.xml'),
);

const result = toJson(data);
const feed: Feed = JSON.parse(result);
// const {item} = feed.rss.channel;
// const tableToCompare: string[][] = item.map(i => [i.title, i.guid.$t]);

describe('compare guid in markdown file episode and the old feed', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('..', import.meta.url)),
    server: true,
  });

  test('feed content in ok', () => {
    expect(feed.rss).toBeDefined();
    expect(feed.rss.channel).toBeDefined();
    expect(feed.rss.channel.item).toBeDefined();
  });

  // test blocked because Nuxt content don't work here.
  //   const content = await queryContent('/podcasts').find();
  //   console.log(content);

  //       .where({title})
  //       .findOne();
  //   test.each(tableToCompare)('title : %s, guid: %s', async (title, guid) => {
  //     const episode = await queryContent({sources: ['/episodes']}, this)
  //       .where({title})
  //       .findOne();
  //     // console.log(episode);

  //     expect(episode).toBeDefined();
  //     expect(episode.guid).toEqual(guid);
  //   });
});
