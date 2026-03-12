import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/register", authController.register.bind(authController));
authRouter.post("/login", authController.login.bind(authController));
authRouter.get("/me", authMiddleware, authController.me.bind(authController));

export default authRouter;
