---
id: "review-queue-lead-list-2026-09-20"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-20T14:45:00.000Z"
modified: "2026-09-20T14:45:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-review-queue-2026-09-20"]
order: "a2"
---

# Review queue lead list

Left-pane filterable lead queue with compact 44px rows and a selected inset. Presentational only.

Parent epic: [`epic-review-queue-2026-09-20`](epic-review-queue-2026-09-20.md)

## File and primitives

- File: `components/queue/queue-lead-list.tsx`
- shadcn: `Input`, `Label`, `Badge`, `Button`, `ToggleGroup` (`ToggleGroupItem`)
- Queue views are a single-select `ToggleGroup`, same pattern as pipeline workbench filters. Do not CLI-add `Tabs` unless recovered HTML has a real tablist.
- Do not import [`pipeline-workbench-table`](done/pipeline-workbench-table-2026-09-19.md) or [`pipeline-workbench-filters`](done/pipeline-workbench-filters-2026-09-19.md).
- lucide: `Search` for the filter field. Status chips stay `Badge`. Do not use a Material icon font.

## Stitch contract

Source: LocalDraft - Review Queue (`projects/13798460973041177032/screens/edf29e27a2824c4da2952f5bd12988fa`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- Pane title: `Queue` with count `98`.
- Pending chip: `14 PENDING`.
- Filter placeholder stem: `Filter queue by business or cit` (screenshot truncated).
- Views: `All (98)`, `Needs Review (14)`, third chip truncated `R…` — render as `Ready`.
- Filled rows:
  1. `Lonestar Air & Heating` — `Needs Review` — `HVAC` • `South Austin` • `lonestarair-tx.com` — `2 Verified Facts` — `#01` (selected)
  2. `Round Rock Comfort Pros` — `Needs Review` — `HVAC` • `Round Rock` — `2 Verified Facts` — `#02`
  3. `Cedar Park HVAC Sp.` — `Ready` — `HVAC` • `Cedar Park` — `3 Verified Facts` — `#03`
  4. `Apex Cool Mechanical` — `Missing Website` — `HVAC` • `Austin` • `Google Maps Only` — `0 Website Facts` — `#04`
  5. `Barton Springs HVAC` — `Low Confidence` — `HVAC` • `Austin` — `1 Candidate Fact` — `#05`
  6. `Hill Country Climate Solutions` — `Needs Review` — `HVAC` • `Cedar Park` — `2 Verified Facts` — `#06`
  7. `Capital City Heat` — `Sent (Yesterday)` — `HVAC` • `Austin` — `Dispatched Manual` — `#07`

Do not add extra view chips from product-scope docs. Domain `lonestarair-tx.com` is the Review Queue string.

## Props

Typed mock-driven props. No queue API, filter persistence, or `/queue` routing inside the widget.

- `rows: { id: string; indexLabel: string; name: string; statusLabel: string; statusTone: "needs-review" | "ready" | "missing-website" | "low-confidence" | "sent"; niche: string; metro: string; domainLabel: string; factsLabel: string }[]`
- `selectedId: string | null`
- `onSelect: (id: string) => void`
- `view: "all" | "needs-review" | "ready"`
- `onViewChange: (view: "all" | "needs-review" | "ready") => void`
- `query: string`
- `onQueryChange: (value: string) => void`
- `totalCount: number`
- `pendingCount: number`
- `viewCounts: { all: number; needsReview: number; ready: number }`
- `disabled?: boolean`
- `className?: string`

Export `QUEUE_LEAD_LIST_ROWS` as the seven Stitch mocks. Empty mock: `rows: []`. The widget does not filter; the parent passes already-filtered `rows`.

## Visual tokens

- Pane: white, `1px solid #E2E8F0`, 8px radius.
- Title `headline-sm` `#0F172A`; count meta `#64748B`.
- `14 PENDING`: 20px chip, amber `#D97706` / `#FFFBEB` / `#FDE68A`.
- Filter input: 32px, 6px radius, `1px solid #CBD5E1`, placeholder `#94A3B8`.
- Selected view chip: `#F0FDFA` or filled `#0F766E` / white, matching exclusive ToggleGroup.
- Rows: 44px, hover `#F8FAFC`. Selected: `#F0FDFA` + 2px inset `#0F766E`.
- `Needs Review`: teal tint. `Ready`: emerald. `Missing Website`: rose. `Low Confidence`: amber. `Sent (Yesterday)`: muted slate.
- Verified facts: emerald text. `0 Website Facts`: rose. `1 Candidate Fact`: amber. `Dispatched Manual`: meta `#64748B`.
- Index `#01`–`#07`: `code-sm` `#94A3B8`.

## Acceptance Criteria

- [ ] Title `Queue` shows `totalCount` `98` and pending chip `14 PENDING` when `pendingCount` is 14.
- [ ] View chips are `All (98)`, `Needs Review (14)`, and `Ready` using `viewCounts`; selection calls `onViewChange` only.
- [ ] Filled mock renders the seven Stitch rows with names, status badges, niche/metro, domain or `Google Maps Only`, facts labels, and `#01`–`#07`.
- [ ] Selected row (`selectedId` = Lonestar) uses the teal inset treatment; click calls `onSelect(id)` only.
- [ ] Empty `rows` keeps the header, filter, and views and shows an empty list body (no invented leads). Disabled blocks selection and filter input.
- [ ] Filter input is labelled (visible or `aria-label`). Status is not color-only. Isolation: no fetch, no status-machine writes, no import of pipeline workbench widgets.

## Further breakdown

- [ ] Export `QUEUE_LEAD_LIST_ROWS` for the scaffold mock
- [ ] Truncated screenshot names stay as the contract strings above; do not silently swap in pipeline table copy
- [ ] CLI-add `scroll-area` only if the seven-row pane actually overflows in layout
