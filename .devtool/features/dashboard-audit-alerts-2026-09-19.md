---
id: "dashboard-audit-alerts-2026-09-19"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T21:00:00.000Z"
modified: "2026-09-19T21:00:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaigns-admin-dashboard-2026-09-19"]
order: "aC"
---

# Dashboard audit alerts

Stage bottleneck alerts for missing storefront domains and guardrail intercepts. Presentational only.

Parent epic: [`epic-campaigns-admin-dashboard-2026-09-19`](epic-campaigns-admin-dashboard-2026-09-19.md)

## File and primitives

- File: `components/campaigns/dashboard-audit-alerts.tsx`
- shadcn: `Alert` / `AlertTitle` / `AlertDescription` (already in `components/ui/`), `Badge`
- lucide: `TriangleAlert` for the missing-domain attention row, `ShieldAlert` for Stitch `shield` on the intercept row. Do not use the Material icon font.
- Do not reuse [`guardrail-protocol-banner`](done/guardrail-protocol-banner-2026-09-18.md). Copy and severity pairing differ (two stacked alerts, not RULE_01).

## Stitch contract

Source: LocalDraft - Campaigns Admin Dashboard (`projects/13798460973041177032/screens/e569b1bad7964515ae9b8da0edd42ce4`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- Heading: `Stage Bottlenecks & Audit Alerts`.
- Attention: `14 Missing Storefront Domains: Targets in Denver & Phoenix require operator manual URL resolution before citation scrape.`
- Guardrail: `3 Guardrail Intercepts: Unverifiable revenue claim detected in drafted snippet; held back for citation re-verification.`

The count prefixes (`14`, `3`) are part of the Stitch sentence. Split into `count` + `title` + `body` in props if that keeps the title bold, but visible copy must match.

## Props

Typed mock-driven props. No alert fetch or URL-resolution flow.

- `heading?: string`
- `alerts: { id: string; tone: "attention" | "guardrail"; title: string; body: string }[]`
- `className?: string`

Filled mock:

1. `tone: "attention"` — title `14 Missing Storefront Domains` — body `Targets in Denver & Phoenix require operator manual URL resolution before citation scrape.`
2. `tone: "guardrail"` — title `3 Guardrail Intercepts` — body `Unverifiable revenue claim detected in drafted snippet; held back for citation re-verification.`

Empty mock: `alerts: []` still shows the heading and no invented incidents.

## Visual tokens

- Heading: `headline-sm` 15px / 600, `#0F172A`.
- Attention alert: amber tint `#FFFBEB`, text `#B45309` / `#D97706`, border `#FDE68A`.
- Guardrail alert: rose tint `#FFF1F2`, text `#BE123C` / `#E11D48`, border `#FECDD3`.
- Title: `label-md` or `headline-sm`. Body: `body-sm` 12px.
- Radius 8px (alert/card), padding 12px, stack gap 8px.
- Counts in the title remain visible text, not color-only dots.

## Acceptance Criteria

- [ ] Heading is `Stage Bottlenecks & Audit Alerts`.
- [ ] Filled mock shows both Stitch sentences (missing domains and guardrail intercepts) with amber vs rose treatment.
- [ ] Empty `alerts` renders the heading and no placeholder incidents.
- [ ] Isolation: no URL capture, no intercept API. Does not import `GuardrailProtocolBanner`.
- [ ] Each alert has a text title; icons are supplementary. `Alert` is the registry primitive.

## Further breakdown

- [ ] Keep `14` and `3` in the title strings so implementers do not drop the counts into an icon-only badge
- [ ] Do not add a third invented bottleneck
