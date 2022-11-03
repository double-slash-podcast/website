// declare module 'read-markdown';

type BaseInfosType = {
  siteUrl: string;
  email: string;
  titleDefault: string;
  imageDefault: string;
  descriptionDefault: string;
  prefixAudio: string;
  prefixAudioDev: string;
  youtubeChannelId: string;
  twitterUrl: string;
};

type PodcastInfosType = {
  title: string;
  // baseline
  subtitle: string;
  // short description
  summary: string;
  // long description
  description: string;
  // episodic || serial
  podcastType: string;
  siteUrl: string;
  imageUrl: string;
  feedUrl: string;
  language: string;
  copyright: string;
  authorName: string;
  ownerName: string;
  ownerEmail: string;
  managingEditor: string;
  webMaster: string;
  explicit: string;
  publicationDate: string;
  category1: string;
  timeToLive: number;
  facebookImage: string;
};

type PodcastContentType = {
  _path: string;
  title: string;
  description: string;
  excerpt: {type: string; children: [][]};
  publicationDate: string;
  status: string;
  author: string;
  categories: string[];
  duration: number;
  dsSlug?: string;
  videoID?: string;
  url?: string;
  episodeNumber: number;
  episodeType: string;
  explicit: boolean;
  season: number;
  subtitle: string;
  description: string;
  guid?: string;
  episodeArtwork?: string;
  body: {type: string; children: [][]; toc: {}[]};
};

type PodcastItems = {
  title: string;
  subtitle: string;
  url: string;
  duration: number;
  body: string;
  slug: string;
  season: string;
  episodeNumber: string;
  episodeType: string;
  publicationDate: string;
  author: string;
  explicit: string;
  categories: string;
};

declare module '@nuxt/schema' {
  interface AppConfig {
    globalInfos: PodcastInfosType;
  }
}

type typeDuration = {hours: number; minutes: number; seconds: number};

type typeStatusPlayer = 'play' | 'pause';

type typeSpeedPlayer = 0.5 | 0.75 | 1.0 | 1.25 | 1.5 | 1.75 | 2.0;
