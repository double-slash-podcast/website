/* eslint-disable n/handle-callback-err */
// import {fileURLToPath} from 'node:url';
import fs from 'fs';
import path from 'path';
// import {setup, $fetch} from '@nuxt/test-utils-edge';
import {toJson} from 'xml2json';
import {describe, expect, test} from 'vitest';

// type FrontmatterPodcastType = {title: string; guid: string};
type Feed = {
  rss: {
    channel: {
      item: [{title: string; guid: {$t: string}}];
    };
  };
};

// old RSS file
const data = fs.readFileSync(
  path.join(__dirname, '/assets/old-podcast-feed.xml'),
);

const result = toJson(data);
const feed: Feed = JSON.parse(result);
// const {item} = feed.rss.channel;
// create table for test each
// const tableToCompare: string[][] = item.map(i => [i.title, i.guid.$t]);

describe('compare guid in markdown file episode and the old feed', () => {
  //   await setup({
  //     rootDir: fileURLToPath(new URL('..', import.meta.url)),
  //     server: true,
  //   });

  test('feed content in ok', () => {
    expect(feed.rss).toBeDefined();
    expect(feed.rss.channel).toBeDefined();
    expect(feed.rss.channel.item).toBeDefined();
  });

  //   let podcasts: FrontmatterPodcastType[];
  //   test('get content', async () => {
  //     // get all markdown podcast files
  //     podcasts = await $fetch('/api/_content/query?without=body}');
  //   });

  //   test.each(tableToCompare)('%s => %s', (title, guid) => {
  //     // search podcast with this guid
  //     const keyFind: FrontmatterPodcastType | undefined = podcasts.find(
  //       p => p.guid === guid,
  //     );

  //     expect(keyFind).toBeDefined();
  //     // title is equal ?
  //     expect(keyFind?.title).toEqual(title);
  //   });
});
