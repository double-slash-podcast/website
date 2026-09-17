import {mkdtempSync, readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {describe, expect, test} from 'vitest';
import {
  contentFileToPublicPath,
  emitAgentMarkdownPages,
  listAgentMarkdownSources,
  publicPathToOutputFiles,
  stripContentOrderPrefix,
} from '../app/utils/agentMarkdown';
import {
  buildHomeMarkdown,
  emitAgentMarkdownIndexes,
  extractFrontmatterTitle,
} from '../app/utils/agentMarkdownIndexes';

describe('stripContentOrderPrefix', () => {
  test('drops Nuxt Content numeric prefixes', () => {
    expect(stripContentOrderPrefix('140.news-sept26-rc2')).toBe(
      'news-sept26-rc2',
    );
    expect(stripContentOrderPrefix('1.index.md')).toBe('index.md');
    expect(stripContentOrderPrefix('openclaw-vs-hermes.md')).toBe(
      'openclaw-vs-hermes.md',
    );
  });
});

describe('contentFileToPublicPath', () => {
  test('maps articles, podcasts, and custom pages to public URLs', () => {
    expect(contentFileToPublicPath('articles/openclaw-vs-hermes.md')).toBe(
      '/articles/openclaw-vs-hermes',
    );
    expect(
      contentFileToPublicPath('podcasts/140.news-sept26-rc2/index.md'),
    ).toBe('/podcasts/news-sept26-rc2');
    expect(contentFileToPublicPath('podcasts/068.redisdead/1.index.md')).toBe(
      '/podcasts/redisdead',
    );
    expect(contentFileToPublicPath('custom/nous-soutenir.md')).toBe(
      '/nous-soutenir',
    );
  });

  test('rejects empty or unknown shapes', () => {
    expect(() => contentFileToPublicPath('readme.md')).toThrow(
      'Unexpected content path',
    );
    expect(() => contentFileToPublicPath('articles/notes.txt')).toThrow(
      'Not a markdown file',
    );
  });
});

describe('publicPathToOutputFiles', () => {
  test('writes index.md and a sibling .md for suffix URLs', () => {
    expect(publicPathToOutputFiles('/articles/foo', '/tmp/out')).toEqual({
      indexPath: '/tmp/out/articles/foo/index.md',
      siblingPath: '/tmp/out/articles/foo.md',
    });
  });
});

describe('listAgentMarkdownSources', () => {
  test('every real content file maps to a unique public path', () => {
    const sources = listAgentMarkdownSources(join(process.cwd(), 'content'));
    const paths = sources.map(contentFileToPublicPath);

    expect(sources.length).toBeGreaterThan(100);
    expect(new Set(paths).size).toBe(sources.length);
    expect(paths).toContain('/podcasts/news-sept26-rc2');
    expect(paths).toContain('/articles/openclaw-vs-hermes');
    expect(paths).toContain('/nous-soutenir');
  });
});

describe('emitAgentMarkdownPages', () => {
  test('copies source markdown next to HTML output paths', () => {
    const root = mkdtempSync(join(tmpdir(), 'agent-md-'));
    const contentDir = join(root, 'content');
    const outputDir = join(root, 'dist');

    mkdirSync(join(contentDir, 'articles'), {recursive: true});
    mkdirSync(join(contentDir, 'podcasts', '001.hello'), {recursive: true});
    mkdirSync(join(contentDir, 'custom'), {recursive: true});

    writeFileSync(join(contentDir, 'articles', 'demo.md'), '# article\n');
    writeFileSync(
      join(contentDir, 'podcasts', '001.hello', 'index.md'),
      '# episode\n',
    );
    writeFileSync(join(contentDir, 'custom', 'about.md'), '# about\n');

    const pages = emitAgentMarkdownPages({contentDir, outputDir});

    expect(pages.map(page => page.publicPath).sort()).toEqual([
      '/about',
      '/articles/demo',
      '/podcasts/hello',
    ]);
    expect(
      readFileSync(join(outputDir, 'articles/demo/index.md'), 'utf8'),
    ).toBe('# article\n');
    expect(readFileSync(join(outputDir, 'articles/demo.md'), 'utf8')).toBe(
      '# article\n',
    );
    expect(
      readFileSync(join(outputDir, 'podcasts/hello/index.md'), 'utf8'),
    ).toBe('# episode\n');
    expect(readFileSync(join(outputDir, 'about/index.md'), 'utf8')).toBe(
      '# about\n',
    );
  });
});

describe('extractFrontmatterTitle', () => {
  test('reads quoted and unquoted YAML titles', () => {
    expect(extractFrontmatterTitle("title: 'Hello world'\n\nbody\n", 'x')).toBe(
      'Hello world',
    );
    expect(extractFrontmatterTitle('title: News sans quotes\n', 'x')).toBe(
      'News sans quotes',
    );
    expect(extractFrontmatterTitle('# no frontmatter\n', '/fallback')).toBe(
      '/fallback',
    );
  });
});

describe('emitAgentMarkdownIndexes', () => {
  test('writes homepage and listing markdown for Accept negotiation', () => {
    const root = mkdtempSync(join(tmpdir(), 'agent-md-idx-'));
    const contentDir = join(root, 'content');
    const outputDir = join(root, 'dist');

    mkdirSync(join(contentDir, 'articles'), {recursive: true});
    mkdirSync(join(contentDir, 'podcasts', '002.later'), {recursive: true});
    mkdirSync(join(contentDir, 'podcasts', '001.hello'), {recursive: true});
    mkdirSync(join(contentDir, 'custom'), {recursive: true});

    writeFileSync(
      join(contentDir, 'articles', 'demo.md'),
      '---\ntitle: Demo article\n---\n',
    );
    writeFileSync(
      join(contentDir, 'podcasts', '001.hello', 'index.md'),
      '---\ntitle: First episode\n---\n',
    );
    writeFileSync(
      join(contentDir, 'podcasts', '002.later', 'index.md'),
      '---\ntitle: Second episode\n---\n',
    );
    writeFileSync(
      join(contentDir, 'custom', 'about.md'),
      '---\ntitle: About\n---\n',
    );

    const written = emitAgentMarkdownIndexes({contentDir, outputDir});
    const home = readFileSync(join(outputDir, 'index.md'), 'utf8');

    expect(written).toEqual(['/', '/articles', '/podcasts']);
    expect(home).toContain('# Double Slash');
    expect(home).toContain('- [Demo article](/articles/demo/)');
    expect(home.indexOf('Second episode')).toBeLessThan(
      home.indexOf('First episode'),
    );
    expect(
      readFileSync(join(outputDir, 'articles/index.md'), 'utf8'),
    ).toContain('[Demo article](/articles/demo/)');
    expect(readFileSync(join(outputDir, 'podcasts.md'), 'utf8')).toContain(
      '[First episode](/podcasts/hello/)',
    );
  });
});

describe('buildHomeMarkdown', () => {
  test('includes navigation and grouped catalogs', () => {
    const markdown = buildHomeMarkdown([
      {
        collection: 'articles',
        publicPath: '/articles/demo',
        title: 'Demo',
        sourcePath: 'articles/demo.md',
      },
    ]);

    expect(markdown).toContain('[Articles](/articles/)');
    expect(markdown).toContain('[Index LLMs](/llms.txt)');
    expect(markdown).toContain('- [Demo](/articles/demo/)');
  });
});
