import { renderHook, act, beforeEach, describe, expect, it } from "@/__tests__";

import { Hero } from "@/@types/marvel-api-response.types";

import { useFavoriteHeroes } from "./use-favorite-heroes";
import { HEROES_KEY } from "./use-favorite-heroes.constants";

describe("useFavoriteHeroes", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should start with no favorite heroes", () => {
    const { result } = renderHook(() => useFavoriteHeroes());

    expect(result.current.heroes).toEqual([]);
    expect(result.current.areThereFavoriteHeroes).toBe(false);
  });

  it("should be able to add a favorite hero", () => {
    const { result } = renderHook(() => useFavoriteHeroes());
    const hero = { id: 1, name: "Hero 1" } as Hero;

    act(() => {
      result.current.actions.add(hero);
    });

    expect(result.current.heroes).toEqual([hero]);
    expect(result.current.areThereFavoriteHeroes).toBe(true);
  });

  it("should not add a hero if it is already a favorite", () => {
    const { result } = renderHook(() => useFavoriteHeroes());
    const hero = { id: 1, name: "Hero 1" } as Hero;

    act(() => {
      result.current.actions.add(hero);
    });

    act(() => {
      result.current.actions.add(hero);
    });

    expect(result.current.heroes).toEqual([hero]);
  });

  it("should be able to remove a favorite hero", () => {
    const { result } = renderHook(() => useFavoriteHeroes());
    const hero = { id: 1, name: "Hero 1" } as Hero;

    act(() => {
      result.current.actions.add(hero);
    });

    expect(result.current.heroes).toEqual([hero]);

    act(() => {
      result.current.actions.remove(hero.id);
    });

    expect(result.current.heroes).toEqual([]);
    expect(result.current.areThereFavoriteHeroes).toBe(false);
  });

  it("should correctly report if a hero is a favorite", () => {
    const { result } = renderHook(() => useFavoriteHeroes());
    const hero = { id: 1, name: "Hero 1" } as Hero;

    act(() => {
      result.current.actions.add(hero);
    });

    expect(result.current.actions.has(hero.id)).toBe(true);
  });

  it("should correctly report if a hero is not a favorite", () => {
    const { result } = renderHook(() => useFavoriteHeroes());

    const heroIdMissing = 999;
    expect(result.current.actions.has(heroIdMissing)).toBe(false);
  });

  it("should not add more than 5 favorite heroes", () => {
    const { result } = renderHook(() => useFavoriteHeroes());

    const COUNTER_INITIAL_VALUE = 1;
    const COUNTER_MAX_VALUE = 6;

    for (let i = COUNTER_INITIAL_VALUE; i <= COUNTER_MAX_VALUE; i++) {
      act(() => {
        result.current.actions.add({
          id: i,
          name: `Hero ${i}`,
        } as Hero);
      });
    }

    const EXPECTED_HEROES_LENGTH = 5;

    expect(result.current.heroes.length).toBe(EXPECTED_HEROES_LENGTH);
  });

  it("should be able to load favorite heroes from localStorage", () => {
    const hero = { id: 1, name: "Hero 1" } as Hero;
    localStorage.setItem(HEROES_KEY, JSON.stringify([hero]));

    const { result } = renderHook(() => useFavoriteHeroes());

    expect(result.current.heroes).toEqual([hero]);
    expect(result.current.areThereFavoriteHeroes).toBe(true);
  });
});
