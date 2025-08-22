import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export const PodcastStatus = z.enum(['draft', 'published', 'scheduled']);
export const EpisodeType = z.enum(['full', 'trailer', 'bonus']);

export const ArticleAuthorSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
});

export default defineContentConfig({
  collections: {
    podcasts: defineCollection({
      type: 'page',
      source: 'podcasts/**/*.md',
      schema: z.object({
        publicationDate: z.string().min(1, 'publicationDate requis'),
        status: PodcastStatus,
        author: z.string().min(1),
        categories: z.array(z.string()).nonempty(),
        duration: z.union([z.string(), z.number()]).optional().nullable(),
        episodeNumber: z.number().int().nonnegative(),
        episodeType: EpisodeType,
        explicit: z.boolean(),
        season: z.number().int().nonnegative(),
        dsSlug: z.string().min(1),
        title: z.string().min(1),
        subtitle: z.string().min(1),
        episodeArtwork: z.string().url(),
        description: z.string().min(1),
        videoLink: z.string().min(1),
        tags: z.array(z.string()).default([]),
      })
    }),
    articles: defineCollection({
      type: 'page',
      source: 'articles/**/*.md',
      schema: z.object({
        publicationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format YYYY-MM-DD requis'),
        title: z.string().min(1),
        description: z.string().min(1),
        author: ArticleAuthorSchema,
      }),
    }),
    custom: defineCollection({
      type: 'page',
      source: 'custom/**/*.md',
      schema: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
      }),
    })
  }
})