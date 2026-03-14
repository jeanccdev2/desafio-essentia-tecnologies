import type { Request, Response } from "express";
import { TaskService } from "../services/task.service.js";
import { PaginationParamsDTO } from "../dtos/pagination.dto.js";
import { validateDTO } from "../utils/validate-dto.util.js";
import { TaskCreateDTO } from "../dtos/task-create.dto.js";

class TaskController {
  private taskService = new TaskService();

  async getAllByUser(req: Request<object, PaginationParamsDTO, object>, res: Response) {
    const pagination = await validateDTO(PaginationParamsDTO, req.query);
    const userId = req.user.id;

    const paginatedTasks = await this.taskService.getAllByUser(userId, pagination);

    res.apiResponseOk("Tarefas encontradas com sucesso", paginatedTasks);
  }

  async create(req: Request<object, object, TaskCreateDTO>, res: Response) {
    const payload = await validateDTO(TaskCreateDTO, req.body);
    const userId = req.user.id;

    const task = await this.taskService.create(userId, payload);

    res.apiResponseCreated("Tarefa criada com sucesso", task);
  }
}

export default TaskController;
