import type { Request, Response } from "express";
import { TaskService } from "../services/task.service.js";
import { PaginationParamsDTO } from "../dtos/pagination.dto.js";
import { validateDTO } from "../utils/validate-dto.util.js";

class TaskController {
  private taskService = new TaskService();

  async getAllByUser(req: Request<object, PaginationParamsDTO, object>, res: Response) {
    const pagination = await validateDTO(PaginationParamsDTO, req.query);
    const userId = req.user.id;

    const paginatedTasks = await this.taskService.getAllByUser(userId, pagination);

    res.apiResponseOk("Tarefas encontradas com sucesso", paginatedTasks);
  }
}

export default TaskController;
