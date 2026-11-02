export const PREFIX_AUDIO =
  'https://cdn.double-slash.dev/episodes';

export const buildEpisodeAudioUrl = (dsSlug: string): string =>
  `${PREFIX_AUDIO}/${dsSlug}.mp3`;
