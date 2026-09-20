import { mkdirSync } from "node:fs";
import path from "node:path";

import BetterSqlite3 from "better-sqlite3";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { loadDbEnv, type DbEnv } from "./env";
import * as schema from "./schema";

type SqliteDatabase = ReturnType<typeof drizzleSqlite>;
type PostgresDatabase = ReturnType<typeof drizzlePostgres>;

export type AppDatabase = SqliteDatabase | PostgresDatabase;

type SqliteClient = {
  dialect: "sqlite";
  env: Extract<DbEnv, { dialect: "sqlite" }>;
  db: SqliteDatabase;
  sqlite: InstanceType<typeof BetterSqlite3>;
  close: () => Promise<void>;
};

type PostgresClient = {
  dialect: "postgres";
  env: Extract<DbEnv, { dialect: "postgres" }>;
  db: PostgresDatabase;
  sql: ReturnType<typeof postgres>;
  close: () => Promise<void>;
};

export type DbClient = SqliteClient | PostgresClient;

let client: DbClient | null = null;

export function resolveSqliteFilePath(sqlitePath: string, cwd = process.cwd()): string {
  return path.isAbsolute(sqlitePath) ? sqlitePath : path.resolve(cwd, sqlitePath);
}

export function ensureSqliteFile(sqlitePath: string, cwd = process.cwd()): string {
  const filePath = resolveSqliteFilePath(sqlitePath, cwd);
  mkdirSync(path.dirname(filePath), { recursive: true });
  return filePath;
}

export function getClient(): DbClient {
  if (client) {
    return client;
  }

  const env = loadDbEnv();

  if (env.dialect === "sqlite") {
    const filePath = ensureSqliteFile(env.sqlitePath);
    const sqlite = new BetterSqlite3(filePath);
    const db = drizzleSqlite(sqlite, { schema });
    client = {
      dialect: "sqlite",
      env,
      db,
      sqlite,
      close: async () => {
        sqlite.close();
      },
    };
    return client;
  }

  const sql = postgres(env.databaseUrl, { max: 1, connect_timeout: 5 });
  const db = drizzlePostgres(sql, { schema });
  client = {
    dialect: "postgres",
    env,
    db,
    sql,
    close: async () => {
      await sql.end({ timeout: 5 });
    },
  };
  return client;
}

/** Dialect-aware Drizzle client. Prefer `runQuery` so callers stay async-safe. */
export function getDb(): AppDatabase {
  return getClient().db;
}

/**
 * Run work against the Drizzle client through a Promise. SQLite stays local and
 * synchronous under the hood; Postgres can replace it without sync call sites.
 */
export async function runQuery<T>(
  fn: (db: AppDatabase) => T | Promise<T>,
): Promise<T> {
  return await fn(getDb());
}

export async function executeSql(sqlText: string): Promise<void> {
  const trimmed = sqlText.trim();
  if (!trimmed) {
    return;
  }

  const current = getClient();
  if (current.dialect === "sqlite") {
    current.sqlite.exec(sqlText);
    return;
  }

  await current.sql.unsafe(sqlText);
}

export async function pingDatabase(): Promise<void> {
  const current = getClient();
  try {
    if (current.dialect === "sqlite") {
      current.sqlite.prepare("select 1").get();
      return;
    }
    await current.sql`select 1`;
  } catch (error) {
    if (current.dialect === "postgres") {
      const detail = error instanceof Error ? error.message : String(error);
      throw new Error(
        `PostgreSQL is unreachable at DATABASE_URL (${detail}). Check the connection string and that the server is running, or use DB_DIALECT=sqlite.`,
        { cause: error },
      );
    }
    throw error;
  }
}

export async function closeDb(): Promise<void> {
  if (!client) {
    return;
  }
  const closing = client;
  client = null;
  await closing.close();
}
