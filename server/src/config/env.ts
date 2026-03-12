import "dotenv/config";

export const ENV = {
  PORT: Number(process.env.PORT!),
  NODE_ENV: process.env.NODE_ENV!,
  DB_USER: process.env.DB_USER!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
  DB_NAME: process.env.DB_NAME!,
  DB_HOST: process.env.DB_HOST!,
  DB_PORT: Number(process.env.DB_PORT!),
  DB_SSL: process.env.DB_SSL!,
  JWT_SECRET: process.env.JWT_SECRET!,
};
