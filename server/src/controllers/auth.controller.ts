import type { Request, Response } from "express";
import { RegisterDTO } from "../dtos/register.dto.js";
import { LoginDTO } from "../dtos/login.dto.js";
import { AuthService } from "../services/auth.service.js";
import { validateDTO } from "../utils/validate-dto.util.js";

class AuthController {
  private authService = new AuthService();

  async register(req: Request<object, object, RegisterDTO>, res: Response) {
    const { name, email, password } = await validateDTO(RegisterDTO, req.body);

    const response = await this.authService.register(name, email, password);
    res.apiResponseCreated("Usuário cadastrado com sucesso", response);
  }

  async login(req: Request<object, object, LoginDTO>, res: Response) {
    const { email, password } = await validateDTO(LoginDTO, req.body);

    const response = await this.authService.login(email, password);
    res.apiResponseOk("Login realizado com sucesso", response);
  }

  async me(req: Request, res: Response) {
    const user = req.user;
    res.apiResponseOk("Usuário encontrado", user);
  }
}

export default AuthController;
