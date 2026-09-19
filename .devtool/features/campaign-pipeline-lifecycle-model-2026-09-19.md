---
id: "campaign-pipeline-lifecycle-model-2026-09-19"
status: "backlog"
priority: "critical"
assignee: null
dueDate: null
created: "2026-09-19T23:42:00.000Z"
modified: "2026-09-19T23:42:00.000Z"
completedAt: null
labels: ["story", "epic:epic-campaign-data-model-2026-09-19"]
order: "bR"
---

# Campaign pipeline lifecycle model

Separate campaign lifecycle, six-stage execution progress, and per-listing operator queue state with explicit transition and retry rules.

Parent epic: [`epic-campaign-data-model-2026-09-19`](epic-campaign-data-model-2026-09-19.md)

## Acceptance Criteria

- [ ] Campaign lifecycle uses `draft`, `active`, `paused`, and `archived` independently from pipeline and queue state.
- [ ] Pipeline runs contain six canonical stage keys: `discovery`, `website-matching`, `public-scrape`, `fact-extraction`, `draft-generation`, and `human-review`.
- [ ] Stage execution uses `pending`, `running`, `succeeded`, `failed`, or `skipped`, with attempt count, start/end timestamps, idempotency key, and bounded error summary.
- [ ] Queue status uses normalized values for New, Enriched, Drafted, Needs edit, No email, Skipped, Ready, Sent, Replied, and Follow-up due.
- [ ] Allowed and invalid transitions are documented and enforced, including no direct low-confidence Drafted-to-Ready transition without human resolution.
- [ ] Missing websites can produce explicit skipped scrape/extraction stages and a thin-record/manual-research path without pretending enrichment succeeded.
- [ ] Reruns preserve prior run history, retry only eligible stages, and cannot duplicate listings, facts, drafts, or queue records.
- [ ] Existing setup, pipeline, workbench, and dashboard prose labels map to canonical stage keys in read models; those labels are not database enums.

## Further breakdown

- [ ] Implement transition tables and pure transition guards.
- [ ] Define run/stage idempotency and retry policy.
- [ ] Add mappings for all current campaign UI stage/status variants.
