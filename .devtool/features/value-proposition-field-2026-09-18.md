---
id: "value-proposition-field-2026-09-18"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-18T20:12:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "bP"
---

# Value proposition field

Offer/subject textarea with 80-character hint and crawler helper copy. Presentational controlled field.

Parent epic: [`epic-campaign-setup-2026-09-18`](epic-campaign-setup-2026-09-18.md)

Proposed file: `components/campaigns/value-proposition-field.tsx`. shadcn: Textarea, Label, Field.

## Acceptance Criteria

- [ ] Eyebrow `Editorial Tone` and label `Specific Value Proposition / Subject of Outreach` are visible.
- [ ] Hint text is `Max 80 chars recommended`; a live character count reflects the current value.
- [ ] Helper text matches Stitch: `The research crawler will specifically isolate facts related to this offer (e.g. mobile responsiveness, quote inquiry speed).`
- [ ] Filled mock value is `Website conversion review and mobile booking-flow recommendations`.
- [ ] Empty, filled, over-80-chars (warning style, not a hard block unless a `maxLength` prop is set), and disabled states render in isolation with `value` / `onChange` props only.

## Further breakdown

- [ ] Do not persist or validate against the campaign schema in this story
- [ ] Over-80 warning uses amber attention tokens, not error rose
