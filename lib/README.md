# `lib/` — Data access, mutations, and business logic

Everything that is not routing or presentation. This is the only place that will touch the database or external APIs.

Target layering: [`epic-application-architecture-2026-09-15`](../.devtool/features/epic-application-architecture-2026-09-15.md). Domain shapes: [`.cursor/skills/campaign-domain-modeling/references/domain-contract.md`](../.cursor/skills/campaign-domain-modeling/references/domain-contract.md).

## What exists today

| Path | Owns |
|------|------|
| `utils/cn.ts` | Tailwind `clsx` + `tailwind-merge` helper |
| `utils/index.ts` | Re-exports `cn` for `@/lib/utils` |

There is no `db/`, `actions/`, `services/`, or `constants/` directory. Campaign pages keep mock data in the page or next to the widget.

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

- `actions/` may import `services/`, `db/`, `constants/`, `utils/`.
- Each `services/*` exposes `types.ts` + `index.ts`. Services must not import sibling services; compose in `actions/`.
- `db/` may import `constants/` only.
- `utils/` and `constants/` import nothing from this project.

## Import rules

- Nothing in `lib/` may import from `app/` or `components/`.
- Server-only modules (`db/`, `services/`) must never be reachable from a client component. Campaign pages are already client components; do not import a future DB client from them.
