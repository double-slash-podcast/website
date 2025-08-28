/**
 * format object time to string
 * @param time - {hours: string, minutes: string, seconds: string}
 * @returns string
 */
export const useFormatTime = (time: typeDuration): string => {
  const nuxtApp = useNuxtApp();
  const {$formatTime} = nuxtApp;
  return `${$formatTime(time.hours)}:${$formatTime(time.minutes)}:${$formatTime(
    time.seconds,
  )}`;
};
