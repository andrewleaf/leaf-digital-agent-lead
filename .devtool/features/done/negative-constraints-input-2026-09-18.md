---
id: "negative-constraints-input-2026-09-18"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-19T00:33:00.000Z"
completedAt: "2026-09-19T00:33:00.000Z"
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "a2"
---

# Negative constraints input

Prohibition chips for claims LocalDraft must not invent. Presentational only.

Parent epic: [`epic-campaign-setup-2026-09-18`](../epic-campaign-setup-2026-09-18.md)

## File and primitives

- File: `components/campaigns/negative-constraints-input.tsx`
- shadcn: `Label`, `Input`, `Badge`
- Icons: lucide `Ban` for the Stitch `block` glyph, lucide `X` for dismiss. No icon fonts.
- Chips live inside the bordered input shell, following `geography-chips-input.tsx`.

## Stitch contract

Source: LocalDraft - Campaign Setup (`projects/13798460973041177032/screens/dffcadf839ef470db0d105a117c66826`). Tokens: Operator Core **designMd** / `styleGuidelines` prose, not Stitch Material `namedColors` or the YAML `colors:` dump in `designMd`.

- Eyebrow: `Strict Prohibition`.
- Prompt: `Specify exact details, buzzwords, or misleading claims that LocalDraft MUST NOT invent or hallucinate under any circumstance:`
- Filled mock chip: `Do not claim guaranteed revenue improvements` (block icon, dismissible).

Section chrome (`Negative Constraints & Guardrails` heading and the `Crucial safety & brand reputation boundary conditions` caption) belongs to the page section, which is out of epic scope. Expose the caption as an optional `caption` prop only.

### Deviation from Stitch

The Stitch screen renders only the prompt and one dismissible chip — **no text input and no add button**. This story adds a text input anyway, because a prohibition list is not operable without an add affordance, and because the sibling chip widgets (`industry-niche-input.tsx`, `geography-chips-input.tsx`) already established that pattern. Placeholder to use: `Add a prohibited claim...`

## Props

Typed mock-driven props. No campaign persistence.

- `constraints: { id: string; label: string }[]`
- `inputValue: string`
- `onInputChange: (value: string) => void`
- `onAdd: (label: string) => void`
- `onRemove: (id: string) => void`
- `caption?: string | null`
- `disabled?: boolean`
- `className?: string`

## Visual tokens

- Input shell: white fill, `1px solid #CBD5E1`, 6px radius, min height 36px, focus-within `1px solid #0F766E` + `2px rgba(15, 118, 110, 0.15)`, placeholder `#94A3B8`.
- Prohibition chips: Operator Core High Friction tint — `#FFF1F2` background, `#BE123C` text, `1px solid #FECDD3` border (the same values shipped in `guardrail-protocol-banner.tsx`). 20px height, 4px radius, `label-sm` 11px semibold, padding `0 6px`.
- Eyebrow `Strict Prohibition`: `label-sm`, rose `#E11D48`.
- Prompt copy: `body-md` 13px, `#475569`. Optional caption: `label-md`, meta `#64748B`.
- Never emerald or amber here; this widget is the guardrail surface.

## Acceptance Criteria

- [x] Eyebrow is `Strict Prohibition`; prompt copy matches Stitch: `Specify exact details, buzzwords, or misleading claims that LocalDraft MUST NOT invent or hallucinate under any circumstance:`
- [x] Filled mock chip is `Do not claim guaranteed revenue improvements` with a `Ban` affordance and dismiss control.
- [x] Adding text via input/Enter calls `onAdd`; removing a chip calls `onRemove`; no campaign persistence.
- [x] Empty, filled, and disabled states render in isolation; chips use rose/prohibition tokens (`#FFF1F2` / `#BE123C` / `#FECDD3`), not success emerald.
- [x] Input placeholder is `Add a prohibited claim...` and the prompt/label is associated with the input.
- [x] Dismiss controls have accessible names (e.g. `Remove Do not claim guaranteed revenue improvements`); a label already present in `constraints` is not added twice.

## Further breakdown

- [x] Optional helper caption `Crucial safety & brand reputation boundary conditions` if passed as `caption`
- [x] Do not implement LLM prompt wiring in this story
- [x] Enter on an empty or whitespace-only input is a no-op
