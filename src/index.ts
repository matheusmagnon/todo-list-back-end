import express from "express";
import { config } from "dotenv";
// import { GetTasksController } from "controllers/get-tasks/get-tasks";
// import { MongoGetTasksRepository } from "repositories/getTasks/mongo-get-tasks";
import { GetTasksController } from "./controllers/get-tasks/get-tasks";
import { MongoGetTasksRepository } from "./repositories/getTasks/mongo-get-tasks";

config();

const app = express();

const port = process.env.PORT || 8000;

app.get("/tasks", async (req, res) => {
  const mongoGetTasksRepository = new MongoGetTasksRepository();
  const getTasksController = new GetTasksController(mongoGetTasksRepository);
  const response = getTasksController.handle();
  res.send((await response).body).status((await response).statusCode);
});

app.listen(port, () => console.log(`lintening port ${port}`));
