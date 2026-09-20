import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": root,
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    // Default globs skip dot-directories, so the board tooling tests under
    // `.devtool/` need an explicit entry.
    include: [
      "**/*.{test,spec}.?(c|m)[jt]s?(x)",
      ".devtool/scripts/**/*.test.mjs",
      ".cursor/hooks/**/*.test.mjs",
    ],
  },
});
