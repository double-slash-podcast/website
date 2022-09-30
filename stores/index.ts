import {defineStore} from 'pinia';

export const useStore = defineStore('main', () => {
  const config = useRuntimeConfig();
  const {prefixAudioDev, prefixAudio, isDev} = config.public;

  // source for player
  const src = ref<string | undefined>(undefined);
  // update source player
  function setDsSlug(dsSlug: string | undefined, title: string): void {
    if (!dsSlug) {
      throw new Error(`dsSlug is undefined for ${title}`);
    }
    // remove tracking for dev
    src.value = `${isDev ? prefixAudioDev : prefixAudio}/${dsSlug}.mp3`;
  }

  return {src, setDsSlug};
});
