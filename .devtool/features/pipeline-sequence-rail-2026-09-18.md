---
id: "pipeline-sequence-rail-2026-09-18"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-18T20:12:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "bV"
---

# Pipeline sequence rail

Right-rail six-stage pipeline list from the Stitch Campaign Setup screen. Presentational list only.

Parent epic: [`epic-campaign-setup-2026-09-18`](epic-campaign-setup-2026-09-18.md)

Proposed file: `components/campaigns/pipeline-sequence-rail.tsx`. shadcn: Card (custom numbered list; no pipeline runner).

## Acceptance Criteria

- [ ] Header reads `Pipeline Sequence` with meta `6 STAGES`.
- [ ] Stages render in this order with Stitch titles and detail lines:
  1. `Directory & Maps Discovery` — `Austin, Round Rock, Cedar Park` (detail is a prop, not hardcoded geos)
  2. `Public Website Verification` — `Filter domain health & active status`
  3. `Fact Extraction Engine` — `Mobile booking flow & service hours`
  4. `Safety Guardrail Intercept` — `Strip forbidden claims and promises`
  5. `Operator Review Queue` — `Physical human approval required`
  6. `Manual Dispatch Desk` — `One-by-one verification and send`
- [ ] Default mock uses the six titles above; `discoveryDetail` prop substitutes the stage-1 geography line.
- [ ] Component does not start jobs, poll status, or navigate to the queue; it is a static/preview rail.

## Further breakdown

- [ ] Numbered markers 1–6 match Stitch vertical list density
- [ ] Optional `currentStage` highlight without implying live execution
