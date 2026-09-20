import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

import {
  closeDb,
  ensureSqliteFile,
  executeSql,
  getClient,
  pingDatabase,
} from "../../lib/db";
import { loadDbEnv, loadRepoEnv, type DbDialect } from "../../lib/db/env";

const MIGRATIONS_DIR = path.join("lib", "db", "migrations");
const SQL_DIR = path.join("lib", "db", "sql");

type Command = "install" | "seed" | "reset";

function printUsage(): void {
  console.error("Usage: pnpm db:install | pnpm db:seed | pnpm db:reset [--force]");
}

function parseArgs(argv: string[]): { command: Command; force: boolean } {
  const positional = argv.filter((arg) => !arg.startsWith("-"));
  const force = argv.includes("--force");
  const command = positional[0];

  if (command !== "install" && command !== "seed" && command !== "reset") {
    printUsage();
    process.exit(1);
  }

  return { command, force };
}

function drizzleDialect(dialect: DbDialect): "sqlite" | "postgresql" {
  return dialect === "postgres" ? "postgresql" : "sqlite";
}

function ensureEmptyMigrationsJournal(dialect: DbDialect): void {
  const metaDir = path.join(MIGRATIONS_DIR, "meta");
  mkdirSync(metaDir, { recursive: true });
  const journalPath = path.join(metaDir, "_journal.json");
  const nextJournal = {
    version: dialect === "sqlite" ? "6" : "7",
    dialect: drizzleDialect(dialect),
    entries: [] as unknown[],
  };

  if (!existsSync(journalPath)) {
    writeFileSync(journalPath, `${JSON.stringify(nextJournal, null, 2)}\n`);
    return;
  }

  const existing = JSON.parse(readFileSync(journalPath, "utf8")) as {
    entries?: unknown[];
    dialect?: string;
  };
  if (Array.isArray(existing.entries) && existing.entries.length === 0) {
    writeFileSync(journalPath, `${JSON.stringify(nextJournal, null, 2)}\n`);
  }
}

function runDrizzleKit(subcommand: "migrate"): void {
  const drizzleKitCli = path.join(process.cwd(), "node_modules", "drizzle-kit", "bin.cjs");
  const result = spawnSync(process.execPath, [drizzleKitCli, subcommand], {
    stdio: "inherit",
  });

  if (result.error) {
    throw new Error(`drizzle-kit ${subcommand} failed: ${result.error.message}`);
  }

  if (result.status !== 0) {
    throw new Error(`drizzle-kit ${subcommand} failed with exit code ${result.status ?? "unknown"}`);
  }
}

function seedFilesFor(dialect: DbDialect): string[] {
  const dir = path.join(SQL_DIR, dialect);
  if (!existsSync(dir)) {
    return [];
  }

  return readdirSync(dir)
    .filter((name) => name.endsWith(".sql"))
    .sort((a, b) => a.localeCompare(b))
    .map((name) => path.join(dir, name));
}

async function seed(): Promise<void> {
  const env = loadDbEnv();
  const files = seedFilesFor(env.dialect);
  getClient();

  for (const file of files) {
    const sqlText = readFileSync(file, "utf8");
    await executeSql(sqlText);
    console.log(`seeded ${file}`);
  }

  if (files.length === 0) {
    console.log(`no .sql files in ${path.join(SQL_DIR, env.dialect)}`);
  }
}

async function install(): Promise<void> {
  const env = loadDbEnv();

  if (env.dialect === "sqlite") {
    ensureSqliteFile(env.sqlitePath);
    console.log(`sqlite file ready at ${env.sqlitePath}`);
  }

  await pingDatabase();
  await closeDb();
  ensureEmptyMigrationsJournal(env.dialect);
  runDrizzleKit("migrate");
  console.log("drizzle-kit migrate complete");
}

async function reset(force: boolean): Promise<void> {
  if (process.env.NODE_ENV === "production" && !force) {
    throw new Error("Refusing db:reset when NODE_ENV=production. Pass --force to override.");
  }

  const env = loadDbEnv();
  await closeDb();

  if (env.dialect === "sqlite") {
    const filePath = ensureSqliteFile(env.sqlitePath);
    rmSync(filePath, { force: true });
    for (const suffix of ["-wal", "-shm"]) {
      rmSync(`${filePath}${suffix}`, { force: true });
    }
    console.log(`removed ${filePath}`);
  } else {
    const { default: postgres } = await import("postgres");
    const sql = postgres(env.databaseUrl, { max: 1, connect_timeout: 5 });
    try {
      await sql.unsafe("DROP SCHEMA IF EXISTS public CASCADE");
      await sql.unsafe("CREATE SCHEMA public");
      await sql.unsafe("GRANT ALL ON SCHEMA public TO public");
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      throw new Error(
        `PostgreSQL reset failed (${detail}). Check DATABASE_URL and that the server is running.`,
        { cause: error },
      );
    } finally {
      await sql.end({ timeout: 5 });
    }
    console.log("dropped and recreated schema public");
  }

  await install();
  await seed();
}

async function main(): Promise<void> {
  loadRepoEnv();
  const { command, force } = parseArgs(process.argv.slice(2));

  try {
    if (command === "install") {
      await install();
    } else if (command === "seed") {
      await seed();
    } else {
      await reset(force);
    }
  } finally {
    await closeDb();
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
