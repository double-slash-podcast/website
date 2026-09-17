import {sitemapRequestHandler} from '../utils/renderSitemapXml';

/**
 * Legacy path kept so previously submitted crawler URLs still resolve.
 * Canonical location is /sitemap.xml.
 */
export default defineEventHandler(sitemapRequestHandler);
