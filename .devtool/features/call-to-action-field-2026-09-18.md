---
id: "call-to-action-field-2026-09-18"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-18T20:12:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "bQ"
---

# Call to action field

Soft-ask CTA textarea with zero-friction status and reply-rate helper. Presentational controlled field.

Parent epic: [`epic-campaign-setup-2026-09-18`](epic-campaign-setup-2026-09-18.md)

Proposed file: `components/campaigns/call-to-action-field.tsx`. shadcn: Textarea, Label, Field.

## Acceptance Criteria

- [ ] Label is `Primary Call to Action (Soft Ask)`; status text `Zero-friction alignment` is visible in the filled/default mock.
- [ ] Helper text matches Stitch: `Low friction outreach yields 3.4x higher reply rates over direct sales calendar links.`
- [ ] Filled mock value is `Ask whether they would like a short 3-minute video review of their booking flow`.
- [ ] Empty, filled, and disabled states render in isolation with `value` / `onChange` props only — no campaign write.

## Further breakdown

- [ ] Optional `friction` prop can hide or restyle the zero-friction status
- [ ] Do not add calendar-link CTA presets in this story
