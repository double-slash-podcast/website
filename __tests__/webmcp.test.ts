import {afterEach, describe, expect, test, vi} from 'vitest';
import {
  registerWebMcpTools,
  registerWebMcpToolsWhenAvailable,
} from '../app/utils/webmcpContext';
import {
  buildWebMcpCatalog,
  clampCatalogLimit,
  findEpisode,
  formatCatalogItem,
  isSafeSitePath,
  latestEpisodes,
  rankCatalog,
  tokenizeQuery,
} from '../app/utils/webmcpSearch';
import {createWebMcpTools} from '../app/utils/webmcpTools';
import type {WebMcpCatalogItem, WebMcpTool} from '../app/utils/webmcpTypes';
import fs from 'fs';
import path from 'path';

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
  },
];

afterEach(() => {
  vi.unstubAllGlobals();
  Reflect.deleteProperty(document, 'modelContext');
  Reflect.deleteProperty(navigator, 'modelContext');
});

describe('webmcp search helpers', () => {
  test('tokenizes queries and clamps limits', () => {
    expect(tokenizeQuery('WebMCP, 137')).toEqual(['webmcp', '137']);
    expect(clampCatalogLimit(undefined, 5)).toBe(5);
    expect(clampCatalogLimit(0, 5)).toBe(1);
    expect(clampCatalogLimit(99, 5)).toBe(25);
  });

  test('ranks episodes above weaker description matches', () => {
    const hits = rankCatalog(catalog, 'webmcp', 5);

    expect(hits[0]?.path).toBe('/podcasts/news08-26');
    expect(hits.some(item => item.path === '/podcasts/redisdead')).toBe(false);
  });

  test('lists latest episodes by number', () => {
    const latest = latestEpisodes(catalog, 1);

    expect(latest).toHaveLength(1);
    expect(latest[0]?.episodeNumber).toBe(137);
  });

  test('finds an episode by slug, number, or query', () => {
    expect(findEpisode(catalog, {dsSlug: 'ds_137_news08-26'})?.title).toContain(
      'WebMCP',
    );
    expect(findEpisode(catalog, {episodeNumber: 68})?.dsSlug).toBe(
      'DS_068_redisdead',
    );
    expect(findEpisode(catalog, {query: 'openclaw'})).toBeUndefined();
    expect(findEpisode(catalog, {query: 'redis'})?.path).toBe(
      '/podcasts/redisdead',
    );
  });

  test('rejects off-site or protocol-relative paths', () => {
    expect(isSafeSitePath('/podcasts/')).toBe(true);
    expect(isSafeSitePath('//evil.example/x')).toBe(false);
    expect(isSafeSitePath('https://evil.example/')).toBe(false);
    expect(isSafeSitePath('podcasts')).toBe(false);
  });

  test('formats catalog items with kind and path', () => {
    expect(formatCatalogItem(catalog[0]!)).toContain('Épisode #137');
    expect(formatCatalogItem(catalog[0]!)).toContain('/podcasts/news08-26/');
  });
});

describe('buildWebMcpCatalog', () => {
  test('drops draft and scheduled episodes, keeps articles', () => {
    const items = buildWebMcpCatalog(
      [
        {
          title: 'Live',
          path: '/podcasts/live',
          status: 'published',
          dsSlug: 'DS_1',
        },
        {
          title: 'Secret',
          path: '/podcasts/secret',
          status: 'draft',
          dsSlug: 'DS_2',
        },
        {
          title: 'Soon',
          path: '/podcasts/soon',
          status: 'scheduled',
          dsSlug: 'DS_3',
        },
      ],
      [{title: 'Post', path: '/articles/post', description: 'x'}],
    );

    expect(items.map(item => item.path)).toEqual([
      '/podcasts/live',
      '/articles/post',
    ]);
  });
});

describe('registerWebMcpTools', () => {
  test('calls registerTool for each tool and passes the abort signal', async () => {
    const registerTool = vi.fn();
    Object.defineProperty(document, 'modelContext', {
      configurable: true,
      value: {registerTool},
    });

    const controller = new AbortController();
    const tools = [
      {name: 'search_content', description: 'x', execute: () => ''},
    ] as WebMcpTool[];

    expect(await registerWebMcpTools(tools, {signal: controller.signal})).toBe(
      true,
    );
    expect(registerTool).toHaveBeenCalledTimes(1);
    expect(registerTool.mock.calls[0]?.[1]).toEqual({
      signal: controller.signal,
    });
  });

  test('falls back to provideContext when registerTool is missing', async () => {
    const provideContext = vi.fn();
    Object.defineProperty(navigator, 'modelContext', {
      configurable: true,
      value: {provideContext},
    });

    const tools = createWebMcpTools({
      loadCatalog: async () => catalog,
      openPage: () => undefined,
      playEpisode: () => undefined,
      controlPlayer: action => ({status: action, title: 'x'}),
      getPlayerStatus: () => ({status: 'pause'}),
    });

    expect(await registerWebMcpTools(tools)).toBe(true);
    expect(provideContext).toHaveBeenCalledWith({tools});
  });

  test('returns false when the API is absent', async () => {
    expect(await registerWebMcpTools([])).toBe(false);
  });

  test('swallows async registerTool failures without throwing', async () => {
    const registerTool = vi.fn().mockRejectedValue(new Error('nope'));
    Object.defineProperty(document, 'modelContext', {
      configurable: true,
      value: {registerTool},
    });

    await expect(
      registerWebMcpTools([
        {name: 'search_content', description: 'x', execute: () => ''},
      ] as WebMcpTool[]),
    ).resolves.toBe(true);
  });

  test('registers when modelContext appears after a ready event', async () => {
    const registerTool = vi.fn();
    const tools = [
      {name: 'search_content', description: 'x', execute: () => ''},
    ] as WebMcpTool[];

    const stop = registerWebMcpToolsWhenAvailable(tools);
    expect(registerTool).not.toHaveBeenCalled();

    Object.defineProperty(document, 'modelContext', {
      configurable: true,
      value: {registerTool},
    });
    window.dispatchEvent(new Event('modelcontext'));

    await vi.waitFor(() => expect(registerTool).toHaveBeenCalledTimes(1));
    stop();
  });

  test('registers each tool once when several ready events fire together', async () => {
    const registerTool = vi.fn(
      () => new Promise<void>(resolve => setTimeout(resolve, 20)),
    );
    const tools = [
      {name: 'search_content', description: 'x', execute: () => ''},
    ] as WebMcpTool[];

    const stop = registerWebMcpToolsWhenAvailable(tools);
    Object.defineProperty(document, 'modelContext', {
      configurable: true,
      value: {registerTool},
    });

    for (const name of ['modelcontext', 'modelcontextready'] as const) {
      window.dispatchEvent(new Event(name));
      document.dispatchEvent(new Event(name));
    }

    await vi.waitFor(() => expect(registerTool).toHaveBeenCalledTimes(1));
    await new Promise(resolve => setTimeout(resolve, 40));
    expect(registerTool).toHaveBeenCalledTimes(1);
    stop();
  });
});

