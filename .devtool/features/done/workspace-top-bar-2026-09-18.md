---
id: "workspace-top-bar-2026-09-18"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T00:55:00.000Z"
modified: "2026-09-19T01:20:00.000Z"
completedAt: "2026-09-19T01:20:00.000Z"
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "a5"
---

# Workspace top bar

Fixed 56px header holding the breadcrumb trail, global search, human-in-the-loop pill, weekly review stat, primary action, and operator avatar.

Parent epic: [`epic-campaign-setup-2026-09-18`](../epic-campaign-setup-2026-09-18.md)

## File and primitives

- File: `components/layout/workspace-top-bar.tsx`
- shadcn: `Breadcrumb`, `Input`, `Badge`, `Button`, `Avatar`, `Separator`
- CLI-add missing primitives: `breadcrumb`, `avatar`.
- lucide icons: `Search`, `ChevronRight` (breadcrumb separator, supplied by `BreadcrumbSeparator`), `BadgeCheck` (Stitch `verified`), `Plus` (Stitch `add`), `User` (avatar fallback).

## Stitch contract

Source: LocalDraft - Campaign Setup (`projects/13798460973041177032/screens/dffcadf839ef470db0d105a117c66826`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

**Left cluster**

- Breadcrumb: `Workspace` (muted, interactive) `>` `Review Desk` (semibold, current page).
- Search field, 32px tall and 256px wide, placeholder `Search leads, domains, campaigns... (/) `.
- Policy pill: `Strict Human-in-the-Loop • No Automated Blasts` with a leading teal dot. Hidden below the `xl` breakpoint.

**Right cluster**

- Review stat: `verified` icon, bold `38`, then `drafts reviewed this week`. Hidden below the `md` breakpoint.
- Primary button: `New Campaign` with a leading `add` icon, 32px tall.
- Avatar: 32px teal circle with a person glyph.

## Props

Typed mock-driven props. No search backend, router, or session lookup.

- `breadcrumb: { label: string; href?: string }[]` (last entry is the current page)
- `searchPlaceholder?: string` (defaults to the Stitch string)
- `searchValue: string`
- `onSearchChange: (value: string) => void`
- `policyNotice?: string`
- `reviewedThisWeek?: number`
- `onNewCampaign: () => void`
- `operator?: { name: string; initials?: string; imageUrl?: string }`
- `className?: string`

## Visual tokens

- Bar surface `#FFFFFF` at ~90% opacity with backdrop blur, bottom border `1px solid #E2E8F0`, 16px horizontal padding.
- Breadcrumb: label-md 12px, muted `#64748B`, current page `#0F172A` semibold.
- Search input: 32px height, 6px radius, `1px solid #CBD5E1`, placeholder `#94A3B8`, focus `1px solid #0F766E` plus `2px rgba(15, 118, 110, 0.15)`.
- Policy pill and review stat: body-sm 12px, text `#475569`, `#F8FAFC` fill, `1px solid #E2E8F0`; stat icon and pill dot use `#0F766E`, stat number `#0F172A` semibold.
- Primary button `#0F766E`, hover `#115E59`, white text, 32px height, 6px radius.
- Avatar 32px circle, `#0F766E` fill with white glyph.

## Acceptance Criteria

- [x] Breadcrumb renders each entry in order; only the last is marked as the current page and is not a link.
- [x] Search input uses the Stitch placeholder, is controlled by `searchValue` / `onSearchChange`, and performs no fetching.
- [x] Policy pill renders the notice text when provided and is hidden below the `xl` breakpoint.
- [x] Review stat renders `38` plus `drafts reviewed this week` when `reviewedThisWeek` is set, hidden below `md`, and omitted entirely when undefined.
- [x] `New Campaign` button calls `onNewCampaign` and uses the primary teal treatment.
- [x] Avatar falls back to initials or the person glyph when no `imageUrl` is supplied.
- [x] Search input has an accessible label (visually hidden is fine); icon-only elements are `aria-hidden`; the bar is a `header` landmark's content, not a nested landmark.
- [x] Renders in isolation for the full, narrow (pill and stat hidden), and no-operator variants.

The component renders the bar's contents only; `AppShell` owns the `header` element, so no landmark is nested.

## Further breakdown

- [x] Decide whether the `/` shortcut hint stays literal in the placeholder (it does, per Stitch) or becomes a `kbd` affordance
- [x] Verify the blurred surface still meets contrast over the canvas tint (surface is white at 90% over `#F8FAFC`, so text keeps its contrast)
