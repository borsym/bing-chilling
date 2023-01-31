import { imgUrl } from './constants';

export const extractData = (charactersData: any) =>
  Object.values(charactersData).map(({ id, tags }: any) => ({
    id,
    tags,
  }));

export const extractChampionsData = (responses: any) =>
  responses
    .map((response: any) => response.data.data)
    .map((value: any) => Object.values(value))
    .flat()
    .map((champ: any) => ({
      name: champ.id,
      tags: champ.tags,
      title: champ.title,
      lore: champ.lore,
      info: champ.info,
      img: `${imgUrl}/${champ.id}.png`,
    }));

export const provideOptions = (prompt: string) => {
  return {
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
};
