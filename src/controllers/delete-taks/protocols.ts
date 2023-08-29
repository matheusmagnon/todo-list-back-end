import { Task } from "../../models/task";

export interface IDeleteTaskRepository {
  deleteTask(Id: string): Promise<Task>;
}
