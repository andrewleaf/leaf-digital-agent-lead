# Agenda

Operating rules for this repo. Read this before planning or coding.

## Hard gate: no code without a story card

Do **not** write, edit, or generate application code unless a matching Kanban story card exists and is claimed.

1. Capture the work as a story card on the [Kanban Markdown](KANBAN.md) board (`.devtool/features/`).
2. Move the card to **Doing** (`status: "in-progress"`) before any implementation.
3. Implement only what the card’s acceptance criteria cover.
4. When finished, move the card to **Done** (`status: "done"` and file under `.devtool/features/done/`).

Allowed without a story card: reading the repo, updating this agenda, managing the board itself, and creating/updating skills or rules that encode these process docs.

If the user asks for code and no card exists, create the story first (or ask them to), then proceed.

## Stories = Kanban Markdown

- Extension: **LachyFS Kanban Markdown** (Command Palette → **Open Kanban Board**).
- One markdown file per story, YAML frontmatter, under `.devtool/features/`.
- Agent protocol: [`.cursor/skills/kanban-markdown/SKILL.md`](.cursor/skills/kanban-markdown/SKILL.md)
- Card format reference: [`.cursor/skills/kanban-markdown/references/card-format.md`](.cursor/skills/kanban-markdown/references/card-format.md)
- Full data model: [`.cursor/skills/kanban-markdown/references/data-model.md`](.cursor/skills/kanban-markdown/references/data-model.md)

When planning, break work into story cards on the board. Do not keep a second task list outside Kanban.

## UI style guide: shadcn

All UI work follows **shadcn/ui**.

- Prefer registry components over one-off primitives.
- Use the `user-shadcn` MCP tools to search, inspect, and get add commands for components.
- Skill: [`.cursor/skills/shadcn-ui/SKILL.md`](.cursor/skills/shadcn-ui/SKILL.md)

## Token usage

Keep context and replies lean:

- Ask clarifying questions instead of long speculative planning
- Keep replies short (prefer few bullets; default max ~5 list items unless detail is requested)
- Prefer skills + references over restating long docs in every turn
- Read only the files needed; avoid dumping whole trees into context
- One Doing story at a time; don’t expand scope beyond the card
- Prefer shell/scripts in skills for repetitive work instead of re-deriving steps in prose

## Skills & references

| Need | Location |
|------|----------|
| Kanban workflow | `.cursor/skills/kanban-markdown/` |
| Kanban card / data model | `.cursor/skills/kanban-markdown/references/` |
| shadcn UI | `.cursor/skills/shadcn-ui/` |

Create a new project skill when a workflow is repetitive (especially if it can be a shell script) or when domain instructions would otherwise be re-explained each session. Put durable detail in `references/` and keep `SKILL.md` short.
