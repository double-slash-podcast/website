export const SITE_ORIGIN = 'https://double-slash.dev';

export type AgentDiscoveryLink = {
  href: string;
  rel: string;
  type?: string;
  title?: string;
};

/**
 * IANA-registered relations advertised to agents (RFC 8288 / RFC 9727).
 * Root-relative hrefs stay portable across http/https and ports.
 */
export const agentDiscoveryLinks: AgentDiscoveryLink[] = [
  {
    href: '/llms.txt',
    rel: 'describedby',
    type: 'text/markdown',
    title: 'Site index for LLMs',
  },
  {
    href: '/.well-known/api-catalog',
    rel: 'api-catalog',
    type: 'application/linkset+json',
  },
  {
    href: '/sitemaps.xml',
    rel: 'sitemap',
    type: 'application/xml',
  },
  {
    href: '/podcast-rss-feed.xml',
    rel: 'alternate',
    type: 'application/rss+xml',
    title: 'Podcast RSS feed',
  },
];

/**
 * RFC 8288 Link header value pointing at machine-readable discovery resources.
 */
export function buildAgentDiscoveryLinkHeader(
  links: AgentDiscoveryLink[] = agentDiscoveryLinks,
): string {
  return links
    .map(link => {
      const parts = [`<${link.href}>`, `rel="${link.rel}"`];
      if (link.type) {
        parts.push(`type="${link.type}"`);
      }
      if (link.title) {
        parts.push(`title="${link.title}"`);
      }
      return parts.join('; ');
    })
    .join(', ');
}

export const AGENT_DISCOVERY_LINK_HEADER = buildAgentDiscoveryLinkHeader();

type LinksetTarget = {
  href: string;
  type?: string;
  title?: string;
};

/**
 * RFC 9727 / RFC 9264 linkset of this origin's machine-readable resources.
 * Skips the catalog self-link so the document does not recurse.
 */
export function buildApiCatalogDocument(
  origin = SITE_ORIGIN,
  links: AgentDiscoveryLink[] = agentDiscoveryLinks,
): {linkset: Record<string, unknown>[]} {
  const relations: Record<string, LinksetTarget[]> = {};

  for (const link of links) {
    if (link.rel === 'api-catalog') {
      continue;
    }

    const target: LinksetTarget = {href: `${origin}${link.href}`};
    if (link.type) {
      target.type = link.type;
    }
    if (link.title) {
      target.title = link.title;
    }

    (relations[link.rel] ??= []).push(target);
  }

  return {
    linkset: [
      {
        anchor: `${origin}/`,
        ...relations,
      },
    ],
  };
}
