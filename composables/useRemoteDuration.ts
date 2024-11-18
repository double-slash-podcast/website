import { useRedis } from "#imports";
import estimateMP3DurationAxios from "~/helpers/duration/estimateMP3DurationAxios";

/**
 * get the size of remote file
 * @param url
 * @returns
 */
const useRemoteDuration = async (url: string) => {
  const redis = useRedis();

  const remoteEstimate = ref({ duration: 0, size: 0 });

  let estimate;
  // from cache
  const dbEstimate = await redis.get(url);

  if (dbEstimate) {
    return dbEstimate;
  }
  try {
    estimate = await estimateMP3DurationAxios(url);
    // save in DB
    await redis.set(url, estimate);
    if (estimate?.duration) {
      remoteEstimate.value = estimate as { duration: number; size: number };
    }
  } catch (e) {
    console.log(e);
    // throw new Error((e as Error).message);
  }
  return remoteEstimate;
};

export default useRemoteDuration;