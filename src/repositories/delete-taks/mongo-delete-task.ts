import { IDeleteTaskRepository } from "../../controllers/delete-taks/protocols";
import { MongoClient } from "../../database/mongo";
import { Task } from "../../models/task";
import { ObjectId } from "mongodb";

export class MongoDeleteTaskRepository implements IDeleteTaskRepository {
  async deleteTask(id: string): Promise<Task> {
    const taks = await MongoClient.db
      .collection<Task>("tasks")
      .findOne({ _id: new ObjectId(id) });

    if (!taks) {
      throw new Error("Task not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("tasks")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("Taks not deleted");
    }

    const { _id, ...rest } = taks;

    return { id: _id.toHexString(), ...rest };
  }
}
