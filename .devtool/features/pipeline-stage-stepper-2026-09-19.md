---
id: "pipeline-stage-stepper-2026-09-19"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T18:20:00.000Z"
modified: "2026-09-19T18:20:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaign-pipeline-2026-09-19"]
order: "a2"
---

# Pipeline stage stepper

Six-stage run-progress grid with status chips and linear meters. Presentational list only.

Parent epic: [`epic-campaign-pipeline-2026-09-19`](epic-campaign-pipeline-2026-09-19.md)

## File and primitives

- File: `components/campaigns/pipeline-stage-stepper.tsx`
- shadcn: `Card` (`CardHeader`, `CardTitle`, `CardContent`, `CardDescription` if needed), `Badge`, `Progress`
- `Progress` is not in `components/ui/` yet — CLI-add it (`npx shadcn@latest add progress`). Linear bars match this Stitch screen. Do **not** use a circular confidence ring and do not hand-roll a meter div.
- lucide: `CircleCheck` for Stitch `check_circle`, `Lock` for `lock`. In-progress uses a pulsing 6px teal dot, not a second icon font.
- Do not import or extend [`pipeline-sequence-rail-2026-09-18`](done/pipeline-sequence-rail-2026-09-18.md). That widget is the Setup preview list with different stage titles.

## Stitch contract

Source: LocalDraft - Campaign Pipeline (`projects/13798460973041177032/screens/81796119faa94a379c970ac48a6add3d`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- Eyebrow: `Deterministic Workflow`.
- Title: `Six-Stage Pipeline Progress`.
- Legend: `Completed (4)`, `Active (1)`, `Pending (1)`.
- Stages (01–06), filled mock:

| # | Title | Status | Description | Metric | Value |
|---|---|---|---|---|---|
| 01 | `Campaign Setup` | `Done` | `Austin, Round Rock, Cedar Park HVAC taxonomy` | `Geo Parameters` | `100%` |
| 02 | `Discovery` | `Done` | `128 businesses indexed via Google Maps & Secretary of State` | `Discovered` | `128 / 128` |
| 03 | `Website Matching` | `Done` | `121 verified domains resolved (7 flagged for operator review)` | `Domain Match` | `94.5%` |
| 04 | `Public Scrapes` | `Done` | `114 sites parsed for team size, awards, license #s (7 incomplete)` | `Crawl Yield` | `114 / 121` |
| 05 | `Draft Generation` | `In Progress` | `98 personalized drafts generated; 16 remaining in pipeline` | `Synthesis Progress` | `88%` |
| 06 | `Human Review` | `Manual Only` | `Strict manual operator gate. 0 blast risk. 14 ready right now.` | `Ready in Queue` | `14 Leads` |

Stage 05 is the active card (teal ring). Stage 06 is pending / manual-only, not done.

## Props

Typed mock-driven props. No jobs, polling, or pipeline runner.

- `stages: { index: string; title: string; status: "done" | "in-progress" | "pending"; statusLabel: string; description: string; metricLabel: string; metricValue: string; progress: number }[]`
- `completedCount: number`
- `activeCount: number`
- `pendingCount: number`
- `className?: string`

Export `PIPELINE_RUN_STAGES` with the six Stitch titles, default descriptions, status labels, metrics, and progress values from the filled mock. `progress` is 0–100 for the linear bar (`94.5` → `94.5`, `14 Leads` bar is `14` in the mock).

Empty mock: six stages with `status: "pending"`, `progress: 0`, and legend counts `0 / 0 / 6`.

## Visual tokens

- Card: white, `1px solid #E2E8F0`, 8px radius, padding 16px.
- Eyebrow: `label-sm` 11px uppercase tracked, `#64748B`. Title: `headline-sm` 15px / 600, `#0F172A`.
- Legend dots: completed emerald `#059669`, active `#0284C7` (sky / Stitch secondary), pending `#94A3B8`. Legend type `code-sm`.
- Stage tiles: inner surface `#F8FAFC`, 8px radius, padding 12px. Active tile: white plus `2px` ring `#0F766E` at 40% (or selected `#F0FDFA` + inset teal).
- Index: `code-sm` `#64748B`; active index `#0F766E` semibold.
- Status chips: 20px height, 4px radius, `label-sm`. Done: emerald text `#047857`. In Progress: teal `#0F766E` fill / white or on-primary-container. Manual Only: sky `#0284C7`.
- Meter track `#E2E8F0` (or `#F1F5F9`), 6px tall, full radius. Done fill emerald; in-progress fill `#0F766E`; pending/manual fill `#0284C7`.
- Grid: 1 col / 2 col `md` / 6 col `xl`, gap 8px.

## Acceptance Criteria

- [ ] Header reads `Deterministic Workflow` over `Six-Stage Pipeline Progress`, with legend `Completed (4)`, `Active (1)`, `Pending (1)` on the filled mock.
- [ ] Six stages render in Stitch order with titles `Campaign Setup`, `Discovery`, `Website Matching`, `Public Scrapes`, `Draft Generation`, `Human Review`.
- [ ] Status labels, descriptions, metric labels, and metric values match the filled-mock table; `progress` drives shadcn `Progress` (linear), not a ring.
- [ ] Stage 05 uses the in-progress / ring treatment; stage 06 shows `Manual Only` with a lock icon and is not marked Done.
- [ ] Empty/pending mock (all `progress: 0`) does not invent yield numbers. Disabled is not required; inactive is the pending tile.
- [ ] Component does not start jobs, poll, or navigate. `Progress` is CLI-added to `components/ui/`. Each meter has an accessible name from the metric label plus value.

## Further breakdown

- [ ] Do not reuse `PIPELINE_STAGES` from `pipeline-sequence-rail`
- [ ] Keep `progress` numeric even when `metricValue` is a string like `14 Leads`
- [ ] CLI-add watch: if `progress` emits a bad `cn` import, correct to `@/lib/utils` as on toggle-group
