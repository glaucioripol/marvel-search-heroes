import { Hero } from "@/@types/marvel-api-response.types";
import { useGetCharacters, useFavoriteHeroes } from "@/hooks";
import { GetCharactersParameters } from "@/services";
import { useState, useMemo, useCallback, FormEvent } from "react";

const DEFAULT_ORDER_BY = "name";

export function useHomePage() {
  const [showJustFavorites, setShowJustFavorites] = useState(false);

  const [filters, setFilters] = useState<GetCharactersParameters>({
    name: undefined,
    orderBy: DEFAULT_ORDER_BY,
  });

  const characters = useGetCharacters(filters, !showJustFavorites);

  const favoriteHeroes = useFavoriteHeroes();

  const resultsFiltered = useMemo(() => {
    if (showJustFavorites) {
      return favoriteHeroes.heroes.sort((a, b) => {
        if (filters.orderBy === DEFAULT_ORDER_BY) {
          return a.name.localeCompare(b.name);
        }

        return b.name.localeCompare(a.name);
      });
    }

    return characters.data;
  }, [
    characters.data,
    favoriteHeroes.heroes,
    filters.orderBy,
    showJustFavorites,
  ]);

  const total = resultsFiltered.length;

  const handleSearch = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const getSearchValue = formData.get("search-hero");

      if (!getSearchValue) {
        return void setFilters((previousFilters) => ({
          ...previousFilters,
          name: undefined,
        }));
      }

      setFilters((previousFilters) => ({
        ...previousFilters,
        name: getSearchValue!.toString(),
      }));
    },
    [setFilters],
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
      setFilters((previousFilters) => ({
        ...previousFilters,
        orderBy: isChecked ? "-name" : DEFAULT_ORDER_BY,
      }));
    },
    [setFilters],
  );

  const isAlphabeticalOrderEnabled = filters.orderBy !== DEFAULT_ORDER_BY;

  const handleShowJustFavorites = useCallback(() => {
    setShowJustFavorites((previousValue) => !previousValue);
  }, [setShowJustFavorites]);

  return {
    characters,
    favoriteHeroes,
    filters,
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
