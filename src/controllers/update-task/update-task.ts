import { HttpRequest, HttpResponse } from "controllers/protocols";
import { Task } from "../../models/task";
import { IUpdateTaskController, IUpdateTaskRepository } from "./protocols";

export class UpdateTaskController implements IUpdateTaskController {
  constructor(private readonly updateTaskRepository: IUpdateTaskRepository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Task>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
      }

      const task = await this.updateTaskRepository.updateTask(id, body);

      return {
        statusCode: 200,
        body: task,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
