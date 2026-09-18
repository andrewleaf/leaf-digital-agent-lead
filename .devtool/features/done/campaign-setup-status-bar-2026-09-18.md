---
id: "campaign-setup-status-bar-2026-09-18"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-18T21:15:00.000Z"
completedAt: "2026-09-18T21:15:00.000Z"
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "a0"
---

# Campaign setup status bar

Presentational top strip for Campaign Setup: campaign selector, Lead Engine status, and autosaved timestamp. Isolated widget only — no persistence.

Parent epic: [`epic-campaign-setup-2026-09-18`](../epic-campaign-setup-2026-09-18.md)

## File and primitives

- File: `components/campaigns/campaign-setup-status-bar.tsx`
- shadcn: `Select`, `Badge`. Optional `Separator` if a hairline is needed between clusters.
- Compose registry primitives only. Do not hand-roll a button-styled select trigger.

## Stitch contract

Source: LocalDraft - Campaign Setup (`projects/13798460973041177032/screens/dffcadf839ef470db0d105a117c66826`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- Compact horizontal strip (control height **32px**).
- Control: `Target Campaign` select; trailing unfold affordance is the Select chevron (Stitch `unfold_more`). Filled mock value `HVAC - Central Texas`.
- Badge copy: `Lead Engine: Active` when Active; Idle uses a muted/inactive badge.
- Meta: `AUTOSAVED` plus timestamp. Filled mock `14:02 UTC`.

## Props

Typed mock-driven props. No autosave clock, no campaign writes.

- `campaigns: { id: string; label: string }[]`
- `selectedCampaignId: string | null`
- `onCampaignChange: (id: string) => void` (no-op in isolation fixtures)
- `engineStatus: "Active" | "Idle"`
- `autosavedAt: string | null` (display string such as `14:02 UTC`)
- `disabled?: boolean`
- `className?: string`

## Visual tokens

- Select: white fill, `1px solid #CBD5E1`, 32px height, 6px radius, focus ring `1px solid #0F766E` + `2px rgba(15, 118, 110, 0.15)`.
- Active engine: verified chip (`#ECFDF5` / `#047857` / `#A7F3D0`).
- Idle engine: muted `#94A3B8` on transparent/white, not emerald.
- Autosave meta: `label-sm` (11px semibold, +0.02em). Timestamp may use JetBrains Mono; the `AUTOSAVED` label does not.

## Acceptance Criteria

- [x] Component accepts mock props for `campaigns` (id + label), `selectedCampaignId`, `engineStatus` (`Active` | `Idle`), and `autosavedAt` (display string such as `14:02 UTC`).
- [x] Select label reads `Target Campaign`; filled mock shows `HVAC - Central Texas`.
- [x] Badge copy is `Lead Engine: Active` when `engineStatus` is Active; Idle uses a muted/inactive badge variant.
- [x] Autosave meta renders `AUTOSAVED` plus the provided timestamp; empty `autosavedAt` hides the timestamp or shows a placeholder without inventing a clock.
- [x] Empty (no campaigns), filled, and disabled select states render in isolation without a page route or save handler.
- [x] Select trigger is labelled for assistive tech (visible `Target Campaign` associated with the control). No invented persistence.

## Further breakdown

- [x] Map Select trigger density to Operator Core 32px compact control
- [ ] Storybook-style mock fixtures matching Stitch copy
- [x] Empty list disables Select; do not fabricate a campaign option
