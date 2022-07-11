/* eslint-disable n/handle-callback-err */
import {fileURLToPath} from 'node:url';
import fs from 'fs';
import path from 'path';
import readMarkdown from 'read-markdown';
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

// old RSS file
const data = fs.readFileSync(
  path.join(__dirname, '/assets/old-podcast-feed.xml'),
);

const result = toJson(data);
const feed: Feed = JSON.parse(result);
const {item} = feed.rss.channel;
// create table for test each
const tableToCompare: string[][] = item.map(i => [i.title, i.guid.$t]);

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

  // get all markdown podcast files
  const podcasts = await readMarkdown(
    path.join(__dirname, '../content/podcasts', '/**/*.md'),
    {html: false},
  );

  test.each(tableToCompare)('%s => %s', (title, guid) => {
    // search podcast with this guid
    const keyFind: string | undefined = Object.keys(podcasts).find(
      (k: string) => podcasts[k].data.guid === guid,
    );
    const fromMD = keyFind ? podcasts[keyFind] : undefined;
    expect(fromMD).toBeDefined();
    // title is equal ?
    expect(fromMD.data.title).toEqual(title);
  });
});
