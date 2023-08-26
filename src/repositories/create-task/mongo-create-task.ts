import { MongoClient } from "../../database/mongo";
import {
  CreateTaskParams,
  ICreateTaskRepository,
} from "../../controllers/create-task/protocols";
import { Task } from "../../models/task";

export class MongoCreateTaskRepository implements ICreateTaskRepository {
  async createTask(params: CreateTaskParams): Promise<Task> {
    const { insertedId } = await MongoClient.db
      .collection("tasks")
      .insertOne(params);

    const task = await MongoClient.db
      .collection<Task>("tasks")
      .findOne({ _id: insertedId });

    if (!task) {
      throw new Error("Task not created");
    }

    const { _id, ...rest } = task;
    return { id: _id.toHexString(), ...rest };
  }
}
