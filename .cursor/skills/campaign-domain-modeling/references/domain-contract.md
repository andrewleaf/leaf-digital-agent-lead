# Campaign Domain Contract Reference

## Canonical sources

Read only the sources relevant to the current card:

- Campaign model: `.devtool/features/epic-campaign-data-model-2026-09-19.md`
- Current setup surface: `app/(auth)/campaigns/new/page.tsx`
- Intake: `.devtool/features/epic-campaign-intake-fields-2026-09-12.md`
- Enrichment and evidence: `.devtool/features/epic-data-and-enrichment-2026-09-12.md`
- Persistence stack and original ER model: `.devtool/features/epic-application-architecture-2026-09-15.md` (SQLite default, PostgreSQL growth path). How tables attach to the client: [`persistence.md`](persistence.md).
- Queue lifecycle: `.devtool/features/epic-agent-workspace-2026-09-12.md`
- Compliance boundaries: `.devtool/features/epic-compliance-and-risk-2026-09-12.md`

If sources conflict, prefer explicit compliance/no-invention constraints, then the Campaign Data Model epic, then older architectural sketches, then UI mock copy.

## Invariants

- `Campaign` is the setup aggregate root.
- Required to initialize: at least one niche, at least one geography, offer summary, and CTA.
- Incomplete campaigns may be saved only as `draft`.
- Campaign lifecycle, pipeline run/stage status, and per-listing queue status are separate concepts.
- UI labels, tones, percentages, captions, readiness chips, and counters are derived.
- Operator-supplied proof is not an extracted fact.
- Every extracted fact carries source evidence; every draft citation links to a fact.
- Public business contact points belong to a listing, not to queue workflow state.
- Retries are idempotent across discovery, snapshots, extraction, drafts, and initialization.
- Name-and-city-only records require manual research; low-confidence drafts require human resolution.
- Review themes abstain unless public source material exists and review count is at least 10.
- No employee count, revenue, invented owner identity, sensitive portal data, protected records, or autonomous sending in v1.

## Canonical status families

### Campaign lifecycle

`draft`, `active`, `paused`, `archived`

### Pipeline stages

`discovery`, `website-matching`, `public-scrape`, `fact-extraction`, `draft-generation`, `human-review`

### Stage execution

`pending`, `running`, `succeeded`, `failed`, `skipped`

### Listing queue

`new`, `enriched`, `drafted`, `needs-edit`, `no-email`, `skipped`, `ready`, `sent`, `replied`, `follow-up-due`

## Model review checklist

- Stable IDs and business keys are not derived from mutable labels.
- Normalized keys retain original source/display values.
- Foreign keys, cardinality, uniqueness, nullability, indexes, and delete behavior are explicit.
- UTC timestamps distinguish creation, modification, source observation, execution, and expiry.
- Commands carry stable IDs, expected versions, and idempotency keys where retries are possible.
- Read models identify every derived field and never round-trip it as write authority.
- Evidence retention protects existing citations when refreshable cache data expires.
- Migrations cover empty databases and supported upgrades.
- Tests include invalid transitions, duplicate retries, provenance, thin records, suppression, and forbidden fields.
