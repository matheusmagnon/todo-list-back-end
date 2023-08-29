import { Task } from "models/task";

export interface IGetTasksRepository {
  getTasks(): Promise<Task[]>;
}
