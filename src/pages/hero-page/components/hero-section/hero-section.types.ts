import { Hero } from "@/@types/marvel-api-response.types";

export type HeroSectionProperties = Readonly<{
  hero: Hero;
  onLikeChange?: (liked: boolean) => void;
  isLiked: boolean;
  lastComicReleaseDate: string;
}>;
