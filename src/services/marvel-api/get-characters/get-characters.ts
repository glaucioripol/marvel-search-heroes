import { CharactersResponse } from "@/@types/marvel-api-response.types";

import { marvelApiClient } from "../api-client";
import { environmentsVariables } from "../../environments-variables";

import { GetCharactersParameters } from "./get-characters.types";

const DEFAULT_LIMIT = 20;

export async function getCharacters({
  name,
  orderBy,
  offset,
  limit = DEFAULT_LIMIT,
}: GetCharactersParameters) {
  return marvelApiClient
    .get<CharactersResponse>("/characters", {
      params: {
        apikey: environmentsVariables.VITE_MARVEL_API_KEY,
        nameStartsWith: name,
        orderBy,
        limit,
        offset,
      },
    })
    .then(({ data }) => data);
}
