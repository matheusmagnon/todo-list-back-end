import { HttpRequest, HttpResponse } from "controllers/protocols";
import { Task } from "models/task";
import {
  CreateTaskParams,
  ICreateTaskRepository,
  ICreateTasksController,
} from "./protocols";

export class CreateTaskController implements ICreateTasksController {
  constructor(private readonly createTaskRespository: ICreateTaskRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateTaskParams>
  ): Promise<HttpResponse<Task>> {
    try {
      //verificar campos obrigatórios
      const requiredFields = ["title", "description"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateTaskParams]?.length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }

      const task = await this.createTaskRespository.createTask(
        httpRequest.body!
      );

      return {
        statusCode: 201,
        body: task,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
