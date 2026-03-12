import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/register", authController.register.bind(authController));
authRouter.post("/login", authController.login.bind(authController));
authRouter.get("/me", authController.me.bind(authController));

export default authRouter;
