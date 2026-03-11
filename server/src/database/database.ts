import { Sequelize } from "sequelize";
import { ENV } from "../config/env.js";
import config from "./config.js";

const environment = ENV.NODE_ENV || "development";

export const sequelize = new Sequelize({
  ...config.production,
  logging: environment === "development" ? console.log : false,
  define: {
    underscored: true,
  },
});

export default sequelize;
