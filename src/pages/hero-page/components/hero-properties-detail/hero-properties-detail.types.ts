import { Hero } from "@/@types/marvel-api-response.types";

export type HeroPropertiesDetailProperties = Readonly<{
  hero: Hero;
  lastComicReleaseDate: string;
}>;
