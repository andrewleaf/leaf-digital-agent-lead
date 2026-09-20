---
id: "campaign-persistence-schema-and-migrations-2026-09-19"
status: "backlog"
priority: "critical"
assignee: null
dueDate: null
created: "2026-09-19T23:42:00.000Z"
modified: "2026-09-20T05:15:00.000Z"
completedAt: null
labels: ["story", "epic:epic-campaign-data-model-2026-09-19"]
order: "bO"
---

# Campaign persistence schema and migrations

Implement the SQLite and Drizzle relational foundation for the approved campaign data model. Connection, dialect switch, and CLI already belong to [`database-connection-and-cli-scaffolding-2026-09-20`](database-connection-and-cli-scaffolding-2026-09-20.md); this story owns tables and generated migrations.

Parent epic: [`epic-campaign-data-model-2026-09-19`](epic-campaign-data-model-2026-09-19.md)

## Acceptance Criteria

- [ ] Schema modules and generated migrations reuse the existing dialect-aware client, `drizzle.config.ts`, and `lib/db/schema.ts` barrel from [`database-connection-and-cli-scaffolding-2026-09-20`](database-connection-and-cli-scaffolding-2026-09-20.md). Do not create a second connection path.
- [ ] Tables cover campaigns, campaign child collections, pipeline runs/stages, listings, discovery cache, contact points, website snapshots, facts, drafts/citations, queue records, outreach events, and suppression entries.
- [ ] Every relation declares primary/foreign keys, required nullability, uniqueness, indexes, timestamp representation, and explicit delete behavior.
- [ ] Enumerated values are constrained in application contracts and, where supported safely by SQLite migrations, by database checks.
- [ ] Campaign child ordering is deterministic and normalized duplicate constraints are enforced.
- [ ] Campaign writes that replace child collections are transactional; initialization creates the campaign state transition and first pipeline run atomically.
- [ ] Initial migration applies to an empty database, rollback/recovery instructions are documented, and a supported upgrade fixture preserves existing records.
- [ ] Schema uses portable Drizzle column types that can generate SQLite now and PostgreSQL later. Do not add PostgreSQL-only, MySQL, Prisma, Turso, multi-tenant, or UI-presentation columns.

## Further breakdown

- [ ] Establish schema module boundaries and relation exports.
- [ ] Define indexes for campaign lists, queue filters, provider identity, cache expiry, stage status, and suppression lookup.
- [ ] Add migration smoke tests against temporary SQLite databases.
