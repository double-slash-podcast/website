export type typeDuration = {minutes: number; seconds: number};

/**
 * get duration for media file
 * @param length: number
 * @returns {{seconds: number, minutes: number}}
 */
export const calculateTotalValue = (length: number): typeDuration => {
  const minutes = Math.floor(length / 60);
  const seconds = +(length - minutes * 60).toFixed(1);
  return {minutes, seconds};
};
