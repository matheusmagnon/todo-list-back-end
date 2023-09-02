import { Task } from "models/task";

export interface CreateTaskParams {
  title: string;
  description: string;
  // isCompleted?: boolean;
}

export interface ICreateTaskRepository {
  createTask(params: CreateTaskParams): Promise<Task>;
}
