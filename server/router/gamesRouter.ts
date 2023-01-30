import express, { Router, Request, Response } from "express";

const gamesRouter: Router = express.Router();

gamesRouter.get("/:gameName", (req: Request, res: Response) => {
  console.log("====================================");
  console.log(req.body);
  console.log("====================================");
  res.json(req.body);
});
gamesRouter.post("/:gameName/recommend", (req: Request, res: Response) => {});

export default gamesRouter;
