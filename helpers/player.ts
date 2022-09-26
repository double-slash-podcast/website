import {typeDuration} from '~~/declaration';

/**
 * get duration for media file
 * @param length: number
 * @returns {hours: number, seconds: number, minutes: number}
 */
export const calculateTotalValue = (length: number): typeDuration => {
  // hours
  const hours = Math.floor(length / 3600);
  // minutes
  const minutes = Math.floor((length - hours * 3600) / 60);
  // seconds
  const seconds = Math.floor(length - hours * 3600 - minutes * 60);

  return {hours, minutes, seconds};
};
