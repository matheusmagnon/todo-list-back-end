import { IGetTasksRepository } from "../../controllers/get-tasks/protocols";
import { MongoClient } from "../../database/mongo";
import { Task } from "../../models/task";

export class MongoGetTasksRepository implements IGetTasksRepository {
  async getTasks(): Promise<Task[]> {
    const tasks = await MongoClient.db
      .collection<Task>("tasks")
      .find({})
      .toArray();

    return tasks.map(({ _id, ...task }) => ({
      ...task,
      id: _id.toHexString(),
    }));
  }
}
