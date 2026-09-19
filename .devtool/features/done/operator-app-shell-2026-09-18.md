---
id: "operator-app-shell-2026-09-18"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T00:55:00.000Z"
modified: "2026-09-19T01:05:00.000Z"
completedAt: "2026-09-19T01:05:00.000Z"
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "a3"
---

# Operator app shell

Frame that positions the fixed sidebar rail and top bar around a scrolling main canvas. Layout ports only — it renders no navigation, page copy, or campaign widgets of its own.

Parent epic: [`epic-campaign-setup-2026-09-18`](../epic-campaign-setup-2026-09-18.md)

## File and primitives

- File: `components/layout/app-shell.tsx`
- shadcn: none required. This is a positioning wrapper; do not pull in the collapsible `sidebar` block for a static rail.
- Renders exactly three regions: the `sidebar` slot inside a fixed `aside`, the `header` slot inside a fixed `header`, and `children` inside `main`.

## Stitch contract

Source: LocalDraft - Campaign Setup (`projects/13798460973041177032/screens/dffcadf839ef470db0d105a117c66826`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

Chrome geometry transcribed from the screen markup:

- Sidebar: `fixed left-0 top-0 h-full w-64` (256px), `z-50`, right border, `flex flex-col justify-between`.
- Content column: `pl-64 flex flex-col min-h-screen`.
- Header: `fixed top-0 left-64 right-0 h-14` (56px), translucent surface with backdrop blur, `z-40`, bottom border.
- Main: `relative pt-14 flex-1 w-full` with `space-lg` (16px) horizontal and vertical padding, on the canvas tint.

No copy belongs to this component.

## Props

Typed slot props. No routing, data fetching, or persistence.

- `sidebar: React.ReactNode`
- `header: React.ReactNode`
- `children: React.ReactNode`
- `className?: string`

## Visual tokens

- Canvas (main): `#F8FAFC`. Sidebar and header surfaces: `#FFFFFF` (header at ~90% opacity with blur).
- Sidebar right border and header bottom border: `1px solid #E2E8F0`.
- Sidebar rail 256px, header 56px; main padding 16px.
- Stacking: sidebar above header (`z-50` / `z-40`) so the rail edge stays unbroken.

## Acceptance Criteria

- [x] Sidebar slot renders in a 256px fixed rail with a `#E2E8F0` right border and full viewport height.
- [x] Header slot renders in a 56px fixed bar offset by the rail width, with backdrop blur and bottom border.
- [x] `children` render inside `main` with `pt-14` clearance so content is never hidden behind the header.
- [x] Main region uses the canvas tint and 16px padding; long content scrolls while rail and header stay fixed.
- [x] Landmarks are correct: one `main`, one `header`, and the rail as a `nav`-bearing `aside` (the rail's own `nav` comes from the sidebar slot).
- [x] Renders in isolation with placeholder nodes in each slot; no campaign widget is imported.

## Further breakdown

- [x] `className` merges onto the outer wrapper without overriding the fixed-position rules
- [x] Confirm keyboard tab order is sidebar, then header, then main (DOM order is rail, header, main)
