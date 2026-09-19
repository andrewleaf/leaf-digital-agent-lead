---
id: "form-section-shell-2026-09-18"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T00:55:00.000Z"
modified: "2026-09-19T01:30:00.000Z"
completedAt: "2026-09-19T01:30:00.000Z"
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "a7"
---

# Form section shell

Numbered panel wrapper used four times down the Campaign Setup form column: step circle, section heading, optional caption, right-aligned eyebrow or badge, and a content port for the campaign widgets.

Parent epic: [`epic-campaign-setup-2026-09-18`](../epic-campaign-setup-2026-09-18.md)

## File and primitives

- File: `components/layout/form-section.tsx`
- shadcn: `Card` (`CardHeader`, `CardTitle`, `CardContent`), `Badge`, `Separator`
- The shell owns no field markup. Every input, chip, and toggle arrives through `children` from the existing `components/campaigns/*` widgets.

## Stitch contract

Source: LocalDraft - Campaign Setup (`projects/13798460973041177032/screens/dffcadf839ef470db0d105a117c66826`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

The four sections on the screen, with the exact header strings this shell must reproduce:

| # | Title | Caption | Right side | Tone |
|---|---|---|---|---|
| 1 | `Target Business & Location` | — | `Search Perimeter` | default |
| 2 | `Proposition & Review Intent` | — | `Editorial Tone` | default |
| 3 | `Negative Constraints & Guardrails` | `Crucial safety & brand reputation boundary conditions` | `Strict Prohibition` | guardrail |
| 4 | `Research Depth & Verification Settings` | — | `Fact Engine` | default |

Step circle is a 24px round token holding the section number. Sections 1, 2, and 4 render the right side as a muted uppercase eyebrow; section 3 renders it as a rose prohibition badge and tints the step circle.

## Props

Typed mock-driven props. No form state, validation, or submission.

- `index: number`
- `title: string`
- `caption?: string`
- `eyebrow?: string`
- `tone?: "default" | "guardrail"` (defaults to `"default"`)
- `children: React.ReactNode`
- `className?: string`

When `tone` is `"guardrail"`, `eyebrow` renders as a `Badge` rather than plain eyebrow text.

## Visual tokens

- Panel: `#FFFFFF`, `1px solid #E2E8F0`, 8px radius, 16px padding, 16px vertical rhythm between children.
- Title: headline-md 18px / 600, `#0F172A`. Caption: body-sm 12px, `#64748B`.
- Step circle (default): 24px, `#F1F5F9` fill, mono 12px bold, text `#0F766E`.
- Step circle (guardrail): `#FFF1F2` fill, text `#BE123C`.
- Eyebrow: label-sm 11px semibold, uppercase, tracked, `#64748B`.
- Guardrail badge: `#FFF1F2` fill, text `#BE123C`, `1px solid #FECDD3`, 20px height, 4px radius.

## Acceptance Criteria

- [x] Header row shows the numbered circle, `title` as an `h2`, and the eyebrow right-aligned on the same row.
- [x] `caption` renders directly beneath the title and is omitted when not provided.
- [x] `tone="guardrail"` switches the step circle to the rose tint and renders `eyebrow` as a rose badge; `tone="default"` renders muted eyebrow text.
- [x] `children` render in the content region with the Operator Core panel padding and vertical rhythm.
- [x] All four Stitch sections can be reproduced from props alone, with no section-specific branching inside the component.
- [x] Heading level is `h2` so the page outline stays `h1` (page header) then `h2` (sections).
- [x] Renders in isolation with default, caption, guardrail, and empty-children variants.

The header uses `CardTitle` plus `CardAction` so the eyebrow lands in the `Card` grid's second column instead of fighting `CardHeader`'s display utility.

## Further breakdown

- [x] Confirm whether the bottom actions panel reuses this shell or stays a plain `Card` (it stays a plain `Card`; Stitch shows no number or heading there)
- [x] Keep the step number decorative for screen readers if the heading already conveys order
