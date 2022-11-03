export const baseInfos: BaseInfosType = {
  siteUrl: 'https://double-slash.dev',
  email: 'info@slash-podcast.fr',
  titleDefault: 'Double Slash',
  imageDefault:
    'https://res.cloudinary.com/doubleslash/image/upload/v1597260128/doubleSlashDefault_kyl8s9.png',
  descriptionDefault:
    'Le podcast sur le code, le développement web et les outils modernes.',
  prefixAudio:
    'https://chtbl.com/track/79E812/double-slash.ams3.cdn.digitaloceanspaces.com',
  prefixAudioDev: 'https://double-slash.ams3.cdn.digitaloceanspaces.com',
  // https://www.youtube.com/feeds/videos.xml?channel_id=
  youtubeChannelId: 'UCp5DGBAX2XNJXeOVAo7bICQ',
};

export const podcastInfos: PodcastInfosType = {
  title: baseInfos.titleDefault,
  // baseline
  subtitle: baseInfos.descriptionDefault,
  // short description
  summary: `Double Slash, un podcast sur le développement web. Retrouvez-nous régulièrement pour parler de sujets variés tels que la JAMStack, l’accessibilité, l’écoconception, React.js, Vue.js, Next.js, Nuxt.js, le CSS et des retours d’expériences sur des implémentations.`,
  // long description
  description: `Double Slash, un podcast avec 2 animateurs qui se retrouvent pour discuter des outils et des techniques pour le développement moderne de site web et d’application web.
      Retrouvez-nous régulièrement pour parler de sujets variés tels que la JAMStack, l’accessibilité, l’écoconception, React JS, Vue JS et des retours d’expériences sur des implémentations.
      Également, des débats autour de sujets polémiques tels que la communication entre développeurs/designers ou comment avoir un discours compréhensible par les clients.
      Nous serons accompagnés de temps en temps par des invités experts dans leur domaine pour approfondir un sujet et avoir des retours d’expériences.
      Faites-nous vos retours par mail sur <a href="mailto:info@slash-podcast.fr">info@slash-podcast.fr</a>
      `,
  // episodic || serial
  podcastType: `episodic`,
  siteUrl: baseInfos.siteUrl,
  imageUrl:
    'https://res.cloudinary.com/doubleslash/image/upload/v1666362854/ArtworkPodcastMain_w6nuaf.png',
  facebookImage:
    'https://asset.cloudinary.com/doubleslash/b8ab50c46bb5201ee77d2a8d85a2d1bc',
  feedUrl: `${baseInfos.siteUrl}/pocast-rss-feed.xml`,
  language: `fr-FR`,
  copyright: `Copyright © 2022 Double Slash`,
  authorName: `Alex Duval/Patrick Faramaz`,
  ownerName: `Double Slash`,
  ownerEmail: baseInfos.email,
  managingEditor: baseInfos.email,
  webMaster: baseInfos.email,
  explicit: `no`,
  publicationDate: `April 01, 2020 10:00:00 GMT`,
  category1: `Technology`,
  timeToLive: 60,
};
