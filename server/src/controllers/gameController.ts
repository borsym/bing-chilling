import {Request, Response} from "express";
import axios from "axios";
import {baseURL} from "../utils/constants";
import {calculateSimilarities} from "../cosim/cosineSimilarity";
import {getChampionsFromFS} from "../service/championService";
import {
    embedChampions,
    embedKeywords,
    extractKeywordsFromChampionData,
    extractKeywordsFromPrompt
} from "../service/cohereService";

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
        const promptKeywords = await extractKeywordsFromPrompt(req.body.prompt);
        // console.log(promptKeywords);

        const champions = (await getChampionsFromFS()).slice(0, 20);
        const championsKeywords = await extractKeywordsFromChampionData(champions);
        // console.log({promptKeywords, championsKeywords})

        const promptsEmbeddings = await embedKeywords(promptKeywords)
        const championsEmbeddings = await embedChampions(championsKeywords)
        // console.log({promptsEmbeddings, championsEmbeddings})

        const similarities = calculateSimilarities(promptsEmbeddings, championsEmbeddings)
        // console.log(similarities)

        champions.forEach((data, index) => Object.assign(data, {similarity: similarities[index]}))
        champions.sort((a, b) => a.similarity < b.similarity ? 1 : -1)
        const championsData = champions.slice(0, 3)

        res.json({
            championsData,
            summary: promptKeywords,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching data from API");
    }
};