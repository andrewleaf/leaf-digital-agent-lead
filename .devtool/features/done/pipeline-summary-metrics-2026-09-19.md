---
id: "pipeline-summary-metrics-2026-09-19"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T18:20:00.000Z"
modified: "2026-09-19T19:50:00.000Z"
completedAt: "2026-09-19T19:50:00.000Z"
labels: ["story", "component", "epic:epic-campaign-pipeline-2026-09-19"]
order: "a3"
---

# Pipeline summary metrics

Five KPI cards for discovered businesses, matched websites, fact citations, attention required, and drafts ready. Mock metrics only.

Parent epic: [`epic-campaign-pipeline-2026-09-19`](../epic-campaign-pipeline-2026-09-19.md)

## File and primitives

- File: `components/campaigns/pipeline-summary-metrics.tsx`
- shadcn: `Card` (`CardHeader`, `CardTitle`, `CardContent`), `Badge`
- lucide: `Search` (or `Globe`) for Stitch `travel_explore`, `BadgeCheck` for `domain_verification` and `verified`, `TriangleAlert` for `warning`, `MailCheck` for `mark_email_read`, `Check` for the resolution-rate check. Do not use the Material icon font.
- Five cards in one grid component. Do not split into five story files; a small inner card helper in the same file is fine.

## Stitch contract

Source: LocalDraft - Campaign Pipeline (`projects/13798460973041177032/screens/81796119faa94a379c970ac48a6add3d`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

Labels are fixed Stitch copy. Values are props.

1. `Businesses Discovered` — value `128` — chips `ATX: 78`, `RR: 31`, `CP: 19`.
2. `Websites Matched` — value `121` with suffix `/ 128 targets` — `94.5% resolution rate` and `7 offline`.
3. `Fact Citations` — value `242` — `Avg. Extracted Payload` `2.1 facts/org`.
4. `Attention Required` — value `14` — rows `Missing URLs` `7` and `Low Confidence` `7`.
5. `Drafts Ready` — value `14` — `Triage Desk Ready` and chip `Manual Send`.

## Props

Typed mock-driven props. No discovery, scrape, or queue APIs.

- `discovered: { value: number; atx: number; rr: number; cp: number }`
- `matched: { value: number; of: number; resolutionRate: string; offline: number }`
- `citations: { value: number; avgFactsPerOrg: string }`
- `attention: { value: number; missingUrls: number; lowConfidence: number }`
- `draftsReady: { value: number }`
- `className?: string`

Filled mock: the Stitch numbers above (`resolutionRate: "94.5%"`, `avgFactsPerOrg: "2.1 facts/org"`). Empty mock: zeros and `0%` / `0 facts/org`.

## Visual tokens

- Each card: white, `1px solid #E2E8F0`, 8px radius, padding 12px (`space-md`).
- Eyebrow label: `label-sm` 11px uppercase tracked, `#64748B`. Icon `#64748B` except attention (`#E11D48`) and drafts ready (`#0F766E`).
- Hero number: `headline-xl` 28px / 600, `#0F172A`. Attention number uses rose `#E11D48`. Drafts-ready number uses `#0F766E`.
- Matched suffix `/ 128 targets`: `body-sm` `#64748B`.
- Metro chips and `Manual Send`: 20px height, 4px radius, `label-sm` / `code-sm`, `#F1F5F9` fill, text `#475569` (`Manual Send` uses teal tint `#F0FDFA` / `#0F766E`).
- Resolution rate: emerald `#047857`. Offline and payload meta: `#64748B`; payload value teal `#0F766E`.
- Grid: 1 / 2 `sm` / 5 `lg` columns, gap 12px.

## Acceptance Criteria

- [x] Five cards render with labels `Businesses Discovered`, `Websites Matched`, `Fact Citations`, `Attention Required`, `Drafts Ready`.
- [x] Filled mock matches Stitch: `128` with `ATX: 78` `RR: 31` `CP: 19`; `121` `/ 128 targets` with `94.5% resolution rate` and `7 offline`; `242` with `2.1 facts/org`; `14` attention with `Missing URLs` `7` and `Low Confidence` `7`; `14` drafts with `Triage Desk Ready` and `Manual Send`.
- [x] Empty/zero mock does not invent metro chips counts other than `0`; attention and drafts-ready do not keep the filled-mock warning/teal emphasis when `value` is `0` (muted treatment).
- [x] Values come from props; the component does not count table rows or hit an API.
- [x] Hero numbers are text, not color-only. Cards use Operator Core surface tokens.

## Further breakdown

- [x] Keep metro chip prefixes `ATX:`, `RR:`, `CP:` as Stitch copy
- [x] `resolutionRate` and `avgFactsPerOrg` are display strings so `94.5%` and `2.1 facts/org` stay exact
