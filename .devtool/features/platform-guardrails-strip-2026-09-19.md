---
id: "platform-guardrails-strip-2026-09-19"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T21:00:00.000Z"
modified: "2026-09-19T21:00:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaigns-admin-dashboard-2026-09-19"]
order: "aD"
---

# Platform guardrails strip

Manual-dispatch proof strip: cliché intercepts, unverified-claim blocks, SMTP daemon count, and zero-blast footer. Presentational only.

Parent epic: [`epic-campaigns-admin-dashboard-2026-09-19`](epic-campaigns-admin-dashboard-2026-09-19.md)

## File and primitives

- File: `components/campaigns/platform-guardrails-strip.tsx`
- shadcn: `Card` (`CardHeader`, `CardTitle`, `CardContent`, `CardFooter`), `Badge`
- lucide: `ShieldCheck` for Stitch `verified_user`. Do not use the Material icon font.

## Stitch contract

Source: LocalDraft - Campaigns Admin Dashboard (`projects/13798460973041177032/screens/e569b1bad7964515ae9b8da0edd42ce4`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- Header: `Platform Guardrails`.
- Chip: `100% Manual`.
- Stat 1: `Forbidden Clichés Auto-Stripped` — value `23 intercepted`.
- Stat 2: `Unverified Claims Blocked` — value `4 blocked`.
- Stat 3: `Background SMTP Daemons` — value `0 (Permanently Disabled)`.
- Footer: `Zero automated blasts. Every message is individually dispatched via operator native mail clients.`

## Props

Typed mock-driven props. No SMTP probe or intercept log API.

- `title?: string`
- `manualLabel: string`
- `stats: { id: string; label: string; value: string }[]`
- `footer: string`
- `className?: string`

Filled mock: the three Stitch stats and footer above, `manualLabel: "100% Manual"`.

Export `PLATFORM_GUARDRAILS_MOCK` for the page scaffold.

## Visual tokens

- Card: white, `1px solid #E2E8F0`, 8px radius, padding 12–16px.
- Title: `headline-sm` 15px / 600. Manual chip: 20px, 4px, emerald `#ECFDF5` / `#047857` / `1px solid #A7F3D0`.
- Stat label: `label-sm` uppercase tracked `#64748B`. Value: `body-md` / `headline-sm` `#0F172A`.
- SMTP `0 (Permanently Disabled)`: emerald `#047857` (proof of absence), never a rose error that implies a live daemon.
- Intercept counts `23` / `4`: may use rose `#E11D48` for the number if the HTML treats them as blocks; labels stay readable `#0F172A` / `#475569`.
- Footer: `body-sm` `#475569` with leading `ShieldCheck` 15px `#047857`.
- Three stats in one row on wide cards, stacked on narrow.

## Acceptance Criteria

- [ ] Header shows `Platform Guardrails` and chip `100% Manual`.
- [ ] Filled mock renders the three Stitch stat labels and values, including `0 (Permanently Disabled)`.
- [ ] Footer matches `Zero automated blasts. Every message is individually dispatched via operator native mail clients.`
- [ ] Isolation: no SMTP client, no intercept writer. Strings come from props.
- [ ] Manual chip and footer are not color-only. SMTP zero is not styled as an active error.

## Further breakdown

- [ ] Do not add a Start SMTP or Enable blast control
- [ ] Empty `stats` still shows title, chip, and footer
