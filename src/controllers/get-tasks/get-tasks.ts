import { IGetTasksController, IGetTasksRepository } from "./protocols";

export class GetUsersController implements IGetTasksController {
  // getTasksRepository: IGetTasksRepository;
  constructor(private readonly getTasksRepository: IGetTasksRepository) {
    // this.getTasksRepository = getTasksRepository;
  }
  async handle() {
    // validade request
    // direcionar chamada para o repository
    try {
      const tasks = await this.getTasksRepository.getTasks();
      return {
        statusCode: 200,
        body: tasks,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Internal Server Error",
      };
    }
  }
}
