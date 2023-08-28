import { HttpRequest, HttpResponse } from "../../controllers/protocols";
import { Task } from "../../models/task";

export interface UpdadeTaskParams {
  title?: string;
  description?: string;
}

export interface IUpdateTaskController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Task>>;
}

export interface IUpdateTaskRepository {
  updateTask(id: string, params: UpdadeTaskParams): Promise<Task>;
}
