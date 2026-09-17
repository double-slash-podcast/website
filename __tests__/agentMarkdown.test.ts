import {
  mkdtempSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
} from 'node:fs';
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
import {
  escapeMarkdownLinkLabel,
  shouldPublishAgentMarkdown,
} from '../app/utils/frontmatter';

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
      '---\nstatus: published\ntitle: Hello\n---\n# episode\n',
    );
    mkdirSync(join(contentDir, 'podcasts', '002.draft'), {recursive: true});
    writeFileSync(
      join(contentDir, 'podcasts', '002.draft', 'index.md'),
      '---\nstatus: draft\ntitle: Secret\n---\n# draft\n',
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
    ).toContain('# episode\n');
    expect(readFileSync(join(outputDir, 'about/index.md'), 'utf8')).toBe(
      '# about\n',
    );
    expect(pages.map(page => page.publicPath)).not.toContain('/podcasts/draft');
    expect(existsSync(join(outputDir, 'podcasts/draft/index.md'))).toBe(false);
  });
});

describe('extractFrontmatterTitle', () => {
  test('reads quoted and unquoted YAML titles from the fence only', () => {
    expect(
      extractFrontmatterTitle("---\ntitle: 'Hello world'\n---\n\nbody\n", 'x'),
    ).toBe('Hello world');
    expect(
      extractFrontmatterTitle('---\ntitle: News sans quotes\n---\n', 'x'),
    ).toBe('News sans quotes');
    expect(extractFrontmatterTitle('# no frontmatter\n', '/fallback')).toBe(
      '/fallback',
    );
    expect(
      extractFrontmatterTitle(
        '---\ntitle: Real title\n---\n\ntitle: body spoiler\n',
        'x',
      ),
    ).toBe('Real title');
  });
});

describe('shouldPublishAgentMarkdown', () => {
  test('emits articles always and podcasts only when published', () => {
    expect(shouldPublishAgentMarkdown('articles/demo.md', '# x\n')).toBe(true);
    expect(
      shouldPublishAgentMarkdown(
        'podcasts/001.hello/index.md',
        '---\nstatus: published\n---\n',
      ),
    ).toBe(true);
    expect(
      shouldPublishAgentMarkdown(
        'podcasts/002.draft/index.md',
        '---\nstatus: draft\n---\n',
      ),
    ).toBe(false);
    expect(
      shouldPublishAgentMarkdown('podcasts/003.none/index.md', '# no status\n'),
    ).toBe(false);
  });
});

describe('escapeMarkdownLinkLabel', () => {
  test('escapes brackets so titles cannot break index links', () => {
    expect(escapeMarkdownLinkLabel('Foo](https://evil.example)[x')).toBe(
      'Foo\\](https://evil.example)\\[x',
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
      '---\nstatus: published\ntitle: First episode\n---\n',
    );
    writeFileSync(
      join(contentDir, 'podcasts', '002.later', 'index.md'),
      '---\nstatus: published\ntitle: Second episode\n---\n',
    );
    mkdirSync(join(contentDir, 'podcasts', '003.draft'), {recursive: true});
    writeFileSync(
      join(contentDir, 'podcasts', '003.draft', 'index.md'),
      '---\nstatus: draft\ntitle: Secret draft\n---\n',
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
    expect(home).not.toContain('Secret draft');
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
