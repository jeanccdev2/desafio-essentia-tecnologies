import type { Request, Response } from "express";
import { RegisterDTO } from "../dtos/register.dto.js";
import { LoginDTO } from "../dtos/login.dto.js";
import { AuthService } from "../services/auth.service.js";
import { validateDTO } from "../utils/validate-dto.util.js";

class AuthController {
  private authService = new AuthService();

  async register(req: Request<object, object, RegisterDTO>, res: Response) {
    const { name, email, password } = await validateDTO(RegisterDTO, req.body);

    await this.authService.register(name, email, password);
    res.json({ name, email });
  }

  async login(req: Request<object, object, LoginDTO>, res: Response) {
    const { email, password } = await validateDTO(LoginDTO, req.body);

    const response = await this.authService.login(email, password);
    res.json(response);
  }

  async me(req: Request, res: Response) {
    const user = req.user;
    res.json(user);
  }
}

export default AuthController;
