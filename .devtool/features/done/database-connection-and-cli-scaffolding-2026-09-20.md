---
id: "database-connection-and-cli-scaffolding-2026-09-20"
status: "done"
priority: "critical"
assignee: "Andrew"
epic: null
dueDate: null
created: "2026-09-20T05:15:00.000Z"
modified: "2026-09-20T06:15:00.000Z"
completedAt: "2026-09-20T06:15:00.000Z"
labels: ["story", "epic:epic-application-architecture-2026-09-15"]
order: "a2"
---
# Database connection and CLI scaffolding

Wire SQLite as the default dialect and PostgreSQL as a selectable growth path: env, Drizzle client, empty schema barrel, data SQL folders, and install / seed / reset CLI. Do not create domain tables.

Parent epic: [`epic-application-architecture-2026-09-15`](../epic-application-architecture-2026-09-15.md)

## Acceptance Criteria

- [x] Epic §4A matches the connection tree (`lib/db/env.ts`, `index.ts`, empty `schema.ts`, `migrations/`, `sql/{sqlite,postgres}`, `scripts/db/cli.ts`, `drizzle.config.ts`, `.env.example`, gitignored `data/`). Turso / libSQL is gone from stack tables.
- [x] `.env.example` documents `DB_DIALECT=sqlite|postgres`, `SQLITE_PATH`, and `DATABASE_URL` (Postgres). Default is SQLite.
- [x] `drizzle.config.ts` reads that env, points schema at `lib/db/schema.ts`, and writes migrations to `lib/db/migrations`.
- [x] `lib/db/schema.ts` exports nothing domain-related (no Campaign, Listing, or other tables).
- [x] `lib/db/index.ts` builds `better-sqlite3` or `postgres` from env; Next marks native DB packages as server-external if needed.
- [x] `postgres` is a runtime dependency. Query helpers in `lib/db` are async-safe so a later Postgres cutover does not force sync APIs.
- [x] CLI plus npm scripts:
  - `db:install` — ensure SQLite file / Postgres connect, then `drizzle-kit migrate` (succeeds with zero generated migrations)
  - `db:seed` — run `lib/db/sql/<dialect>/*.sql` in lexical order
  - `db:reset` — wipe (delete SQLite file, or Postgres `DROP SCHEMA public CASCADE` + recreate), then install + seed; refuse `NODE_ENV=production` unless `--force`
- [x] Seed SQL files are commented placeholders only (no domain `INSERT`s).
- [x] `data/*.sqlite` and `data/*.db` are gitignored; `.env` remains ignored.
- [x] `lib/README.md` documents connection, SQL data vs generated migrations, and CLI.
- [x] Smoke: SQLite install → seed → reset works locally. Postgres is selected by env and fails with a clear message if `DATABASE_URL` is missing or unreachable. A live Postgres server is not required to close this story.

## Further breakdown

- [x] Add `postgres` and a TypeScript CLI runner (`tsx` or Node 22 type-stripping) without installing Turso / libSQL.
- [x] Domain tables, indexes, and the first real migration stay on `campaign-persistence-schema-and-migrations-2026-09-19`.
- [x] Campaign fixture SQL is added later; the CLI already runs whatever `.sql` files exist in the dialect folder.
