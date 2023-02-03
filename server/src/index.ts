import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import gameRouter from "./routes/gameRouter";
import morgan from "morgan";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8800;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static('static'))

// app.use(morgan("tiny"));


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Seasdrver");
});

app.use("/api/v1/games", gameRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
