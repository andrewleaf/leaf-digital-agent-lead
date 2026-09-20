# Agenda

Operating rules for this repo. Read this before planning or coding.

## Hard gate: no code without a story card

Do **not** write, edit, or generate application code unless a matching Kanban story card exists and is claimed.

1. Capture the work as a story card on the [Kanban Markdown](KANBAN.md) board (`.devtool/features/`) — `pnpm board:new "Title" --epic <epic-id>`.
2. Claim it into **Doing** before any implementation — `pnpm board:claim <card-id> --assignee <you>`.
3. Implement only what the card’s acceptance criteria cover.
4. When finished, `pnpm board:finish <card-id>` (sets `status: "done"` and `completedAt`, then moves the file into `.devtool/features/done/`).

Allowed without a story card: reading the repo, updating this agenda, managing the board itself, and creating/updating skills or rules that encode these process docs.

If the user asks for code and no card exists, create the story first (or ask them to), then proceed.

## This gate is enforced, not just written

| Check | Where | Effect |
|-------|-------|--------|
| Story gate on writes | `.cursor/hooks.json` → `preToolUse` | **Denies** writes to `app/`, `components/`, `lib/`, `scripts/`, and code elsewhere while no card is claimed |
| Board audit at end of turn | `.cursor/hooks.json` → `stop` | Re-prompts with any board violation |
| pnpm-only toolchain | `.cursor/hooks.json` → `beforeShellExecution` | **Denies** `npm install` / `yarn` |
| Board invariants | `pnpm board:lint` | Ten rules over every card; exits non-zero on violation |

Details and failure behaviour: [`.cursor/hooks/README.md`](.cursor/hooks/README.md). Cloud Agent install: [`.cursor/environment.json`](.cursor/environment.json). Do not hand-edit card frontmatter — `pnpm board:new` / `board:claim` / `board:finish` generate it.

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
| Campaign domain + persistence | `.cursor/skills/campaign-domain-modeling/` |
| shadcn UI | `.cursor/skills/shadcn-ui/` |
| Stitch catalog + mapping | `.cursor/skills/stitch-to-shadcn/` |
| Operator Core tokens | `.cursor/skills/shadcn-ui/references/operator-core.md` |

Create a new project skill when a workflow is repetitive (especially if it can be a shell script) or when domain instructions would otherwise be re-explained each session. Put durable detail in `references/` and keep `SKILL.md` short.

Fan-out: [`.cursor/skills/kanban-markdown/references/subagent-protocol.md`](.cursor/skills/kanban-markdown/references/subagent-protocol.md).
