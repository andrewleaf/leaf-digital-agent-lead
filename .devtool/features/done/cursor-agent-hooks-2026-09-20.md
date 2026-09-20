---
id: "cursor-agent-hooks-2026-09-20"
status: "done"
priority: "high"
assignee: null
dueDate: null
created: "2026-09-20T15:00:00.000Z"
modified: "2026-09-20T16:27:20.000Z"
completedAt: "2026-09-20T16:27:20.000Z"
labels: ["story", "epic:epic-agent-process-automation-2026-09-20"]
order: "a4"
---

# Cursor agent hooks

Commit `.cursor/hooks.json` so the hard gate in `agenda.md` is enforced by the agent runtime rather than by an agent choosing to comply. Cloud Agents pick up command-based project hooks automatically.

Parent epic: [`epic-agent-process-automation-2026-09-20`](epic-agent-process-automation-2026-09-20.md)

## Acceptance Criteria

- [x] `.cursor/hooks.json` declares `version: 1` and command hooks only, with scripts under `.cursor/hooks/` invoked by paths relative to the project root.
- [x] A `preToolUse` hook with `matcher` over write tools denies writes to `app/`, `components/`, `lib/`, `scripts/`, and `*.tsx?` outside those trees when no card is `in-progress`, returning an `agent_message` that names the claim command.
- [x] The story gate allows writes to `.devtool/`, `.cursor/`, `agenda.md`, `KANBAN.md`, `AGENTS.md`, `*.md`, and lockfiles without a card, matching the "allowed without a story card" list in `agenda.md`.
- [x] A `stop` hook runs the board linter and returns a `followup_message` naming the offending cards when it fails, staying silent when the board is clean.
- [x] A `beforeShellExecution` hook denies `npm install`, `npm ci`, `npm i`, and `yarn` with a message pointing at pnpm, while allowing `npx` and `pnpm`.
- [x] An `afterFileEdit` hook formats the edited file with Prettier when the extension is supported and `node_modules` is present, and is a silent no-op otherwise.
- [x] A `subagentStop` hook returns a `followup_message` reminding the parent to reconcile the subagent's card.
- [x] Every hook script exits `0` on its allow path, never blocks on an unexpected internal error, and is executable (`chmod +x`).
- [x] `.cursor/hooks/README.md` records each hook's event, blocking behaviour, and the cloud-support caveats (no `sessionStart`/`sessionEnd`/MCP hooks; hooks are skipped during read-only turns).

## Further breakdown

- [ ] Revisit `failClosed: true` on the story gate once the hooks have run for a while.
- [ ] Consider a `preToolUse` matcher for `Task` that requires a card id in the subagent prompt.
