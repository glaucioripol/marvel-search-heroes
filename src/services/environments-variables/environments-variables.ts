import { throwIfNotDefined } from "./throw-If-not-defined";

export const environmentsVariables = {
  VITE_MARVEL_API_URL: throwIfNotDefined("VITE_MARVEL_API_URL"),
  VITE_MARVEL_API_KEY: throwIfNotDefined("VITE_MARVEL_API_KEY"),
};
