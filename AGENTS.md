# Agent instructions

Read [`agenda.md`](agenda.md) first.

- Do not write application code without a Kanban story card in Doing.
- Board: [`.devtool/features/`](.devtool/features/) — see [`KANBAN.md`](KANBAN.md)
- Skills: `.cursor/skills/kanban-markdown/`, `.cursor/skills/shadcn-ui/`, `.cursor/skills/stitch-to-shadcn/`
- UI style guide: shadcn/ui + Operator Core ([`.cursor/skills/shadcn-ui/references/operator-core.md`](.cursor/skills/shadcn-ui/references/operator-core.md))

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
