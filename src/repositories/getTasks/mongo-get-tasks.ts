import { IGetTasksRepository } from "controllers/get-tasks/protocols";
import { Task } from "models/task";

export class MongoGetTasksRepository implements IGetTasksRepository {
  async getTasks(): Promise<Task[]> {
    return [
      {
        describe: "Ler sobre API, Repository Pattern e Orientação a Objetos",
        title: "Estudar Node",
      },
    ];
  }
}
