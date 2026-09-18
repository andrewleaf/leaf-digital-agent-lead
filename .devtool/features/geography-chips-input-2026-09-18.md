---
id: "geography-chips-input-2026-09-18"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-18T20:12:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "bN"
---

# Geography chips input

Dismissible metro/city chips plus an Add city/county control. Presentational only.

Parent epic: [`epic-campaign-setup-2026-09-18`](epic-campaign-setup-2026-09-18.md)

Proposed file: `components/campaigns/geography-chips-input.tsx`. shadcn: Badge, Button, Input.

## Acceptance Criteria

- [ ] Label is `Target Geographies`; optional `regionCaption` mock is `Austin Metropolitan Area`.
- [ ] Filled mock chips are `Austin, TX`, `Round Rock, TX`, `Cedar Park, TX` with a location affordance and dismiss control.
- [ ] Add control copy is `Add city/county`; activating it reveals or focuses an input; submit calls `onAdd` with the typed string and does not write a campaign record.
- [ ] Empty (no chips, caption optional), filled, and disabled states render in isolation.

## Further breakdown

- [ ] Keep chip height/radius on Operator Core chip spec (20px, 4px)
- [ ] Do not implement map geocoding or yield calculation
