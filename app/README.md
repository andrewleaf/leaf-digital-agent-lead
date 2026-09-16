# `app/` — Next.js App Router

Routing, layouts, and page composition only. Pages assemble components and invoke server actions; they do not contain business logic or direct database queries.

Structure defined by [`epic-application-architecture-2026-09-15`](../.devtool/features/epic-application-architecture-2026-09-15.md).

## Directories

| Path | Owns |
|------|------|
| `(auth)/` | Route group for every screen that requires an authenticated operator. Holds the shared `layout.tsx` (sidebar shell). |
| `(auth)/campaigns/` | Campaign list (`page.tsx`), creation form (`new/page.tsx`), and detail view (`[id]/page.tsx`). |
| `(auth)/campaigns/[id]/settings/` | Per-campaign settings. Not the global app settings area. |
| `(auth)/queue/` | Agent workspace queue — draft review, approve, send, follow-up tracking. |
| `api/` | Route handlers. Only for endpoints that cannot be a server action (webhooks, streaming, third-party callbacks). |

## Conventions

- `(auth)` is a route group: the parentheses keep it out of the URL, so `(auth)/queue/page.tsx` serves `/queue`.
- `[id]` is a dynamic segment; the param name must stay `id` so links and server actions share one convention.
- Planned root files, added by later stories: `layout.tsx` (root layout), `page.tsx` (landing / dashboard), and `globals.css` (Tailwind base styles and design tokens).
- Server Components are the default. Add `"use client"` only for a component that needs state, effects, or browser APIs, and push it as far down the tree as possible.
- Mutations go through `lib/actions/`, never through `fetch` against `api/`.

## Import rules

- May import from `components/` and `lib/`.
- Nothing outside `app/` may import from `app/`.
