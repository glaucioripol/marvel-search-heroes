import { Comic, Hero } from "@/@types/marvel-api-response.types";

export type ComicsProperties = Readonly<{
  comics: {
    data: Comic | null;
    isLoading: boolean;
  }[];
  hero: Hero;
}>;
