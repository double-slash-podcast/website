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
  publicPathToHtmlFile,
  publicPathToOutputFiles,
  resolveAgentMarkdownOutputDirs,
  stripContentOrderPrefix,
} from '../app/utils/agentMarkdown';
import {
  buildHomeMarkdown,
  emitAgentMarkdownIndexes,
} from '../app/utils/agentMarkdownIndexes';
import {
  escapeMarkdownHeading,
  escapeMarkdownLinkLabel,
  extractFrontmatterTitle,
  shouldPublishAgentMarkdown,
} from '../app/utils/frontmatter';

/**
 * Write a tiny prerendered HTML page under outputDir/{publicPath}/index.html.
 */
function writePrerenderedHtml(
  outputDir: string,
  publicPath: string,
  title: string,
  main: string,
  titleInMain = true,
): void {
  const dir = join(outputDir, publicPath.replace(/^\//, ''));
  const heading = `<h1>${title}</h1>`;
  mkdirSync(dir, {recursive: true});
  writeFileSync(
    join(dir, 'index.html'),
    `<!doctype html><html><body>
      <div class="fixed top-0">
        <a href="/" title="accueil">//</a>
        <a href="/podcasts/" title="Podcasts">Podcasts</a>
        <a href="/articles/" title="Blog">Blog</a>
        <a href="/nous-soutenir/" title="Soutenir">Soutenir</a>
      </div>
      ${titleInMain ? '' : `<header>${heading}</header>`}
      <main>${titleInMain ? heading : ''}${main}</main>
    </body></html>`,
  );
}

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

  test('lowercases mixed-case content folders to match Linux prerender', () => {
    expect(contentFileToPublicPath('podcasts/044.animeCSS/index.md')).toBe(
      '/podcasts/animecss',
    );
    expect(contentFileToPublicPath('podcasts/045.animeJS/index.md')).toBe(
      '/podcasts/animejs',
    );
    expect(
      contentFileToPublicPath('podcasts/058.compagnons-du-devOps/index.md'),
    ).toBe('/podcasts/compagnons-du-devops');
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

describe('publicPathToHtmlFile', () => {
  test('points at the prerendered index.html next to the markdown', () => {
    expect(publicPathToHtmlFile('/articles/foo', '/tmp/out')).toBe(
      '/tmp/out/articles/foo/index.html',
    );
  });
});

describe('resolveAgentMarkdownOutputDirs', () => {
  test('prefers .output/public and ignores a leftover dist', () => {
    const root = mkdtempSync(join(tmpdir(), 'agent-md-out-'));
    mkdirSync(join(root, '.output/public'), {recursive: true});
    mkdirSync(join(root, 'dist'), {recursive: true});

    expect(resolveAgentMarkdownOutputDirs(root)).toEqual([
      join(root, '.output/public'),
    ]);
  });

  test('falls back to dist only when .output/public is missing', () => {
    const root = mkdtempSync(join(tmpdir(), 'agent-md-dist-'));
    mkdirSync(join(root, 'dist'), {recursive: true});

    expect(resolveAgentMarkdownOutputDirs(root)).toEqual([join(root, 'dist')]);
  });
});

describe('listAgentMarkdownSources', () => {
  test('every real content file maps to a unique public path', () => {
    const sources = listAgentMarkdownSources(join(process.cwd(), 'content'));
    const paths = sources.map(contentFileToPublicPath);

    expect(sources.length).toBeGreaterThan(100);
    expect(new Set(paths).size).toBe(sources.length);
    expect(paths).toContain('/podcasts/news-sept26-rc2');
    expect(paths).toContain('/podcasts/animecss');
    expect(paths).toContain('/articles/openclaw-vs-hermes');
    expect(paths).toContain('/nous-soutenir');
    expect(paths).not.toContain('/podcasts/animeCSS');
  });
});

describe('emitAgentMarkdownPages', () => {
  test('converts prerendered HTML next to output paths', () => {
    const root = mkdtempSync(join(tmpdir(), 'agent-md-'));
    const contentDir = join(root, 'content');
    const outputDir = join(root, '.output/public');

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

    writePrerenderedHtml(
      outputDir,
      '/articles/demo',
      'Demo article',
      '<p>article</p>',
    );
    writePrerenderedHtml(
      outputDir,
      '/podcasts/hello',
      'Hello',
      '<p>episode</p>',
      false,
    );
    writePrerenderedHtml(outputDir, '/about', 'about', '<p>about body</p>');

    const pages = emitAgentMarkdownPages({contentDir, outputDir});
    const articleMd = readFileSync(
      join(outputDir, 'articles/demo/index.md'),
      'utf8',
    );

    expect(pages.map(page => page.publicPath).sort()).toEqual([
      '/about',
      '/articles/demo',
      '/podcasts/hello',
    ]);
    expect(articleMd).toContain('# Demo article');
    expect(articleMd).toContain('article');
    expect(articleMd).toContain('- [Accueil](/)');
    expect(articleMd).not.toMatch(/^---/);
    expect(readFileSync(join(outputDir, 'articles/demo.md'), 'utf8')).toBe(
      articleMd,
    );
    expect(
      readFileSync(join(outputDir, 'podcasts/hello/index.md'), 'utf8'),
    ).toContain('# Hello');
    expect(readFileSync(join(outputDir, 'about/index.md'), 'utf8')).toContain(
      '# about',
    );
    expect(pages.map(page => page.publicPath)).not.toContain('/podcasts/draft');
    expect(existsSync(join(outputDir, 'podcasts/draft/index.md'))).toBe(false);
  });

  test('throws when prerendered HTML is missing', () => {
    const root = mkdtempSync(join(tmpdir(), 'agent-md-missing-'));
    const contentDir = join(root, 'content');
    const outputDir = join(root, '.output/public');

    mkdirSync(join(contentDir, 'articles'), {recursive: true});
    writeFileSync(join(contentDir, 'articles', 'demo.md'), '# article\n');

    expect(() => emitAgentMarkdownPages({contentDir, outputDir})).toThrow(
      'Missing prerendered HTML for /articles/demo',
    );
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

describe('escapeMarkdownHeading', () => {
  test('escapes hashes and brackets in ATX titles', () => {
    expect(escapeMarkdownHeading('Foo](https://evil.example) #bar')).toBe(
      'Foo\\](https://evil.example) \\#bar',
    );
  });
});

describe('emitAgentMarkdownIndexes', () => {
  test('writes homepage and listing markdown for Accept negotiation', () => {
    const root = mkdtempSync(join(tmpdir(), 'agent-md-idx-'));
    const contentDir = join(root, 'content');
    const outputDir = join(root, '.output/public');

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
    expect(home).not.toMatch(/^---/);
    expect(home).not.toContain('llms.txt');
    expect(home).toContain('- [Accueil](/)');
    expect(home).toContain('- [Blog](/articles/)');
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

    expect(markdown).toContain('[Blog](/articles/)');
    expect(markdown).not.toContain('[Index LLMs](/llms.txt)');
    expect(markdown).not.toMatch(/^---/);
    expect(markdown).toContain('- [Demo](/articles/demo/)');
  });
});
