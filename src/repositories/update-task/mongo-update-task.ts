import {
  IUpdateTaskRepository,
  UpdadeTaskParams,
} from "controllers/update-task/protocols";
import { MongoClient } from "../../database/mongo";
import { Task } from "../../models/task";
import { ObjectId } from "mongodb";

export class MongoUpdateTaskRepository implements IUpdateTaskRepository {
  async updateTask(id: string, params: UpdadeTaskParams): Promise<Task> {
    await MongoClient.db.collection("tasks").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const task = await MongoClient.db
      .collection<Task>("tasks")
      .findOne({ _id: new ObjectId(id) });

    if (!task) {
      throw new Error("Task not updated");
    }

    const { _id, ...rest } = task;

    return { id: _id.toHexString(), ...rest };
  }
}
