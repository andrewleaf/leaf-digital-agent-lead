---
id: "pipeline-workbench-table-2026-09-19"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T18:20:00.000Z"
modified: "2026-09-19T18:20:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaign-pipeline-2026-09-19"]
order: "a5"
---

# Pipeline workbench table

Listing table with business identity, metro chip, stage badge, confidence/citations, and operator next-action. Mock rows only.

Parent epic: [`epic-campaign-pipeline-2026-09-19`](epic-campaign-pipeline-2026-09-19.md)

## File and primitives

- File: `components/campaigns/pipeline-workbench-table.tsx`
- shadcn: `Table` (`TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`), `Badge`, `Button`
- `Table` is not in `components/ui/` yet — CLI-add it (`npx shadcn@latest add table`). Do not hand-roll a `<table>` primitive in `components/campaigns/`.
- lucide: `ListChecks` for Stitch `checklist`, `Globe` for `language`, `Shield` for `policy`, `CircleAlert` for `error_outline`, `CircleHelp` for `help_outline`, `FilePen` for `edit_document`, `Link` for `add_link`, `Eye` for `visibility`, `FlaskConical` for `science`. Initials tiles are a 28px rounded square, not `Avatar` unless it already fits. Do not use the Material icon font.

## Stitch contract

Source: LocalDraft - Campaign Pipeline (`projects/13798460973041177032/screens/81796119faa94a379c970ac48a6add3d`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

Column headers (uppercase tracked `label-sm`): `Business Name`, `Metro Location`, `Pipeline Stage`, `Confidence & Citations`, `Operator Next Action`.

Filled mock rows:

1. Initials `LA` — `Lonestar Air & Heating` — `lonestarairtx.com • TDLR #TACLA019822E` — metro `Austin, TX` — `Stage 6: Ready for Review` — `3 Verified Facts` — `Austin Chronicle '23 Best Pick, 24/7 Dispatch` — action `Review Draft`. Category `ready-review`.
2. Initials `RR` — `Round Rock Comfort Pros` — `rrcomfortpros.net • Carrier Authorized` — metro `Round Rock, TX` — `Stage 6: Ready for Review` — `2 Verified Facts` — `14 Techs, Lennox Premier Dealer Status` — action `Review Draft`. Category `ready-review`.
3. Initials `AC` — `Apex Cool Mechanical` — `Registered entity: APEX COOL LLC` — metro `Austin, TX` — `Stage 3: Missing Website` — `Warning: Primary domain unreachable / DNS error` — action `Add Website URL`. Category `needs-attention` (rose row tint).
4. Initials `BS` — `Barton Springs HVAC` — `bartonspringshvac.com • South Lamar Blvd` — metro `Austin, TX` — `Stage 4: Low Confidence` — `Amber: Commercial service hours conflict` — action `Verify Source`. Category `needs-attention`.
5. Initials `HC` — `Hill Country Climate Solutions` — `hillcountryclimate.com • Bell Blvd` — metro `Cedar Park, TX` — `Stage 5: Generating Draft` — `Research Complete` — `Awaiting AI synthesis queue slot #3` — action `View Live Research`. Category `completed` in the Stitch `data-category` (row is in-progress visually).

Action labels stay verbatim. Do not invent extra columns.

## Props

Typed mock-driven props. No listing API, draft open, or URL capture.

- `rows: { id: string; initials: string; name: string; detail: string; metro: string; stageLabel: string; stageTone: "ready" | "missing" | "low-confidence" | "generating"; citationsLabel: string; citationsDetail?: string; citationsTone: "verified" | "warning" | "amber" | "complete"; actionLabel: string; actionTone: "primary" | "secondary"; category: "ready-review" | "needs-attention" | "completed" }[]`
- `onAction: (id: string) => void`
- `className?: string`

Export `PIPELINE_WORKBENCH_ROWS` as the five Stitch mocks. Empty mock: `rows: []`.

This table does not filter; the parent mock passes the already-filtered `rows`.

## Visual tokens

- Header row: tint `#F8FAFC`, `label-sm` 11px uppercase tracked, `#64748B`.
- Body: `body-md` 13px. Row hover `#F8FAFC`. Compact row ~44–52px (name + detail stack).
- Needs-attention row (`Apex Cool`): surface tint `#FFF1F2` at low opacity (Stitch `bg-error/5`), not a hard rose fill.
- Initials tile: 28px, 6px radius, teal tint `#F0FDFA` / `#0F766E` (`code-sm` semibold). Missing-website tile may use sky tint.
- Name: `#0F172A` semibold; hover name `#0F766E`. Detail: `code-sm` `#64748B`.
- Metro chip: 20px, 4px, `#F1F5F9` / `#475569`.
- Stage ready: teal tint `#F0FDFA` / `#0F766E` pill. Missing / low-confidence: muted `#F1F5F9` / `#475569`. Generating: sky tint / `#0284C7` with a pulsing 6px dot.
- Verified facts chip: emerald `#047857` with 6px emerald dot. Warning: rose icon `#E11D48`. Amber: `#D97706` / help icon.
- Primary action (`Review Draft`): `#0F766E`, white text, 28px (`h-7`) height, 6px radius, `label-sm`.
- Secondary actions: white / `#E2E8F0` border, `#0F172A` text, same 28px height.
- Action column is right-aligned.

## Acceptance Criteria

- [ ] Column headers match `Business Name`, `Metro Location`, `Pipeline Stage`, `Confidence & Citations`, `Operator Next Action`.
- [ ] Filled mock renders the five Stitch businesses with the names, details, metros, stage labels, citation lines, and action labels above.
- [ ] `Review Draft` uses the primary teal button; `Add Website URL`, `Verify Source`, and `View Live Research` use secondary. Clicks call `onAction(id)` only.
- [ ] Apex Cool row uses the attention/rose tint; citation warning text remains visible (not color-only).
- [ ] Empty `rows` renders a table with headers and an empty body (no invented listings). Isolation: no fetch, no filter logic, no route to the review queue.
- [ ] `Table` is CLI-added to `components/ui/`. Header cells are `th`; action buttons have accessible names.

## Further breakdown

- [ ] Export the five-row mock constant for page-assembly later
- [ ] CLI-add watch: if `table` emits a bad `cn` import, correct to `@/lib/utils`
- [ ] Do not paginate inside this file; footer is a sibling story
