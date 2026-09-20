# `lib/` — Data access, mutations, and business logic

Everything that is not routing or presentation. This is the only place that touches the database or external APIs.

Structure defined by [`epic-application-architecture-2026-09-15`](../.devtool/features/epic-application-architecture-2026-09-15.md).

## Directories

| Path | Owns |
|------|------|
| `db/` | Dialect-aware Drizzle connection. `env.ts` reads `DB_DIALECT` / `SQLITE_PATH` / `DATABASE_URL`. `index.ts` builds `better-sqlite3` or `postgres`. `schema.ts` is an empty barrel until the campaign persistence story adds tables. |
| `db/migrations/` | drizzle-kit generated SQL and `meta/_journal.json`. Never hand-edited. |
| `db/sql/sqlite/` and `db/sql/postgres/` | Lexical data scripts for `db:seed`. Placeholders only until fixture stories add `INSERT`s. Not schema. |
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

Dependencies point downward only, matching the flow diagram in the epic:

```
app/  ->  actions/  ->  services/  ->  db/
                    \______________/
```

- `actions/` may import from `services/`, `db/`, `constants/`, and `utils/`. Every action validates its input and is the transaction boundary.
- Each `services/*` module exposes its contract through `types.ts` and its implementation through `index.ts`, so callers depend on the interface rather than the provider.
- `services/` may import from `db/`, `constants/`, and `utils/`, but never from a sibling service. Compose services in `actions/` instead.
- `db/` may import from `constants/` only.
- `utils/` and `constants/` import nothing from this project.

## Import rules

- Nothing in `lib/` may import from `app/` or `components/`.
- Server-only modules (`db/`, `services/`) must never be reachable from a client component.
