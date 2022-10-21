import {defineStore} from 'pinia';

export const usePlayerStore = defineStore('player', () => {
  const config = useRuntimeConfig();
  const {prefixAudioDev, prefixAudio, isDev} = config.public;

  // source for player
  const src = ref<string | undefined>(undefined);
  // current title of podcast player
  const currentTitle = ref<string | undefined>(undefined);
  // current status of player
  const statusPlayer = ref<typeStatusPlayer>('pause');

  /**
   * update source player and title
   */
  function setDsSlug(dsSlug: string | undefined, title: string): void {
    if (!dsSlug) {
      throw new Error(`dsSlug is undefined for ${title}`);
    }
    // remove tracking for dev
    src.value = `${isDev ? prefixAudioDev : prefixAudio}/${dsSlug}.mp3`;
    currentTitle.value = title;
  }

  /**
   * update status player
   */
  function setStatusPlayer(status: typeStatusPlayer) {
    statusPlayer.value = status;
  }

  return {src, currentTitle, statusPlayer, setDsSlug, setStatusPlayer};
});
