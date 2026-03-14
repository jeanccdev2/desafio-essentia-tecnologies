import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import type { TaskStatus } from "../types/task.type.js";

export class TaskCreateDTO {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsIn(["pending", "in_progress", "completed"], { message: "Status inválido" })
  status: TaskStatus = "pending";
}
