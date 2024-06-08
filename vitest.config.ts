import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

import path from "node:path";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: ["./src/__tests__/setup.ts"],
      globals: true,
      alias: { "@": path.resolve(__dirname, "./src/") },
      coverage: {
        exclude: [
          // removing tests
          "src/**/__tests__",
          "src/**/__fixtures__",

          // removing types
          "src/@types",
          "src/**/*.types.ts",
          "src/**/types.ts",

          // removing entry point files from coverage
          "src/main.tsx",
        ],
        include: ["src/**/*.{ts,tsx}"],
      },
    },
  }),
);
