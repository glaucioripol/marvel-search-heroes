import { Comic } from "@/@types/marvel-api-response.types";

export type ComicCardProperties = Readonly<{
  comic: Comic;
}>;
