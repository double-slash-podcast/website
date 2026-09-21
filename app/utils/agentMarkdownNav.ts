import {escapeMarkdownLinkLabel} from './frontmatter';
import {SITE_ORIGIN} from './agentDiscovery';

export type AgentNavLink = {
  title: string;
  href: string;
};

/** Site sections advertised to agents, matching the public Navbar. */
export const AGENT_NAV_LINKS: AgentNavLink[] = [
  {title: 'Accueil', href: '/'},
  {title: 'Podcasts', href: '/podcasts/'},
  {title: 'Blog', href: '/articles/'},
  {title: 'Soutenir', href: '/nous-soutenir/'},
];

const siteOrigin = new URL(SITE_ORIGIN).origin;

/**
 * Markdown bullet list of site sections (no YAML, no llms.txt).
 */
export function buildAgentNavMarkdown(
  links: AgentNavLink[] = AGENT_NAV_LINKS,
): string {
  return links
    .map(link => `- [${escapeMarkdownLinkLabel(link.title)}](${link.href})`)
    .join('\n');
}

/**
 * Root-relative path for a Navbar href, including same-origin absolute URLs.
 */
export function toSiteNavPath(href: string): string | undefined {
  const trimmed = href.trim();
  if (!trimmed) {
    return undefined;
  }

  try {
    const url = new URL(trimmed, SITE_ORIGIN);
    if (url.origin !== siteOrigin) {
      return undefined;
    }

    return `${url.pathname}${url.search}` || '/';
  } catch {
    return undefined;
  }
}

/**
 * Navbar container in prerendered HTML: the fixed top bar, or the home link parent.
 */
function findNavbar(document: Document): Element | null {
  const fixed = document.querySelector('.fixed.top-0');
  if (fixed) {
    return fixed;
  }

  const home = document.querySelector('a[title="accueil"], a[title="Accueil"]');
  return home?.parentElement ?? null;
}

/**
 * Human label for a navbar anchor (`//` and empty text fall back to title / Accueil).
 */
function navLinkTitle(anchor: Element, href: string): string {
  const raw = (anchor.getAttribute('title') || anchor.textContent || '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!raw || raw === '//') {
    return href === '/' ? 'Accueil' : raw;
  }

  if (raw.toLowerCase() === 'accueil') {
    return 'Accueil';
  }

  return raw;
}

/**
 * Read Navbar links from prerendered HTML. Falls back to AGENT_NAV_LINKS.
 * Skips the search button (not an anchor) and footer / main links.
 */
export function extractSiteNavLinks(document: Document): AgentNavLink[] {
  const navbar = findNavbar(document);
  if (!navbar) {
    return AGENT_NAV_LINKS;
  }

  const seen = new Set<string>();
  const links: AgentNavLink[] = [];

  for (const anchor of navbar.querySelectorAll('a[href]')) {
    const href = toSiteNavPath(anchor.getAttribute('href')?.trim() ?? '');
    if (!href || seen.has(href)) {
      continue;
    }

    const title = navLinkTitle(anchor, href);
    if (!title) {
      continue;
    }

    seen.add(href);
    links.push({title, href});
  }

  return links.length >= 2 ? links : AGENT_NAV_LINKS;
}
