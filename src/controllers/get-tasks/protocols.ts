import { HttpResponse } from "controllers/protocols";
import { Task } from "models/task";

export interface IGetTasksController {
  handle(): Promise<HttpResponse<Task[]>>;
}

export interface IGetTasksRepository {
  getTasks(): Promise<Task[]>;
}
