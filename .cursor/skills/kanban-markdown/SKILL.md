---
name: kanban-markdown
description: >-
  Manage the repo markdown kanban board and story cards. Use when planning work,
  creating stories, spawning subagents, moving tasks, or when the user mentions
  kanban, KANBAN.md, agenda, features, story cards, or cards.
---

# Kanban Markdown

Board: [`.devtool/features/`](../../../.devtool/features/) (LachyFS Kanban Markdown).

Process gate: [`agenda.md`](../../../agenda.md) — **do not write application code without a story card in Doing**.

List cards before planning or starting work.

## Card protocol

1. Put new work in `status: "backlog"` or `status: "todo"` (root of `.devtool/features/`).
2. Before coding, set `status: "in-progress"` (Doing). Keep the file in the features root.
3. When finished, set `status: "done"`, set `completedAt`, and move the file into `.devtool/features/done/`.
4. Subagents claim their own card. One Doing (`in-progress`) card per agent.
5. Card format: [references/card-format.md](references/card-format.md)
6. Full field / serialization rules: [references/data-model.md](references/data-model.md)

Do not invent a second board. Do not skip the Doing column.

## Creating a card

### Story Card (`labels: ["story", "epic:<epic-id>"]`)
1. ID: slug from title + `-YYYY-MM-DD` (see data-model).
2. Frontmatter field order and quoting must match the card-format template exactly.
3. Link to parent epic: `Parent epic: [`<epic-id>`](<epic-id>.md)`.
4. Body includes short description, concrete acceptance criteria, and optional `## Further breakdown` candidate tasks.
5. Append `order` after existing cards in that column (`"a0"`, `"a1"`, …).

### Epic Card (`labels: ["epic"]`)
1. ID: `epic-` + slug + `-YYYY-MM-DD`.
2. Follow the comprehensive Epic specification model in [references/card-format.md](references/card-format.md):
   - **1. Intent & Business Value**: Problem solved and outcome.
   - **2. Source Specifications**: Explicit domain tables, rules, and constraints transcribed directly from source documents (no generic placeholders).
   - **3. Scope Boundaries**: In-scope (v1) vs explicit non-goals (v2+).
   - **4. Architecture & Flow**: Mermaid diagrams, schemas, or status lifecycles.
   - **5. Stories**: Linked list of child stories with IDs and brief responsibilities.
   - **6. Milestone Definition of Done**: Testable, functional completion criteria for the entire epic.
   - **7. Dependencies & Sequencing**: Prerequisites and what the epic unblocks.
3. Epics stay in `backlog` or `todo` as planning parents; implementation is performed on child stories moved to Doing (`in-progress`).

## External docs

- Extension: [LachyFS Kanban Markdown](https://github.com/LachyFS/kanban-markdown-vscode-extension)
- Upstream agent skill: [kanban-skill](https://github.com/LachyFS/kanban-skill)
