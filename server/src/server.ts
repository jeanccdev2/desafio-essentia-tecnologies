import express from "express";
import { ENV } from "./config/env.js";
import sequelize from "./database/database.js";

const app = express();
const port = ENV.PORT;

async function main() {
  await sequelize.authenticate();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

main();
