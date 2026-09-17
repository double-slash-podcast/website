/** Podcast frontmatter status that may appear on the public site. */
export const PUBLISHED_STATUS = 'published';

/**
 * True when a podcast (or other status-bearing doc) is safe to list publicly.
 * Draft and scheduled entries stay out of sitemap, agent markdown, and WebMCP.
 */
export function isPublishedStatus(
  status?: string | null,
): status is typeof PUBLISHED_STATUS {
  return status === PUBLISHED_STATUS;
}
