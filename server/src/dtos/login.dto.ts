import type { Model } from "sequelize";
import type { User, UserResponse } from "../types/user.type.js";
import type { UserInputtableTypes } from "../database/models/user.model.js";

export class LoginDTO {
  constructor(
    public email: string,
    public password: string,
  ) {}
}

export class LoginResponseDTO {
  constructor(
    public token: string,
    public user: UserResponse,
  ) {}

  static fromModel(token: string, user: Model<User, UserInputtableTypes>) {
    return new LoginResponseDTO(token, {
      id: user.getDataValue("id"),
      name: user.getDataValue("name"),
      email: user.getDataValue("email"),
      created_at: user.getDataValue("created_at"),
      updated_at: user.getDataValue("updated_at"),
    });
  }
}
