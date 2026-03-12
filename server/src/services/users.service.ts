import UserModel from "../database/models/user.model.js";
import argon2 from "argon2";

export class UsersService {
  private userRepository: typeof UserModel;

  constructor() {
    this.userRepository = UserModel;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(name: string, email: string, password: string) {
    const hashedPassword = await argon2.hash(password);
    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
