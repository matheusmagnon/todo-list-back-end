import { HttpRequest, HttpResponse, IController } from "controllers/protocols";
import { Task } from "../../models/task";
import { IUpdateTaskRepository, UpdadeTaskParams } from "./protocols";
import { badRequest, ok, serverError } from "../../controllers/helpers";

export class UpdateTaskController implements IController {
  constructor(private readonly updateTaskRepository: IUpdateTaskRepository) {}
  async handle(
    httpRequest: HttpRequest<UpdadeTaskParams>
  ): Promise<HttpResponse<Task | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields");
      }

      if (!id) {
        return badRequest("Missing task id");
      }

      const allowedFieldsToUpdate: (keyof UpdadeTaskParams)[] = [
        "title",
        "description",
      ];

      //verifica campos obrigatórios
      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdadeTaskParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received fields is not allowed to update");
      }
      const task = await this.updateTaskRepository.updateTask(id, body);

      return ok<Task>(task);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
