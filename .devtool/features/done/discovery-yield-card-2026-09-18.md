---
id: "discovery-yield-card-2026-09-18"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-18T21:15:00.000Z"
completedAt: "2026-09-18T21:15:00.000Z"
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "a2"
---

# Discovery yield card

Right-rail card showing estimated listing yield and a confidence ring. Mock metrics only.

Parent epic: [`epic-campaign-setup-2026-09-18`](../epic-campaign-setup-2026-09-18.md)

## File and primitives

- File: `components/campaigns/discovery-yield-card.tsx`
- shadcn: `Card` (`CardHeader`, `CardTitle`, `CardContent`)
- Confidence is a **circular ring** (CSS conic-gradient or a small presentational SVG). Do not add a chart library. Linear shadcn `Progress` is not the Stitch contract.

## Stitch contract

Source: LocalDraft - Campaign Setup (`projects/13798460973041177032/screens/dffcadf839ef470db0d105a117c66826`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- Title pattern: `Estimated Discovery Yield:` plus a range string. Filled mock: `~120-140 local businesses`.
- Metric: `Confidence:` plus a percentage. Filled mock: `94%` with circular ring.

## Props

Typed mock-driven props. No discovery API.

- `estimateLabel: string | null` (e.g. `~120-140 local businesses`)
- `confidence: number | null` (0–100 when known)
- `className?: string`

## Visual tokens

- Card: `#FFFFFF`, `1px solid #E2E8F0`, 8px radius, padding 12px (`space-md`). Shadow only if needed: `0 1px 2px 0 rgba(15, 23, 42, 0.04)` — prefer the border.
- Title: headline-sm / body hierarchy in `#0F172A`; supporting copy `#475569`.
- Ring ≥80: emerald `#059669`. Ring below 80: amber `#D97706`. Unknown: muted `#94A3B8` placeholder track, **not** a filled 0% claim.

## Acceptance Criteria

- [x] Title copy pattern is `Estimated Discovery Yield:` plus a range string; Stitch filled mock is `~120-140 local businesses`.
- [x] Confidence label is `Confidence:` plus a percentage; Stitch filled mock is `94%`.
- [x] Confidence renders as a circular ring (or equivalent radial indicator) driven by a `confidence` number 0–100; empty/unknown uses a muted placeholder, not a fake 0% claim.
- [x] Card uses Operator Core card tokens (white surface, `#E2E8F0` border, 8px radius).
- [x] Component does not fetch discovery counts; values come from props.
- [x] Empty state when `estimateLabel` is null does not invent a yield range. Ring text remains readable (label + percent, not color-only).

## Further breakdown

- [x] Empty state when `estimateLabel` is null
- [x] High-confidence vs low-confidence color using emerald vs amber tokens
- [x] Keep the ring decorative; expose the percent as text for assistive tech
