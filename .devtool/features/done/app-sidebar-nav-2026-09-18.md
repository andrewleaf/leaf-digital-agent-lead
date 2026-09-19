---
id: "app-sidebar-nav-2026-09-18"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T00:55:00.000Z"
modified: "2026-09-19T01:10:00.000Z"
completedAt: "2026-09-19T01:10:00.000Z"
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "a4"
---

# App sidebar nav

Primary navigation rail: brand block, four workspace destinations with shortcut or count affordances, and footer slots for the campaign selector and operator identity.

Parent epic: [`epic-campaign-setup-2026-09-18`](../epic-campaign-setup-2026-09-18.md)

## File and primitives

- File: `components/layout/app-sidebar-nav.tsx`
- shadcn: `Button` (ghost, `asChild` for links), `Badge`, `Separator`
- lucide icons: `Layers` (Campaigns), `MailCheck` (Review Queue), `CalendarClock` (Follow-ups), `SlidersHorizontal` (Settings). Map from the Stitch Material names `layers`, `mark_email_read`, `pending_actions`, `tune`.
- Do not CLI-add the collapsible shadcn `sidebar` block — the Stitch rail is static and always expanded.
- The footer regions are slots, so the existing [`campaign-setup-status-bar`](campaign-setup-status-bar-2026-09-18.md) selector can be mounted without duplicating it here.

## Stitch contract

Source: LocalDraft - Campaign Setup (`projects/13798460973041177032/screens/dffcadf839ef470db0d105a117c66826`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

**Brand block** (56px tall, bottom border)

- Logo image, then `LocalDraft` (headline-sm) over `Operator Core` (label-sm, uppercase, tracked).
- Trailing version chip: `v2.4` (mono).

**Nav items** (in order)

| Label | Icon | Trailing |
|---|---|---|
| `Campaigns` | `layers` | `⌘1` |
| `Review Queue` | `mark_email_read` | count `14` (primary fill) |
| `Follow-ups` | `pending_actions` | count `3` (neutral fill) |
| `Settings` | `tune` | `⌘,` |

`Campaigns` is the active item (`aria-current="page"`) with the filled teal treatment.

**Footer** (top border, tinted)

- Selector card: `Target Campaign` with `unfold_more` affordance, status dot, value `HVAC - Central Texas`.
- Identity row: `Alex M. (Operator)`, status `Ready` (pulsing dot), caption `Manual Send Mode Only`.

## Props

Typed mock-driven props. No router, no data fetching.

- `items: { id: string; label: string; href: string; icon: LucideIcon; shortcut?: string; count?: number; countTone?: "primary" | "neutral" }[]`
- `activeItemId: string`
- `version: string` (renders the `v2.4` chip)
- `campaignSelector?: React.ReactNode` (footer slot)
- `operator?: React.ReactNode` (footer slot)
- `className?: string`

Navigation is `href`-driven markup only; the card does not introduce route files.

## Visual tokens

- Rail surface `#FFFFFF`, right border `1px solid #E2E8F0`, footer divider `#F1F5F9`.
- Item rows 36px, 6px radius, label body-md 13px, 12px horizontal padding.
- Active item: `#0F766E` fill, `#FFFFFF` text, semibold. Inactive: text `#475569`, hover canvas `#F8FAFC` with text `#0F172A`.
- Count badges: primary `#0F766E` on white text; neutral `#F1F5F9` with text `#475569`. Chip height 20px, 4px radius, label-sm 11px semibold.
- Shortcut hints: JetBrains Mono 12px, `#64748B`.
- Brand eyebrow `Operator Core`: label-sm 11px, uppercase, `#64748B`.

## Acceptance Criteria

- [x] Brand block shows `LocalDraft`, the `Operator Core` eyebrow, and the version chip from the `version` prop.
- [x] All four items render with their Stitch labels, lucide icons, and trailing affordance (`⌘1`, `14`, `3`, `⌘,`).
- [x] The item matching `activeItemId` gets the teal filled treatment and `aria-current="page"`; others do not.
- [x] Counts render only when `count` is provided, and `countTone` selects primary versus neutral fill.
- [x] Footer slots render `campaignSelector` and `operator` when passed and collapse cleanly when omitted.
- [x] Items are inside a single `nav` with an accessible name; icons are `aria-hidden` and labels carry the accessible text.
- [x] Renders in isolation with mock items, including the empty-footer variant.

Counts stay readable by assistive tech (`Review Queue 14`); only the icons and shortcut hints are hidden.

## Further breakdown

- [x] Long campaign names in the footer selector truncate instead of wrapping
- [x] Shortcut hints are decorative and are not announced as part of the link name

The Stitch logo bitmap is not in the repo, so the brand block is the wordmark and eyebrow only.
