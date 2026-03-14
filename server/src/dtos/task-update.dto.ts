import { IsIn, IsOptional, IsString } from "class-validator";
import type { TaskStatus } from "../types/task.type.js";

export class TaskUpdateDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsIn(["pending", "in_progress", "completed"], { message: "Status inválido" })
  @IsOptional()
  status?: TaskStatus;
}
