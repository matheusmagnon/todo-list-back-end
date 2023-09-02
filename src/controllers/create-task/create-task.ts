import {
  HttpRequest,
  HttpResponse,
  IController,
} from "../../controllers/protocols";
import { Task } from "models/task";
import { CreateTaskParams, ICreateTaskRepository } from "./protocols";
import { badRequest, created, serverError } from "../../controllers/helpers";

export class CreateTaskController implements IController {
  constructor(private readonly createTaskRespository: ICreateTaskRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateTaskParams>
  ): Promise<HttpResponse<Task | string>> {
    try {
      //verificar campos obrigatórios
      const requiredFields = ["title", "description"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateTaskParams]?.length) {
          return badRequest(`Field ${field} is required`);
        }
      }

      // attributesTask.isCompleted = true;
      // console.log(attributesTask);

      const task = await this.createTaskRespository.createTask(
        httpRequest.body!
      );

      return created<Task>(task);
    } catch (error) {
      return serverError();
    }
  }
}
