import fs from 'fs';
import path from 'path';
import {describe, expect, test} from 'vitest';
import {
  AGENT_DISCOVERY_LINK_HEADER,
  agentDiscoveryLinks,
  buildAgentDiscoveryLinkHeader,
  buildApiCatalogDocument,
} from '../app/utils/agentDiscovery';

const API_CATALOG_PATH = path.join(
  process.cwd(),
  'public/.well-known/api-catalog',
);

describe('buildAgentDiscoveryLinkHeader', () => {
  test('uses RFC 8288 angle-bracket targets and registered relations', () => {
    const header = buildAgentDiscoveryLinkHeader();

    expect(header).toContain('</.well-known/api-catalog>; rel="api-catalog"');
    expect(header).toContain('</llms.txt>; rel="describedby"');
    expect(header).toContain('</sitemaps.xml>; rel="sitemap"');
    expect(header).toContain('</podcast-rss-feed.xml>; rel="alternate"');
    expect(header).not.toMatch(/Link:\s*"/);
  });

  test('comma-separates multiple links in one header value', () => {
    const header = buildAgentDiscoveryLinkHeader();
    const relCount = (header.match(/rel="/g) ?? []).length;

    expect(relCount).toBe(agentDiscoveryLinks.length);
    expect(header.split(', ').length).toBe(agentDiscoveryLinks.length);
  });
});

describe('api-catalog document', () => {
  test('public file matches the RFC 9264 linkset builder', () => {
    const fromDisk = JSON.parse(fs.readFileSync(API_CATALOG_PATH, 'utf8'));

    expect(fromDisk).toEqual(buildApiCatalogDocument());
  });

  test('does not recurse into itself via rel=api-catalog', () => {
    const catalog = buildApiCatalogDocument();
    const [entry] = catalog.linkset;

    expect(entry).not.toHaveProperty('api-catalog');
    expect(entry.anchor).toBe('https://double-slash.dev/');
  });
});

describe('Nitro discovery wiring', () => {
  test('plugin appends the shared Link header value', () => {
    const src = fs.readFileSync(
      path.join(process.cwd(), 'server/plugins/agentDiscoveryHeaders.ts'),
      'utf8',
    );

    expect(src).toContain('appendResponseHeader');
    expect(src).toContain('AGENT_DISCOVERY_LINK_HEADER');
    expect(AGENT_DISCOVERY_LINK_HEADER).toContain('rel="api-catalog"');
  });
});
