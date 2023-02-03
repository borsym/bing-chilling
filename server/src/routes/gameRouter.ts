import express, {Router} from "express";
import {getGameInfos, recommendCharacter,} from "../controllers/gameController";

const gameRouter: Router = express.Router();

gameRouter.get("/:gameName", getGameInfos);
gameRouter.post("/:gameName/recommend", recommendCharacter);
export default gameRouter;
