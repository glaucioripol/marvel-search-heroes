import {
  act,
  beforeEach,
  describe,
  expect,
  it,
  renderHook,
  vi,
  waitFor,
} from "@/__tests__";
import { http, HttpResponse } from "@/__tests__/http-mocks";
import { mockServer as server } from "@/__tests__/http-mocks/node";
import { useHomePage } from "./use-home-page";

import mockResponse from "@/__fixtures__/characters_default_request.json";
import { ReactQueryProvider } from "@/libs";
import { environmentsVariables } from "@/services";
import { FormEvent } from "react";

describe("useHomePage", () => {
  beforeEach(() => {
    server.use(
      http.get(`${environmentsVariables.VITE_MARVEL_API_URL}/characters*`, () =>
        HttpResponse.json(mockResponse),
      ),
    );

    globalThis.localStorage.clear();
  });

  const sutUseHomePage = () => {
    const hookRendered = renderHook(() => useHomePage(), {
      wrapper: ReactQueryProvider,
    });

    const mockFormEvent = (value = "") => {
      const form = document.createElement("form");
      const input = document.createElement("input");
      input.name = "search-hero";
      input.value = value;
      form.appendChild(input);

      const event = {
        preventDefault: vi.fn(),
        currentTarget: form,
      } as never as FormEvent<HTMLFormElement>;

      return event;
    };

    return { ...hookRendered, mockFormEvent };
  };

  it("should handle search correctly", () => {
    const { result, mockFormEvent } = sutUseHomePage();

    const mockHeroName = "Spider";
    act(() => {
      const formEventMocked = mockFormEvent(mockHeroName);
      result.current.handleSearch(formEventMocked);
    });

    expect(result.current.filters.name).toBe(mockHeroName);
  });

  it("should handle search with empty value correctly", () => {
    const { result, mockFormEvent } = sutUseHomePage();

    act(() => {
      const formEventMocked = mockFormEvent();
      result.current.handleSearch(formEventMocked);
    });

    expect(result.current.filters.name).toBeUndefined();
  });

  it("should handle favorite correctly", () => {
    const { result } = sutUseHomePage();
    const INDEX_OF_HERO = 10;

    const hero = mockResponse.data.results[INDEX_OF_HERO];

    act(() => {
      result.current.handleFavorite(hero)();
    });

    expect(result.current.favoriteHeroes.actions.has(hero.id)).toBe(true);
  });

  it("should handle alphabetical order correctly", () => {
    const { result } = sutUseHomePage();

    act(() => {
      result.current.handleAlphabeticalOrder(true);
    });

    expect(result.current.filters.orderBy).toBe("-name");
  });

  it("should handle alphabetical order correctly reverse", () => {
    const { result } = sutUseHomePage();

    act(() => {
      result.current.handleAlphabeticalOrder(false);
    });

    expect(result.current.filters.orderBy).toBe("name");
  });

  it("should handle show just favorites correctly", () => {
    const { result } = sutUseHomePage();

    act(() => {
      result.current.handleShowJustFavorites();
    });

    expect(result.current.showJustFavorites).toBe(true);
  });

  it("should handle resultsFiltered correctly and sort by -name and show just de favorite", () => {
    const { result } = sutUseHomePage();

    const [hero1, hero2, hero3, hero4] = mockResponse.data.results;

    act(() => {
      result.current.handleFavorite(hero1)();
      result.current.handleFavorite(hero2)();
      result.current.handleFavorite(hero3)();
      result.current.handleFavorite(hero4)();
      result.current.handleFavorite(hero2)();
    });

    act(() => {
      result.current.handleShowJustFavorites();
    });

    act(() => {
      result.current.setFilters((previous) => ({
        ...previous,
        orderBy: "-name",
      }));
    });

    const sortedHeroes = [...result.current.favoriteHeroes.heroes].sort(
      (a, b) => b.name.localeCompare(a.name),
    );

    expect(result.current.resultsFiltered).toEqual(sortedHeroes);
  });

  it("should handle resultsFiltered correctly and sort it by name", () => {
    const { result } = sutUseHomePage();

    act(() => {
      result.current.handleShowJustFavorites();
    });

    act(() => {
      result.current.setFilters((previous) => ({
        ...previous,
        orderBy: "name",
      }));
    });

    expect(result.current.resultsFiltered).toEqual(
      result.current.favoriteHeroes.heroes,
    );
  });

  it("should handle total correctly", () => {
    const { result } = sutUseHomePage();

    act(() => {
      result.current.handleShowJustFavorites();
    });

    expect(result.current.total).toEqual(
      result.current.favoriteHeroes.heroes.length,
    );
  });

  it("should sort heroes alphabetically when orderBy is DEFAULT_ORDER_BY", () => {
    const { result } = sutUseHomePage();

    act(() => {
      result.current.setFilters((previous) => ({
        ...previous,
        orderBy: "name",
      }));
    });

    const sortedHeroes = [...mockResponse.data.results].sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    expect(result.current.resultsFiltered).toEqual(sortedHeroes);
  });

  it("should add one favorite, after remove and check each", async () => {
    const { result } = sutUseHomePage();

    const [hero] = result.current.resultsFiltered;

    act(() => {
      result.current.handleFavorite(hero)();
    });

    await waitFor(() => {
      expect(result.current.favoriteHeroes.heroes).toContainEqual(hero);
    });

    act(() => {
      result.current.handleFavorite(hero)();
    });

    await waitFor(() => {
      expect(result.current.favoriteHeroes.heroes).not.toContainEqual(hero);
    });
  });
});
