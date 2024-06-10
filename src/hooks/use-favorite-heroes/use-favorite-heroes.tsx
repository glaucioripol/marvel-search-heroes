import { useState, useEffect, useCallback, useMemo } from "react";

import { Hero } from "@/@types/marvel-api-response.types";

import {
  HEROES_KEY,
  VOID_ARRAY_LENGTH,
  LIMIT_FAVORITE_HEROES,
} from "./use-favorite-heroes.constants";

export function useFavoriteHeroes() {
  const initialHeroes = useMemo(() => {
    const loadedHeroes = localStorage.getItem(HEROES_KEY);
    return loadedHeroes ? JSON.parse(loadedHeroes) : [];
  }, []);

  const [favoriteHeroes, setFavoriteHeroes] = useState<Hero[]>(initialHeroes);

  const areThereFavoriteHeroes = favoriteHeroes.length > VOID_ARRAY_LENGTH;

  useEffect(() => {
    localStorage.setItem(HEROES_KEY, JSON.stringify(favoriteHeroes));
  }, [favoriteHeroes]);

  const addFavoriteHero = useCallback(
    (hero: Hero) => {
      if (favoriteHeroes.length === LIMIT_FAVORITE_HEROES) {
        alert("Você atingiu o limite de 5 heróis favoritos");
        return;
      }

      const isThereHero = favoriteHeroes.some((h) => h.id === hero.id);
      if (!isThereHero) {
        setFavoriteHeroes((previousState) => [...previousState, hero]);
      }
    },
    [favoriteHeroes],
  );

  const removeFavoriteHero = useCallback(
    (heroId: number) => {
      setFavoriteHeroes(favoriteHeroes.filter((h) => h.id !== heroId));
    },
    [favoriteHeroes],
  );

  const isFavoriteHero = useCallback(
    (heroId: number) => favoriteHeroes.some((h) => h.id === heroId),
    [favoriteHeroes],
  );

  return {
    heroes: favoriteHeroes,
    areThereFavoriteHeroes,
    actions: {
      add: addFavoriteHero,
      remove: removeFavoriteHero,
      has: isFavoriteHero,
    },
  } as const;
}
