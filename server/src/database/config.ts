import { ENV } from "../config/env.js";
import type { Options } from "sequelize";

const common: Options = {
  username: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
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
} satisfies Record<string, Options>;

export default config;
