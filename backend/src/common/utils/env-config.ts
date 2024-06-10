import dotenv from 'dotenv';
import { cleanEnv, host, port, str, testOnly } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  HOST: host({ devDefault: testOnly('localhost') }),
  PORT: port({ devDefault: testOnly(3000) }),
  DATABASE_URL: str(),
  ACCESS_TOKEN_SECRET: str(),
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  S3_ACCESS_KEY: str(),
  S3_SECRET_ACCESS_KEY: str(),
  S3_REGION: str(),
  S3_BUCKET: str(),
});
