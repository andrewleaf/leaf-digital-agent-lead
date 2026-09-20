---
id: "subagent-claim-protocol-2026-09-20"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-20T15:00:00.000Z"
modified: "2026-09-20T16:27:21.000Z"
completedAt: "2026-09-20T16:27:21.000Z"
labels: ["story", "epic:epic-agent-process-automation-2026-09-20"]
order: "a6"
---

# Subagent claim protocol

The kanban skill says "one Doing card per agent" but the board has no way to tell whose card is whose: `assignee` is `null` on all 134 cards. Make the claim explicit so parallel work is verifiable, and document what a subagent must hand back.

Parent epic: [`epic-agent-process-automation-2026-09-20`](epic-agent-process-automation-2026-09-20.md)

## Acceptance Criteria

- [x] `kanban-markdown/SKILL.md` defines `assignee` as the claim token and restates the Doing rule as one `in-progress` card per assignee, matching the linter.
- [x] A `references/subagent-protocol.md` documents when to fan out, with component stories named as the parallel-safe unit (one isolated file under `components/campaigns/`, colocated test, no routes or persistence).
- [x] The protocol defines the required hand-back contract: card id, files touched, the test command and its result, criteria ticked, and any drift found.
- [x] The protocol requires a review pass for `component` cards against the gold-standard card and `operator-core-ui.mdc`, listing the checks that are always the same (verbatim Stitch copy, empty/filled/disabled, a11y, isolation, Operator Core tokens over Material `namedColors`).
- [x] The protocol states that catalog and inventory lookups (Stitch `projects.md`, existing `components/ui/` primitives) belong in an `explore` subagent rather than the parent's context.
- [x] `references/data-model.md` documents the `assignee` convention so the field is no longer described as unused metadata.
- [x] No parallel-work guidance contradicts the single-claim rule enforced by `board-lint.mjs`.

## Further breakdown

- [ ] Consider a `subagentStart` hook that denies fan-out when the task text names no card.
- [ ] Record a worked example of a parallel component-story batch.
