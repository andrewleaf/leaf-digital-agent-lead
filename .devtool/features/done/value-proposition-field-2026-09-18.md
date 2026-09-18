---
id: "value-proposition-field-2026-09-18"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-18T22:40:00.000Z"
completedAt: "2026-09-18T22:40:00.000Z"
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "a0"
---

# Value proposition field

Offer/subject textarea with 80-character hint and crawler helper copy. Presentational controlled field.

Parent epic: [`epic-campaign-setup-2026-09-18`](../epic-campaign-setup-2026-09-18.md)

## File and primitives

- File: `components/campaigns/value-proposition-field.tsx`
- shadcn: `Label`, `Textarea` (CLI-add if missing)
- Do **not** use shadcn `Field` (not in the registry). Compose `Label` + `Textarea` like existing campaign widgets.

## Stitch contract

Source: LocalDraft - Campaign Setup (`projects/13798460973041177032/screens/dffcadf839ef470db0d105a117c66826`). Tokens: Operator Core **designMd** / `styleGuidelines` prose, not Stitch Material `namedColors` or the YAML `colors:` dump in `designMd`.

- Eyebrow: `Editorial Tone`.
- Label: `Specific Value Proposition / Subject of Outreach`.
- Hint: `Max 80 chars recommended`.
- Filled mock: `Website conversion review and mobile booking-flow recommendations`.
- Helper: `The research crawler will specifically isolate facts related to this offer (e.g. mobile responsiveness, quote inquiry speed).`

## Props

Typed mock-driven props. No campaign schema persistence.

- `value: string`
- `onChange: (value: string) => void`
- `disabled?: boolean`
- `maxLength?: number` (soft warn at 80 unless this prop is set, then hard-limit)
- `className?: string`

Live character count reflects `value.length`.

## Visual tokens

- Textarea: white fill, `1px solid #CBD5E1`, 6px radius, body-md 13px, placeholder `#94A3B8`, teal focus ring.
- Eyebrow / hint / count: `label-sm` / `label-md`; meta `#64748B`.
- Over-80 (when not hard-capped): amber attention `#FFFBEB` / `#B45309` / `#FDE68A`. Not guardrail rose.

## Acceptance Criteria

- [x] Eyebrow `Editorial Tone` and label `Specific Value Proposition / Subject of Outreach` are visible; the label is associated with the textarea.
- [x] Hint text is `Max 80 chars recommended`; a live character count reflects the current value.
- [x] Helper text matches Stitch: `The research crawler will specifically isolate facts related to this offer (e.g. mobile responsiveness, quote inquiry speed).`
- [x] Filled mock value is `Website conversion review and mobile booking-flow recommendations`.
- [x] Empty, filled, over-80-chars (warning style, not a hard block unless a `maxLength` prop is set), and disabled states render in isolation with `value` / `onChange` props only.
- [x] `Textarea` is CLI-added to `components/ui/` if missing; do not hand-write a textarea primitive or use `Field`.

## Further breakdown

- [x] Do not persist or validate against the campaign schema in this story
- [x] Over-80 warning uses amber attention tokens, not error rose
