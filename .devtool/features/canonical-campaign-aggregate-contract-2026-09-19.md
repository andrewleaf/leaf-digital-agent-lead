---
id: "canonical-campaign-aggregate-contract-2026-09-19"
status: "backlog"
priority: "critical"
assignee: null
dueDate: null
created: "2026-09-19T23:42:00.000Z"
modified: "2026-09-19T23:42:00.000Z"
completedAt: null
labels: ["story", "epic:epic-campaign-data-model-2026-09-19"]
order: "bN"
---

# Canonical campaign aggregate contract

Define the campaign aggregate and validation contract shared by the Campaign Setup route, persistence layer, and pipeline initialization.

Parent epic: [`epic-campaign-data-model-2026-09-19`](epic-campaign-data-model-2026-09-19.md)

## Acceptance Criteria

- [ ] A field matrix maps every editable value in `app/(auth)/campaigns/new/page.tsx` to its canonical name, type, nullability, default, and ownership.
- [ ] `niches`, `geographies`, `offerSummary`, and `callToAction` are required for initialization but incomplete values remain saveable while lifecycle is `draft`.
- [ ] Voice profile, operator-supplied proof, negative constraints, website/email/review filters, proof extraction, and fallback action have explicit enums or bounded validation.
- [ ] Route-only input text, autosave display text, NAICS badges, readiness chips, discovery preview, and surface labels are documented as transient or derived rather than persisted truth.
- [ ] A shared Zod contract is specified for draft save and a stricter derived contract for initialization; server validation is authoritative and client validation uses the same rules.
- [ ] Stable row IDs and normalized comparison keys replace label-derived chip IDs; duplicates are rejected case-insensitively without losing operator-entered display text.
- [ ] Employee count, revenue, and other v2 firmographic fields are absent from schemas and command payloads.
- [ ] Optimistic concurrency behavior is defined so stale draft saves or initialization commands cannot overwrite newer changes.

## Further breakdown

- [ ] Author campaign, niche, geography, proof, constraint, filter, and research-setting schemas.
- [ ] Define draft and initialization refinements plus field-level error paths.
- [ ] Add route-to-contract fixtures for empty, partial, complete, and invalid campaign setups.
