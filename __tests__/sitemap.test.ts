import {describe, expect, test} from 'vitest';
import fs from 'fs';
import path from 'path';
import {SitemapStream, streamToPromise} from 'sitemap';
import {
  STATIC_SITEMAP_PATHS,
  collectSitemapUrls,
  toCanonicalPath,
  toSitemapLastmod,
} from '../app/utils/sitemap';

describe('toCanonicalPath', () => {
  test('adds a trailing slash to collection paths', () => {
    expect(toCanonicalPath('/podcasts/news-sept26-rc2')).toBe(
      '/podcasts/news-sept26-rc2/',
    );
    expect(toCanonicalPath('/articles/openclaw-vs-hermes/')).toBe(
      '/articles/openclaw-vs-hermes/',
    );
  });

  test('strips the /custom prefix used by the custom collection', () => {
    expect(toCanonicalPath('/custom/nous-soutenir')).toBe('/nous-soutenir/');
    expect(toCanonicalPath('/custom')).toBe('/');
  });
});

describe('toSitemapLastmod', () => {
  test('returns a YYYY-MM-DD date from content publication dates', () => {
    expect(toSitemapLastmod('2026-09-16')).toBe('2026-09-16');
    expect(toSitemapLastmod(new Date('2026-04-16T12:00:00.000Z'))).toBe(
      '2026-04-16',
    );
  });

  test('returns undefined when the date is missing or invalid', () => {
    expect(toSitemapLastmod(undefined)).toBeUndefined();
    expect(toSitemapLastmod('not-a-date')).toBeUndefined();
  });
});

describe('collectSitemapUrls', () => {
  test('lists static listings then published canonical content URLs', () => {
    const urls = collectSitemapUrls({
      podcasts: [
        {
          path: '/podcasts/news-sept26-rc2',
          publicationDate: '2026-09-16',
          status: 'published',
        },
        {
          path: '/podcasts/draft-episode',
          publicationDate: '2026-09-17',
          status: 'draft',
        },
        {
          path: '/podcasts/scheduled-episode',
          publicationDate: '2026-10-01',
          status: 'scheduled',
        },
      ],
      articles: [
        {
          path: '/articles/openclaw-vs-hermes',
          publicationDate: '2026-04-16',
        },
      ],
      custom: [{path: '/custom/nous-soutenir'}],
    });

    expect(urls.slice(0, STATIC_SITEMAP_PATHS.length)).toEqual(
      STATIC_SITEMAP_PATHS.map(url => ({url})),
    );
    expect(urls).toContainEqual({
      url: '/podcasts/news-sept26-rc2/',
      lastmod: '2026-09-16',
    });
    expect(urls).toContainEqual({
      url: '/articles/openclaw-vs-hermes/',
      lastmod: '2026-04-16',
    });
    expect(urls).toContainEqual({url: '/nous-soutenir/'});
    expect(urls.map(entry => entry.url)).not.toContain(
      '/podcasts/draft-episode/',
    );
    expect(urls.map(entry => entry.url)).not.toContain(
      '/podcasts/scheduled-episode/',
    );
    expect(STATIC_SITEMAP_PATHS).not.toContain('/search/');
  });

  test('serializes sitemaps.org urlset with absolute loc and lastmod', async () => {
    const sitemap = new SitemapStream({hostname: 'https://double-slash.dev'});
    for (const entry of collectSitemapUrls({
      podcasts: [
        {
          path: '/podcasts/news-sept26-rc2',
          publicationDate: '2026-09-16',
          status: 'published',
        },
      ],
      articles: [],
      custom: [],
    })) {
      sitemap.write(entry);
    }
    sitemap.end();

    const xml = (await streamToPromise(sitemap)).toString();

    expect(xml).toContain(
      'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    );
    expect(xml).toContain('<loc>https://double-slash.dev/</loc>');
    expect(xml).toContain(
      '<loc>https://double-slash.dev/podcasts/news-sept26-rc2/</loc>',
    );
    expect(xml).toMatch(/<lastmod>2026-09-16T00:00:00\.000Z<\/lastmod>/);
  });
});

describe('sitemap wiring', () => {
  test('robots.txt and prerender target the canonical /sitemap.xml', () => {
    const src = fs.readFileSync(
      path.join(process.cwd(), 'nuxt.config.ts'),
      'utf8',
    );

    expect(src).toContain("sitemap: 'https://double-slash.dev/sitemap.xml'");
    expect(src).toContain("'/sitemap.xml'");
  });
});
