import { Sequelize } from "sequelize";
import { ENV } from "../config/env.js";

const environment = ENV.NODE_ENV || "development";

export const sequelize = new Sequelize({
  username: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  dialect: "mysql",
  logging: environment === "development" ? console.log : false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  define: {
    underscored: true,
  },
});

export default sequelize;
