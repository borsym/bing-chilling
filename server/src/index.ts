import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import exampleRouter from "./routes/example";
import gameRouter from "./routes/gameRouter";
import morgan from "morgan";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8800;

// middleware
app.use(cors());
app.use(express.json());

app.use(morgan("tiny"));

app.use("/api/v1/example", exampleRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Seasdrver");
});

app.use("/api/v1/games", gameRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
