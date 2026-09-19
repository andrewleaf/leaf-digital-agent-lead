---
id: "campaign-pipeline-actions-2026-09-19"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T18:20:00.000Z"
modified: "2026-09-19T18:20:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaign-pipeline-2026-09-19"]
order: "a1"
---

# Campaign pipeline actions

Header-block control cluster: Pause Research, Campaign Settings, and Jump to Review Queue. Presentational buttons only.

Parent epic: [`epic-campaign-pipeline-2026-09-19`](epic-campaign-pipeline-2026-09-19.md)

## File and primitives

- File: `components/campaigns/campaign-pipeline-actions.tsx`
- shadcn: `Button`
- lucide: `PauseCircle` for Stitch `pause_circle`, `SlidersHorizontal` for `tune`, `FilePen` for `rate_review`. Do not use the Material icon font.
- Do not invent a second button primitive. Pending uses the primary button's busy/disabled state, not a fake queue.

## Stitch contract

Source: LocalDraft - Campaign Pipeline (`projects/13798460973041177032/screens/81796119faa94a379c970ac48a6add3d`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- Secondary: `Pause Research`.
- Secondary: `Campaign Settings`.
- Primary: `Jump to Review Queue (14 Ready)`.

The `(14 Ready)` count is driven by a prop; the label pattern is `Jump to Review Queue ({n} Ready)`.

## Props

Typed mock-driven props. No pause API, settings route, or queue navigation.

- `readyCount: number`
- `onPause: () => void`
- `onSettings: () => void`
- `onJumpToQueue: () => void`
- `disabled?: boolean` — disables all three
- `pauseDisabled?: boolean` — disables Pause Research only
- `pending?: boolean` — busy/disabled on the primary without implying a live queue
- `className?: string`

Filled mock: `readyCount: 14`.

## Visual tokens

- Secondary: white, `1px solid #E2E8F0`, text `#0F172A`, hover canvas `#F8FAFC` / border `#CBD5E1`, 36px height, 6px radius. Icon `#64748B`.
- Primary: solid `#0F766E`, hover `#115E59`, on-primary white, 36px height, 6px radius.
- Horizontal cluster, wrapping on narrow widths (`flex-wrap`, `gap` 8px).

## Acceptance Criteria

- [ ] Secondary labels are `Pause Research` and `Campaign Settings` (Operator Core secondary spec).
- [ ] Primary label is `Jump to Review Queue (14 Ready)` when `readyCount` is 14; the count is interpolated from the prop.
- [ ] Clicks fire `onPause`, `onSettings`, and `onJumpToQueue` only; no fetch, pause job, or navigation occurs inside the component.
- [ ] Default, disabled (`disabled` or `pauseDisabled`), and pending (`pending` shows busy/disabled on the primary without faking a queue) states render in isolation.
- [ ] Buttons have accessible names matching the visible labels (icon is decorative).

## Further breakdown

- [ ] Do not wire `/queue` or campaign settings routes in this story
- [ ] Ready count `0` still renders `Jump to Review Queue (0 Ready)` rather than hiding the primary