describe('createWebMcpTools', () => {
  const openPage = vi.fn();
  const playEpisode = vi.fn();
  const tools = createWebMcpTools({
    loadCatalog: async () => catalog,
    openPage,
    playEpisode,
    controlPlayer: action => ({
      status: action,
      title: 'News août 2026 : Cursor Origin et WebMCP',
      dsSlug: 'DS_137_news08-26',
    }),
    getPlayerStatus: () => ({
      status: 'pause',
      title: 'News août 2026 : Cursor Origin et WebMCP',
      dsSlug: 'DS_137_news08-26',
    }),
  });

  function tool(name: string): WebMcpTool {
    const found = tools.find(entry => entry.name === name);
    if (!found) throw new Error(`missing tool ${name}`);
    return found;
  }

  test('exposes the site key actions', () => {
    expect(tools.map(entry => entry.name)).toEqual([
      'search_content',
      'list_episodes',
      'open_page',
      'play_episode',
      'control_player',
    ]);
  });

  test('search_content returns ranked hits', async () => {
    const result = await tool('search_content').execute({query: 'webmcp'});

    expect(result).toContain('Épisode #137');
    expect(result).toContain('Page résultats : /search/?q=webmcp');
    expect(result).not.toContain('Redis');
  });

  test('search_content results URL keeps the article tab', async () => {
    const result = await tool('search_content').execute({
      query: 'openclaw',
      kind: 'article',
    });

    expect(result).toContain(
      'Page résultats : /search/?q=openclaw&kind=article',
    );
  });

  test('search_content merges FTS body hits with the catalog', async () => {
    const withFts = createWebMcpTools({
      loadCatalog: async () => catalog,
      searchFullText: async () => [
        {
          collection: 'articles',
          id: '/articles/openclaw-vs-hermes',
          title: 'OpenClaw vs Hermes',
          content: 'agents open source',
          rank: -6,
          snippet: 'agents <mark>open</mark> source',
        },
      ],
      openPage,
      playEpisode,
      controlPlayer: action => ({
        status: action,
        title: 'News août 2026 : Cursor Origin et WebMCP',
        dsSlug: 'DS_137_news08-26',
      }),
      getPlayerStatus: () => ({
        status: 'pause',
        title: 'News août 2026 : Cursor Origin et WebMCP',
        dsSlug: 'DS_137_news08-26',
      }),
    });
    const searchTool = withFts.find(entry => entry.name === 'search_content');
    const result = await searchTool!.execute({query: 'open source'});

    expect(result).toContain('Article: OpenClaw vs Hermes');
    expect(result).toContain('Extrait: agents open source');
  });

  test('open_page refuses unsafe paths and navigates safe ones', async () => {
    expect(await tool('open_page').execute({path: '//evil.example'})).toContain(
      'ERROR',
    );
    expect(await tool('open_page').execute({path: '/podcasts/'})).toContain(
      '/podcasts/',
    );
    expect(openPage).toHaveBeenCalledWith('/podcasts/');
  });

  test('play_episode resolves by number and calls the player', async () => {
    const result = await tool('play_episode').execute({episodeNumber: 137});

    expect(result).toContain('DS_137_news08-26');
    expect(playEpisode).toHaveBeenCalledWith(catalog[0]);
  });

  test('control_player reports status without requiring a mutation', async () => {
    const result = await tool('control_player').execute({action: 'status'});

    expect(result).toContain('en pause');
    expect(result).toContain('DS_137_news08-26');
  });
});

describe('webmcp client plugin wiring', () => {
  test('registers tools on the client plugin module', () => {
    const src = fs.readFileSync(
      path.join(process.cwd(), 'app/plugins/webmcp.client.ts'),
      'utf8',
    );

    expect(src).toContain('registerWebMcpToolsWhenAvailable');
    expect(src).toContain('createWebMcpTools');
    expect(src).toContain('loadSiteCatalog');
    expect(src).toContain('useSearchCollection');
    expect(src).toContain('AbortController');
  });
});
