import { Task } from "models/task";

export interface CreateTaskParams {
  title: string;
  description: string;
}

export interface ICreateTaskRepository {
  createTask(params: CreateTaskParams): Promise<Task>;
}
