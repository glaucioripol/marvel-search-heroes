import { describe, expect, it, renderHook, waitFor } from "@/__tests__";
import { http, HttpResponse } from "@/__tests__/http-mocks";
import { mockServer as server } from "@/__tests__/http-mocks/node";
import { ReactQueryProvider } from "@/libs";
import { environmentsVariables } from "@/services";

import { useGetCharacters } from "./use-get-characters";

import mockResponse from "@/__fixtures__/characters_default_request.json";

describe("useGetCharacters", () => {
  const sutUseGetCharacters = () => {
    const hookRendered = renderHook(() => useGetCharacters({}), {
      wrapper: ReactQueryProvider,
    });

    return hookRendered;
  };

  it("should return characters data when request is successful", async () => {
    server.use(
      http.get(`${environmentsVariables.VITE_MARVEL_API_URL}/characters`, () =>
        HttpResponse.json(mockResponse),
      ),
    );

    const { result } = sutUseGetCharacters();

    await waitFor(() => expect(result.current.states.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockResponse.data.results);
    expect(result.current.pagination).toEqual({
      total: mockResponse.data.total,
      count: mockResponse.data.count,
      limit: mockResponse.data.limit,
      offset: mockResponse.data.offset,
    });
  });

  it("should return error when request fails", async () => {
    server.use(
      http.get(`${environmentsVariables.VITE_MARVEL_API_URL}/characters`, () =>
        HttpResponse.json(
          { message: "Internal server error" },
          { status: 500 },
        ),
      ),
    );

    const { result } = sutUseGetCharacters();

    await waitFor(() => result.current.states.isLoading === false);

    expect(result.current.states.error).toBeDefined();
  });
});
