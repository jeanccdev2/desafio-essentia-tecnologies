import { Router } from "express";
import TaskController from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const taskRouter = Router();
const taskController = new TaskController();

taskRouter.get("/", authMiddleware, taskController.getAllByUser.bind(taskController));

export default taskRouter;
