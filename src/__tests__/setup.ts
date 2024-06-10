import "@testing-library/jest-dom";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";

import { afterAll, afterEach, beforeAll } from "vitest";

import { mockServer } from "@/__tests__/http-mocks/node";

beforeAll(() => {
  mockServer.listen();
});

afterEach(() => {
  mockServer.resetHandlers();
});

afterAll(() => {
  mockServer.close();
});

afterEach(cleanup);
