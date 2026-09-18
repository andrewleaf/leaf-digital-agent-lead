---
id: "industry-niche-input-2026-09-18"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-18T21:15:00.000Z"
completedAt: "2026-09-18T21:15:00.000Z"
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "a1"
---

# Industry niche input

Chip input for primary/secondary niches, NAICS verified-match status, and Quick Presets. Presentational only.

Parent epic: [`epic-campaign-setup-2026-09-18`](../epic-campaign-setup-2026-09-18.md)

## File and primitives

- File: `components/campaigns/industry-niche-input.tsx`
- shadcn: `Label`, `Input`, `Badge`, `Button`
- Niche chips are `Badge` plus a dismiss control (lucide `X`). Storefront icon: lucide `Store` (or equivalent), not a custom icon font.
- Presets are compact ghost or outline `Button`s. Do not invent a second chip primitive.

## Stitch contract

Source: LocalDraft - Campaign Setup (`projects/13798460973041177032/screens/dffcadf839ef470db0d105a117c66826`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- Label: `Primary Industry / Niche Category`.
- Status: `NAICS verified match` (shown when verified).
- Filled chip: `HVAC Contractors` (storefront icon, dismissible).
- Placeholder: `Type to add secondary niche...`
- Presets row: `Quick Presets:` then `+ Plumbers`, `+ Auto Repair`, `+ Roofing`, `+ Dental Clinics`.

## Props

Typed mock-driven props. No campaign persistence.

- `niches: { id: string; label: string }[]`
- `naicsVerified: boolean`
- `inputValue: string`
- `onInputChange: (value: string) => void`
- `onAdd: (label: string) => void`
- `onRemove: (id: string) => void`
- `onPresetSelect: (vertical: string) => void`
- `disabled?: boolean`
- `className?: string`

Preset button labels (including the leading `+`) are the Stitch strings. `onPresetSelect` receives the vertical name without requiring a network call.

## Visual tokens

- Input: white fill, `1px solid #CBD5E1`, 32–36px height, 6px radius, body-md 13px, placeholder `#94A3B8`, teal focus ring.
- Chips: 20px height, 4px radius, `label-sm` 11px semibold, padding `0 6px`.
- NAICS verified: `#ECFDF5` / `#047857` / `1px solid #A7F3D0` (optional 6px emerald dot).
- Preset buttons: compact 32px, secondary/ghost (white or transparent, `#E2E8F0` or no fill), not primary teal.

## Acceptance Criteria

- [x] Label is `Primary Industry / Niche Category`; status text `NAICS verified match` shows when `naicsVerified` is true and hides when false.
- [x] Selected niches render as dismissible chips; Stitch filled mock is `HVAC Contractors`.
- [x] Text input placeholder is `Type to add secondary niche...`; Enter/add callback is a prop (`onAdd`) with no campaign persistence.
- [x] Preset row label is `Quick Presets:`; buttons are `+ Plumbers`, `+ Auto Repair`, `+ Roofing`, `+ Dental Clinics` and call `onPresetSelect` with that vertical.
- [x] Empty (no chips), filled, and disabled states render in isolation.
- [x] Label is associated with the text input. Chip dismiss controls have accessible names (e.g. remove HVAC Contractors). Presets already present in `niches` are skipped or disabled.

## Further breakdown

- [x] Chip dismiss calls `onRemove(id)` only
- [x] Preset buttons do not duplicate a niche already in the chip list (UI skip or disabled)
- [x] Enter in the input submits `onAdd` and does not invent a second submit button unless Stitch shows one
