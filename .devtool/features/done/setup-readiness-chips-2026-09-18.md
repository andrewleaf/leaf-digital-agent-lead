---
id: "setup-readiness-chips-2026-09-18"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-19T16:25:00.000Z"
completedAt: "2026-09-19T16:25:00.000Z"
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "a1"
---

# Setup readiness chips

Status chips summarizing prohibition filters, local boundary, and website gate. Mock counts only.

Parent epic: [`epic-campaign-setup-2026-09-18`](../epic-campaign-setup-2026-09-18.md)

## File and primitives

- File: `components/campaigns/setup-readiness-chips.tsx`
- shadcn: `Badge`
- Complete-state affordance: lucide `Check`. Do not invent a second chip primitive.

## Stitch contract

Source: LocalDraft - Campaign Setup (`projects/13798460973041177032/screens/dffcadf839ef470db0d105a117c66826`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- `Prohibition Filters` → `3 Active`
- `Local Boundary Precision` → `3 Metros`
- `Website Verification Gate` → `Enabled`

## Props

Typed mock-driven props. The component does not count chips from sibling inputs or hit an API.

- `prohibitionFilters: number`
- `metros: number`
- `websiteGateEnabled: boolean`
- `className?: string`

Filled mock: `3`, `3`, `true`. Incomplete/empty mock: `0`, `0`, `false`.

## Visual tokens

- Chip height 20px, 4px radius, padding `0 6px`, `label-sm` 11px semibold.
- Complete: verified emerald `#ECFDF5` / `#047857` / `#A7F3D0` plus a check.
- Incomplete: attention amber `#FFFBEB` / `#B45309` / `#FDE68A` (or muted `#F8FAFC` / `#64748B` / `#E2E8F0`) — never emerald.

## Acceptance Criteria

- [x] Three chips render with labels `Prohibition Filters`, `Local Boundary Precision`, and `Website Verification Gate`.
- [x] Stitch filled mock values are `3 Active`, `3 Metros`, and `Enabled` respectively, each with a done/check affordance when complete.
- [x] Incomplete/empty mock (0 filters, 0 metros, gate off) uses muted or attention variants, not the complete/emerald treatment.
- [x] Values come from props; the component does not count chips from sibling inputs or hit an API.

## Further breakdown

- [x] Align complete-state color with Operator Core verified emerald
- [x] Keep chip height on 20px / `label-sm`
