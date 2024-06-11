import { FormEvent, useCallback, useMemo } from "react";

import { useSearchParams } from "react-router-dom";

import { Hero } from "@/@types/marvel-api-response.types";

import { useFavoriteHeroes, useGetCharacters } from "@/hooks";
import { GetCharactersParameters } from "@/services";
import { HomeFiltersParameters } from "./use-home-page.types";

const DEFAULT_ORDER_BY = "name";

export function useHomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilters = useMemo<HomeFiltersParameters>(() => {
    const result: Record<string, string | null> = {};

    searchParams.forEach((value, key) => {
      if (value === null) {
        return;
      }
      result[key] = value;
    });

    return result as never as HomeFiltersParameters;
  }, [searchParams]);

  const setFilters = useCallback(
    (cb: (p: HomeFiltersParameters) => HomeFiltersParameters) => {
      setSearchParams((previous) => {
        const received = cb(currentFilters);

        const newValues = received;

        for (const key in newValues) {
          const keyTyped = key as keyof HomeFiltersParameters;

          if (newValues[keyTyped] === null) {
            previous.delete(key);
            continue;
          }

          previous.set(key, String(newValues[keyTyped]));
        }

        return previous;
      });
    },
    [currentFilters, setSearchParams],
  );

  const showJustFavorites = currentFilters.showJustFavorites === "true";

  const characters = useGetCharacters(
    currentFilters as GetCharactersParameters,
    !showJustFavorites,
  );

  const favoriteHeroes = useFavoriteHeroes();

  const resultsFiltered = useMemo(() => {
    if (showJustFavorites) {
      return (
        favoriteHeroes.heroes
          .filter((hero) => {
            if (!currentFilters.name) {
              return true;
            }
            return hero.name
              .toLowerCase()
              .includes(currentFilters.name.toLowerCase());
          })
          .sort((a, b) => {
            if (currentFilters.orderBy === DEFAULT_ORDER_BY) {
              return a.name.localeCompare(b.name);
            }

            return b.name.localeCompare(a.name);
          }) ?? []
      );
    }

    return characters.data ?? [];
  }, [
    characters.data,
    currentFilters.name,
    currentFilters.orderBy,
    favoriteHeroes.heroes,
    showJustFavorites,
  ]);

  const total = resultsFiltered.length;

  const handleSearch = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const currentNameToFilter = formData.get("search-hero") as string;

      if (!currentNameToFilter) {
        setSearchParams((previous) => {
          previous.delete("name");
          return previous;
        });

        return;
      }

      setSearchParams((previous) => {
        previous.set("name", currentNameToFilter);
        return previous;
      });
    },
    [setSearchParams],
  );

  const handleFavorite = useCallback(
    (hero: Hero) => () => {
      if (favoriteHeroes.actions.has(hero.id)) {
        favoriteHeroes.actions.remove(hero.id);
        return;
      }

      favoriteHeroes.actions.add(hero);
    },
    [favoriteHeroes.actions],
  );

  const handleAlphabeticalOrder = useCallback(
    (isChecked: boolean) => {
      setSearchParams((previous) => {
        if (isChecked) {
          previous.set("orderBy", "-name");
          return previous;
        }

        previous.set("orderBy", DEFAULT_ORDER_BY);

        return previous;
      });
    },
    [setSearchParams],
  );

  const isAlphabeticalOrderEnabled =
    currentFilters.orderBy !== DEFAULT_ORDER_BY;

  const handleShowJustFavorites = useCallback(() => {
    setSearchParams((previous) => {
      if (showJustFavorites) {
        previous.delete("showJustFavorites");
        return previous;
      }

      previous.set("showJustFavorites", "true");
      return previous;
    });
  }, [setSearchParams, showJustFavorites]);

  return {
    characters,
    favoriteHeroes,
    filters: currentFilters,
    handleSearch,
    handleFavorite,
    handleAlphabeticalOrder,
    handleShowJustFavorites,
    isAlphabeticalOrderEnabled,
    resultsFiltered,
    showJustFavorites,
    total,
    setFilters,
  };
}
