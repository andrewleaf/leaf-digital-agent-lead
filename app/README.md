# `app/` — Next.js App Router

Routing, layouts, and page composition only. Pages assemble components and (later) invoke server actions; they do not contain business logic or direct database queries.

Target structure: [`epic-application-architecture-2026-09-15`](../.devtool/features/epic-application-architecture-2026-09-15.md).

## What exists today

| Path | Serves | Notes |
|------|--------|--------|
| `layout.tsx` | Root HTML, Inter + JetBrains Mono, `globals.css` | Metadata title `LocalDraft` |
| `page.tsx` | `/` | Returns `null` — not a dashboard |
| `globals.css` | Tailwind / tokens | Referenced by `components.json` |
| `(auth)/layout.tsx` | Shell for child routes | Client layout: `AppShell`, sidebar, `WorkspaceTopBar`. Search and New Campaign are local state / no-ops. `activeItemId` is hardcoded to `"campaigns"`. |
| `(auth)/campaigns/page.tsx` | `/campaigns` | Client dashboard; metro filter state only; all metrics from exported mocks |
| `(auth)/campaigns/new/page.tsx` | `/campaigns/new` | Client setup form; field state is React `useState`; save / initialize are no-ops |

## Planned, not present

These paths are documented in the architecture epic and/or sidebar IA. Do not assume they exist:

| Path | Intended URL |
|------|----------------|
| `(auth)/campaigns/[id]/page.tsx` | `/campaigns/:id` |
| `(auth)/campaigns/[id]/settings/` | Per-campaign settings |
| `(auth)/queue/page.tsx` | `/queue` |
| Follow-ups / settings pages | `/follow-ups`, `/settings` |
| `api/` | Webhooks, streaming, third-party callbacks only |

`(auth)` is a **route group**: parentheses keep it out of the URL. `[id]` (when added) must stay named `id`.

## Conventions

- Server Components are the default. Existing campaign pages are `"use client"` because they own interactive mock state.
- Mutations go through `lib/actions/` once that layer exists — never `fetch` against `api/` for first-party writes.
- Do not add a campaign detail or pipeline page unless a story card covers it. Pipeline widgets are implemented under `components/campaigns/` but have no route.

## Import rules

- May import from `components/` and `lib/`.
- Nothing outside `app/` may import from `app/`.
