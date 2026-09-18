---
id: "discovery-yield-card-2026-09-18"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-18T20:12:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "bO"
---

# Discovery yield card

Right-rail card showing estimated listing yield and a confidence ring. Mock metrics only.

Parent epic: [`epic-campaign-setup-2026-09-18`](epic-campaign-setup-2026-09-18.md)

Proposed file: `components/campaigns/discovery-yield-card.tsx`. shadcn: Card.

## Acceptance Criteria

- [ ] Title copy pattern is `Estimated Discovery Yield:` plus a range string; Stitch filled mock is `~120-140 local businesses`.
- [ ] Confidence label is `Confidence:` plus a percentage; Stitch filled mock is `94%`.
- [ ] Confidence renders as a circular ring (or equivalent radial indicator) driven by a `confidence` number 0–100; empty/unknown uses a muted placeholder, not a fake 0% claim.
- [ ] Card uses Operator Core card tokens (white surface, `#E2E8F0` border, 8px radius).
- [ ] Component does not fetch discovery counts; values come from props.

## Further breakdown

- [ ] Empty state when `estimateLabel` is null
- [ ] High-confidence vs low-confidence color using emerald vs amber tokens
