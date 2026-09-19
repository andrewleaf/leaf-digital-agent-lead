---
id: "operator-velocity-cards-2026-09-19"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T21:00:00.000Z"
modified: "2026-09-19T21:00:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaigns-admin-dashboard-2026-09-19"]
order: "aA"
---

# Operator velocity cards

Seven-day dispatch audit cards for lead operators: reviewed count, average speed, reply rate, citation flags, native-sent proof. Mock operators only.

Parent epic: [`epic-campaigns-admin-dashboard-2026-09-19`](epic-campaigns-admin-dashboard-2026-09-19.md)

## File and primitives

- File: `components/campaigns/operator-velocity-cards.tsx`
- shadcn: `Card` (`CardHeader`, `CardTitle`, `CardContent`), `Badge`, `Avatar` / `AvatarFallback`
- lucide: `Check` for Stitch `check`, `ListChecks` (or `CheckCheck`) for `done_all`. Do not use the Material icon font.
- Three cards in one grid. Do not split into three story files.

## Stitch contract

Source: LocalDraft - Campaigns Admin Dashboard (`projects/13798460973041177032/screens/e569b1bad7964515ae9b8da0edd42ce4`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- Section title: `Lead Operator Velocity & Precision`.
- Caption: `Realtime dispatch audit (Past 7 days)`.

Filled mock cards:

1. Initials `A` — `Alex M.` — `Austin HVAC, Chicago Mech` — rank `#1 Velocity` — `142` `Reviewed` — `38s` `Avg Speed` — `28.4%` `Reply Rate` — `0 Citation Flags` — `100% Native Sent`.
2. Initials `S` — `Sarah K.` — `DFW Roofing, Atlanta Ortho` — rank `High Volume` — `118` `Reviewed` — `46s` `Avg Speed` — `24.1%` `Reply Rate` — `1 Flag Resolved` — `100% Native Sent`.
3. Initials `M` — `Marcus T.` — `Chicago Mechanical Lead` — rank `Top Conv.` — `94` `Reviewed` — `41s` `Avg Speed` — `29.0%` `Reply Rate` — `0 Citation Flags` — `100% Native Sent`.

Metric column labels `Reviewed`, `Avg Speed`, and `Reply Rate` are fixed Stitch copy.

## Props

Typed mock-driven props. No operator roster API.

- `title?: string`
- `caption?: string`
- `operators: { id: string; initials: string; name: string; coverage: string; rankLabel: string; rankTone: "velocity" | "volume" | "conversion"; reviewed: number; avgSpeed: string; replyRate: string; flagLabel: string; nativeSentLabel: string }[]`
- `className?: string`

Export `OPERATOR_VELOCITY_MOCK` as the three Stitch operators. Empty mock: `operators: []` still shows the section title and caption.

## Visual tokens

- Section title: `headline-md` 18px / 600. Caption: `body-sm` `#64748B`.
- Card: white, `1px solid #E2E8F0`, 8px radius, padding 16px.
- Name: `headline-sm` 15px / 600, `#0F172A`. Coverage: `body-sm` `#64748B`.
- Avatar fallback: 32–36px, teal tint `#F0FDFA` / `#0F766E`, `label-sm` or `code-sm`.
- Rank `#1 Velocity`: teal fill `#0F766E` / white, 20px chip. `High Volume` and `Top Conv.`: muted `#F1F5F9` / `#475569` or sky tint for conversion.
- Metric values: `headline-md` 18px / 600. Metric labels: `label-sm` uppercase `#64748B`.
- `0 Citation Flags` / `100% Native Sent`: emerald `#047857`. `1 Flag Resolved`: amber `#D97706` for the flag count, emerald for native-sent.
- Grid: 1 / 3 `lg` columns, gap 12px.

## Acceptance Criteria

- [ ] Section renders `Lead Operator Velocity & Precision` and `Realtime dispatch audit (Past 7 days)`.
- [ ] Filled mock shows Alex, Sarah, and Marcus with the Stitch coverage lines, rank chips, `142` / `118` / `94` reviewed, speeds, reply rates, flag lines, and `100% Native Sent`.
- [ ] Empty `operators` does not invent people. Isolation: no fetch.
- [ ] Rank chips are not color-only. Avatar fallbacks expose the initials as text.
- [ ] Metric labels `Reviewed`, `Avg Speed`, and `Reply Rate` match the Stitch strings.

## Further breakdown

- [ ] Rank tone only changes chip color; the visible label is `rankLabel`
- [ ] Do not add a fourth invented operator to fill the grid
