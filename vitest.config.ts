/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import path from "path";
export default defineConfig({
  test: {},
  resolve: {
    alias: {
      "@tools": path.resolve(__dirname, "./packages"),
    },
  },
});
