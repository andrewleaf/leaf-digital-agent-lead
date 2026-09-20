---
id: "board-lint-script-2026-09-20"
status: "done"
priority: "high"
assignee: null
dueDate: null
created: "2026-09-20T15:00:00.000Z"
modified: "2026-09-20T15:22:00.000Z"
completedAt: "2026-09-20T15:22:00.000Z"
labels: ["story", "epic:epic-agent-process-automation-2026-09-20"]
order: "a2"
---

# Kanban board linter

Turn the board invariants that currently live as prose in `references/data-model.md` and `SKILL.md` into an executable check, so the same definition serves humans (`pnpm board:lint`) and the `stop` hook.

Parent epic: [`epic-agent-process-automation-2026-09-20`](epic-agent-process-automation-2026-09-20.md)

## Acceptance Criteria

- [x] `.devtool/scripts/frontmatter.mjs` parses and serializes card frontmatter in the exact field order and quoting of `references/data-model.md`, with no YAML dependency, and exposes fractional-order helpers (`nextOrder`, base-62 comparison).
- [x] `.devtool/scripts/board-lint.mjs` checks all ten invariants from the epic's §2C and reports each failure as `path: rule: detail`.
- [x] The script exits `0` on a clean board and `1` when any violation is found; `--json` emits machine-readable results for the hook.
- [x] `pnpm board:lint` runs it, and the script depends on nothing outside Node's standard library so it works before `pnpm install`.
- [x] `.devtool/scripts/board-lint.test.mjs` builds fixture boards in a temp directory and asserts one passing case plus one failing case per invariant.
- [x] The linter reads only `.devtool/features/`; it does not import application code.
- [x] Rules that would report permanent false positives are scoped instead of loosened: `order-unique` covers active columns only, `done-criteria` covers gate sections only, and extension-written fields are tolerated. Each exemption is justified in a comment.
- [x] `references/data-model.md` documents the tolerated extension field so the linter and the reference agree.

## Further breakdown

- [x] Report a summary line with counts so the `stop` hook followup is short.
- [x] Allow `review` as a valid status even though the board UI has no column for it.
