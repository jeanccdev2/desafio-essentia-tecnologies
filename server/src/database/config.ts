import { ENV } from "../config/env.js";
import type { Dialect } from "sequelize";

export type DbConfig = {
  username: string | undefined;
  password: string | undefined;
  database: string | undefined;
  host: string | undefined;
  port: number | undefined;
  dialect: Dialect;
  dialectOptions?: object;
};

const common: DbConfig = {
  username: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  host: ENV.DB_HOST,
  port: ENV.DB_PORT ? Number(ENV.DB_PORT) : undefined,
  dialect: "mysql",
};

export const config = {
  development: common,
  test: common,
  production: {
    ...common,
    dialectOptions: {
      ssl: ENV.DB_SSL === "true" ? { require: true, rejectUnauthorized: false } : undefined,
    },
  },
} satisfies Record<string, DbConfig>;

export default config;
