---
name: campaign-domain-modeling
description: >-
  Designs and reviews LocalDraft campaign, discovery, enrichment, pipeline,
  draft, queue, outreach, and suppression data contracts. Use when planning or
  implementing schemas, migrations, validation, server actions, pipeline DTOs,
  or campaign UI data wiring.
---

# Campaign Domain Modeling

Use this workflow for any change that creates, modifies, or consumes LocalDraft campaign-domain data.

## Workflow

1. Read [`agenda.md`](../../../agenda.md) and list relevant cards in [`.devtool/features/`](../../../.devtool/features/). Do not write application code until the matching story is in Doing.
2. Read [`references/domain-contract.md`](references/domain-contract.md) and the source epics/cards it identifies.
3. Inventory the affected UI fields, commands, persisted entities, derived read models, lifecycle states, and evidence requirements.
4. Assign one owner for every field:
   - persisted source of truth;
   - transient command/input state; or
   - derived read-model value.
5. Keep campaign lifecycle, pipeline execution, and per-listing queue status separate. Map surface labels to canonical keys at the read-model boundary.
6. Specify keys, normalization, nullability, constraints, indexes, delete behavior, timestamps, idempotency, provenance, retention, and migration behavior before implementation.
7. Enforce no-invention, sensitive-data, public-source, suppression, and human-review rules in both validation and persistence boundaries.
8. Add tests for clean migrations, upgrades, retries, invalid transitions, thin records, provenance, and forbidden fields.
9. Update the owning card when a new decision changes its acceptance criteria. Do not create a competing domain contract in component-local types.

## Required output for design work

- Canonical field and enum tables.
- Entity/relationship or flow diagram when relationships are non-trivial.
- Command and read-model boundaries.
- Explicit v1 exclusions and unresolved conflicts.
- Implementation-ready Kanban acceptance criteria.

## Drift check

Before finishing, compare the contract against the Campaign Setup route, Campaign Pipeline components, Campaigns Admin Dashboard components, and the source epics. Report mismatches; do not preserve mock copy when it violates a domain or compliance invariant.
