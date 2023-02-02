import { Request, Response } from "express";
import axios from "axios";
import { baseURL, imgUrl } from "../utils/constants";
import { ChampionPropertys } from "../utils/interfaces";
import {
  extractChampionsData,
  extractData,
  provideOptions,
} from "../utils/utils";
import { createDiffieHellmanGroup } from "crypto";
import cohere from "cohere-ai";

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
    console.log("Prompt: ", req.body);
    const keywordsFromPrompt = await extractKeywordsFromPrompt(req.body.prompt);
    console.log(keywordsFromPrompt);

    const allCharacter = await axios.get(`${baseURL}/champion.json`);
    const charactersData = allCharacter.data.data;
    const resp = extractData(charactersData);

    const requests = resp.map((champion) =>
      axios.get(`${baseURL}/champion/${champion.id}.json`)
    );

    const responses = await Promise.all(requests);
    // spellek leirasa desc ossze mergeles
    // az megy a masik keywordnak
    const championsData = extractChampionsData(responses);

    const champKeywords = extractKeywordsFromChampionData(championsData);

    res.json({
      championsData: championsData.splice(1, 2),
      summary: keywordsFromPrompt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from API");
  }
};

// private
export const extractKeywordsFromPrompt = async (prompt: any) => {
  const options = provideOptions(prompt, process.env.MODEL_KEYWORD);

  return axios
    .request(options)
    .then((response: any) => {
      const text = response.data.generations[0].text;
      console.log(response.data);
      console.log(response.data.generations[0].text);
      const keywords =
        text.split("\n\n")[1]?.split("Keywords:")[1].trim().split(", ") ?? [];

      return [...new Set(keywords)];
    })
    .catch((error: any) => {
      console.error(error);
    });
};

export const extractKeywordsFromChampionData = async (champData: object) => {
  let promises = [];
  for (let champion of Object.values(champData)) {
    const champDescription = champion.lore + champion.mergedSpellsDesc;
    const options = provideOptions(
      champDescription,
      process.env.MODEL_CHAMPIONS
    );
    axios.request(options).then((response: any) => {
      const text = response.data.generations[0].text;
      console.log(response.data);
      console.log(response.data.generations[0].text);
      const keywords =
        text.split("\n\n")[1]?.split("Keywords:")[1].trim().split(", ") ?? [];
    });
  }
};