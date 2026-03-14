import { DataTypes, type Optional, type ModelDefined } from "sequelize";
import sequelize from "../database.js";
import type { Task } from "../../types/task.type.js";
import UserModel from "./user.model.js";

type TaskInputtableTypes = Optional<Task, "id" | "created_at" | "updated_at" | "deleted_at">;
type TaskSequelizeModelCreator = ModelDefined<Task, TaskInputtableTypes>;

const TaskModel: TaskSequelizeModelCreator = sequelize.define(
  "tasks",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "tasks",
    timestamps: true,
    paranoid: true,
  },
);

TaskModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
});

UserModel.hasMany(TaskModel, {
  foreignKey: "user_id",
  as: "tasks",
});

export default TaskModel;
