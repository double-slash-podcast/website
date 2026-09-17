import {describe, expect, test} from 'vitest';
import {
  collectMatchedTags,
  formatSiteSearchHit,
  groupSearchHits,
  mergeFullTextAndCatalog,
  normalizeDocPath,
  pickSearchTab,
  sanitizeSnippetHtml,
  toHitHref,
} from '../app/utils/mergeSearchHits';
import {searchKindFromQuery, searchResultsPath} from '../app/utils/siteCatalog';
import type {WebMcpCatalogItem} from '../app/utils/webmcpTypes';

const catalog: WebMcpCatalogItem[] = [
  {
    kind: 'episode',
    title: 'News août 2026 : Cursor Origin et WebMCP',
    path: '/podcasts/news08-26',
    description: 'Nous évoquons WebMCP et Kitesurf que Cloudflare lance.',
    tags: ['webmcp', 'cloudflare'],
    dsSlug: 'DS_137_news08-26',
    episodeNumber: 137,
  },
  {
    kind: 'episode',
    title: 'Redis is dead',
    path: '/podcasts/redisdead',
    description: 'Discussion autour de Redis.',
    tags: ['redis'],
    dsSlug: 'DS_068_redisdead',
    episodeNumber: 68,
  },
  {
    kind: 'article',
    title: 'OpenClaw vs Hermes',
    path: '/articles/openclaw-vs-hermes',
    description: 'Comparaison d’agents open source.',
    tags: [],
    publicationDate: '2026-03-01T00:00:00.000Z',
  },
  {
    kind: 'article',
    title: 'Ancien billet',
    path: '/articles/ancien',
    description: 'Un article plus vieux sur hermes.',
    tags: [],
    publicationDate: '2024-01-01T00:00:00.000Z',
  },
];

describe('path helpers', () => {
  test('strips hashes and trailing slashes', () => {
    expect(normalizeDocPath('/podcasts/news08-26/#intro')).toBe(
      '/podcasts/news08-26',
    );
    expect(toHitHref('/podcasts/news08-26', '/podcasts/news08-26#intro')).toBe(
      '/podcasts/news08-26/#intro',
    );
  });

  test('builds the shareable results URL', () => {
    expect(searchResultsPath('')).toBe('/search/');
    expect(searchResultsPath(' webmcp ')).toBe('/search/?q=webmcp');
    expect(searchResultsPath('webmcp', 'episode')).toBe('/search/?q=webmcp');
    expect(searchResultsPath('webmcp', 'article')).toBe(
      '/search/?q=webmcp&kind=article',
    );
    expect(searchKindFromQuery('article')).toBe('article');
    expect(searchKindFromQuery('episode')).toBe('episode');
    expect(searchKindFromQuery(undefined)).toBe('episode');
  });
});

describe('matched tags', () => {
  test('returns tags that contain a query token', () => {
    expect(collectMatchedTags(['webmcp', 'cloudflare'], 'WebMCP')).toEqual([
      'webmcp',
    ]);
  });
});

