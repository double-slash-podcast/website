import {isPublishedStatus} from './publishedContent';
import {toIsoDatetime} from './toIsoDatetime';

/** One sitemap <url> payload: loc is site-relative, lastmod is YYYY-MM-DD. */
export type SitemapUrl = {
  url: string;
  lastmod?: string;
};

/** Content row used to build sitemap entries. */
export type SitemapSourceDoc = {
  path?: string;
  publicationDate?: string | number | Date | null;
  status?: string;
};

/** Listing and home URLs that are not content collection pages. */
export const STATIC_SITEMAP_PATHS = ['/', '/articles/', '/podcasts/'] as const;

/**
 * Turn a content collection path into a trailing-slash canonical URL.
 * Custom pages live under /custom in the collection but are served at the root.
 */
export function toCanonicalPath(collectionPath: string): string {
  const withoutCustomPrefix = collectionPath.replace(/^\/custom(?=\/|$)/, '');
  const path = withoutCustomPrefix === '' ? '/' : withoutCustomPrefix;
  return path.endsWith('/') ? path : `${path}/`;
}

/**
 * W3C date (YYYY-MM-DD) for <lastmod>, taken from content dates rather than
 * build time so crawlers are not told every URL changed on each generate.
 */
export function toSitemapLastmod(
  value: string | number | Date | null | undefined,
): string | undefined {
  const iso = toIsoDatetime(value);
  return iso ? iso.slice(0, 10) : undefined;
}

/**
 * Canonical public URLs for the XML sitemap: static listings plus published
 * content. Draft and scheduled episodes stay out.
 */
export function collectSitemapUrls(docs: {
  podcasts: SitemapSourceDoc[];
  articles: SitemapSourceDoc[];
  custom: SitemapSourceDoc[];
}): SitemapUrl[] {
  const urls: SitemapUrl[] = STATIC_SITEMAP_PATHS.map(url => ({url}));

  const publishedPodcasts = docs.podcasts.filter(doc =>
    isPublishedStatus(doc.status),
  );

  for (const doc of [...publishedPodcasts, ...docs.articles, ...docs.custom]) {
    if (!doc.path) {
      continue;
    }
    const url = toCanonicalPath(doc.path);
    const lastmod = toSitemapLastmod(doc.publicationDate);
    urls.push(lastmod ? {url, lastmod} : {url});
  }

  return urls;
}
