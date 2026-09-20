import { defineConfig } from "drizzle-kit";

import { loadDbEnv, loadRepoEnv } from "./lib/db/env";

loadRepoEnv();
const env = loadDbEnv();

export default env.dialect === "sqlite"
  ? defineConfig({
      dialect: "sqlite",
      schema: "./lib/db/schema.ts",
      out: "./lib/db/migrations",
      dbCredentials: {
        url: env.sqlitePath,
      },
    })
  : defineConfig({
      dialect: "postgresql",
      schema: "./lib/db/schema.ts",
      out: "./lib/db/migrations",
      dbCredentials: {
        url: env.databaseUrl,
      },
    });
