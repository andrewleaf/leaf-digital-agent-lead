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

## Creating a story

1. ID: slug from title + `-YYYY-MM-DD` (see data-model).
2. Frontmatter field order and quoting must match the card-format template exactly.
3. Body starts with `# Title`, then description and acceptance criteria.
4. Append `order` after existing cards in that column (`"a0"`, `"a1"`, …).

## External docs

- Extension: [LachyFS Kanban Markdown](https://github.com/LachyFS/kanban-markdown-vscode-extension)
- Upstream agent skill: [kanban-skill](https://github.com/LachyFS/kanban-skill)
