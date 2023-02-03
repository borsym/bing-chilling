import axios from "axios";
import {baseURL, imgUrl} from "../utils/constants";
import {extractData} from "../utils/utils";
import {readJSON, readFile} from "./fileService";

const CACHE = new Map();
export async function getChampionsFromAPI() {
    const allCharacter = await axios.get(`${baseURL}/champion.json`);
    const charactersData = allCharacter.data.data;
    const resp = extractData(charactersData);

    const requests = resp.map((champion) =>
        axios.get(`${baseURL}/champion/${champion.id}.json`)
    );

    return await Promise.all(requests);
}

export async function getChampionsFromFS(): Promise<any[]> {
    const champions = await readJSON(__dirname + '/../static/champions.json');

    const requests = Object.values(champions.data).map(extractIdAndTags).map(readChampionData);
    return await Promise.all(requests);
}

async function readChampionData(champion: any): Promise<any> {
    const cacheValue = CACHE.get(champion.id);

    if (cacheValue) return Promise.resolve(cacheValue)

    let championData = await readJSON(__dirname + `/../static/${champion.id}.json`)
    championData = Object.assign(championData, {tags: champion.tags, img: `${imgUrl}/${championData.id}.png`})

    CACHE.set(champion.id, championData)

    return championData
}