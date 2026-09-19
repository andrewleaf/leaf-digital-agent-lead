---
id: "pipeline-sequence-rail-2026-09-18"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-19T16:30:00.000Z"
completedAt: "2026-09-19T16:30:00.000Z"
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "a2"
---

# Pipeline sequence rail

Right-rail six-stage pipeline list from the Stitch Campaign Setup screen. Presentational list only.

Parent epic: [`epic-campaign-setup-2026-09-18`](../epic-campaign-setup-2026-09-18.md)

## File and primitives

- File: `components/campaigns/pipeline-sequence-rail.tsx`
- shadcn: `Card` (`CardHeader`, `CardTitle`, `CardContent`, `CardAction`)
- Custom numbered list for stages 1–6. Do not add a pipeline runner, Progress, or navigation.

## Stitch contract

Source: LocalDraft - Campaign Setup (`projects/13798460973041177032/screens/dffcadf839ef470db0d105a117c66826`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- Header: `Pipeline Sequence` with meta `6 STAGES`.
- Stages (1–6):
  1. `Directory & Maps Discovery` — `Austin, Round Rock, Cedar Park` (detail is a prop, not hardcoded geos)
  2. `Public Website Verification` — `Filter domain health & active status`
  3. `Fact Extraction Engine` — `Mobile booking flow & service hours`
  4. `Safety Guardrail Intercept` — `Strip forbidden claims and promises`
  5. `Operator Review Queue` — `Physical human approval required`
  6. `Manual Dispatch Desk` — `One-by-one verification and send`

## Props

Typed mock-driven props. No jobs, polling, or queue navigation.

- `discoveryDetail?: string` — substitutes the stage-1 geography line; default is the Stitch mock `Austin, Round Rock, Cedar Park`
- `currentStage?: number | null` — optional 1–6 highlight; visual only
- `className?: string`

Export `PIPELINE_STAGES` with the six titles and default detail lines.

## Visual tokens

- Card: white, `1px solid #E2E8F0`, 8px radius, padding 12px.
- Header title `headline-sm` 15px; meta `label-sm` 11px `#64748B`.
- Numbered markers: 24px circle, `#F1F5F9` / `#0F766E` (or selected `#F0FDFA` + 2px inset `#0F766E` when `currentStage` matches).
- List row ~44px; title `#0F172A` `label-md`; detail `#64748B` `body-sm`.

## Acceptance Criteria

- [x] Header reads `Pipeline Sequence` with meta `6 STAGES`.
- [x] Stages render in this order with Stitch titles and detail lines:
  1. `Directory & Maps Discovery` — `Austin, Round Rock, Cedar Park` (detail is a prop, not hardcoded geos)
  2. `Public Website Verification` — `Filter domain health & active status`
  3. `Fact Extraction Engine` — `Mobile booking flow & service hours`
  4. `Safety Guardrail Intercept` — `Strip forbidden claims and promises`
  5. `Operator Review Queue` — `Physical human approval required`
  6. `Manual Dispatch Desk` — `One-by-one verification and send`
- [x] Default mock uses the six titles above; `discoveryDetail` prop substitutes the stage-1 geography line.
- [x] Component does not start jobs, poll status, or navigate to the queue; it is a static/preview rail.

## Further breakdown

- [x] Numbered markers 1–6 match Stitch vertical list density
- [x] Optional `currentStage` highlight without implying live execution
