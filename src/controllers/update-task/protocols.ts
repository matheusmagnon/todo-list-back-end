import { HttpRequest, HttpResponse } from "../../controllers/protocols";
import { Task } from "../../models/task";

export interface UpdadeTaskParams {
  title?: string;
  description?: string;
  isCompleted?: boolean;
}

export interface IUpdateTaskRepository {
  updateTask(id: string, params: UpdadeTaskParams): Promise<Task>;
}
