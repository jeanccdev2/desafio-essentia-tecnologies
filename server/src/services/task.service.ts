import TaskModel from "../database/models/task.model.js";
import { PaginatedResponseDTO } from "../dtos/pagination.dto.js";
import type { PaginatedResponse, PaginationParams } from "../types/pagination.type.js";
import type { Task } from "../types/task.type.js";
import type { TaskCreateDTO } from "../dtos/task-create.dto.js";
import type { TaskUpdateDTO } from "../dtos/task-update.dto.js";
import { Op } from "sequelize";

export class TaskService {
  private taskRepository: typeof TaskModel;

  constructor() {
    this.taskRepository = TaskModel;
  }

  async getAllByUser(
    userId: string,
    pagination: PaginationParams,
  ): Promise<PaginatedResponse<Task>> {
    const statusFilter = pagination.status ? { status: pagination.status } : {};
    const searchFilter = pagination.searchText
      ? {
          [Op.or]: [
            { title: { [Op.like]: `%${pagination.searchText}%` } },
            { description: { [Op.like]: `%${pagination.searchText}%` } },
          ],
        }
      : {};

    const { rows, count } = await this.taskRepository.findAndCountAll({
      where: { user_id: userId, ...statusFilter, ...searchFilter },
      limit: pagination.limit,
      offset: pagination.offset,
      order: [["created_at", "DESC"]],
    });

    const tasksValues = rows.map((task) => task.dataValues);

    const response = new PaginatedResponseDTO(tasksValues, pagination.limit, count);

    return response;
  }

  async create(userId: string, payload: TaskCreateDTO): Promise<Task> {
    const task = await this.taskRepository.create({
      title: payload.title,
      description: payload.description ?? "",
      status: payload.status,
      user_id: userId,
    });

    return task.dataValues;
  }

  async update(userId: string, taskId: string, payload: TaskUpdateDTO): Promise<Task | null> {
    const [affected] = await this.taskRepository.update(payload, {
      where: { id: taskId, user_id: userId },
      returning: true,
    });

    if (affected === 0) {
      return null;
    }

    const updated = await this.taskRepository.findOne({ where: { id: taskId, user_id: userId } });

    return updated?.dataValues ?? null;
  }

  async delete(userId: string, taskId: string): Promise<boolean> {
    const deletedCount = await this.taskRepository.destroy({ where: { id: taskId, user_id: userId } });

    return deletedCount > 0;
  }
}
