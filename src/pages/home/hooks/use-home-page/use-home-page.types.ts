import { GetCharactersParameters } from "@/services";

export type HomeFiltersParameters = GetCharactersParameters & {
  orderBy: string;
  showJustFavorites: string;
};
