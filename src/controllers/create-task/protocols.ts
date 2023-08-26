import { HttpRequest, HttpResponse } from "controllers/protocols";
import { Task } from "models/task";

export interface ICreateTasksController {
  handle(
    httpRequest: HttpRequest<CreateTaskParams>
  ): Promise<HttpResponse<Task>>;
}

export interface CreateTaskParams {
  title: string;
  description: string;
}

export interface ICreateTaskRepository {
  createTask(params: CreateTaskParams): Promise<Task>;
}
