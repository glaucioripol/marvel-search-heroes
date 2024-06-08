import "@testing-library/jest-dom";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";

import { afterAll, afterEach } from "vitest";

import { mockServer } from "@/__tests__/http-mocks/node";

afterAll(() => {
  mockServer.listen();
});

afterEach(cleanup);
