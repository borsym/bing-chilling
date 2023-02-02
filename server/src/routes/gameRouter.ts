import axios from "axios";
import express, { Request, Response, Router } from "express";
import {
  getGameInfos,
  recommendCharacter,
} from "../controllers/gameController";
import { baseURL } from "../utils/constants";

const gameRouter: Router = express.Router();

gameRouter.get("/:gameName", getGameInfos);
gameRouter.post("/:gameName/recommend", recommendCharacter);
export default gameRouter;
