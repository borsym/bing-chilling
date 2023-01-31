import { Request, Response } from 'express';
import axios from 'axios';
import { baseURL, imgUrl } from '../utils/constants';
import { ChampionPropertys } from '../utils/interfaces';
import { extractChampionsData, extractData } from '../utils/utils';
import { createDiffieHellmanGroup } from 'crypto';

export const getGameInfos = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(baseURL + '/champion.json');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from API');
  }
};

export const recommendCharacter = async (req: Request, res: Response) => {
  try {
    const allCharacter = await axios.get(`${baseURL}/champion.json`);
    const charactersData = allCharacter.data.data;
    const resp = extractData(charactersData);

    const requests = resp.map((champion) =>
      axios.get(`${baseURL}/champion/${champion.id}.json`)
    );

    const responses = await Promise.all(requests);
    const championsData = extractChampionsData(responses);

    res.json(championsData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from API');
  }
};
