---
id: "campaign-setup-actions-2026-09-18"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-18T20:12:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "bW"
---

# Campaign setup actions

Footer action pair: Save as Draft and Initialize Campaign Pipeline. Presentational buttons only.

Parent epic: [`epic-campaign-setup-2026-09-18`](epic-campaign-setup-2026-09-18.md)

Proposed file: `components/campaigns/campaign-setup-actions.tsx`. shadcn: Button.

## Acceptance Criteria

- [ ] Secondary button label is `Save as Draft` (outline/ghost per Operator Core secondary spec).
- [ ] Primary button label is `Initialize Campaign Pipeline` (solid `#0F766E`, 36px standard height, 6px radius).
- [ ] Clicks fire `onSaveDraft` and `onInitialize` props only; neither handler is implemented inside the component and no fetch/navigation occurs.
- [ ] Default, disabled (`disabled` or `initializeDisabled`), and pending (`pending` shows busy/disabled without faking a pipeline) states render in isolation.

## Further breakdown

- [ ] Pending state applies to the primary button only unless `pending` covers both
- [ ] Do not wire server actions or campaign create in this story
