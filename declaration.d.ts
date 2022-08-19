declare module 'read-markdown';

export type PodcastGlobalInfosType = {
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
};

export type PodcastContentType = {
  _path: string;
  title: string;
  description: string;
  excerpt: {type: string; children: [][]};
  publicationDate: string;
  status: string;
  author: string;
  categories: string[];
  duration: number;
  dsSlug: string;
  videoUrl: string;
  url?: string;
  episodeNumber: number;
  episodeType: string;
  explicit: boolean;
  season: number;
  subtitle: string;
  guid: string;
  body: {type: string; children: [][]; toc: {}[]};
};

export type PodcastItems = {
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
    globalInfos: PodcastGlobalInfosType;
  }
}

export {};
