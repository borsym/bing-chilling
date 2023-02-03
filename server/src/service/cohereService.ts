import {embedOptions, extractEmbeddings, extractKeywordsFromResponse, provideOptions} from "../utils/utils";
import axios from "axios";

export const extractKeywordsFromChampionData = async (champData: any) => {
    let promises = [];
    for (let champion of champData) {
        const champDescription = champion.lore + champion.mergedSpellsDesc + '\nKeywords:';
        const options: any = provideOptions(champDescription, process.env.MODEL_CHAMPIONS);
        options.data.max_tokens = 20;
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

    return (await Promise.all(promises))
        .map(extractEmbeddings)
        .map(arr => arr.flat())
}

export const extractKeywordsFromPrompt = async (prompt: any) => {
    const options = provideOptions(prompt, process.env.MODEL_KEYWORD);
    return axios
        .request(options)
        .then((response: any) => {
            const text = response.data.generations[0].text;
            console.log(response.data);
            console.log(response.data.generations[0].text);
            const keywords = text.split("\n\n")[1]?.split("Keywords:")[1].trim().split(", ") ?? [];

            return [...new Set(keywords)];
        })
        .catch((error: any) => {
            console.error(error);
        });
};