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
labels: []
order: "a0"
---

# Short title

One-line description of the work.

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
```

Keep titles short. Prefer editing via the Kanban board UI (`Open Kanban Board`) or by updating frontmatter + moving done files into `done/`.

For full serialization rules, enums, ID generation, and fractional `order`, see [data-model.md](data-model.md).

Open the board:

1. Command Palette → **Open Kanban Board**
2. Or click the Kanban icon in the Activity Bar
