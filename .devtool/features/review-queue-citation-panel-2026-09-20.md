---
id: "review-queue-citation-panel-2026-09-20"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-20T14:45:00.000Z"
modified: "2026-09-20T14:45:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-review-queue-2026-09-20"]
order: "a5"
---

# Review queue citation panel

Right-rail grounded facts plus negative-constraints check. Presentational only.

Parent epic: [`epic-review-queue-2026-09-20`](epic-review-queue-2026-09-20.md)

## File and primitives

- File: `components/queue/queue-citation-panel.tsx`
- shadcn: `Card`, `Badge`, `Button`, `Separator`
- Distinct from [`personalized-draft-citation-panel-2026-09-12`](personalized-draft-citation-panel-2026-09-12.md) (LLM generation). Do not import that work.
- lucide: `ShieldCheck` / `BadgeCheck` for audit-clean helper; `ExternalLink` for `Open Source Page`; `Flag` for flag actions. Do not use a Material icon font.

## Stitch contract

Source: LocalDraft - Review Queue (`projects/13798460973041177032/screens/edf29e27a2824c4da2952f5bd12988fa`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

**Citations card**

- Title: `Verified Public Citations`.
- Chip: `Audit Clean`.
- Subhead: `2 of 2 Grounded Facts Confirmed`.
- Helper: `Only verified public facts are referenced. Inferred personal claims and synthetic social history are strictly barred.`
- Fact 1: `Verified Fact: Emergency Services` • `Parsed 2h ago` — `Offers 24/7 same-day emergency dispatch across Travis County` — `lonestarair-tx.com/services/emergency` — excerpt `Our certified technicians provide same-day 24/7 emergency AC repair throughout South Austin and Travis County.` — `Open Source Page` • `Flag`
- Fact 2: `Verified Fact: Operational Longevity` • `Verified DNS/About` — `Family-owned and locally operated in South Austin since 2011` — `lonestarair-tx.com/about-us` — excerpt `Founded in 2011, Lonestar Air is a family-owned HVAC contractor dedicated to Austin homes.` — `Open Source Page` • `Flag`

**Negative constraints card** (same file / same rail)

- Title: `Negative Constraints Check`.
- Chip: `PASSED`.
- Rows: `No revenue promises found` / `0 detected`; `No simulated past acquaintance` / `Clean audit`; `No misleading emergency urgency claim` / `Verified`.
- Actions: `Add Custom Fact` • `Flag Citation Error`.

## Props

Typed mock-driven props. No scrape, flag API, or custom-fact persistence.

- `auditLabel: string`
- `confirmedCount: number`
- `totalCount: number`
- `helper: string`
- `facts: { id: string; eyebrow: string; parsedLabel: string; claim: string; sourceUrl: string; excerpt: string }[]`
- `onOpenSource: (id: string) => void`
- `onFlagFact: (id: string) => void`
- `constraintsStatus: "passed" | "failed"`
- `constraints: { id: string; label: string; detail: string }[]`
- `onAddCustomFact: () => void`
- `onFlagCitationError: () => void`
- `disabled?: boolean`
- `className?: string`

Export `QUEUE_CITATION_FACTS` and `QUEUE_CONSTRAINTS` as the Stitch mocks. Empty facts: `facts: []` with `confirmedCount: 0`.

Subhead interpolates `{confirmedCount} of {totalCount} Grounded Facts Confirmed`.

## Visual tokens

- Cards: white, `1px solid #E2E8F0`, 8px radius, padding 12–16px.
- `Audit Clean` / `PASSED`: emerald `#047857` / `#ECFDF5` / `#A7F3D0`.
- Helper banner: light teal/emerald tint, not rose (this is a policy notice, not an intercept).
- Fact eyebrow `label-sm` `#64748B`; claim `headline-sm` / `body-md` `#0F172A`.
- Excerpt in a left-bordered quote block, `body-sm` `#475569`.
- Source URL: `#0284C7`, `code-sm` / `body-sm`.
- `Open Source Page` / `Flag`: ghost or secondary, 32px, not primary teal.
- Constraint checkmarks: emerald. Detail column muted `#64748B`.

## Acceptance Criteria

- [ ] Title is `Verified Public Citations` with chip `Audit Clean`; subhead is `2 of 2 Grounded Facts Confirmed` for the filled mock.
- [ ] Helper copy matches the Stitch barred-inference sentence.
- [ ] Both facts render eyebrow, claim, source URL, excerpt, and `Open Source Page` / `Flag` callbacks (`onOpenSource` / `onFlagFact`) with no navigation inside the widget.
- [ ] Negative constraints title is `Negative Constraints Check` with `PASSED`; three Stitch rows and `Add Custom Fact` / `Flag Citation Error` callbacks render.
- [ ] Empty `facts` still shows the citations card chrome and helper; does not invent claims. Disabled blocks flag/add/open actions.
- [ ] Isolation: no draft editor, no queue list, no LLM, no persistence. Flag/open are props only.

## Further breakdown

- [ ] Export citation and constraint mock constants for the scaffold
- [ ] Do not present inferred claims as verified when `facts` is empty
