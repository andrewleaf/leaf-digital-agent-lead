---
id: "negative-constraints-input-2026-09-18"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-18T20:12:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "bS"
---

# Negative constraints input

Prohibition chips for claims LocalDraft must not invent. Presentational only.

Parent epic: [`epic-campaign-setup-2026-09-18`](epic-campaign-setup-2026-09-18.md)

Proposed file: `components/campaigns/negative-constraints-input.tsx`. shadcn: Input, Badge.

## Acceptance Criteria

- [ ] Eyebrow is `Strict Prohibition`; prompt copy matches Stitch: `Specify exact details, buzzwords, or misleading claims that LocalDraft MUST NOT invent or hallucinate under any circumstance:`
- [ ] Filled mock chip is `Do not claim guaranteed revenue improvements` with a block/prohibition affordance and dismiss control.
- [ ] Adding text via input/Enter calls `onAdd`; removing a chip calls `onRemove`; no campaign persistence.
- [ ] Empty, filled, and disabled states render in isolation; chips use rose/prohibition tokens (`#FFF1F2` / `#E11D48`), not success emerald.

## Further breakdown

- [ ] Optional helper caption `Crucial safety & brand reputation boundary conditions` if passed as `caption`
- [ ] Do not implement LLM prompt wiring in this story
