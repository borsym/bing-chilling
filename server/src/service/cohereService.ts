import {
    cleanKeywordsTextAndSplit,
    embedOptions,
    extractEmbeddings,
    extractKeywordsFromResponse,
    provideOptions
} from "../utils/utils";
import axios from "axios";

export const extractKeywordsFromChampionData = async (champData: any) => {
    let promises = [];
    for (let champion of champData) {
        const spells = champion.spells.map(value => value.description).join(' ')
        spells.replace(/<[^>]*>?/gm, '')
        const champDescription = spells + '\nKeywords:';
        const options: any = provideOptions(champDescription, process.env.MODEL_CHAMPIONS);
        // console.log({id: champion.id, champDescription})
        options.data.max_tokens = 20;
        options.data.temperature = 0.55;
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
        const prompt = keywords?.join(", ") || ""
        const options = embedOptions([prompt]);
        promises.push(axios.request(options))
    }

    return (await Promise.all(promises))
        .map(extractEmbeddings)
        .map(arr => arr.flat())
}

export const extractKeywordsFromPrompt = async (prompt: any) => {
    const options = provideOptions(prompt + '\nKeywords:', process.env.MODEL_KEYWORD);
    return axios
        .request(options)
        .then(extractKeywordsFromResponse)
        .catch((error: any) => {
            console.error(error);
        });
};