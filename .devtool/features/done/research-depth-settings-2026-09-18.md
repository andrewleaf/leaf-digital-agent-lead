---
id: "research-depth-settings-2026-09-18"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-19T16:20:00.000Z"
completedAt: "2026-09-19T16:20:00.000Z"
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "a0"
---

# Research depth settings

Fact Engine settings: website-required gate, extraction options, and low-confidence fallback. Presentational controls only.

Parent epic: [`epic-campaign-setup-2026-09-18`](../epic-campaign-setup-2026-09-18.md)

## File and primitives

- File: `components/campaigns/research-depth-settings.tsx`
- shadcn: `Switch`, `Checkbox`, `RadioGroup` / `RadioGroupItem`, `Card`, `Label`, `Badge`
- CLI-add `switch`, `checkbox`, and `radio-group` if missing. Do not hand-roll toggle/checkbox/radio primitives.
- Do not use shadcn `Field` (not in `components/ui/`). Compose `Label` + control.

## Stitch contract

Source: LocalDraft - Campaign Setup (`projects/13798460973041177032/screens/dffcadf839ef470db0d105a117c66826`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- Eyebrow: `Fact Engine`.
- Toggle/row: `Require verified public website before draft generation` with severity `Strict`. Helper: `Discards directories, blank landing pages, or unregistered domains. Only analyzes active storefront sites.`
- Extraction row: `Extract booking capabilities, emergency hours, and founding year`. Helper: `Pulls specific proof points into the lead profile for genuine operator context (e.g. "Family owned since 1994", "24/7 Dispatch").`
- Fallback: `Fallback action for low-confidence crawl:` with selected option `Flag unverified websites for manual operator check`.
- Density caption: `High Verification Density Guardrails actively protect domain deliverability and response rates.`

## Props

Typed mock-driven props. No crawl execution or pipeline API.

- `requireWebsite: boolean`
- `onRequireWebsiteChange: (value: boolean) => void`
- `extractProofPoints: boolean`
- `onExtractProofPointsChange: (value: boolean) => void`
- `fallbackAction: string | null`
- `onFallbackActionChange: (value: string) => void`
- `disabled?: boolean`
- `className?: string`

Export `FALLBACK_ACTIONS` with the Stitch option `flag-unverified` → `Flag unverified websites for manual operator check`.

## Visual tokens

- Card: white, `1px solid #E2E8F0`, 8px radius, padding 12–16px.
- Switch/checkbox checked: primary `#0F766E`.
- `Strict` badge: verified emerald `#ECFDF5` / `#047857` / `#A7F3D0`, 20px height, 4px radius, `label-sm`.
- Helpers and density caption: supporting/meta `#475569` / `#64748B`, `body-sm` 12px.
- Disabled text: `#94A3B8`.

## Acceptance Criteria

- [x] Eyebrow is `Fact Engine`.
- [x] Row `Require verified public website before draft generation` shows severity `Strict` when enabled; helper is `Discards directories, blank landing pages, or unregistered domains. Only analyzes active storefront sites.`
- [x] Extraction row copy is `Extract booking capabilities, emergency hours, and founding year` with helper `Pulls specific proof points into the lead profile for genuine operator context (e.g. "Family owned since 1994", "24/7 Dispatch").`
- [x] Fallback copy is `Fallback action for low-confidence crawl:` with selected option `Flag unverified websites for manual operator check`.
- [x] Density caption is `High Verification Density Guardrails actively protect domain deliverability and response rates.`
- [x] All values are props (`requireWebsite`, `extractProofPoints`, `fallbackAction`) with change callbacks; empty/off, filled/on, and disabled states render in isolation with no pipeline API.

## Further breakdown

- [x] Use Switch for the website gate, Checkbox for extraction, RadioGroup or Select for fallback
- [x] Do not implement crawl execution

## Completion notes

`pnpm dlx shadcn@latest add switch checkbox radio-group` created `components/ui/switch.tsx`, `checkbox.tsx`, and `radio-group.tsx` but emitted `import { cn } from "cn"` and installed an unrelated `cn` npm package. Imports were corrected to `@/lib/utils` and the stray dependency removed.
