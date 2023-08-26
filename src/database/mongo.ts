import { MongoClient as Mongo, Db } from "mongodb";
import { config } from "dotenv";

config();

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,
  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL || "localhost";
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;

    const client = new Mongo(url, { auth: { username, password } });
    const db = client.db(process.env.MONGODB_NAME);
    this.client = client;
    this.db = db;
    console.log("connected to mongodb!");

    // db.collection("tasks").find();
  },
};
