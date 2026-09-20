---
id: "card-lifecycle-cli-2026-09-20"
status: "done"
priority: "high"
assignee: null
dueDate: null
created: "2026-09-20T15:00:00.000Z"
modified: "2026-09-20T16:27:20.000Z"
completedAt: "2026-09-20T16:27:20.000Z"
labels: ["story", "epic:epic-agent-process-automation-2026-09-20"]
order: "a3"
---

# Card lifecycle CLI

Generate and transition cards with a script instead of hand-writing frontmatter from two reference documents. Colliding `order` values and stale `modified` timestamps are transcription errors, so remove the transcription.

Parent epic: [`epic-agent-process-automation-2026-09-20`](epic-agent-process-automation-2026-09-20.md)

## Acceptance Criteria

- [x] `.devtool/scripts/board-card.mjs new` derives the id slug from a title plus date, computes the next free `order` in the target column, and writes frontmatter through the shared `frontmatter.mjs` serializer.
- [x] `new` supports `--epic <id>` (validating the epic exists) and `--labels`, and scaffolds the story body: description, parent-epic link, and acceptance criteria.
- [x] `new --epic` with `--labels component` scaffolds the Component Story sections required by `component-story-cards.mdc`: file and primitives, Stitch contract, props, visual tokens.
- [x] `board-card.mjs claim <id> --assignee <name>` sets `status: "in-progress"`, sets `assignee`, bumps `modified`, and refuses when that assignee already holds a claimed card.
- [x] `board-card.mjs finish <id>` refuses while unchecked `- [ ]` acceptance criteria remain, then sets `status: "done"` and `completedAt`, bumps `modified`, clears `assignee`, and moves the file into `done/` with `git mv` when the repo is a git worktree.
- [x] `pnpm board:new`, `pnpm board:claim`, and `pnpm board:finish` expose the subcommands, and every mutation leaves `pnpm board:lint` passing.
- [x] `.devtool/scripts/board-card.test.mjs` covers slug and order generation, the duplicate-claim refusal, the unchecked-criteria refusal, and the move into `done/`.
- [x] Transitions rewrite only the fields they change, so the extension-written `epic` key and the rest of the card survive byte for byte.

## Further breakdown

- [x] `--dry-run` printing the resulting file without writing it.
- [ ] A `board:unclaim` transition for abandoned work.
