import type { Task } from "./task.type.js";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null | undefined;

  tasks?: Task[];
};

export type UserResponse = Omit<User, "password">;
