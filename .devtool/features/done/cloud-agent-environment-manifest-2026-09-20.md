---
id: "cloud-agent-environment-manifest-2026-09-20"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-20T15:00:00.000Z"
modified: "2026-09-20T16:27:21.000Z"
completedAt: "2026-09-20T16:27:21.000Z"
labels: ["story", "epic:epic-agent-process-automation-2026-09-20"]
order: "a5"
---

# Cloud Agent environment manifest

Pin the Cloud Agent environment in the repo. Without `.cursor/environment.json` every cloud run starts with no `node_modules` and pays a full install before it can lint, typecheck, or test.

Parent epic: [`epic-agent-process-automation-2026-09-20`](epic-agent-process-automation-2026-09-20.md)

## Acceptance Criteria

- [x] `.cursor/environment.json` sets `install` to a frozen-lockfile pnpm install that is idempotent, since it runs on every build and may run on prepared disk state.
- [x] The manifest declares the Next.js dev server as a named terminal with an agent-facing `description`, rather than blocking in `start`.
- [x] `ports` exposes the dev server port used by `pnpm dev`.
- [x] The file validates against `https://cursor.com/schemas/environment.schema.json` and uses only documented fields.
- [x] `.env` handling is documented: the manifest does not bake secrets, and `DB_DIALECT`/`SQLITE_PATH` defaults come from the existing db scaffolding.
- [x] `agenda.md` or the hooks README points at the manifest so the environment is discoverable.

## Further breakdown

- [ ] Add `db:install` to the install step once the schema has real tables.
- [ ] Evaluate a snapshot-based image if install time becomes the bottleneck.
