import { HttpResponse, IController } from "../../controllers/protocols";
import { IGetTasksRepository } from "./protocols";
import { Task } from "../../models/task";
import { ok, serverError } from "../../controllers/helpers";

export class GetTasksController implements IController {
  // getTasksRepository: IGetTasksRepository;
  constructor(private readonly getTasksRepository: IGetTasksRepository) {
    // this.getTasksRepository = getTasksRepository;
  }
  async handle(): Promise<HttpResponse<Task[] | string>> {
    // validade request
    // direcionar chamada para o repository
    try {
      const tasks = await this.getTasksRepository.getTasks();
      return ok<Task[]>(tasks);
    } catch (error) {
      return serverError();
    }
  }
}
