export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: number;
      HOST: string;
      CORS_ORIGIN: string;
      COMMON_RATE_LIMIT_MAX_REQUESTS: number;
      DATABASE_URL: string;
      ACCESS_TOKEN_SECRET: string;
      NODE_ENV: 'development' | 'production' | 'test' | 'staging';
    }
  }
}
