import { HttpRequest, HttpResponse, IController } from "controllers/protocols";
import { Task } from "../../models/task";
import { IUpdateTaskRepository, UpdadeTaskParams } from "./protocols";

export class UpdateTaskController implements IController {
  constructor(private readonly updateTaskRepository: IUpdateTaskRepository) {}
  async handle(
    httpRequest: HttpRequest<UpdadeTaskParams>
  ): Promise<HttpResponse<Task>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return {
          statusCode: 400,
          body: "Missing fields",
        };
      }

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
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
        return {
          statusCode: 400,
          body: "Some received fields is not allowed to update",
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
