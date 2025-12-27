import { queryCollection } from '@nuxt/content/server'

export default defineMcpTool({
  description: `Lists all available episode pages for the podcast double slash.

WHEN TO USE: Use this tool when you need to EXPLORE or SEARCH for episode about a topic but don't know the exact page path.

WHEN NOT TO USE: If you already know the specific page path, use get_episode_page directly instead.`,
  inputSchema: {},
  cache: '1h',
  async handler() {
    const event = useEvent()

    const allDocs = await queryCollection(event, 'podcasts')
      .select('title', 'path', 'description', 'tags')
      .all()

    return jsonResult(allDocs.map(doc => ({
      title: doc.title,
      path: doc.path,
      description: doc.description,
      tags: doc.tags,
      url: `https://double-slash.dev${doc.path}`
    })))
  }
})
