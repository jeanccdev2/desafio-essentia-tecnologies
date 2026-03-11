import type { User } from "./user.type.js";

export type TaskStatus = "pending" | "in_progress" | "completed";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;

  user?: User;
};
