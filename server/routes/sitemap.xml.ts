import {sitemapRequestHandler} from '../utils/renderSitemapXml';

/**
 * XML sitemap of canonical public URLs (sitemaps.org protocol).
 * Prerendered during `pnpm generate` so nginx can serve /sitemap.xml statically.
 */
export default defineEventHandler(sitemapRequestHandler);
