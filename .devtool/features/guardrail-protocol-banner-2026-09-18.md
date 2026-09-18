---
id: "guardrail-protocol-banner-2026-09-18"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-18T20:12:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "bL"
---

# Guardrail protocol banner

Presentational RULE_01 Human-in-the-Loop alert from the Stitch Campaign Setup screen.

Parent epic: [`epic-campaign-setup-2026-09-18`](epic-campaign-setup-2026-09-18.md)

Proposed file: `components/campaigns/guardrail-protocol-banner.tsx`. shadcn: Alert.

## Acceptance Criteria

- [ ] Eyebrow copy is `Strict Guardrail Protocol` with a `RULE_01` token/badge.
- [ ] Body copy matches Stitch: `Human-in-the-Loop: LocalDraft drafts emails based strictly on verified public websites. No automated emails are ever dispatched. Every single send requires physical operator sign-off.`
- [ ] Visual treatment uses Alert with Operator Core attention/guardrail tokens (rose/amber surface, not a generic info blue).
- [ ] Component renders in isolation with no dismiss-persist or settings wiring; optional `className` only.

## Further breakdown

- [ ] Confirm Alert title vs description mapping for eyebrow vs body
- [ ] Include RULE_01 as Badge or Alert title suffix
