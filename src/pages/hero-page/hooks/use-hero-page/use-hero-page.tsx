import { useMemo, useCallback } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import { Hero } from "@/@types/marvel-api-response.types";

import { useFavoriteHeroes } from "@/hooks";
import { useQueries } from "@/libs";

import mockComicsResponse from "@/__fixtures__/comic_result.json";

const INDEX_TO_FIRST_ITEM = 0;
const TOTAL_COMICS_TO_SHOW = 10;

export function useHeroPage() {
  const navigate = useNavigate();
  const hero = useLoaderData() as Hero;
  const favorites = useFavoriteHeroes();

  const comics = useQueries({
    queries: hero?.comics.items
      .slice(INDEX_TO_FIRST_ITEM, TOTAL_COMICS_TO_SHOW)
      .map((comic) => ({
        queryKey: ["comic", comic.resourceURI],
        queryFn: async () => {
          // return getComicBy(comic.resourceURI);

          return mockComicsResponse;
        },
      })),
  });

  const lastComicReleaseDate = useMemo(() => {
    const flatComics = comics.map((comic) => comic.data);

    const dates = flatComics
      ?.filter((comic) => Boolean(comic!))
      ?.flatMap((comic) => comic!.dates)
      .filter((date) => date.type === "onsaleDate");

    if (!dates) {
      return null;
    }

    const sortedData = dates.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    const { date } = sortedData.at(INDEX_TO_FIRST_ITEM) ?? {};

    if (!date) {
      return null;
    }

    return new Date(date).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, [comics]);

  const handleLikeChange = useCallback(
    (isChecked: boolean) => {
      if (isChecked) {
        favorites.actions.add(hero);
        return;
      }

      favorites.actions.remove(hero.id);
    },
    [favorites.actions, hero],
  );

  const handleSearch = useCallback(
    (searchValue: string) => {
      navigate({
        pathname: "/",
        search: `?name=${searchValue}`,
      });
    },
    [navigate],
  );

  return {
    hero,
    favorites,
    comics,
    lastComicReleaseDate,
    handleLikeChange,
    handleSearch,
  } as const;
}
