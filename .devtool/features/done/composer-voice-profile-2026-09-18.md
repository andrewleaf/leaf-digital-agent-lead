---
id: "composer-voice-profile-2026-09-18"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-19T00:30:00.000Z"
completedAt: "2026-09-19T00:30:00.000Z"
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "a1"
---

# Composer voice profile

Single-select voice chips matching the Stitch Composer Voice Profile row.

Parent epic: [`epic-campaign-setup-2026-09-18`](../epic-campaign-setup-2026-09-18.md)

## File and primitives

- File: `components/campaigns/composer-voice-profile.tsx`
- shadcn: `Label`, `ToggleGroup` / `ToggleGroupItem`, `Badge`
- `ToggleGroup` is not in `components/ui/` yet — CLI-add it (`npx shadcn@latest add toggle-group`). Do not hand-roll an `aria-pressed` button row and do not paste a parallel primitive into `components/campaigns/`.
- Use `type="single"` so the group behaves as a radio group with roving focus.
- The literal `Selected` marker on the active option is a `Badge`.

## Stitch contract

Source: LocalDraft - Campaign Setup (`projects/13798460973041177032/screens/dffcadf839ef470db0d105a117c66826`). Tokens: Operator Core **designMd** / `styleGuidelines` prose, not Stitch Material `namedColors` or the YAML `colors:` dump in `designMd`.

- Label: `Composer Voice Profile`.
- Options, in this order: `Helpful & Direct`, `Peer-to-Peer Collegial`, `Concise Technical`, `Audit-led Gentle Inquiry`, `Conversational`.
- Filled mock: `Helpful & Direct` is active and carries the visible word `Selected`.

`Selected` is rendered as text inside the active chip in Stitch, not just a colour state. Keep it as visible copy rather than relying on styling alone.

## Props

Typed mock-driven props. No campaign persistence.

- `value: string | null`
- `onValueChange: (value: string) => void`
- `disabled?: boolean`
- `className?: string`

Export a `VOICE_PROFILES` constant of `{ value: string; label: string }` in Stitch order. The option list is fixed Stitch copy, so do not accept an `options` prop.

## Visual tokens

- Selected chip: teal primary `#0F766E` background, white text (or `#F0FDFA` container with `#0F766E` text for the softer container treatment — pick one and apply consistently).
- Unselected chip: `#FFFFFF`, `1px solid #E2E8F0`, `#0F172A` text; hover `#F8FAFC` with `#CBD5E1` border.
- Chip metrics: 32px compact height, 6px radius, `label-md` 12px medium.
- `Selected` badge: 20px height, 4px radius, `label-sm` 11px semibold, on-primary contrast against the teal chip.
- Disabled group drops text to `#94A3B8`.

## Acceptance Criteria

- [x] Label is `Composer Voice Profile`.
- [x] Options in order: `Helpful & Direct`, `Peer-to-Peer Collegial`, `Concise Technical`, `Audit-led Gentle Inquiry`, `Conversational`.
- [x] Single selection only; Stitch filled mock has `Helpful & Direct` selected and visually marked `Selected`.
- [x] `value` / `onValueChange` props only; empty (none selected), filled, and disabled group states render in isolation.
- [x] Selected chip uses teal primary/container tokens; unselected chips use secondary outline style.
- [x] `ToggleGroup` is CLI-added to `components/ui/`; the group carries an accessible name and arrow keys move between options.

## Further breakdown

- [x] Prefer ToggleGroup type="single" over ad-hoc button row
- [x] Do not persist voice on a campaign entity
- [x] Deselecting is not a Stitch state; `onValueChange` should ignore an empty value rather than clearing the selection

## Completion notes

`npx shadcn@latest add toggle-group` created `components/ui/toggle.tsx` and `components/ui/toggle-group.tsx` but emitted `import { cn } from "cn"` in both and installed an unrelated `cn` npm package. Imports were corrected to `@/lib/utils` and the stray dependency removed. Watch for this on future CLI adds.
