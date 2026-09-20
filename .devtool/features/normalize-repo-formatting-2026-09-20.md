---
id: "normalize-repo-formatting-2026-09-20"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-20T15:20:00.000Z"
modified: "2026-09-20T15:20:00.000Z"
completedAt: null
labels: ["story", "epic:epic-agent-process-automation-2026-09-20"]
order: "bU"
---

# Normalize repository formatting

`prettier --check .` reports 44 files that have never been formatted, including `lib/db/index.ts`, `scripts/db/cli.ts`, `components/ui/toggle.tsx`, and several READMEs. The repo declares Prettier as policy (`prettier`, `prettier-plugin-tailwindcss`, and a `format` script) but has never run it.

This matters for the `afterFileEdit` format hook: until the tree is normalized, the first edit to any unformatted file drags a whole-file reformat into an unrelated story's diff. Normalizing once, in a commit that does nothing else, keeps later diffs readable.

Parent epic: [`epic-agent-process-automation-2026-09-20`](epic-agent-process-automation-2026-09-20.md)

## Acceptance Criteria

- [ ] `pnpm format` is run once and committed on its own, with no functional change in the same commit.
- [ ] `pnpm prettier --check .` exits `0` afterwards.
- [ ] `pnpm typecheck` and `pnpm test` still pass, confirming formatting changed nothing that matters.
- [ ] `.prettierignore` still excludes `.devtool/features/` and `.cursor/`, so no Kanban card or skill doc is reformatted.

## Further breakdown

- [ ] Consider whether `lib/db/migrations/` should stay ignored once real migrations exist.
