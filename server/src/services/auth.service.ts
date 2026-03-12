import { LoginResponseDTO } from "../dtos/login.dto.js";
import argon2 from "argon2";
import { UsersService } from "./users.service.js";

export class AuthService {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async register(name: string, email: string, password: string): Promise<LoginResponseDTO> {
    const user = await this.usersService.createUser(name, email, password);

    const userResponse: LoginResponseDTO = LoginResponseDTO.fromModel("token", user);

    return userResponse;
  }

  async login(email: string, password: string): Promise<LoginResponseDTO> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await argon2.verify(user.getDataValue("password"), password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const userResponse: LoginResponseDTO = LoginResponseDTO.fromModel("token", user);

    return userResponse;
  }
}
