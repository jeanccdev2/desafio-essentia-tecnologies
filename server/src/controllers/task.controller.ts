import type { Request, Response } from "express";
import { TaskService } from "../services/task.service.js";
import { PaginationParamsDTO } from "../dtos/pagination.dto.js";
import { validateDTO } from "../utils/validate-dto.util.js";
import { TaskCreateDTO } from "../dtos/task-create.dto.js";
import { TaskUpdateDTO } from "../dtos/task-update.dto.js";
import { NotFoundException } from "../exceptions/not-found.exception.js";

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

  async update(req: Request<{ id: string }, object, TaskUpdateDTO>, res: Response) {
    const payload = await validateDTO(TaskUpdateDTO, req.body);
    const userId = req.user.id;
    const taskId = req.params.id;

    const task = await this.taskService.update(userId, taskId, payload);

    if (!task) {
      throw new NotFoundException("Tarefa não encontrada");
    }

    res.apiResponseOk("Tarefa atualizada com sucesso", task);
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    const userId = req.user.id;
    const taskId = req.params.id;

    const deleted = await this.taskService.delete(userId, taskId);

    if (!deleted) {
      throw new NotFoundException("Tarefa não encontrada");
    }

    res.apiResponseOk("Tarefa excluída com sucesso");
  }
}

export default TaskController;
