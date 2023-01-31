import { imgUrl } from './constants';

export const extractData = (charactersData: any) =>
  Object.values(charactersData).map(({ id, tags }: any) => ({
    id,
    tags,
  }));

export const extractChampionsData = (responses: any) =>
  responses
    .map((response) => response.data.data)
    .map((value) => Object.values(value))
    .flat()
    .map((champ: any) => ({
      name: champ.id,
      tags: champ.tags,
      title: champ.title,
      lore: champ.lore,
      info: champ.info,
      img: `${imgUrl}/${champ.id}.png`,
    }));
