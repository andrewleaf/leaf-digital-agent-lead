---
id: "dashboard-telemetry-metrics-2026-09-19"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T21:00:00.000Z"
modified: "2026-09-19T21:00:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaigns-admin-dashboard-2026-09-19"]
order: "a8"
---

# Dashboard telemetry metrics

Five KPI cards for active pipelines, live domain validity, average triage time, citation integrity, and owner reply rate. Mock metrics only.

Parent epic: [`epic-campaigns-admin-dashboard-2026-09-19`](epic-campaigns-admin-dashboard-2026-09-19.md)

## File and primitives

- File: `components/campaigns/dashboard-telemetry-metrics.tsx`
- shadcn: `Card` (`CardHeader`, `CardTitle`, `CardContent`), `Badge`
- lucide: `Share2` (or `Network`) for Stitch `hub`, `BadgeCheck` for `verified`, `Timer` for `timer`, `Shield` for `policy`, `MessagesSquare` for `forum`. Do not use the Material icon font.
- Five cards in one grid component. Do not split into five story files; a small inner card helper in the same file is fine.
- Do not import [`pipeline-summary-metrics`](pipeline-summary-metrics-2026-09-19.md). Labels and values differ.

## Stitch contract

Source: LocalDraft - Campaigns Admin Dashboard (`projects/13798460973041177032/screens/e569b1bad7964515ae9b8da0edd42ce4`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

Labels are fixed Stitch copy. Values are props. There are **five** cards. `1,428` belongs on the funnel (`Maps & Registry Discovery`), not here.

1. `Active Pipelines` — hero `6` — chips `2 Paused` / `1 Archived`.
2. `Live Domain Valid` — hero `94.2%` — suffix `1,345 live`.
3. `Avg Triage Time` — hero `42s` — delta `-6s goal` — meta `312 approved this wk`.
4. `Citation Integrity` — hero `99.4%` — `0 halluc.` / `8 flagged for review`.
5. `Owner Reply Rate` — hero `26.8%` — delta `+4.2%` — caption `High intent conversations`.

## Props

Typed mock-driven props. No telemetry API.

- `pipelines: { value: number; paused: number; archived: number }`
- `domainValid: { rate: string; liveCount: number }`
- `triage: { avg: string; delta: string; approvedThisWeek: number }`
- `citations: { rate: string; hallucinations: number; flagged: number }`
- `replyRate: { rate: string; delta: string; caption: string }`
- `className?: string`

Filled mock: the Stitch numbers above (`rate` strings keep the `%` and `s` suffixes as shown). Empty mock: zeros and `0%` / `0s`.

Export `DASHBOARD_TELEMETRY_MOCK` for the page scaffold.

## Visual tokens

- Each card: white `#FFFFFF`, `1px solid #E2E8F0`, 8px radius, padding 12px (`space-md`).
- Eyebrow label: `label-sm` 11px uppercase tracked, `#64748B`. Icon `#64748B`.
- Hero number: `headline-xl` 28px / 600, `#0F172A`. Domain-valid and citation-integrity heroes may use emerald `#047857` when the HTML treats them as verified.
- Paused / archived chips: 20px, 4px, `#F1F5F9` / `#475569`.
- Live suffix and `approved this wk`: `body-sm` `#64748B`.
- Triage delta `-6s goal` and reply delta `+4.2%`: emerald `#047857`.
- Flagged-for-review count: amber `#D97706` if the HTML uses warning tint; otherwise muted.
- Grid: 1 / 2 `sm` / 5 `lg` columns, gap 12px.

## Acceptance Criteria

- [ ] Five cards render with labels `Active Pipelines`, `Live Domain Valid`, `Avg Triage Time`, `Citation Integrity`, `Owner Reply Rate`.
- [ ] Filled mock shows `6`, `94.2%`, `42s`, `99.4%`, `26.8%` plus the Stitch chips, deltas, and captions above.
- [ ] No sixth card for `1,428`. Empty/zero mock still shows the five labels.
- [ ] Isolation: no fetch. Do not import `PipelineSummaryMetrics`.
- [ ] Card titles are text, not color-only. Icons are decorative (`aria-hidden`) when labels already name the metric.

## Further breakdown

- [ ] `0 halluc.` stays verbatim from the Stitch string (including abbreviation)
- [ ] Reply caption `High intent conversations` is a prop, not hard-coded in the component if `replyRate.caption` is provided
