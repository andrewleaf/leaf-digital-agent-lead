import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export type DbDialect = "sqlite" | "postgres";

export type SqliteDbEnv = {
  dialect: "sqlite";
  sqlitePath: string;
};

export type PostgresDbEnv = {
  dialect: "postgres";
  databaseUrl: string;
};

export type DbEnv = SqliteDbEnv | PostgresDbEnv;

const DEFAULT_SQLITE_PATH = "data/localdraft.sqlite";

/** Load `.env` into `process.env` without overwriting variables already set. */
export function loadRepoEnv(cwd: string = process.cwd()): void {
  const envPath = path.join(cwd, ".env");
  if (!existsSync(envPath)) {
    return;
  }

  for (const rawLine of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const exportPrefix = line.startsWith("export ") ? line.slice(7) : line;
    const eq = exportPrefix.indexOf("=");
    if (eq <= 0) {
      continue;
    }

    const key = exportPrefix.slice(0, eq).trim();
    let value = exportPrefix.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

export function loadDbEnv(source: NodeJS.ProcessEnv = process.env): DbEnv {
  const dialectRaw = (source.DB_DIALECT ?? "sqlite").trim().toLowerCase();

  if (dialectRaw !== "sqlite" && dialectRaw !== "postgres") {
    throw new Error(
      `DB_DIALECT must be "sqlite" or "postgres" (default sqlite). Received: ${source.DB_DIALECT}`,
    );
  }

  if (dialectRaw === "sqlite") {
    const sqlitePath = source.SQLITE_PATH?.trim() || DEFAULT_SQLITE_PATH;
    return { dialect: "sqlite", sqlitePath };
  }

  const databaseUrl = source.DATABASE_URL?.trim();
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is required when DB_DIALECT=postgres. Set a PostgreSQL connection string, or use DB_DIALECT=sqlite (the default).",
    );
  }

  return { dialect: "postgres", databaseUrl };
}
