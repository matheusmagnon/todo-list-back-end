import { HttpRequest, HttpResponse } from "../../controllers/protocols";
import { Task } from "../../models/task";
import { IDeleteTaskController, IDeleteTaskRepository } from "./protocols";

export class DeleteTaskController implements IDeleteTaskController {
  constructor(private readonly deleteTaskRespository: IDeleteTaskRepository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Task>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 404,
          body: "Missing task id",
        };
      }
      const task = await this.deleteTaskRespository.deleteTask(id);

      return {
        statusCode: 200,
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
