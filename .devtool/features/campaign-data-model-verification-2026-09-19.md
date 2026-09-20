---
id: "campaign-data-model-verification-2026-09-19"
status: "todo"
priority: "high"
assignee: null
epic: null
dueDate: null
created: "2026-09-19T23:42:00.000Z"
modified: "2026-09-20T00:05:11.308Z"
completedAt: null
labels: ["story", "epic:epic-campaign-data-model-2026-09-19"]
order: "a0"
---
# Campaign data model verification

Prove the schema, contracts, lifecycle rules, provenance, and current Campaign Setup coverage before UI data wiring begins.

Parent epic: [`epic-campaign-data-model-2026-09-19`](epic-campaign-data-model-2026-09-19.md)

## Acceptance Criteria

- [ ] A clean temporary SQLite database can apply every migration and expose all expected keys, constraints, indexes, and relations.
- [ ] Supported upgrade fixtures retain campaign, listing, fact, draft, queue, and suppression data without lossy coercion.
- [ ] Contract tests cover empty draft save, partial save, complete initialization, field errors, stale versions, repeated idempotency keys, and invalid transitions.
- [ ] Uniqueness tests prove repeated discovery, scrape, extraction, drafting, and initialization do not duplicate durable entities.
- [ ] Provenance tests prove every citation resolves through Fact to retained provider or website evidence.
- [ ] Review-theme tests abstain below 10 reviews and no-invention tests reject unsupported owner, employee, revenue, and sentiment claims.
- [ ] Thin-record and low-confidence fixtures cannot become Ready without an explicit human-review transition.
- [ ] A route coverage test or maintained field matrix accounts for every state value and derived panel on `app/(auth)/campaigns/new/page.tsx`.
- [ ] Schema/contract audits find no sensitive portal/payment/protected-record fields and no presentation-only labels or colors.
- [ ] Typecheck, lint, focused model tests, and migration checks are documented and pass before the epic is closed.

## Further breakdown

- [ ] Create representative campaign-to-outreach fixture graphs.
- [ ] Add schema introspection and forbidden-field assertions.
- [ ] Publish a traceability checklist from route fields and source epics to tests.