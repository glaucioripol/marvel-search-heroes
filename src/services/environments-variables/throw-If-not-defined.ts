import { PossibleEnvironmentsVariables } from "./environments-variables.types";

export function throwIfNotDefined(key: PossibleEnvironmentsVariables): string {
  // Nota: poderia ser feito usando zod, yup ou outro validador de schema
  const value = import.meta.env[key];

  if (!value) {
    throw new Error(`Environment variable ${key} is not defined on .env file.`);
  }

  return value;
}
