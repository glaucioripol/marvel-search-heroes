import { it, expect, describe } from "@/__tests__";
import { throwIfNotDefined } from "./throw-If-not-defined";
import { PossibleEnvironmentsVariables } from "./environments-variables.types";

describe("throwIfNotDefined", () => {
  it("throws error when environment variable is not defined", () => {
    const key = "UNDEFINED_VARIABLE" as PossibleEnvironmentsVariables;
    expect(() => throwIfNotDefined(key)).toThrow(
      `Environment variable ${key} is not defined on .env file.`,
    );
  });

  it("returns value when environment variable is defined", () => {
    const key = "DEFINED_VARIABLE" as PossibleEnvironmentsVariables;
    process.env[key] = "test value";
    expect(throwIfNotDefined(key)).toBe("test value");
    delete process.env[key];
  });
});
