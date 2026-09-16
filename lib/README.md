# `lib/` — Data access, mutations, and business logic

Everything that is not routing or presentation. This is the only place that touches the database or external APIs.

Structure defined by [`epic-application-architecture-2026-09-15`](../.devtool/features/epic-application-architecture-2026-09-15.md).

## Directories

| Path | Owns |
|------|------|
| `db/` | Drizzle client (`index.ts`) and schema (`schema.ts`) for Campaign, Listing, Website, Fact, Draft, QueueRecord, Suppression. |
| `db/migrations/` | drizzle-kit generated migrations. Never hand-edited. |
| `actions/` | Server actions — the mutation entry points called from `app/`: campaign CRUD, queue status changes, suppression list. |
| `services/discovery/` | Maps / Places API client that discovers listings. |
| `services/scraper/` | Polite HTML fetcher for key website pages. |
| `services/enrichment/` | Fact extraction from scraped pages. |
| `services/drafting/` | LLM draft generation and prompt templates. |
| `utils/` | Framework-agnostic helpers, e.g. the Tailwind class merger `cn`. |
| `constants/` | Shared enums and presets: queue statuses, business category presets. |

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
