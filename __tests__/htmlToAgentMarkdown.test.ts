import {JSDOM} from 'jsdom';
import {describe, expect, test} from 'vitest';
import {htmlToAgentMarkdown} from '../app/utils/htmlToAgentMarkdown';
import {
  AGENT_NAV_LINKS,
  buildAgentNavMarkdown,
  extractSiteNavLinks,
  toSiteNavPath,
} from '../app/utils/agentMarkdownNav';

/**
 * Minimal prerendered page: Navbar + optional header h1 + main.
 */
function pageHtml(options: {
  title: string;
  main: string;
  titleInMain?: boolean;
  absoluteNav?: boolean;
}): string {
  const heading = `<h1>${options.title}</h1>`;
  const inMain = options.titleInMain !== false;
  const origin = options.absoluteNav ? 'https://double-slash.dev' : '';

  return `<!doctype html><html><body>
    <div id="__nuxt">
    <div class="fixed top-0">
      <a href="${origin}/" title="accueil">//</a>
      <a href="${origin}/podcasts/" title="Podcasts">Podcasts</a>
      <a href="${origin}/articles/" title="Blog">Blog</a>
      <a href="${origin}/nous-soutenir/" title="Soutenir">Soutenir</a>
      <button type="button" aria-label="Rechercher sur le site">Search</button>
    </div>
    ${inMain ? '' : `<header>${heading}</header>`}
    <main>${inMain ? heading : ''}${options.main}</main>
    </div>
    <script>window.__NUXT__={}</script>
  </body></html>`;
}

/**
 * vue-lite-youtube-embed SSR: poster preload + article.yt-lite, no videoid attr.
 */
function ytLiteEmbed(id: string, title: string): string {
  const poster = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  return `
    <link rel="preload" href="${poster}" as="image">
    <article class="yt-lite" data-title="${title}" style="background-image: url(${poster}); --aspect-ratio: 56.25%">
      <button type="button" class="lty-playbtn" aria-label="Watch ${title}"></button>
    </article>
  `;
}

describe('buildAgentNavMarkdown', () => {
  test('lists Accueil, Podcasts, Blog, Soutenir and not llms.txt', () => {
    const nav = buildAgentNavMarkdown();

    expect(nav).toBe(`- [Accueil](/)
- [Podcasts](/podcasts/)
- [Blog](/articles/)
- [Soutenir](/nous-soutenir/)`);
    expect(nav).not.toContain('llms.txt');
    expect(AGENT_NAV_LINKS).toHaveLength(4);
  });
});

describe('extractSiteNavLinks', () => {
  test('reads navbar titles and skips the search button', () => {
    const {window} = new JSDOM(pageHtml({title: 'X', main: '<p>x</p>'}));
    const links = extractSiteNavLinks(window.document);

    expect(links).toEqual(AGENT_NAV_LINKS);
    window.close();
  });

  test('falls back to the canonical nav when the bar is missing', () => {
    const {window} = new JSDOM(
      '<html><body><main><h1>X</h1></main></body></html>',
    );

    expect(extractSiteNavLinks(window.document)).toEqual(AGENT_NAV_LINKS);
    window.close();
  });

  test('keeps same-origin absolute Navbar hrefs', () => {
    const {window} = new JSDOM(
      pageHtml({title: 'X', main: '<p>x</p>', absoluteNav: true}),
    );

    expect(extractSiteNavLinks(window.document)).toEqual(AGENT_NAV_LINKS);
    window.close();
  });
});

describe('htmlToAgentMarkdown', () => {
  test('puts title and nav above converted main, without YAML', () => {
    const markdown = htmlToAgentMarkdown(
      pageHtml({
        title: 'Demo article',
        main: '<p>Hello world</p><img src="/pic.jpg" alt="cover">',
      }),
    );

    expect(markdown).not.toMatch(/^---/);
    expect(markdown.startsWith('# Demo article\n')).toBe(true);
    expect(markdown).toContain('- [Accueil](/)');
    expect(markdown).toContain('- [Blog](/articles/)');
    expect(markdown).toContain('Hello world');
    expect(markdown).toContain('![cover](/pic.jpg)');
    expect(markdown.match(/^# Demo article$/gm)).toHaveLength(1);
  });

  test('uses the header h1 when it lives outside main', () => {
    const markdown = htmlToAgentMarkdown(
      pageHtml({
        title: 'Episode title',
        main: '<p>Show notes</p>',
        titleInMain: false,
      }),
    );

    expect(markdown.startsWith('# Episode title\n')).toBe(true);
    expect(markdown).toContain('Show notes');
  });

  test('converts vue-lite-youtube-embed SSR, info callouts, and hidden tab panels', () => {
    const markdown = htmlToAgentMarkdown(
      pageHtml({
        title: 'With components',
        main: `
          <nav role="tablist">
            <button type="button">Description</button>
            <button type="button">Liens</button>
          </nav>
          <div class="info-block"><p>Watch out</p></div>
          ${ytLiteEmbed('bItXp5CWpjs', 'Talk')}
          <div hidden>
            <ul><li><a href="https://example.com">Related</a></li></ul>
          </div>
          <div>
            <button type="button">Partager</button>
          </div>
        `,
      }),
    );

    expect(markdown).toContain('Watch out');
    expect(markdown).toMatch(/^>/m);
    expect(markdown).toContain(
      '[Talk](https://www.youtube.com/watch?v=bItXp5CWpjs)',
    );
    expect(markdown).not.toContain('i.ytimg.com');
    expect(markdown).toContain('[Related](https://example.com)');
    expect(markdown).not.toContain('Partager');
    expect(markdown).not.toContain('Description');
    expect(markdown).not.toContain('::VideoPlayer');
    expect(markdown).not.toContain('::Info');
  });

  test('escapes markdown characters in the page title', () => {
    const markdown = htmlToAgentMarkdown(
      pageHtml({
        title: 'Foo](https://evil.example) #bar',
        main: '<p>body</p>',
      }),
    );

    expect(markdown.startsWith('# Foo\\](https://evil.example) \\#bar\n')).toBe(
      true,
    );
  });

  test('keeps a rendered sponsor listing', () => {
    const markdown = htmlToAgentMarkdown(
      pageHtml({
        title: 'Soutenir le podcast',
        main: `
          <h2>Ils nous soutiennent !</h2>
          <a href="https://github.com/alice" title="Alice">
            <img src="https://avatars.example/alice.png" alt="Alice">
            <strong>Alice</strong>
          </a>
        `,
      }),
    );

    expect(markdown).toContain('Ils nous soutiennent');
    expect(markdown).toContain('Alice');
    expect(markdown).toContain('https://github.com/alice');
    expect(markdown).not.toContain('::Sponsor');
  });

  test('throws when the page has no main landmark', () => {
    expect(() =>
      htmlToAgentMarkdown('<html><body><h1>No main</h1></body></html>'),
    ).toThrow('No <main> in prerendered HTML');
  });
});

describe('toSiteNavPath', () => {
  test('maps relative and same-origin hrefs, drops others', () => {
    expect(toSiteNavPath('/podcasts/')).toBe('/podcasts/');
    expect(toSiteNavPath('https://double-slash.dev/articles/')).toBe(
      '/articles/',
    );
    expect(toSiteNavPath('https://evil.example/podcasts/')).toBeUndefined();
    expect(toSiteNavPath('javascript:alert(1)')).toBeUndefined();
  });
});
