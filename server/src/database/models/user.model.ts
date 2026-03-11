import { DataTypes, type Optional, type ModelDefined } from "sequelize";
import sequelize from "../database.js";
import type { User } from "../../types/user.type.js";

type UserInputtableTypes = Optional<User, "id" | "created_at" | "updated_at" | "deleted_at">;
type UserSequelizeModelCreator = ModelDefined<User, UserInputtableTypes>;

const UserModel: UserSequelizeModelCreator = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    paranoid: true,
  },
);

export default UserModel;
