/**
 * Slim Content queries for listing cards (no markdown body in the payload).
 */

/**
 * Episode fields needed by EpisodeHeadings and PlayerRemote.
 */
export function podcastListingQuery() {
  return queryCollection('podcasts').select(
    'path',
    'title',
    'description',
    'publicationDate',
    'episodeNumber',
    'episodeArtwork',
    'duration',
    'dsSlug',
  );
}

/**
 * Article fields needed by ArticleList and the homepage teaser.
 */
export function articleListingQuery() {
  return queryCollection('articles').select(
    'path',
    'title',
    'description',
    'publicationDate',
    'author',
  );
}
