// import {fileURLToPath} from 'node:url';
import fs from 'fs';
import path from 'path';
// import {setup, $fetch} from '@nuxt/test-utils-edge';
import {XMLParser} from 'fast-xml-parser';
import {describe, expect, test} from 'vitest';

type GuidNode =
  | string
  | {
      '#text'?: string;
      '@_isPermaLink'?: string;
      $t?: string; // legacy shape fallback
      _?: string; // legacy shape fallback
    };

type Item = {title?: string; guid?: GuidNode | null};

type Feed = {
  rss?: {
    channel?: {
      item?: Item | Item[];
    };
  };
};

// read + parse RSS (pure JS, no native addon)
const xml = fs.readFileSync(
  path.resolve(__dirname, 'assets', 'old-podcast-feed.xml'),
  'utf-8',
);
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  trimValues: true,
});
const feed: Feed = parser.parse(xml);

// helpers
function normalizeItems(f: Feed): Item[] {
  const items = f.rss?.channel?.item;
  if (!items) return [];
  return Array.isArray(items) ? items : [items];
}

function getGuidValue(guid: GuidNode | null | undefined): string | undefined {
  if (!guid) return undefined;
  if (typeof guid === 'string') return guid.trim() || undefined;
  if (typeof guid === 'object') {
    const t =
      (guid['#text'] ?? guid.$t ?? guid._ ?? '').toString().trim() || undefined;
    return t;
  }
  return undefined;
}

describe('compare guid in markdown file episode and the old feed', () => {
  //   await setup({
  //     rootDir: fileURLToPath(new URL('..', import.meta.url)),
  //     server: true,
  //   });

  test('feed content in ok', () => {
    expect(feed.rss).toBeDefined();
    expect(feed.rss?.channel).toBeDefined();
    expect(feed.rss?.channel?.item).toBeDefined();
  });

  test('all items have non-empty title and guid', () => {
    const items = normalizeItems(feed);
    expect(items.length).toBeGreaterThan(0);

    for (const it of items) {
      expect(typeof it.title).toBe('string');
      expect((it.title || '').trim().length).toBeGreaterThan(0);

      const guid = getGuidValue(it.guid);
      expect(typeof guid).toBe('string');
      expect((guid || '').length).toBeGreaterThan(0);
    }
  });

  test('guids are unique', () => {
    const items = normalizeItems(feed);
    const guids = items
      .map(i => getGuidValue(i.guid))
      .filter((g): g is string => !!g);
    const unique = new Set(guids);
    expect(unique.size).toBe(guids.length);
  });

  test('tableToCompare is built as [title, guid] pairs', () => {
    const items = normalizeItems(feed);
    const tableToCompare: string[][] = items
      .map(i => {
        const g = getGuidValue(i.guid);
        const t = (i.title || '').trim();
        return g && t ? [t, g] : null;
      })
      .filter((x): x is string[] => Array.isArray(x));

    expect(tableToCompare.length).toBeGreaterThan(0);
    for (const row of tableToCompare) {
      expect(row).toHaveLength(2);
      expect(typeof row[0]).toBe('string');
      expect(typeof row[1]).toBe('string');
      expect(row[0].length).toBeGreaterThan(0);
      expect(row[1].length).toBeGreaterThan(0);
    }
  });

  test('getGuidValue normalizes different guid shapes', () => {
    expect(getGuidValue('abc')).toBe('abc');
    expect(getGuidValue({'#text': 'xyz'})).toBe('xyz');
    expect(getGuidValue({$t: 'legacy'})).toBe('legacy');
    expect(getGuidValue({_: 'inner'})).toBe('inner');
    expect(getGuidValue({'#text': ' v ', '@_isPermaLink': 'false'})).toBe('v');
    expect(getGuidValue(undefined)).toBeUndefined();
    expect(getGuidValue(null)).toBeUndefined();
  });
});
