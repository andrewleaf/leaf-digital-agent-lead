# `lib/` — Data access, mutations, and business logic

Everything that is not routing or presentation. This is the only place that will touch the database or external APIs.

Target layering: [`epic-application-architecture-2026-09-15`](../.devtool/features/epic-application-architecture-2026-09-15.md). Domain shapes: [`.cursor/skills/campaign-domain-modeling/references/domain-contract.md`](../.cursor/skills/campaign-domain-modeling/references/domain-contract.md).

## What exists today

| Path | Owns |
|------|------|
| `db/` | Dialect-aware Drizzle connection. `env.ts` reads `DB_DIALECT` / `SQLITE_PATH` / `DATABASE_URL`. `index.ts` builds `better-sqlite3` or `postgres`. `schema.ts` is an empty barrel until the campaign persistence story adds tables. |
| `db/migrations/` | drizzle-kit generated SQL and `meta/_journal.json`. Never hand-edited. |
| `db/sql/sqlite/` and `db/sql/postgres/` | Lexical data scripts for `db:seed`. Placeholders only until fixture stories add `INSERT`s. Not schema. |
| `contracts/` | Zod command, source, and read-model contracts plus the pure mappers and fixtures that derive UI-facing values from source records. |
| `actions/` | Server actions — the mutation entry points called from `app/`: campaign CRUD, queue status changes, suppression list. |
| `services/discovery/` | Maps / Places API client that discovers listings. |
| `services/scraper/` | Polite HTML fetcher for key website pages. |
| `services/enrichment/` | Fact extraction from scraped pages. |
| `services/drafting/` | LLM draft generation and prompt templates. |
| `utils/` | Framework-agnostic helpers, e.g. the Tailwind class merger `cn`. |
| `constants/` | Shared enums and presets: queue statuses, business category presets. |

## Connection and CLI

Copy `.env.example` to `.env` when you need to override defaults. SQLite is the default (`DB_DIALECT=sqlite`, file `data/localdraft.sqlite`). PostgreSQL is selected with `DB_DIALECT=postgres` and `DATABASE_URL`.

| Script | Behavior |
|--------|----------|
| `pnpm db:install` | Ensure the SQLite file exists (or ping Postgres), then `drizzle-kit migrate`. Succeeds with zero generated migrations. |
| `pnpm db:seed` | Run `lib/db/sql/<dialect>/*.sql` in lexical order. |
| `pnpm db:reset` | Delete the SQLite file, or `DROP SCHEMA public CASCADE` + recreate on Postgres, then install and seed. Refuses `NODE_ENV=production` unless `--force`. |
| `pnpm db:generate` / `db:migrate` / `db:push` / `db:studio` | drizzle-kit. Config is `drizzle.config.ts` (`schema` → `lib/db/schema.ts`, `out` → `lib/db/migrations`). |

Use `runQuery` from `lib/db` so call sites stay async when the dialect switches to Postgres. Do not import Turso / libSQL.

## Layering

## Planned directories

Do not invent callers for these until the matching story lands.

| Path | Intended owner | Story / epic |
|------|----------------|--------------|
| `db/env.ts`, `db/index.ts`, empty `schema.ts`, `db/sql/`, `scripts/db/cli.ts` | Dialect-aware Drizzle (SQLite default, Postgres selectable). No domain tables. | [`database-connection-and-cli-scaffolding-2026-09-20`](../.devtool/features/database-connection-and-cli-scaffolding-2026-09-20.md) |
| `db/migrations/` | drizzle-kit output only — never hand-edit | Same + persistence story |
| Domain tables in `schema.ts` | Campaign, Listing, Website, Fact, Draft, QueueRecord, Suppression | [`campaign-persistence-schema-and-migrations-2026-09-19`](../.devtool/features/campaign-persistence-schema-and-migrations-2026-09-19.md) |
| `actions/` | Server actions: campaign CRUD, queue status, suppression. Validate input; transaction boundary. | Campaign data-model / API stories |
| `services/discovery/`, `scraper/`, `enrichment/`, `drafting/` | Provider behind `types.ts` + `index.ts` | Pipeline service interface stories |
| `constants/` | Queue statuses, category presets | Architecture epic |

Env (planned, not in repo): `DB_DIALECT=sqlite\|postgres`, `SQLITE_PATH`, `DATABASE_URL`. Default remains local SQLite. Hosted Postgres is a later cutover, not required to run the UI.

## Layering (when those folders exist)

```
app/  ->  actions/  ->  services/  ->  db/
                    \______________/
```

- `actions/` may import from `contracts/`, `services/`, `db/`, `constants/`, and `utils/`. Every action validates its input and is the transaction boundary.
- `contracts/` is the shared vocabulary: it may import from `constants/` and `utils/` only, stays free of I/O, and is safe to import from a client component.
- Each `services/*` module exposes its contract through `types.ts` and its implementation through `index.ts`, so callers depend on the interface rather than the provider.
- `services/` may import from `db/`, `constants/`, and `utils/`, but never from a sibling service. Compose services in `actions/` instead.
- `db/` may import from `constants/` only.
- `utils/` and `constants/` import nothing from this project.

## Import rules

- Nothing in `lib/` may import from `app/` or `components/`.
- Server-only modules (`db/`, `services/`) must never be reachable from a client component. Campaign pages are already client components; do not import a future DB client from them.
