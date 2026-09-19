---
id: "campaign-pipeline-header-2026-09-19"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T18:20:00.000Z"
modified: "2026-09-19T18:20:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaign-pipeline-2026-09-19"]
order: "a0"
---

# Campaign pipeline header

Identity cluster for a running campaign: id chip, processing badge, dispatch-guard chip, title, and created/target/rule meta. Presentational only.

Parent epic: [`epic-campaign-pipeline-2026-09-19`](epic-campaign-pipeline-2026-09-19.md)

## File and primitives

- File: `components/campaigns/campaign-pipeline-header.tsx`
- shadcn: `Card` (`CardHeader`, `CardTitle`, `CardContent`, `CardAction` if the actions slot sits in the header row), `Badge`
- lucide: `RefreshCw` for Stitch `sync`, `Clock` for `schedule`, `Target` for `target`, `ShieldCheck` for `verified_user`. Do not use the Material icon font.
- Optional `actions` slot so [`campaign-pipeline-actions-2026-09-19`](campaign-pipeline-actions-2026-09-19.md) can mount in the same Stitch header card without this story owning those buttons.

## Stitch contract

Source: LocalDraft - Campaign Pipeline (`projects/13798460973041177032/screens/81796119faa94a379c970ac48a6add3d`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- Chip: `CAM-TX-0491` with a pinging teal status dot.
- Status badge: `Active • Stage 5 of 6 Processing` with a leading sync icon.
- Guard chip: `Manual Dispatch Guard Active`.
- Title: `Central Texas HVAC Outbound (Austin, Round Rock, Cedar Park)`.
- Meta, in order, separated by `•`:
  - `Created Today at 09:15 AM by Alex M.`
  - `Target: Licensed HVAC Contractors`
  - `Rule: Single Domain Enriched per Business`

Copy above is the filled mock. The strings are props, not hard-coded campaign facts.

## Props

Typed mock-driven props. No campaign fetch or route.

- `campaignId: string`
- `statusLabel: string`
- `guardLabel: string`
- `title: string`
- `createdLabel: string`
- `targetLabel: string`
- `ruleLabel: string`
- `processing?: boolean` — when true, the id-chip dot pings and the status badge uses the active/teal treatment
- `actions?: React.ReactNode`
- `className?: string`

Filled mock: `CAM-TX-0491`, `Active • Stage 5 of 6 Processing`, `Manual Dispatch Guard Active`, the Stitch title and three meta lines, `processing: true`.

## Visual tokens

- Card: white `#FFFFFF`, `1px solid #E2E8F0`, 8px radius, padding 16px (`space-lg`).
- Id chip: `code-sm` JetBrains Mono 12px, `#F1F5F9` fill, text `#475569`, 4px radius (pill), 6px teal `#0F766E` dot.
- Status badge: primary container `#0F766E` / on-primary white, `label-sm` 11px semibold, 20px height, 4px radius.
- Guard chip: muted `#F1F5F9` / `#475569` / `1px solid #E2E8F0`, `label-sm`.
- Title: `headline-lg` 22px / 600, `#0F172A`.
- Meta: `body-sm` 12px, `#64748B`; lucide icons 15px, same muted color.

## Acceptance Criteria

- [ ] Filled mock renders `CAM-TX-0491`, `Active • Stage 5 of 6 Processing`, `Manual Dispatch Guard Active`, the Stitch title, and the three meta lines in that order.
- [ ] All visible strings come from props; the component does not hard-code a campaign id or metro list.
- [ ] `processing` true uses the teal status badge and pinging id-chip dot; `processing` false uses a muted/inactive badge and a static dot.
- [ ] `actions` slot renders on the right of the header row when provided and is omitted when undefined.
- [ ] Card uses Operator Core surface tokens (white, `#E2E8F0` border, 8px radius).
- [ ] Title is a single `h1`. Status and guard chips are not color-only (visible text remains). Renders in isolation.

## Further breakdown

- [ ] Do not import `CampaignPipelineActions` from this file; composition happens via the `actions` slot
- [ ] Empty/idle mock still shows title and id; status badge copy comes from `statusLabel`
