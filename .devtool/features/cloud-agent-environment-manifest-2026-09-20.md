---
id: "cloud-agent-environment-manifest-2026-09-20"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-20T15:00:00.000Z"
modified: "2026-09-20T15:00:00.000Z"
completedAt: null
labels: ["story", "epic:epic-agent-process-automation-2026-09-20"]
order: "a5"
---

# Cloud Agent environment manifest

Pin the Cloud Agent environment in the repo. Without `.cursor/environment.json` every cloud run starts with no `node_modules` and pays a full install before it can lint, typecheck, or test.

Parent epic: [`epic-agent-process-automation-2026-09-20`](epic-agent-process-automation-2026-09-20.md)

## Acceptance Criteria

- [ ] `.cursor/environment.json` sets `install` to a frozen-lockfile pnpm install that is idempotent, since it runs on every build and may run on prepared disk state.
- [ ] The manifest declares the Next.js dev server as a named terminal with an agent-facing `description`, rather than blocking in `start`.
- [ ] `ports` exposes the dev server port used by `pnpm dev`.
- [ ] The file validates against `https://cursor.com/schemas/environment.schema.json` and uses only documented fields.
- [ ] `.env` handling is documented: the manifest does not bake secrets, and `DB_DIALECT`/`SQLITE_PATH` defaults come from the existing db scaffolding.
- [ ] `agenda.md` or the hooks README points at the manifest so the environment is discoverable.

## Further breakdown

- [ ] Add `db:install` to the install step once the schema has real tables.
- [ ] Evaluate a snapshot-based image if install time becomes the bottleneck.
