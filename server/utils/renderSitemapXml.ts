import type {H3Event} from 'h3';
import {SitemapStream, streamToPromise} from 'sitemap';
import {collectSitemapUrls} from '~/utils/sitemap';

/**
 * Build the XML sitemap body from published content collections.
 */
export async function renderSitemapXml(event: H3Event): Promise<Buffer> {
  const {
    baseInfos: {siteUrl},
  } = useAppConfig();

  const [podcasts, articles, custom] = await Promise.all([
    queryCollection(event, 'podcasts').all(),
    queryCollection(event, 'articles').all(),
    queryCollection(event, 'custom').all(),
  ]);

  const sitemap = new SitemapStream({
    hostname: siteUrl,
  });

  for (const entry of collectSitemapUrls({podcasts, articles, custom})) {
    sitemap.write(entry);
  }

  sitemap.end();
  return streamToPromise(sitemap);
}

/**
 * Serve the sitemap as application/xml for /sitemap.xml and the legacy path.
 */
export async function sitemapRequestHandler(event: H3Event) {
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8');
  return renderSitemapXml(event);
}
