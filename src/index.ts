import express from "express";
import { config } from "dotenv";
import { GetTasksController } from "./controllers/get-tasks/get-tasks";
import { MongoGetTasksRepository } from "./repositories/getTasks/mongo-get-tasks";
import { MongoClient } from "./database/mongo";
import { MongoCreateTaskRepository } from "./repositories/create-task/mongo-create-task";
import { CreateTaskController } from "./controllers/create-task/create-task";
import { MongoUpdateTaskRepository } from "./repositories/update-task/mongo-update-task";
import { UpdateTaskController } from "./controllers/update-task/update-task";
import { DeleteTaskController } from "./controllers/delete-taks/delete-task";
import { MongoDeleteTaskRepository } from "./repositories/delete-taks/mongo-delete-task";

const main = async () => {
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

  app.patch("/tasks/:id", async (req, res) => {
    const mongoUpdateTaskRepository = new MongoUpdateTaskRepository();

    const updateTaskController = new UpdateTaskController(
      mongoUpdateTaskRepository
    );

    const { body, statusCode } = await updateTaskController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.delete("/tasks/:id", async (req, res) => {
    const mongoDeleteTaskRepository = new MongoDeleteTaskRepository();
    const deleteTaskController = new DeleteTaskController(
      mongoDeleteTaskRepository
    );

    const { body, statusCode } = await deleteTaskController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`lintening port ${port}`));
};

main();
