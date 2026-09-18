---
id: "geography-chips-input-2026-09-18"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-18T22:30:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "a1"
---

# Geography chips input

Dismissible metro/city chips plus an Add city/county control. Presentational only.

Parent epic: [`epic-campaign-setup-2026-09-18`](epic-campaign-setup-2026-09-18.md)

## File and primitives

- File: `components/campaigns/geography-chips-input.tsx`
- shadcn: `Label`, `Input`, `Badge`, `Button` (already in the registry)
- Geography chips are `Badge` plus a dismiss control (lucide `X`). Location affordance: lucide `MapPin` (or equivalent), not a custom icon font.
- Mirror chip density and input chrome from `components/campaigns/industry-niche-input.tsx`. Do not invent a second chip primitive.

## Stitch contract

Source: LocalDraft - Campaign Setup (`projects/13798460973041177032/screens/dffcadf839ef470db0d105a117c66826`). Tokens: Operator Core **designMd** / `styleGuidelines` prose, not Stitch Material `namedColors` or the YAML `colors:` dump in `designMd`.

- Label: `Target Geographies`.
- Region caption mock: `Austin Metropolitan Area`.
- Filled chips: `Austin, TX`, `Round Rock, TX`, `Cedar Park, TX` (location icon, dismissible).
- Add control: `Add city/county`.

## Props

Typed mock-driven props. No geocoding, map APIs, or campaign persistence.

- `geographies: { id: string; label: string }[]`
- `regionCaption?: string | null`
- `inputValue: string`
- `onInputChange: (value: string) => void`
- `onAdd: (label: string) => void`
- `onRemove: (id: string) => void`
- `disabled?: boolean`
- `className?: string`

Activating the add control reveals or focuses the input. Submit (Enter) calls `onAdd` with the typed string.

## Visual tokens

- Input: white fill, `1px solid #CBD5E1`, 32–36px height, 6px radius, body-md 13px, placeholder `#94A3B8`, teal focus ring.
- Chips: 20px height, 4px radius, `label-sm` 11px semibold, padding `0 6px`.
- Region caption: supporting/meta `#475569` / `#64748B`, `label-md` or `body-sm`.
- Add control: compact 32px secondary/ghost, not primary teal.

## Acceptance Criteria

- [ ] Label is `Target Geographies` and is associated with the text input.
- [ ] Optional `regionCaption` mock is `Austin Metropolitan Area`; omit the caption when the prop is null or undefined.
- [ ] Filled mock chips are `Austin, TX`, `Round Rock, TX`, `Cedar Park, TX` with a location affordance and dismiss control whose accessible name includes the chip label.
- [ ] Add control copy is `Add city/county`; activating it reveals or focuses an input; Enter/submit calls `onAdd` with the typed string and does not write a campaign record.
- [ ] Empty (no chips, caption optional), filled, and disabled states render in isolation.
- [ ] Chip dismiss calls `onRemove(id)` only. No map geocoding or yield calculation.

## Further breakdown

- [ ] Keep chip height/radius on Operator Core chip spec (20px, 4px)
- [ ] Do not implement map geocoding or yield calculation
