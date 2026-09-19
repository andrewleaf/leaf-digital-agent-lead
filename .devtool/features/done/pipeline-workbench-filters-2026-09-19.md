---
id: "pipeline-workbench-filters-2026-09-19"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T18:20:00.000Z"
modified: "2026-09-19T19:50:00.000Z"
completedAt: "2026-09-19T19:50:00.000Z"
labels: ["story", "component", "epic:epic-campaign-pipeline-2026-09-19"]
order: "a4"
---

# Pipeline workbench filters

Workbench view tabs, company/city text filter, and Export CSV. Presentational controls only.

Parent epic: [`epic-campaign-pipeline-2026-09-19`](../epic-campaign-pipeline-2026-09-19.md)

## File and primitives

- File: `components/campaigns/pipeline-workbench-filters.tsx`
- shadcn: `ToggleGroup` / `ToggleGroupItem`, `Input`, `Button`, `Badge`
- Prefer installed `ToggleGroup` (`type="single"`) over CLI-adding `Tabs`. Do not hand-roll an `aria-pressed` tab row.
- lucide: `ListFilter` for Stitch `filter_list`, `Download` for `file_download`. Do not use the Material icon font.
- Counts on Needs Attention and Ready for Review are `Badge`s; All / Completed counts are muted `code-sm` text beside the label.

## Stitch contract

Source: LocalDraft - Campaign Pipeline (`projects/13798460973041177032/screens/81796119faa94a379c970ac48a6add3d`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- Views, in order: `All Pipeline Items` `128`, `Needs Attention` `14`, `Ready for Review` `14`, `Completed` `84`.
- Filled mock: `All Pipeline Items` is the selected view.
- Input placeholder: `Filter company or city...`.
- Secondary: `Export CSV`.

View labels are fixed Stitch copy. Counts and the selected view are props.

## Props

Typed mock-driven props. No CSV writer and no table filtering inside this component (the parent mock wires `value` / `query` to the table story).

- `value: "all" | "needs-attention" | "ready-review" | "completed"`
- `onValueChange: (value: "all" | "needs-attention" | "ready-review" | "completed") => void`
- `counts: { all: number; needsAttention: number; readyReview: number; completed: number }`
- `query: string`
- `onQueryChange: (value: string) => void`
- `onExport: () => void`
- `disabled?: boolean`
- `className?: string`

Filled mock: `value: "all"`, counts `128 / 14 / 14 / 84`, `query: ""`.

Export `WORKBENCH_VIEWS` as `{ value; label }[]` in Stitch order.

## Visual tokens

- Bar sits on a tinted strip `#F8FAFC` / 40% with 12px padding; this component owns the strip, not a second card.
- Selected view: `#F1F5F9` (or surface) fill, `#0F172A` semibold, 32px height, 6px radius, `label-md` 12px.
- Unselected: transparent, text `#475569`, hover `#F8FAFC`.
- Needs Attention count badge: rose tint `#FFF1F2` / `#E11D48`, 20px / 4px / `label-sm`.
- Ready for Review count badge: teal tint `#F0FDFA` / `#0F766E`.
- All / Completed counts: `code-sm` `#64748B`, no badge fill.
- Filter input: white (or `#F1F5F9` surface-container), `1px solid #CBD5E1`, 32px height, 6px radius, `body-sm` 12px, placeholder `#94A3B8`, width 192–224px, teal focus ring.
- Export: secondary 32px, 6px radius.

## Acceptance Criteria

- [x] Four views render in order with labels `All Pipeline Items`, `Needs Attention`, `Ready for Review`, `Completed`.
- [x] Filled mock shows counts `128`, `14`, `14`, `84` and has `All Pipeline Items` selected.
- [x] Single selection only via `ToggleGroup`; `value` / `onValueChange` are props. Empty query, filled query, and disabled group states render in isolation.
- [x] Input placeholder is `Filter company or city...`; it is labelled (visually hidden is fine) and controlled by `query` / `onQueryChange`.
- [x] `Export CSV` calls `onExport` only; the component does not build or download a file.
- [x] Needs Attention and Ready for Review counts use rose and teal badges respectively; counts remain visible text, not color-only.

## Further breakdown

- [x] Deselecting is not a Stitch state; ignore an empty `onValueChange` the same way composer voice does
- [x] Do not filter table rows inside this file
