import { Request, Response } from "express";
import axios from "axios";
import { baseURL } from "../utils/constants";
import { ChampionPropertys } from "../utils/interfaces";

export const getGameInfos = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(baseURL + "/champion.json");
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from API");
  }
};

export const recommendCharacter = async (req: Request, res: Response) => {
  try {
    let allCharacter = await axios.get(baseURL + "/champion.json");
    let charactersData = allCharacter.data.data;

    let resp = Object.values(charactersData).map((value: any) =>
      Object.assign(
        {
          id: value.id,
          tags: value.tags,
          info: value.info,
        },
        {}
      )
    );

    let awaitArray = [];
    try {
      for (let index in resp) {
        console.log("====================================");
        const url = baseURL + `/champion/${resp[index].id}.json`;
        console.log(url);
        console.log("====================================");
        awaitArray.push(axios.get(url));
      }
    } catch (error) {
      console.error(error);
    }

    let promiseArray = await Promise.all(awaitArray);
    let champions = promiseArray.map((value: any) => value.data.data);

    res.json(champions);
  } catch (error) {
    console.error(error);
  }
};
