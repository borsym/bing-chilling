import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import gamesRouter from "../router/gamesRouter";
import morgan from "morgan";

dotenv.config();

const app: Express = express();
const port = 8800;

console.log("hello teszt");

app.use(morgan("tiny"));
app.use(express.json());

app.use("/games", gamesRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Seasdrver");
});

app.get("/hi", (req: Request, res: Response) => {
  res.send("hi1asdasdasd");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
