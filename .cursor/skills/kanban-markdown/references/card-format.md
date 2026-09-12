# Card format

Board directory: `.devtool/features/` (VS Code / Cursor extension: LachyFS Kanban Markdown).

Columns (`status` frontmatter → board label in this repo):

| status | Column |
|--------|--------|
| `backlog` | Backlog |
| `todo` | Todo |
| `in-progress` | Doing |
| `done` | Done (file lives under `done/`) |

Active cards are `.md` files in `.devtool/features/`. Done cards live in `.devtool/features/done/`.

---

## 1. Story Card Reference Format

Standard actionable work item claimed to **Doing** before writing application code.

```md
---
id: "short-title-2026-09-11"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-11T00:00:00.000Z"
modified: "2026-09-11T00:00:00.000Z"
completedAt: null
labels: ["story", "epic:epic-parent-id-2026-09-11"]
order: "a0"
---

# Short title

One-line description of the work and rationale.

Parent epic: [`epic-parent-id-2026-09-11`](epic-parent-id-2026-09-11.md)

## Acceptance Criteria

- [ ] Criterion 1 (concrete, testable condition)
- [ ] Criterion 2

## Further breakdown

- [ ] Subtask or smaller candidate story 1
- [ ] Subtask or smaller candidate story 2
```

---

## 2. Epic Card Reference Format

Planning parent that groups related stories around a major capability or proposal milestone. Epics must not contain generic boilerplate; they document full domain specifications, boundaries, and milestone criteria so engineers do not need to re-read external documents.

```md
---
id: "epic-feature-name-2026-09-12"
status: "backlog"
priority: "high"
assignee: null
dueDate: null
created: "2026-09-12T00:00:00.000Z"
modified: "2026-09-12T00:00:00.000Z"
completedAt: null
labels: ["epic"]
order: "a0"
---

# Feature Name

## 1. Intent & Business Value
Why this epic exists, who it serves, and what business/operational problem it solves.

## 2. Source Specifications
Full domain contracts, data tables, explicit business rules, and constraints transcribed directly from proposals/PRDs.

## 3. Scope Boundaries
- **In Scope (v1)**: Explicit capabilities and outputs delivered.
- **Explicit Non-Goals (v2+)**: Definite exclusions to prevent scope creep.

## 4. Architecture & Flow
Mermaid flowcharts, state transitions, or DTO contracts explaining how components interact.

## 5. Stories
- [Story One Title](story-one-id-2026-09-12.md) (`story-one-id-2026-09-12`): Brief responsibility note.
- [Story Two Title](story-two-id-2026-09-12.md) (`story-two-id-2026-09-12`): Brief responsibility note.

## 6. Milestone Definition of Done
Functional, testable criteria required to close this entire epic (not boilerplate meta-checks).
- [ ] Milestone condition 1
- [ ] Milestone condition 2

## 7. Dependencies & Sequencing
- **Prerequisites**: Epics or technical foundations that must precede this work.
- **Unblocks**: Downstream epics or operational phases enabled by this epic.
```

---

Keep titles short. Prefer editing via the Kanban board UI (`Open Kanban Board`) or by updating frontmatter + moving done files into `done/`.

For full serialization rules, enums, ID generation, and fractional `order`, see [data-model.md](data-model.md).

Open the board:

1. Command Palette → **Open Kanban Board**
2. Or click the Kanban icon in the Activity Bar
