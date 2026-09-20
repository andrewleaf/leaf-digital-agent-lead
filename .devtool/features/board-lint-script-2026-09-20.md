---
id: "board-lint-script-2026-09-20"
status: "todo"
priority: "high"
assignee: null
dueDate: null
created: "2026-09-20T15:00:00.000Z"
modified: "2026-09-20T15:00:00.000Z"
completedAt: null
labels: ["story", "epic:epic-agent-process-automation-2026-09-20"]
order: "a2"
---

# Kanban board linter

Turn the board invariants that currently live as prose in `references/data-model.md` and `SKILL.md` into an executable check, so the same definition serves humans (`pnpm board:lint`) and the `stop` hook.

Parent epic: [`epic-agent-process-automation-2026-09-20`](epic-agent-process-automation-2026-09-20.md)

## Acceptance Criteria

- [ ] `.devtool/scripts/frontmatter.mjs` parses and serializes card frontmatter in the exact field order and quoting of `references/data-model.md`, with no YAML dependency, and exposes fractional-order helpers (`nextOrder`, base-62 comparison).
- [ ] `.devtool/scripts/board-lint.mjs` checks all ten invariants from the epic's §2C and reports each failure as `path: rule: detail`.
- [ ] The script exits `0` on a clean board and `1` when any violation is found; `--json` emits machine-readable results for the hook.
- [ ] `pnpm board:lint` runs it, and the script depends on nothing outside Node's standard library so it works before `pnpm install`.
- [ ] `.devtool/scripts/board-lint.test.ts` builds fixture boards in a temp directory and asserts one passing case plus one failing case per invariant.
- [ ] The linter reads only `.devtool/features/`; it does not import application code.

## Further breakdown

- [ ] Report a summary line with counts so the `stop` hook followup is short.
- [ ] Allow `review` as a valid status even though the board UI has no column for it.
