import { queryCollection } from '@nuxt/content/server'

export default defineMcpResource({
  uri: 'resource://double-slash/episode-pages',
  description: 'Complete list of available episode pages for the podcast double slash.',
  cache: '1h',
  async handler(uri: URL) {
    const event = useEvent()

    const allDocs = await queryCollection(event, 'podcasts')
      .select('title', 'path', 'description')
      .all()

    const result = allDocs.map(doc => ({
      title: doc.title,
      path: doc.path,
      description: doc.description,
      url: `https://double-slash.dev${doc.path}`
    }))

    return {
      contents: [{
        uri: uri.href,
        mimeType: 'application/json',
        text: JSON.stringify(result, null, 2)
      }]
    }
  }
})
