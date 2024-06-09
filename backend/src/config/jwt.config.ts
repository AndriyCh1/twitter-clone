import { env } from '../common/utils/env-config';

export type JwtConfig = {
  secret: string;
  expiresIn: string;
};

export type JwtPayload = {
  sub: string;
  email: string;
};

export const accessTokenConfig: JwtConfig = {
  secret: env.ACCESS_TOKEN_SECRET,
  expiresIn: '10h',
};
