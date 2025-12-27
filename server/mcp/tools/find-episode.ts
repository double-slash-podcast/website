import { queryCollectionSearchSections } from '@nuxt/content/server'
import Fuse from 'fuse.js'
import { z } from 'zod'

export default defineMcpTool({
  description: `Find episode pages corresponding to a query for the podcast double slash.

WHEN TO USE: Use this tool when you need to EXPLORE or SEARCH for episode about a topic but don't know the exact page path.

WHEN NOT TO USE: If you already know the specific page path, use get_episode_page directly instead.`,
  inputSchema: {
    query: z.string().describe('The search query to find relevant episode pages'),
  },
  cache: '1h',
  async handler({ query }) {
    const event = useEvent()
    const sections = await queryCollectionSearchSections(event, 'podcasts', {
      ignoredTags: ['code'],
      minHeading: 'h2',
      maxHeading: 'h3',
    })

    const fuse = new Fuse(sections, {
      keys: ['title', 'description', 'content'],
      threshold: 0.1,
    })

    const allDocs = fuse.search(query).slice(0, 5);

    return jsonResult(allDocs.map(doc => ({
      title: doc.item.title,
      // path: doc.item.id,
      content: doc.item.content,
      url: `https://double-slash.dev${doc.item.id}`
    })))
  }
})
