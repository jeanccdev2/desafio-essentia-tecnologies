import type { Task } from "./task.type.js";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;

  tasks?: Task[];
};
