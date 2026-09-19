---
id: "campaign-actions-and-read-model-contracts-2026-09-19"
status: "backlog"
priority: "high"
assignee: null
dueDate: null
created: "2026-09-19T23:42:00.000Z"
modified: "2026-09-19T23:42:00.000Z"
completedAt: null
labels: ["story", "epic:epic-campaign-data-model-2026-09-19"]
order: "bT"
---

# Campaign actions and read model contracts

Define command and query contracts that connect the campaign model to setup, pipeline, workbench, and dashboard surfaces.

Parent epic: [`epic-campaign-data-model-2026-09-19`](epic-campaign-data-model-2026-09-19.md)

## Acceptance Criteria

- [ ] Save Draft accepts syntactically valid partial setup data, returns stable campaign identity/version/timestamps, and creates no pipeline run.
- [ ] Initialize Campaign validates the complete aggregate, checks the expected version, transitions the campaign atomically, and creates exactly one pending pipeline run per idempotency key.
- [ ] Action errors use field paths and bounded domain codes for validation, stale version, duplicate initialization, invalid transition, and persistence failure.
- [ ] Setup read models derive autosave time, completeness, prohibition count, local-boundary readiness, website-gate readiness, and initialization availability from source fields.
- [ ] Discovery preview derives estimated yield, confidence, detail caption, and staleness metadata without persisting those presentation values on Campaign.
- [ ] Pipeline/workbench read models map canonical run, listing, queue, fact, and draft data into the existing component prop shapes or documented replacements.
- [ ] Dashboard read models derive campaign portfolio status, funnel counts, velocity metrics, and audit alerts with definitions that can be tested against source rows.
- [ ] Read models never accept UI prose labels, colors, tones, percentages, or counters as authoritative write fields.

## Further breakdown

- [ ] Specify server-action input/result envelopes and idempotency handling.
- [ ] Define query DTOs for Campaign Setup, Pipeline, and Admin Dashboard.
- [ ] Add contract fixtures matching current filled, empty, stale, paused, and failed UI states.
