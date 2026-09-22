import {describe, expect, test} from 'vitest';
import {
  criticalCssHrefs,
  criticalCssPreloadTags,
  stylesheetHrefsFromHead,
} from '../server/utils/criticalCssPreload';

describe('criticalCssHrefs', () => {
  test('keeps hashed entry and header stylesheets, in either case', () => {
    expect(
      criticalCssHrefs([
        '/_nuxt/entry.Ab12.css',
        '/_nuxt/Header.Cd34.css',
        '/_nuxt/header.Ef56.css',
        '/_nuxt/page.Gh78.css',
        '/_nuxt/assets/main.css',
        '/entry.css',
      ]),
    ).toEqual([
      '/_nuxt/entry.Ab12.css',
      '/_nuxt/Header.Cd34.css',
      '/_nuxt/header.Ef56.css',
    ]);
  });

  test('matches the filename and keeps the original href query', () => {
    expect(criticalCssHrefs(['/_nuxt/entry.Ab12.css?v=1'])).toEqual([
      '/_nuxt/entry.Ab12.css?v=1',
    ]);
  });
});

describe('stylesheetHrefsFromHead', () => {
  test('reads stylesheet hrefs regardless of attribute order', () => {
    const head = [
      '<link rel="stylesheet" href="/_nuxt/entry.Ab12.css">',
      '<link href="/_nuxt/Header.Cd34.css" rel="stylesheet">',
      '<link rel="preload" as="font" href="/fonts/inter.woff2">',
    ].join('');

    expect(stylesheetHrefsFromHead(head)).toEqual([
      '/_nuxt/entry.Ab12.css',
      '/_nuxt/Header.Cd34.css',
    ]);
  });
});

describe('criticalCssPreloadTags', () => {
  test('prepends style preloads for entry and header only', () => {
    const head = [
      '<link rel="stylesheet" href="/_nuxt/entry.Ab12.css">',
      '<link rel="stylesheet" href="/_nuxt/header.Cd34.css">',
      '<link rel="stylesheet" href="/_nuxt/page.Gh78.css">',
    ];

    expect(criticalCssPreloadTags(head)).toEqual([
      '<link rel="preload" as="style" href="/_nuxt/entry.Ab12.css">',
      '<link rel="preload" as="style" href="/_nuxt/header.Cd34.css">',
    ]);
  });

  test('skips a stylesheet that is already preloaded', () => {
    const head = [
      '<link rel="preload" as="style" href="/_nuxt/entry.Ab12.css">',
      '<link rel="stylesheet" href="/_nuxt/entry.Ab12.css">',
    ];

    expect(criticalCssPreloadTags(head)).toEqual([]);
  });

  test('returns nothing when the build has not emitted hashed CSS', () => {
    expect(
      criticalCssPreloadTags([
        '<link rel="stylesheet" href="/_nuxt/assets/main.css">',
      ]),
    ).toEqual([]);
  });
});
