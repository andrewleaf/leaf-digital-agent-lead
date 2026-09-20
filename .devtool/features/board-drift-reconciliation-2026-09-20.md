---
id: "board-drift-reconciliation-2026-09-20"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-20T15:00:00.000Z"
modified: "2026-09-20T15:00:00.000Z"
completedAt: null
labels: ["story", "epic:epic-agent-process-automation-2026-09-20"]
order: "a7"
---

# Board drift reconciliation

Clear the violations the audit found so the linter's first run is green. A linter that reports pre-existing noise on every turn gets ignored.

Parent epic: [`epic-agent-process-automation-2026-09-20`](epic-agent-process-automation-2026-09-20.md)

## Acceptance Criteria

- [ ] `project-structure-conventions-2026-09-15` is reconciled against the tree: criteria that the repo already satisfies are ticked and the card is finished, or the card states what remains and carries an assignee.
- [ ] The four cards under `done/` with unchecked criteria (`project-dependency-manifest-2026-09-16`, `campaign-setup-page-scaffold-2026-09-18`, `campaign-setup-status-bar-2026-09-18`, `workspace-page-header-2026-09-18`) are resolved by ticking satisfied criteria or moving genuinely outstanding work to a new card.
- [ ] Duplicate `order` values are resolved: `bG` and `bH` in Backlog, and `a0` in Todo.
- [ ] Every remaining `in-progress` card has a non-null `assignee`.
- [ ] `package-lock.json` is removed, leaving `pnpm-lock.yaml` as the only lockfile for the declared pnpm toolchain.
- [ ] `pnpm board:lint` exits `0` against the whole board.

## Further breakdown

- [ ] Re-check `campaign-actions-and-read-model-contracts-2026-09-19` scope after the data-model epic lands.
