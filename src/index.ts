import express from "express";
import { config } from "dotenv";

config();

const app = express();

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("run");
});

app.listen(port, () => console.log(`lintening port ${port}`));
