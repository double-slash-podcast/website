import {defineTransformer} from '@nuxt/content';

export default defineTransformer({
  name: 'podcast',
  extensions: ['.md'],
  transform(file) {
    return {
      ...file,
      publicationDate: file.publicationDate
        ? new Date(String(file.publicationDate))
        : undefined,
      episodeNumber:
        file.episodeNumber !== undefined
          ? Number(file.episodeNumber)
          : undefined,
      season: file.season !== undefined ? Number(file.season) : undefined,
    };
  },
});
