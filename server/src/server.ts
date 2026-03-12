import express from "express";
import { ENV } from "./config/env.js";
import sequelize from "./database/database.js";
import authRouter from "./routes/auth.routes.js";

const app = express();
const port = ENV.PORT;

async function main() {
  await sequelize.authenticate();

  setupRoutes();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

function setupRoutes() {
  app.use("/auth", authRouter);
}

main();
