# leaf-digital-agent-lead (LocalDraft)

Operator workspace for researched local outreach drafts. Human review and manual send only — the UI must never imply automated blasts.

## Start here

- Process: [`agenda.md`](agenda.md) — no application code without a Kanban story in Doing
- Board: [`KANBAN.md`](KANBAN.md) → Command Palette → **Open Kanban Board**
- Architecture intent (planned + current): [`.devtool/features/epic-application-architecture-2026-09-15.md`](.devtool/features/epic-application-architecture-2026-09-15.md)
- Layer READMEs: [`app/README.md`](app/README.md), [`components/README.md`](components/README.md), [`lib/README.md`](lib/README.md)

## Current product surface

Shipped code is a Next.js 16 App Router UI with mock data. There is no persistence, server actions, discovery, scrape, or draft generation yet.

| URL | What you see |
|-----|----------------|
| `/` | Empty root page (`app/page.tsx` returns `null`) |
| `/campaigns` | Admin dashboard: metro chips, telemetry, portfolio table, velocity, funnel, audit alerts, guardrails |
| `/campaigns/new` | Campaign setup form composed from isolated widgets; submit is `preventDefault` |

Sidebar links to `/queue`, `/follow-ups`, and `/settings` exist in [`app/(auth)/layout.tsx`](app/(auth)/layout.tsx). Those routes are **not implemented**. Pipeline workbench widgets live under `components/campaigns/` and are **not mounted** on a page.

## Setup

Requires Node `>=22.13.0` and pnpm `>=9.15.0` (`packageManager` is `pnpm@9.15.9`).

```bash
pnpm install
pnpm dev          # Next.js; default http://localhost:3000
pnpm test         # Vitest (jsdom), `*.test.tsx` next to components
pnpm typecheck
pnpm lint
```

Path alias `@/*` maps to the repo root (`tsconfig.json` and `vitest.config.ts`).

## Scripts that are not wired yet

`package.json` lists `db:generate`, `db:migrate`, `db:push`, and `db:studio`. There is no `drizzle.config.ts`, no `lib/db/`, and no `.env.example`. Those belong to [`database-connection-and-cli-scaffolding-2026-09-20`](.devtool/features/database-connection-and-cli-scaffolding-2026-09-20.md). Do not treat the npm scripts as a working database.

Drizzle and `better-sqlite3` are already in `package.json` so later stories can add the client without a new dependency pass.

## Common pitfalls

- **Story gate:** UI and domain code need a card in Doing. Docs, agenda, board, skills, and rules do not.
- **Mocks vs contracts:** Dashboard and setup pages hold local `MOCK` objects. Domain contracts live in [`.cursor/skills/campaign-domain-modeling/references/domain-contract.md`](.cursor/skills/campaign-domain-modeling/references/domain-contract.md); they are not persisted.
- **Two pipeline UIs:** Portfolio / funnel widgets on `/campaigns` are not the listing workbench (`pipeline-workbench-*`). Do not import one into the other.
- **Nav vs pages:** Sidebar `href`s are design IA, not a guarantee the route exists.
- **Auth group:** `(auth)` is a URL-invisible folder only. There is no login or session check.
- **npm vs pnpm:** Prefer `pnpm`. A `package-lock.json` may exist from mixed installs; `pnpm-lock.yaml` is the intended lockfile.

## UI and design

- shadcn/ui New York + Operator Core tokens: [`.cursor/skills/shadcn-ui/SKILL.md`](.cursor/skills/shadcn-ui/SKILL.md)
- Stitch catalog: [`.cursor/skills/stitch-to-shadcn/references/projects.md`](.cursor/skills/stitch-to-shadcn/references/projects.md)
