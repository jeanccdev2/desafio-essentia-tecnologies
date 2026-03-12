import TaskModel from "../database/models/task.model.js";
import { PaginatedResponseDTO } from "../dtos/pagination.dto.js";
import type { PaginatedResponse, PaginationParams } from "../types/pagination.type.js";
import type { Task } from "../types/task.type.js";

export class TaskService {
  private taskRepository: typeof TaskModel;

  constructor() {
    this.taskRepository = TaskModel;
  }

  async getAllByUser(
    userId: string,
    pagination: PaginationParams,
  ): Promise<PaginatedResponse<Task>> {
    const tasks = await this.taskRepository.findAll({
      where: { user_id: userId },
      limit: pagination.limit,
      offset: pagination.offset,
    });

    const tasksValues = tasks.map((task) => task.dataValues);

    const response = new PaginatedResponseDTO(tasksValues, pagination.limit, tasksValues.length);

    return response;
  }
}
