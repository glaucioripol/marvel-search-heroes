import { useQuery } from "@/libs/react-query";

import { getCharacters, GetCharactersParameters } from "@/services";

const DEFAULT_DATA = {
  results: [],
  count: 0,
  limit: 0,
  offset: 0,
  total: 0,
};

export function useGetCharacters(
  parameters: GetCharactersParameters,
  doRequest: boolean,
) {
  const query = useQuery({
    queryKey: ["characters", Object.values(parameters)],
    queryFn: async () => getCharacters(parameters),
    enabled: doRequest,
  });

  const { data: apiData, error, isLoading } = query;

  const { results, count, limit, offset, total } =
    apiData?.data ?? DEFAULT_DATA;

  return {
    data: results,

    states: {
      error,
      isLoading,
    },

    pagination: {
      total,
      count,
      limit,
      offset,
    },
  } as const;
}
