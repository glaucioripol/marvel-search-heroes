import { ComicResponse } from "@/@types/marvel-api-response.types";
import { environmentsVariables } from "@/services/environments-variables";

import { marvelApiClient } from "../api-client";

export async function getComicBy(resourceUri: string) {
  return marvelApiClient
    .get<ComicResponse>(resourceUri, {
      params: { apikey: environmentsVariables.VITE_MARVEL_API_KEY },
    })
    .then(({ data }) => {
      const [comic] = data.data.results;
      return comic;
    });
}
