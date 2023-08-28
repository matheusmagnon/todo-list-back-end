import { HttpRequest, HttpResponse } from "../../controllers/protocols";
import { Task } from "../../models/task";

export interface IDeleteTaskController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Task>>;
}

export interface IDeleteTaskRepository {
  deleteTask(Id: string): Promise<Task>;
}
