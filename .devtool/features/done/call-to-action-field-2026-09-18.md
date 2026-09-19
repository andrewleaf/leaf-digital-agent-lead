---
id: "call-to-action-field-2026-09-18"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-19T00:24:00.000Z"
completedAt: "2026-09-19T00:24:00.000Z"
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "a0"
---

# Call to action field

Soft-ask CTA textarea with zero-friction status and reply-rate helper. Presentational controlled field.

Parent epic: [`epic-campaign-setup-2026-09-18`](../epic-campaign-setup-2026-09-18.md)

## File and primitives

- File: `components/campaigns/call-to-action-field.tsx`
- shadcn: `Label`, `Textarea`, `Badge`
- Do **not** use shadcn `Field` (not in `components/ui/`). Compose `Label` + `Textarea` like `value-proposition-field.tsx`.
- The `Zero-friction alignment` status is a `Badge`, not a second label or a one-off pill `div`.

## Stitch contract

Source: LocalDraft - Campaign Setup (`projects/13798460973041177032/screens/dffcadf839ef470db0d105a117c66826`). Tokens: Operator Core **designMd** / `styleGuidelines` prose, not Stitch Material `namedColors` or the YAML `colors:` dump in `designMd`.

- Label: `Primary Call to Action (Soft Ask)`.
- Status: `Zero-friction alignment` (trailing, on the label row).
- Filled mock: `Ask whether they would like a short 3-minute video review of their booking flow`.
- Helper: `Low friction outreach yields 3.4x higher reply rates over direct sales calendar links.`

Unlike the value proposition field directly above it, Stitch shows **no eyebrow** and **no character counter** for this field. Do not add either.

## Props

Typed mock-driven props. No campaign schema persistence.

- `value: string`
- `onChange: (value: string) => void`
- `frictionStatus?: string | null` (defaults to `Zero-friction alignment`; `null` hides the badge)
- `disabled?: boolean`
- `className?: string`

Export copy constants (`CALL_TO_ACTION_LABEL`, `CALL_TO_ACTION_STATUS`, `CALL_TO_ACTION_HELPER`) the way `value-proposition-field.tsx` does, so tests assert against one source of truth.

## Visual tokens

- Textarea: white fill, `1px solid #CBD5E1`, 6px radius, body-md 13px, placeholder `#94A3B8`, focus `1px solid #0F766E` + `2px rgba(15, 118, 110, 0.15)`.
- Label: `label-md` 12px medium, `#0F172A`.
- Status badge: 20px height, 4px radius, `label-sm` 11px semibold, emerald verified tint `#ECFDF5` / `#047857` / `1px solid #A7F3D0`.
- Helper: `body-sm` / `label-md`, meta `#64748B`.

## Acceptance Criteria

- [x] Label is `Primary Call to Action (Soft Ask)`; status text `Zero-friction alignment` is visible in the filled/default mock.
- [x] Helper text matches Stitch: `Low friction outreach yields 3.4x higher reply rates over direct sales calendar links.`
- [x] Filled mock value is `Ask whether they would like a short 3-minute video review of their booking flow`.
- [x] Empty, filled, and disabled states render in isolation with `value` / `onChange` props only — no campaign write.
- [x] The label is associated with the textarea (`htmlFor` / `id`) and the helper is referenced via `aria-describedby`.
- [x] No character count and no eyebrow are rendered (Stitch shows neither here).

## Further breakdown

- [x] `frictionStatus` set to `null` hides the zero-friction badge without shifting the label row
- [x] Do not add calendar-link CTA presets in this story
