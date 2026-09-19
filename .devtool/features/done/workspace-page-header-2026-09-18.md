---
id: "workspace-page-header-2026-09-18"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T00:55:00.000Z"
modified: "2026-09-19T01:25:00.000Z"
completedAt: "2026-09-19T01:25:00.000Z"
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "a6"
---

# Workspace page header

Reusable page hero: spec strip slot, page title with an optional qualifier badge, and a constrained description line.

Parent epic: [`epic-campaign-setup-2026-09-18`](../epic-campaign-setup-2026-09-18.md)

## File and primitives

- File: `components/shared/page-header.tsx` (shared path from [`epic-application-architecture-2026-09-15`](epic-application-architecture-2026-09-15.md), section 4A)
- shadcn: `Badge`
- The strip is a slot, not baked-in copy, so the existing [`campaign-setup-status-bar`](campaign-setup-status-bar-2026-09-18.md) can supply the `Lead Engine: Active` and `AUTOSAVED 14:02 UTC` meta.

## Stitch contract

Source: LocalDraft - Campaign Setup (`projects/13798460973041177032/screens/dffcadf839ef470db0d105a117c66826`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

**Spec strip** (row above the title, split left/right)

- Left: mono pill `CAMPAIGN_SPEC_v2.4`, separator `/`, then `New Perimeter Setup` (uppercase, teal, semibold).
- Right: campaign status meta, supplied by the slot.

**Hero**

- Title: `Create Targeted Campaign` (h1).
- Qualifier badge: `Guided Setup`.
- Description (max ~3xl width): `Define your local search perimeter, research parameters, and offer boundaries. LocalDraft will find public websites and extract verified facts before drafting.`

## Props

Typed mock-driven props. No route, breadcrumb, or persistence concerns.

- `title: string`
- `badge?: string`
- `description?: string`
- `specToken?: string` (mono pill, e.g. `CAMPAIGN_SPEC_v2.4`)
- `phase?: string` (e.g. `New Perimeter Setup`)
- `meta?: React.ReactNode` (right side of the strip)
- `className?: string`

## Visual tokens

- Title: headline-xl 28px / 600, `#0F172A`.
- Badge: 20px height, 4px radius, `#F1F5F9` fill, text `#475569`, label-sm 11px semibold.
- Description: body-lg 15px / 400, `#475569`, capped at ~3xl measure.
- Spec pill: JetBrains Mono 12px, `#64748B` on `#F1F5F9`, 4px radius.
- Phase text: label-sm 11px semibold, uppercase, tracked, `#0F766E`.
- Strip sits on the canvas with no card surface; hero block is separated from following content by 24px.

## Acceptance Criteria

- [x] Title renders as a single `h1`; `badge` renders beside it only when provided.
- [x] Description renders when provided and is width-capped so it does not run the full grid.
- [x] Spec strip renders `specToken`, the `/` separator, and `phase`; the whole strip is omitted when none of `specToken`, `phase`, or `meta` is set.
- [x] `meta` slot renders right-aligned on the strip row and wraps below on narrow viewports rather than overflowing.
- [x] Title-only, title plus badge, and full (strip, badge, description, meta) variants all render in isolation.
- [x] No campaign-specific copy is hard-coded; the Stitch strings are supplied as props in the mock.

## Further breakdown

- [x] Confirm the component stays generic enough for the Review Queue and Follow-ups pages
- [ ] Decide whether `phase` should accept a node for future step indicators (kept as a string until a second page needs more)
