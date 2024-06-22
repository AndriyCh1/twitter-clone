import { env } from './env-config';

export const cloudfrontPath = (path: string) => {
  return env.CLOUDFRONT_URL + '/' + path;
};
