import {Request, Response} from "express";
import axios from "axios";
import {baseURL} from "../utils/constants";
import {
    embedOptions,
    extractChampionsData,
    extractData, extractEmbeddings,
    extractKeywordsFromResponse,
    provideOptions,
} from "../utils/utils";
import {similarity} from "../cosim";

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
        console.log(promptKeywords);

        const allCharacter = await axios.get(`${baseURL}/champion.json`);
        const charactersData = allCharacter.data.data;
        const resp = extractData(charactersData);

        const requests = resp.map((champion) =>
            axios.get(`${baseURL}/champion/${champion.id}.json`)
        );

        const responses = await Promise.all(requests);

        let championsData = extractChampionsData(responses).slice(0, 50);
        const championsKeywords = await extractKeywordsFromChampionData(championsData);
        console.log({promptKeywords, championsKeywords})

        const promptsEmbeddings = await embedKeywords(promptKeywords)
        const championsEmbeddings = await embedChampions(championsKeywords)
        console.log({promptsEmbeddings, che: championsEmbeddings})
        const similarities = calculateSimilarities(promptsEmbeddings, championsEmbeddings)
        console.log(similarities)
        const index = similarities.indexOf(Math.max(...similarities));
        console.log({index, championsData})
        console.log({championsKeywords})


        championsData.forEach((data, index)  => Object.assign(data, {similarity: similarities[index]}))
        championsData.sort((a, b) => a.similarity < b.similarity ? 1 : -1)
        championsData = championsData.slice(0,3)

        //res.json({promptsEmbeddings, championsEmbeddings})
        res.json({
            championsData,
            summary: promptKeywords,
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

export const extractKeywordsFromChampionData = async (champData: object[]) => {
    let promises = [];
    for (let champion of champData) {
        const champDescription = champion.lore + champion.mergedSpellsDesc + '\nKeywords:';
        const options = provideOptions(
            champDescription,
            process.env.MODEL_CHAMPIONS
        );
        //@ts-ignore
        options.data.max_tokens = 20;
        //@ts-ignore
        options.data.temperature = 0.4;
        promises.push(axios.request(options))
    }

    return (await Promise.all(promises)).map(extractKeywordsFromResponse)
};

export async function embedKeywords(keywords: any) {
    const options = embedOptions([keywords.join(", ")]);
    return extractEmbeddings(await axios.request(options)).flat();
}

export async function embedChampions(championsKeywords: any) {
    let promises = [];
    for (let keywords of championsKeywords) {
        const options = embedOptions([keywords.join(", ")]);
        promises.push(axios.request(options))
    }

    return (await Promise.all(promises)).map(extractEmbeddings).map(arr => arr.flat())
}

export function calculateSimilarities(promptEmbedding: any, championsEmbeddings: any) {
    return championsEmbeddings.map(champEmbedding => similarity(promptEmbedding, champEmbedding))
}