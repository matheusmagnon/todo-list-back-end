import express from "express";
import { config } from "dotenv";
import { GetTasksController } from "./controllers/get-tasks/get-tasks";
import { MongoGetTasksRepository } from "./repositories/getTasks/mongo-get-tasks";
import { MongoClient } from "./database/mongo";
import { MongoCreateTaskRepository } from "./repositories/create-task/mongo-create-task";
import { CreateTaskController } from "./controllers/create-task/create-task";

const main = async () => {
  //
  //
  //
  config();
  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.get("/tasks", async (req, res) => {
    const mongoGetTasksRepository = new MongoGetTasksRepository();
    const getTasksController = new GetTasksController(mongoGetTasksRepository);
    const response = getTasksController.handle();
    res.status((await response).statusCode).send((await response).body);
  });

  app.post("/tasks", async (req, res) => {
    const mongoCreateTaskRespository = new MongoCreateTaskRepository();

    const createTaskController = new CreateTaskController(
      mongoCreateTaskRespository
    );

    const { body, statusCode } = await createTaskController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });
  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`lintening port ${port}`));
};

main();
