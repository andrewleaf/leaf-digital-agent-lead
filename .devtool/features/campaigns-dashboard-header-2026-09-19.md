---
id: "campaigns-dashboard-header-2026-09-19"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T21:00:00.000Z"
modified: "2026-09-19T21:00:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaigns-admin-dashboard-2026-09-19"]
order: "a7"
---

# Campaigns dashboard header

Title cluster for the admin dashboard: telemetry eyebrow, description, manual-gate chip, and exclusive metro filter. Presentational only.

Parent epic: [`epic-campaigns-admin-dashboard-2026-09-19`](epic-campaigns-admin-dashboard-2026-09-19.md)

## File and primitives

- File: `components/campaigns/campaigns-dashboard-header.tsx`
- shadcn: `Badge`, `ToggleGroup` / `ToggleGroupItem` (already in `components/ui/`)
- lucide: `Shield` for Stitch `shield`. Do not use the Material icon font.
- Do not add a second `New Campaign` button. That control already lives on [`workspace-top-bar-2026-09-18`](done/workspace-top-bar-2026-09-18.md).
- Do not reuse [`page-header`](done/workspace-page-header-2026-09-18.md); this cluster has metro chips and a guard chip, not a spec strip.

## Stitch contract

Source: LocalDraft - Campaigns Admin Dashboard (`projects/13798460973041177032/screens/e569b1bad7964515ae9b8da0edd42ce4`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- Title: `Campaigns Admin Dashboard` (`h1`).
- Eyebrow: `Operator Core Live Telemetry`.
- Description: `Global administrative view of active multi-metro pipelines, operator triage throughput, citation audit health, and strictly non-automated dispatch metrics.`
- Guard chip: `100% Manual Gate Enforced • 6 Active Pipelines • 0 Blast Automations Permitted`.
- Metro options, in order: `All Metros`, `Central TX`, `North Dallas`, `Chicagoland`.

Copy above is the filled mock. Title, description, guard label, and metro labels are props.

## Props

Typed mock-driven props. No campaign fetch or route.

- `title: string`
- `eyebrow: string`
- `description: string`
- `guardLabel: string`
- `metros: { id: string; label: string }[]`
- `selectedMetroId: string`
- `onMetroChange: (id: string) => void`
- `disabled?: boolean`
- `className?: string`

Filled mock: the Stitch strings above; `selectedMetroId` is `all` with labels matching `All Metros`, `Central TX`, `North Dallas`, `Chicagoland`.

## Visual tokens

- Title: `headline-xl` 28px / 600, `#0F172A`.
- Eyebrow: `label-sm` 11px uppercase tracked, `#0F766E`.
- Description: `body-lg` 15px / 400, `#475569`, width-capped so it does not run the full grid.
- Guard chip: 20px height, 4px radius, `label-sm`, emerald tint `#ECFDF5` / `#047857` / `1px solid #A7F3D0` (or muted `#F1F5F9` / `#475569` if the HTML uses a neutral chip). Shield icon 15px.
- Metro `ToggleGroup`: compact 32px, 6px radius. Unselected: white / `#E2E8F0` / `#475569`. Selected: `#F0FDFA` with 2px inset `#0F766E`, or filled `#0F766E` / white. `label-sm`.
- Header sits on the canvas; no extra card chrome unless the HTML wraps this cluster in a surface.

## Acceptance Criteria

- [ ] Filled mock renders `Campaigns Admin Dashboard`, `Operator Core Live Telemetry`, the Stitch description, and `100% Manual Gate Enforced • 6 Active Pipelines • 0 Blast Automations Permitted`.
- [ ] Title is a single `h1`. Guard chip is not color-only (visible text remains).
- [ ] Four metros render in order: `All Metros`, `Central TX`, `North Dallas`, `Chicagoland`. Selection calls `onMetroChange(id)` only.
- [ ] `disabled` prevents metro changes. Empty `metros` hides the ToggleGroup rather than inventing cities.
- [ ] No `New Campaign` control. Isolation: no route, no campaign fetch.
- [ ] ToggleGroup uses the registry primitive; do not hand-roll a filter chip row with raw buttons.

## Further breakdown

- [ ] Associate the ToggleGroup with an accessible name such as `Filter by metro`
- [ ] Guard label comes from `guardLabel`; do not hard-code `6 Active Pipelines`
