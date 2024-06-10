import { Hero } from "@/@types/marvel-api-response.types";

export type HeroCardProperties = Readonly<{
  hero: Hero;
  isLiked: boolean;
  handleFavorite: (hero: Hero) => () => void;
}>;
