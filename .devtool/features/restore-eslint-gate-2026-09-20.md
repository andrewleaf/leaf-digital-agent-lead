---
id: "restore-eslint-gate-2026-09-20"
status: "backlog"
priority: "high"
assignee: null
dueDate: null
created: "2026-09-20T15:15:00.000Z"
modified: "2026-09-20T15:15:00.000Z"
completedAt: null
labels: ["story", "epic:epic-agent-process-automation-2026-09-20"]
order: "bT"
---

# Restore the ESLint gate

`pnpm lint` is broken on `main` and was already broken before this epic. `eslint-plugin-react@7.37.5` (pulled in transitively by `eslint-config-next@16.3.5`) calls `context.getFilename()` while detecting the React version, and ESLint 10 removed it, so `eslint .` throws `TypeError: contextOrFilename.getFilename is not a function` on the first file it reads and exits 2.

A lint command that always crashes cannot be part of a pre-Done gate, so the hooks in this epic gate on `board:lint`, `typecheck`, and `test` instead. Fixing this puts `lint` back in the gate.

Parent epic: [`epic-agent-process-automation-2026-09-20`](epic-agent-process-automation-2026-09-20.md)

## Reproduction

```
$ pnpm lint
ESLint: 10.11.0
TypeError: Error while loading rule 'react/display-name': contextOrFilename.getFilename is not a function
Occurred while linting /workspace/<first file>
    at resolveBasedir (node_modules/.../eslint-plugin-react/lib/util/version.js:31:100)
    at detectReactVersion (node_modules/.../eslint-plugin-react/lib/util/version.js:85:19)
```

`7.37.5` is the latest published `eslint-plugin-react`; the only newer tag is `7.8.0-rc.0` under `next`. So there is no in-range version bump that fixes this.

## Acceptance Criteria

- [ ] `pnpm lint` exits `0` (or reports real findings) across the repo, including `.mjs` files under `.devtool/scripts/`.
- [ ] The chosen fix is recorded with its trade-off: a pnpm `overrides` entry pinning a compatible `eslint-plugin-react`, an explicit `settings.react.version` that avoids the detection path, or dropping the React rule set from the flat config.
- [ ] Linting still covers the Next.js and TypeScript rule sets the repo relies on; the fix does not silently disable `core-web-vitals`.
- [ ] `restore-eslint-gate` is reflected in the hook gate: once lint runs, the pre-Done gate includes it.

## Further breakdown

- [ ] Check whether `eslint-config-next@16.3.5` is expected to work with ESLint 10 at all, or whether ESLint 9 is the supported pairing.
- [ ] If the fix is an override, add a comment pointing at this card so the pin is not dropped blindly.