describe('mergeFullTextAndCatalog', () => {
  test('returns a tag-only hit when FTS is empty', () => {
    const hits = mergeFullTextAndCatalog([], catalog, 'webmcp', 5);

    expect(hits).toHaveLength(1);
    expect(hits[0]?.path).toBe('/podcasts/news08-26');
    expect(hits[0]?.matchedTags).toEqual(['webmcp']);
    expect(hits[0]?.snippet).toBeUndefined();
  });

  test('drops FTS rows that are not in the published catalog', () => {
    const hits = mergeFullTextAndCatalog(
      [
        {
          collection: 'podcasts',
          id: '/podcasts/secret',
          title: 'Draft',
          content: 'webmcp',
          rank: -10,
          snippet: 'webmcp',
        },
      ],
      catalog,
      'webmcp',
      5,
    );

    expect(hits.map(hit => hit.path)).toEqual(['/podcasts/news08-26']);
  });

  test('collapses FTS sections to one document and keeps the snippet', () => {
    const hits = mergeFullTextAndCatalog(
      [
        {
          collection: 'podcasts',
          id: '/podcasts/redisdead#later',
          title: 'Later',
          content: 'redis notes',
          rank: -1,
          snippet: 'weaker',
        },
        {
          collection: 'podcasts',
          id: '/podcasts/redisdead#intro',
          title: 'Intro',
          content: 'redis is dead',
          rank: -8,
          snippet: 'best <mark>redis</mark>',
        },
      ],
      catalog,
      'redis',
      5,
    );

    const redis = hits.find(hit => hit.path === '/podcasts/redisdead');
    expect(redis?.href).toBe('/podcasts/redisdead/#intro');
    expect(redis?.snippet).toBe('best <mark>redis</mark>');
    expect(hits.filter(hit => hit.path === '/podcasts/redisdead')).toHaveLength(
      1,
    );
  });

  test('orders matching episodes from newest to oldest', () => {
    const hits = mergeFullTextAndCatalog(
      [
        {
          collection: 'podcasts',
          id: '/podcasts/redisdead',
          title: 'Redis is dead',
          content: 'redis',
          rank: -20,
        },
        {
          collection: 'podcasts',
          id: '/podcasts/news08-26',
          title: 'News',
          content: 'redis',
          rank: -1,
        },
      ],
      catalog,
      'redis',
      5,
    );

    expect(hits.map(hit => hit.episodeNumber)).toEqual([137, 68]);
  });

  test('keeps articles even when many episodes outrank them', () => {
    const episodes: WebMcpCatalogItem[] = Array.from(
      {length: 12},
      (_, index) => ({
        kind: 'episode',
        title: `JS news ${index}`,
        path: `/podcasts/js-${index}`,
        description: 'javascript',
        tags: ['javascript'],
        episodeNumber: 200 - index,
      }),
    );
    const article: WebMcpCatalogItem = {
      kind: 'article',
      title: 'JavaScript deep dive',
      path: '/articles/js-deep',
      description: 'javascript',
      tags: [],
    };
    const ftsHits = episodes.map((item, index) => ({
      collection: 'podcasts',
      id: item.path,
      title: item.title,
      content: 'javascript',
      rank: -100 + index,
    }));

    const hits = mergeFullTextAndCatalog(
      ftsHits,
      [...episodes, article],
      'javascript',
      5,
    );

    expect(
      hits.filter(hit => hit.kind === 'article').map(hit => hit.path),
    ).toEqual(['/articles/js-deep']);
    expect(hits.filter(hit => hit.kind === 'episode')).toHaveLength(5);
  });

  test('orders matching articles from newest to oldest', () => {
    const hits = mergeFullTextAndCatalog([], catalog, 'hermes', 5);

    expect(
      hits.filter(hit => hit.kind === 'article').map(hit => hit.path),
    ).toEqual(['/articles/openclaw-vs-hermes', '/articles/ancien']);
  });

  test('formats agent output with tags and a stripped excerpt', () => {
    const [hit] = mergeFullTextAndCatalog(
      [
        {
          collection: 'podcasts',
          id: '/podcasts/news08-26',
          title: 'News',
          content: 'body',
          rank: -4,
          snippet: 'évoquons <mark>WebMCP</mark>',
        },
      ],
      catalog,
      'webmcp',
      5,
    );

    const text = formatSiteSearchHit(hit!);
    expect(text).toContain('Épisode #137');
    expect(text).toContain('Tags: webmcp');
    expect(text).toContain('Extrait: évoquons WebMCP');
    expect(text).not.toContain('<mark>');
  });
});

describe('groupSearchHits', () => {
  test('splits episodes and articles', () => {
    const grouped = groupSearchHits(
      mergeFullTextAndCatalog([], catalog, 'webmcp redis hermes', 25),
    );

    expect(grouped.episodes.map(item => item.path)).toEqual([
      '/podcasts/news08-26',
      '/podcasts/redisdead',
    ]);
    expect(grouped.articles.map(item => item.path)).toEqual([
      '/articles/openclaw-vs-hermes',
      '/articles/ancien',
    ]);
  });

  test('picks the tab that still has hits', () => {
    const grouped = groupSearchHits(
      mergeFullTextAndCatalog([], catalog, 'webmcp', 5),
    );

    expect(pickSearchTab(grouped, 'episode')).toBe('episode');
    expect(pickSearchTab(grouped, 'article')).toBe('episode');
  });
});
describe('sanitizeSnippetHtml', () => {
  test('keeps mark tags and strips other markup', () => {
    expect(
      sanitizeSnippetHtml('<script>x</script>hello <mark>web</mark>'),
    ).toBe('hello <mark>web</mark>');
  });

  test('strips attributes from mark tags', () => {
    expect(sanitizeSnippetHtml('<mark onclick="alert(1)">web</mark>')).toBe(
      '<mark>web</mark>',
    );
  });
});
