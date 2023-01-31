import { Request, Response } from 'express';
import axios from 'axios';
import { baseURL, imgUrl } from '../utils/constants';
import { ChampionPropertys } from '../utils/interfaces';
import { extractChampionsData, extractData } from '../utils/utils';
import { createDiffieHellmanGroup } from 'crypto';
import cohere from 'cohere-ai';

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
    const test = await extracetKeywordsFromPrompt(req.body.prompt);
    console.log(test);
    // johet a filter

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

// private
export const extracetKeywordsFromPrompt = async (prompt: any) => {
  const options = {
    method: 'POST',
    url: 'https://api.cohere.ai/generate',
    headers: {
      accept: 'application/json',
      'Cohere-Version': '2022-12-06',
      'content-type': 'application/json',
      authorization: 'Bearer zk2nXqZraOekKKc7BkxZ9WIpTWzFuzQmywe6gl5Y',
    },
    data: {
      model: '327e1dc1-5782-4f3c-8877-bb76e06acea1-ft',
      truncate: 'END',
      prompt: prompt,
      max_tokens: 40,
      temperature: 0.8,
      k: 0,
      p: 0.75,
    },
  };

  return axios
    .request(options)
    .then((response: any) => {
      const text = response.data.generations[0].text;
      const keywords = text
        .split('\n\n')[1]
        ?.split('Keywords:')[1]
        .trim()
        .split(', ');
      return keywords;
    })
    .catch((error: any) => {
      console.error(error);
    });
};
