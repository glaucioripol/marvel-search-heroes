import { axios } from "@/libs";
import { environmentsVariables } from "../environments-variables";

export const marvelApiClient = axios.create({
  baseURL: environmentsVariables.VITE_MARVEL_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
