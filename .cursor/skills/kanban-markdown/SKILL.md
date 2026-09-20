---
name: kanban-markdown
description: >-
  Manage the repo markdown kanban board and story cards. Use when planning work,
  creating stories, spawning subagents, moving tasks, or when the user mentions
  kanban, KANBAN.md, agenda, features, story cards, or cards. For UI, design,
  Stitch-sourced epics, or component-labeled cards, also follow stitch-to-shadcn
  (catalog first).
---

# Kanban Markdown

Board: [`.devtool/features/`](../../../.devtool/features/) (LachyFS Kanban Markdown).

Process gate: [`agenda.md`](../../../agenda.md) — **do not write application code without a story card in Doing**. Plan mode: [`plan-mode-kanban-cards.mdc`](../../rules/plan-mode-kanban-cards.mdc) — plan and write cards first; implement only after permission, from a claimed story.

List cards before planning or starting work.

UI/design work (`component` label, Stitch-sourced epic, or presentational widgets): read [stitch-to-shadcn](../stitch-to-shadcn/SKILL.md) first — catalog at [stitch-to-shadcn/references/projects.md](../stitch-to-shadcn/references/projects.md) before writing the card. Do not invent project or screen IDs.

## Card protocol

1. Put new work in `status: "backlog"` or `status: "todo"` (root of `.devtool/features/`) — `pnpm board:new "Title" --epic <epic-id>`.
2. Before coding, `pnpm board:claim <id> --assignee <you>` (`status: "in-progress"`). Keep the file in the features root.
3. When finished, `pnpm board:finish <id>` (sets `status: "done"` and `completedAt`, then moves the file into `.devtool/features/done/`).
4. `assignee` is the claim token. One Doing (`in-progress`) card **per assignee**. Subagents claim their own card — see [references/subagent-protocol.md](references/subagent-protocol.md).
5. Card format: [references/card-format.md](references/card-format.md)
6. Full field / serialization rules: [references/data-model.md](references/data-model.md)
7. Do not hand-edit frontmatter. `pnpm board:lint` is the executable definition of a valid board.

Do not invent a second board. Do not skip the Doing column.

## Creating a card

### Story Card (`labels: ["story", "epic:<epic-id>"]`)
1. ID: slug from title + `-YYYY-MM-DD` (see data-model).
2. Frontmatter field order and quoting must match the card-format template exactly.
3. Link to parent epic: `Parent epic: [`<epic-id>`](<epic-id>.md)`.
4. Body includes short description, concrete acceptance criteria, and optional `## Further breakdown` candidate tasks.
5. Append `order` after existing cards in that column (`"a0"`, `"a1"`, …).
6. If `labels` includes `component`, also follow the **Component Story** section in [references/card-format.md](references/card-format.md) (file path, shadcn primitives, Stitch contract, props, tokens) and [stitch-to-shadcn](../stitch-to-shadcn/SKILL.md) (catalog first).

### Epic Card (`labels: ["epic"]`)
1. ID: `epic-` + slug + `-YYYY-MM-DD`.
2. Follow the comprehensive Epic specification model in [references/card-format.md](references/card-format.md):
   - **1. Intent & Business Value**: Problem solved and outcome.
   - **2. Source Specifications**: Explicit domain tables, rules, and constraints transcribed directly from source documents (no generic placeholders). UI/design epics must use a real project/screen row from [stitch-to-shadcn/references/projects.md](../stitch-to-shadcn/references/projects.md) (same table shape as epic-campaign-setup section 2A).
   - **3. Scope Boundaries**: In-scope (v1) vs explicit non-goals (v2+).
   - **4. Architecture & Flow**: Mermaid diagrams, schemas, or status lifecycles.
   - **5. Stories**: Linked list of child stories with IDs and brief responsibilities.
   - **6. Milestone Definition of Done**: Testable, functional completion criteria for the entire epic.
   - **7. Dependencies & Sequencing**: Prerequisites and what the epic unblocks.
3. Epics stay in `backlog` or `todo` as planning parents; implementation is performed on child stories moved to Doing (`in-progress`).

## External docs

- Extension: [LachyFS Kanban Markdown](https://github.com/LachyFS/kanban-markdown-vscode-extension)
- Upstream agent skill: [kanban-skill](https://github.com/LachyFS/kanban-skill)
