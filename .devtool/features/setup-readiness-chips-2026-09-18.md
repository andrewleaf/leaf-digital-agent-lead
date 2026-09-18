---
id: "setup-readiness-chips-2026-09-18"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-18T20:12:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "bU"
---

# Setup readiness chips

Status chips summarizing prohibition filters, local boundary, and website gate. Mock counts only.

Parent epic: [`epic-campaign-setup-2026-09-18`](epic-campaign-setup-2026-09-18.md)

Proposed file: `components/campaigns/setup-readiness-chips.tsx`. shadcn: Badge.

## Acceptance Criteria

- [ ] Three chips render with labels `Prohibition Filters`, `Local Boundary Precision`, and `Website Verification Gate`.
- [ ] Stitch filled mock values are `3 Active`, `3 Metros`, and `Enabled` respectively, each with a done/check affordance when complete.
- [ ] Incomplete/empty mock (0 filters, 0 metros, gate off) uses muted or attention variants, not the complete/emerald treatment.
- [ ] Values come from props; the component does not count chips from sibling inputs or hit an API.

## Further breakdown

- [ ] Align complete-state color with Operator Core verified emerald
- [ ] Keep chip height on 20px / `label-sm`
