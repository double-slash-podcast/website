/**
 * Vite names the main bundle `entry.[hash].css` and the header chunk
 * `Header.[hash].css` or `header.[hash].css`. The hash changes every build.
 */
const CRITICAL_CSS_FILE = /^(?:entry|[Hh]eader)\.[^/]+\.css$/;

/**
 * Stylesheet URLs for the Vite entry bundle and the header chunk.
 * Other CSS stays on its normal stylesheet link. Query strings are ignored
 * when matching the filename, and the original href is returned.
 */
export function criticalCssHrefs(stylesheetHrefs: string[]): string[] {
  return stylesheetHrefs.filter(href => {
    const file = href.split('?')[0]?.split('/').pop() ?? '';
    return CRITICAL_CSS_FILE.test(file);
  });
}

/**
 * Stylesheet hrefs already written into rendered head HTML.
 * Attribute order varies between Nuxt versions, so rel and href are read apart.
 */
export function stylesheetHrefsFromHead(headHtml: string): string[] {
  const tags = headHtml.match(/<link\b[^>]*>/gi) ?? [];
  const hrefs: string[] = [];

  for (const tag of tags) {
    if (!/\brel=["']stylesheet["']/i.test(tag)) {
      continue;
    }
    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (href) {
      hrefs.push(href);
    }
  }

  return hrefs;
}

/**
 * True when this href is already preloaded as a stylesheet.
 */
function headHasStylePreload(headHtml: string, href: string): boolean {
  const tags = headHtml.match(/<link\b[^>]*>/gi) ?? [];

  return tags.some(tag => {
    if (!/\brel=["']preload["']/i.test(tag)) {
      return false;
    }
    if (!/\bas=["']style["']/i.test(tag)) {
      return false;
    }
    return tag.includes(`href="${href}"`) || tag.includes(`href='${href}'`);
  });
}

/**
 * Escape a generated href so it cannot break out of the attribute.
 */
function escapeHref(href: string): string {
  return href.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

/**
 * `<link rel="preload" as="style">` tags for the given stylesheet URLs.
 */
export function renderCriticalCssPreloads(hrefs: string[]): string[] {
  return hrefs.map(
    href => `<link rel="preload" as="style" href="${escapeHref(href)}">`,
  );
}

/**
 * Preload tags for entry and header stylesheets found in rendered head HTML.
 * Returns nothing when those hashed files are absent, which is the dev case.
 * Skips hrefs that already have a style preload.
 */
export function criticalCssPreloadTags(headParts: string[]): string[] {
  const head = headParts.join('\n');
  const missing = criticalCssHrefs(stylesheetHrefsFromHead(head)).filter(
    href => !headHasStylePreload(head, href),
  );

  return renderCriticalCssPreloads(missing);
}
