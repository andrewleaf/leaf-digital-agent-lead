# Subagent claim protocol

`assignee` is the claim token. The Doing rule is **one `in-progress` card per assignee**, not one Doing card for the whole board. `board-lint.mjs` enforces both: a claimed card without an assignee is a violation, and so is a second claimed card for the same assignee.

Use `pnpm board:claim <id> --assignee <name>` rather than editing frontmatter by hand. Agents in this repo use `cursor-agent` unless the user names someone else.

## When to fan out

Spawn a subagent only when the work is independently claimable: one story card, one owner, little overlap with the parent's files.

**Parallel-safe unit:** a `component` story.

- One isolated file under `components/campaigns/` (or `components/layout/`, `components/shared/`).
- A colocated `*.test.tsx`.
- No routes, no persistence, no page assembly.

Catalog and inventory lookups belong in an `explore` subagent, not the parent's context: Stitch IDs in [projects.md](../../stitch-to-shadcn/references/projects.md), existing primitives in `components/ui/`, Operator Core tokens.

Do **not** fan out:

- Work that still needs a card written.
- Two stories that edit the same file.
- An epic. Epics stay planning parents; implementation is on child stories.

Each subagent claims its own card **before** writing application code. If `pnpm board:claim` refuses because the assignee already holds a card, that work waits.

## Hand-back contract

A subagent that writes code returns all of:

1. **Card id** it claimed.
2. **Files touched**, as paths.
3. **The test command it ran and the result** (for a component story, `pnpm vitest run <file>`).
4. **Criteria ticked** on the card, quoted.
5. **Drift found** — mismatches against the domain contract, Stitch copy, or Operator Core tokens. Report them; do not paper over them.

The parent then runs `pnpm board:lint` and either finishes the card (`pnpm board:finish <id>`) or leaves it claimed with the remaining criteria explicit. The `subagentStop` hook reminds the parent of this; it does not do it.

## Review pass for `component` cards

Do not have the implementing agent review itself. A second agent, given the card, [operator-core-ui.mdc](../../rules/operator-core-ui.mdc), and the gold-standard card [`.devtool/features/done/industry-niche-input-2026-09-18.md`](../../../.devtool/features/done/industry-niche-input-2026-09-18.md), checks:

- Verbatim Stitch copy (labels, helpers, filled-mock text).
- Empty / filled / disabled states.
- Accessibility: labelled controls, keyboard, contrast against Operator Core.
- Isolation: no persistence, APIs, or page routes.
- Tokens: Operator Core (`styleGuidelines` / `## Colors` prose), not Material `namedColors`.
- shadcn registry primitives only; `Field` only if it exists in `components/ui/`.

The review agent does not claim a second card. It reports against the implementing agent's card.
