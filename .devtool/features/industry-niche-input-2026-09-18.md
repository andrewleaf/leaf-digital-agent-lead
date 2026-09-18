---
id: "industry-niche-input-2026-09-18"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-18T20:12:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "bM"
---

# Industry niche input

Chip input for primary/secondary niches, NAICS verified-match status, and Quick Presets. Presentational only.

Parent epic: [`epic-campaign-setup-2026-09-18`](epic-campaign-setup-2026-09-18.md)

Proposed file: `components/campaigns/industry-niche-input.tsx`. shadcn: Input, Badge, Button.

## Acceptance Criteria

- [ ] Label is `Primary Industry / Niche Category`; status text `NAICS verified match` shows when `naicsVerified` is true and hides when false.
- [ ] Selected niches render as dismissible chips; Stitch filled mock is `HVAC Contractors`.
- [ ] Text input placeholder is `Type to add secondary niche...`; Enter/add callback is a prop (`onAdd`) with no campaign persistence.
- [ ] Preset row label is `Quick Presets:`; buttons are `+ Plumbers`, `+ Auto Repair`, `+ Roofing`, `+ Dental Clinics` and call `onPresetSelect` with that vertical.
- [ ] Empty (no chips), filled, and disabled states render in isolation.

## Further breakdown

- [ ] Chip dismiss calls `onRemove(id)` only
- [ ] Preset buttons do not duplicate a niche already in the chip list (UI skip or disabled)
