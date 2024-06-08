import dotenv from 'dotenv';
import { cleanEnv, host, port, testOnly } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  HOST: host({ devDefault: testOnly('localhost') }),
  PORT: port({ devDefault: testOnly(3000) }),
});
