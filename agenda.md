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

When planning (including Plan mode), plan and write Kanban cards first: one story, or an epic plus child stories if the work splits. Implementation is a second permission and must use a claimed story card — never Cursor plan todos alone. Rule: [`.cursor/rules/plan-mode-kanban-cards.mdc`](.cursor/rules/plan-mode-kanban-cards.mdc). Do not keep a second task list outside Kanban.

## UI style guide: shadcn

All UI work follows **shadcn/ui** plus **LocalDraft Operator Core** tokens.

- Prefer registry components over one-off primitives.
- Discover primitives from [ui.shadcn.com/docs](https://ui.shadcn.com/docs) / the shadcn CLI (`user-shadcn` MCP is not installed).
- Skill: [`.cursor/skills/shadcn-ui/SKILL.md`](.cursor/skills/shadcn-ui/SKILL.md)
- Stitch catalog + mapping: [`.cursor/skills/stitch-to-shadcn/SKILL.md`](.cursor/skills/stitch-to-shadcn/SKILL.md) ([projects.md](.cursor/skills/stitch-to-shadcn/references/projects.md))
- Tokens: [`.cursor/skills/shadcn-ui/references/operator-core.md`](.cursor/skills/shadcn-ui/references/operator-core.md)
- File rule: [`.cursor/rules/operator-core-ui.mdc`](.cursor/rules/operator-core-ui.mdc)

## Skills & references

| Need | Location |
|------|----------|
| Kanban workflow | `.cursor/skills/kanban-markdown/` |
| Kanban card / data model | `.cursor/skills/kanban-markdown/references/` |
| shadcn UI | `.cursor/skills/shadcn-ui/` |
| Stitch catalog + mapping | `.cursor/skills/stitch-to-shadcn/` |
| Operator Core tokens | `.cursor/skills/shadcn-ui/references/operator-core.md` |

Create a new project skill when a workflow is repetitive (especially if it can be a shell script) or when domain instructions would otherwise be re-explained each session. Put durable detail in `references/` and keep `SKILL.md` short.
