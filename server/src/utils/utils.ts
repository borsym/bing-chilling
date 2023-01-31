import { imgUrl } from './constants';

export const extractData = (charactersData: any) =>
  Object.values(charactersData).map(({ id, tags }: any) => ({
    id,
    tags,
  }));

export const extractChampionsData = (responses: any) => {
  return responses
    .map((response: any) => response.data.data)
    .map((value: any) => Object.values(value))
    .flat()
    .map((champ: any) => {
      const spells = champ.spells
        .map((spell: any) => spell.description)
        .join(' ');

      return {
        name: champ.id,
        tags: champ.tags,
        title: champ.title,
        lore: champ.lore,
        mergedSpellsDesc: spells,
        info: champ.info,
        img: `${imgUrl}/${champ.id}.png`,
      };
    });
};

export const provideOptions = (prompt: string) => {
  return {
    method: 'POST',
    url: 'https://api.cohere.ai/generate',
    headers: {
      accept: 'application/json',
      'Cohere-Version': '2022-12-06',
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    },
    data: {
      model: process.env.MODEL,
      truncate: 'END',
      prompt: prompt,
      max_tokens: 40,
      temperature: 0.3,
      k: 0,
      p: 0.75,
    },
  };
};
