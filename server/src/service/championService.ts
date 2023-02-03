import axios from "axios";
import {baseURL, imgUrl} from "../utils/constants";
import {extractChampionsData, extractData, extractIdAndTags} from "../utils/utils";
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
    // console.log(champions)
    const requests = Object.values(champions.data).map(readChampionData);
    return await Promise.all(requests);
}

async function readChampionData(champion: any): Promise<any> {
    if (CACHE.has(champion.id))
        return Promise.resolve(CACHE.get(champion.id))

    let championData = await readJSON(__dirname + `/../static/${champion.id}.json`)
    championData = Object.values(championData.data)[0]
    championData.img = `${imgUrl}/${championData.id}.png`
    CACHE.set(champion.id, championData)

    return championData
}