import express from "express";
import { ENV } from "./config/env.js";
import sequelize from "./database/database.js";
import authRouter from "./routes/auth.routes.js";
import { apiResponseWrapperMiddleware } from "./middlewares/api-response-wrapper.middleware.js";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware.js";
import taskRouter from "./routes/task.routes.js";
import cors from "cors";

const app = express();
const port = ENV.PORT;

async function main() {
  await sequelize.authenticate();

  setupMiddlewares();
  setupRoutes();
  app.use(errorHandlerMiddleware);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

function setupMiddlewares() {
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:4200",
    }),
  );
  app.use(apiResponseWrapperMiddleware);
}

function setupRoutes() {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/tasks", taskRouter);
}

main();
