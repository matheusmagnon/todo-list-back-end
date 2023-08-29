import { badRequest, ok, serverError } from "../../controllers/helpers";
import {
  HttpRequest,
  HttpResponse,
  IController,
} from "../../controllers/protocols";
import { Task } from "../../models/task";
import { IDeleteTaskRepository } from "./protocols";

export class DeleteTaskController implements IController {
  constructor(private readonly deleteTaskRespository: IDeleteTaskRepository) {}
  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Task | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing task id");
      }
      const task = await this.deleteTaskRespository.deleteTask(id);

      return ok<Task>(task);
    } catch (error) {
      return serverError();
    }
  }
}
