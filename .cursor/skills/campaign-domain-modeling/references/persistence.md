# Persistence layer

How campaign-domain tables attach to the dialect-aware connection. Field lists, enums, and invariants stay in [`domain-contract.md`](domain-contract.md). Human map: [`lib/README.md`](../../../../lib/README.md).

## Connection (do not replace)

| Path | Owns |
|------|------|
| `lib/db/env.ts` | `DB_DIALECT=sqlite\|postgres`, `SQLITE_PATH`, `DATABASE_URL` |
| `lib/db/index.ts` | `better-sqlite3` or `postgres`; export `runQuery` (async-safe) |
| `lib/db/schema.ts` | Barrel only. Add modules and re-export; do not open a second Drizzle client. |
| `drizzle.config.ts` | Schema `lib/db/schema.ts`, out `lib/db/migrations`, dialect from env |
| `scripts/db/cli.ts` | `pnpm db:install` / `db:seed` / `db:reset` |

SQLite is the default. PostgreSQL is the same schema via env. Do not add Turso, libSQL, Prisma, or MySQL.

## Schema vs data SQL

- Tables, indexes, FKs, checks: Drizzle schema modules + **generated** `lib/db/migrations/` (`pnpm db:generate`, then `db:install` / `db:migrate`). Never hand-edit migration SQL or `meta/_journal.json`.
- Fixture / seed `INSERT`s: `lib/db/sql/{sqlite,postgres}/*.sql` in lexical order (`pnpm db:seed`). Not DDL.
- Portable column types only (SQLite now, PostgreSQL later). No Postgres-only types, no UI labels/colors/percentages as columns.

## When adding the model

1. Implement the contract cards first (aggregate, listing/cache, snapshots/facts, pipeline lifecycle, outreach/suppression). Persistence does not invent fields.
2. Claim [`campaign-persistence-schema-and-migrations-2026-09-19`](../../../../.devtool/features/campaign-persistence-schema-and-migrations-2026-09-19.md).
3. Split schema modules under `lib/db/`; re-export from `schema.ts`.
4. Generate the first real migration; smoke `db:install` → `db:reset` on temp SQLite.
5. Enums live in application contracts; add SQLite checks only where migrations can enforce them safely.
