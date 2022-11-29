// import { NodePlopAPI } from 'plop';

module.exports = function (plop) {
  plop.setGenerator('episode', {
    description: 'Generate a new podcast episode',
    prompts: [
      {
        type: 'input',
        name: 'episodeNumber',
        message: 'Episode number 0XX',
      },
      {
        type: 'input',
        name: 'dsSlug',
        message: 'Slug reference to episode',
      },
      {
        type: 'input',
        name: 'duration',
        message: 'Duration episode in seconds',
      },
      {
        type: 'input',
        name: 'publicationDate',
        message: 'Publication episode date',
      },
      {
        type: 'input',
        name: 'title',
        message: 'Episode title',
      },
      {
        type: 'input',
        name: 'subtitle',
        message: 'Episode subtitle',
      },
      {
        type: 'input',
        name: 'episodeArtwork',
        message: 'Episode image URL',
      },
      {
        type: 'input',
        name: 'videoLink',
        message: 'Youtube video ID',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'content/podcasts/{{episodeNumber}}.{{dsSlug}}/index.md',
        templateFile: 'template/episode.hbs',
      },
    ],
  });
};
