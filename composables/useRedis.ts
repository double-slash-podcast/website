import {Redis} from '@upstash/redis';

let redis: Redis;

export const useRedis = (): Redis => {
  const config = useRuntimeConfig();
  if (redis) {
    return redis;
  }

  redis = new Redis({
    url: config.REDIS_URL as string,
    token: config.REDIS_TOKEN as string,
  });

  return redis;
};
