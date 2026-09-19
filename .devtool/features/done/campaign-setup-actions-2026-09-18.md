---
id: "campaign-setup-actions-2026-09-18"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-19T16:35:00.000Z"
completedAt: "2026-09-19T16:35:00.000Z"
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "bW"
---

# Campaign setup actions

Footer action pair: Save as Draft and Initialize Campaign Pipeline. Presentational buttons only.

Parent epic: [`epic-campaign-setup-2026-09-18`](../epic-campaign-setup-2026-09-18.md)

## File and primitives

- File: `components/campaigns/campaign-setup-actions.tsx`
- shadcn: `Button`
- Do not invent a second button primitive. Pending uses the primary button's busy/disabled state, not a fake pipeline.

## Stitch contract

Source: LocalDraft - Campaign Setup (`projects/13798460973041177032/screens/dffcadf839ef470db0d105a117c66826`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- Secondary: `Save as Draft`.
- Primary: `Initialize Campaign Pipeline`.

## Props

Typed mock-driven props. No fetch, navigation, or campaign create.

- `onSaveDraft: () => void`
- `onInitialize: () => void`
- `disabled?: boolean` — disables both buttons
- `initializeDisabled?: boolean` — disables the primary only
- `pending?: boolean` — busy/disabled on the primary without implying a running pipeline
- `className?: string`

## Visual tokens

- Secondary: white, `1px solid #E2E8F0`, text `#0F172A`, hover canvas `#F8FAFC` / border `#CBD5E1`, 36px height, 6px radius.
- Primary: solid `#0F766E`, hover `#115E59`, on-primary white, 36px height, 6px radius.

## Acceptance Criteria

- [x] Secondary button label is `Save as Draft` (outline/ghost per Operator Core secondary spec).
- [x] Primary button label is `Initialize Campaign Pipeline` (solid `#0F766E`, 36px standard height, 6px radius).
- [x] Clicks fire `onSaveDraft` and `onInitialize` props only; neither handler is implemented inside the component and no fetch/navigation occurs.
- [x] Default, disabled (`disabled` or `initializeDisabled`), and pending (`pending` shows busy/disabled without faking a pipeline) states render in isolation.

## Further breakdown

- [x] Pending state applies to the primary button only unless `pending` covers both
- [x] Do not wire server actions or campaign create in this story
