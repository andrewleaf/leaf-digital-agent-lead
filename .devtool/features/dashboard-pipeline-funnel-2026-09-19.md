---
id: "dashboard-pipeline-funnel-2026-09-19"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T21:00:00.000Z"
modified: "2026-09-19T21:00:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaigns-admin-dashboard-2026-09-19"]
order: "aB"
---

# Dashboard pipeline funnel

Cross-campaign six-stage funnel with live business counts. New widget; do not reuse Setup or Pipeline steppers.

Parent epic: [`epic-campaigns-admin-dashboard-2026-09-19`](epic-campaigns-admin-dashboard-2026-09-19.md)

## File and primitives

- File: `components/campaigns/dashboard-pipeline-funnel.tsx`
- shadcn: `Card` (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`), `Badge`
- Numbered stage index is text (`1`–`6`), not a chart library and not linear `Progress` unless the HTML clearly shows a bar (it does not; this is a count list).
- Do not import [`pipeline-sequence-rail`](done/pipeline-sequence-rail-2026-09-18.md) or [`pipeline-stage-stepper`](pipeline-stage-stepper-2026-09-19.md). Stage titles differ.

## Stitch contract

Source: LocalDraft - Campaigns Admin Dashboard (`projects/13798460973041177032/screens/e569b1bad7964515ae9b8da0edd42ce4`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- Title: `6-Stage Pipeline Funnel`.
- Helper: `Live business count across the strict 6-stage ingestion and ground truth enrichment funnel.`

Stages (index, title, detail, metric):

1. `Setup & Perimeter Spec` — `Geographic radius & criteria` — `6 Specs`
2. `Maps & Registry Discovery` — `Secretary of State & Place APIs` — `1,428 Targets`
3. `Domain & SSL Matching` — `Live web validation & MX` — `1,345 (94.2%)`
4. `Public Fact Extraction` — `Owner names, years in biz, reviews` — `3,120 Facts`
5. `Grounded Draft Assembly` — `Variable citation synthesis` — `118 in Draft`
6. `Human Review & Native Send` — `Desk operator manual gate` — `91 Queue`

`1,428 Targets` lives on stage 2, not on the KPI row.

## Props

Typed mock-driven props. No pipeline aggregation API.

- `title?: string`
- `description?: string`
- `stages: { index: number; title: string; detail: string; metric: string }[]`
- `className?: string`

Filled mock: the six Stitch stages above. Empty mock: `stages: []` still shows title and helper.

Export `DASHBOARD_FUNNEL_STAGES` for the page scaffold.

## Visual tokens

- Card: white, `1px solid #E2E8F0`, 8px radius, padding 16px.
- Title: `headline-sm` 15px / 600. Helper: `body-sm` `#64748B`.
- Stage index: 24–28px circle or rounded square, 6px radius, teal tint `#F0FDFA` / `#0F766E`, `label-sm` semibold.
- Stage title: `body-md` 13px / 600, `#0F172A`. Detail: `body-sm` `#64748B`.
- Metric: `label-md` or `headline-sm`, `#0F766E` for counts; stage 6 `91 Queue` may stay teal (manual gate).
- Rows: ~44px, divider `#F1F5F9`, hover `#F8FAFC`. Vertical list, not a 6-column grid unless the HTML is a compact stack (it is a stack in the right rail).

## Acceptance Criteria

- [ ] Title is `6-Stage Pipeline Funnel` and the helper matches the Stitch sentence.
- [ ] Six stages render with the titles, details, and metrics above, including `1,428 Targets` on stage 2.
- [ ] Empty `stages` does not invent funnel steps. Isolation: no fetch.
- [ ] File does not import `PipelineSequenceRail` or `PipelineStageStepper`.
- [ ] Stage titles are visible text; index numbers are not color-only.

## Further breakdown

- [ ] Keep stage titles as props so a later domain rename does not require a rewrite
- [ ] Do not add Setup titles (`Directory & Maps Discovery` … `Manual Dispatch Desk`) as fallbacks
