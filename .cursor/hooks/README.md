# Project hooks

`../hooks.json` turns the rules in [`agenda.md`](../../agenda.md) into checks the agent runtime enforces. Every hook here is command-based, reads one JSON object on stdin, and writes at most one JSON object on stdout.

| Hook | Event | Blocks? | What it does |
|---|---|---|---|
| `story-gate.mjs` | `preToolUse` (`Write\|Delete\|EditNotebook`) | **Yes** | Denies writes to application code while no card is `in-progress` |
| `package-manager-guard.mjs` | `beforeShellExecution` | **Yes** | Denies `npm install` / `yarn` / `bun install`; allows pnpm, `npx`, read-only npm queries |
| `format-edited-file.mjs` | `afterFileEdit` | No | Runs Prettier on the file just written |
| `board-audit.mjs` | `stop` | No | Reports board violations as a followup message |
| `subagent-reconcile.mjs` | `subagentStop` | No | Asks the parent to reconcile the card after a subagent changed files |

Tests: `pnpm vitest run .cursor/hooks`. They spawn each hook exactly as Cursor does, against a fixture board in a temp directory.

## The story gate

Gated: `app/`, `components/`, `lib/`, `scripts/`, and any `.ts .tsx .js .jsx .mjs .cjs .css .sql` file elsewhere (root configs included).

Exempt, matching the "allowed without a story card" list in `agenda.md`: `.devtool/`, `.cursor/`, and everything else — markdown, `package.json`, lockfiles.

Two limits worth knowing:

- There is no `beforeFileEdit` event, and `afterFileEdit` cannot revert a write. `preToolUse` is the only pre-write gate, and its documented matcher values do not clearly cover in-place string edits to existing files. **The gate is a deterrent; `board-audit.mjs` on `stop` is the backstop.**
- It reads paths only from known path-carrying keys (`path`, `file_path`, `target_file`, …), never from content fields, so a file whose text mentions `lib/db/schema.ts` is not misread as a write to it.

## Failure behaviour

Cursor fails open by default: a crash, timeout, or non-zero exit other than `2` lets the action through. Every hook here also catches its own errors and emits the permissive response, because a broken hook must never be the reason an agent cannot work.

No hook sets `failClosed: true` yet. Consider it for `story-gate.mjs` once the hooks have run long enough to trust.

## Cloud Agents

Cloud agents run command-based project hooks from the repository, so everything here applies there too, with three caveats:

- `sessionStart`, `sessionEnd`, the MCP hooks, and the Tab hooks do **not** run in the cloud. Nothing here uses them.
- Prompt-based hooks are unsupported in the cloud. Everything here is `type: "command"` (the default).
- Hooks do not run during a cloud agent's initial read-only exploration turns.

## Cloud Agent environment

[`.cursor/environment.json`](../environment.json) pins install (`pnpm install --frozen-lockfile`) and a named `dev` terminal for `pnpm dev` on port 3000. It does not bake secrets: `DB_DIALECT` / `SQLITE_PATH` / `DATABASE_URL` come from the existing db scaffolding and `.env` (gitignored).

## Loop limits

`stop` and `subagentStop` return `followup_message`, which Cursor submits as the next user message. `hooks.json` caps these (`loop_limit` 2 and 1) so a violation the agent cannot fix cannot spin the session.
