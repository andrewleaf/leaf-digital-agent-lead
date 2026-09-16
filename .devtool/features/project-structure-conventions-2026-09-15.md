---
id: "project-structure-conventions-2026-09-15"
status: "in-progress"
priority: "critical"
assignee: null
dueDate: null
created: "2026-09-16T22:56:00.000Z"
modified: "2026-09-16T22:56:00.000Z"
completedAt: null
labels: ["story", "epic:epic-application-architecture-2026-09-15"]
order: "a0"
---

# Project structure conventions

Define the directory layout, module boundaries, and import conventions for LocalDraft, and materialise the folder skeleton at the repo root so implementation stories have a fixed place to put files.

Parent epic: [`epic-application-architecture-2026-09-15`](epic-application-architecture-2026-09-15.md)

## Acceptance Criteria

- [ ] Directory tree from the epic's "Project Directory Structure" section exists at the repo root (`app/`, `components/`, `lib/` and their subfolders).
- [ ] Every directory is tracked by git via a `.gitkeep` placeholder.
- [ ] `app/README.md`, `components/README.md`, and `lib/README.md` document what each subfolder owns and the allowed import directions between them.
- [ ] No application code is added: no `.ts`, `.tsx`, or `.css` files, no `package.json`, and no framework or tooling config.
- [ ] Route-group and dynamic-segment conventions (`(auth)`, `[id]`) are recorded in `app/README.md`.

## Further breakdown

- [ ] Add tooling config and dependencies once [`stack-selection-rationale`](stack-selection-rationale-2026-09-15.md) is claimed.
- [ ] Enforce the documented import boundaries with an ESLint rule (`no-restricted-imports`) when linting is set up.
- [ ] Record the `@/*` path alias convention alongside `tsconfig.json`.
