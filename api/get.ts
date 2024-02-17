import { CharacterResponse } from '~/src/types/character.types';
import { baseUri } from '~/src/utils/config';

export const get = {
  characters: {
    queryKey: `${baseUri}/character`,
    queryFn: async ({ page, search }: { page: number; search: string }) => {
      const url = new URL(get.characters.queryKey);
      url.searchParams.set('page', page.toString());
      url.searchParams.set('name', search.toString());

      const response = await fetch(url.toString());
      const data = (await response.json()) as CharacterResponse;
      return data;
    },
  },
};
