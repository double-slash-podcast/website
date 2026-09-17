export const PREFIX_AUDIO =
  'https://double-slash.ams3.cdn.digitaloceanspaces.com';

export const buildEpisodeAudioUrl = (dsSlug: string): string =>
  `${PREFIX_AUDIO}/${dsSlug}.mp3`;
