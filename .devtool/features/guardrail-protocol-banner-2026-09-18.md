---
id: "guardrail-protocol-banner-2026-09-18"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-18T22:30:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "a2"
---

# Guardrail protocol banner

Presentational RULE_01 Human-in-the-Loop alert from the Stitch Campaign Setup screen.

Parent epic: [`epic-campaign-setup-2026-09-18`](epic-campaign-setup-2026-09-18.md)

## File and primitives

- File: `components/campaigns/guardrail-protocol-banner.tsx`
- shadcn: `Alert` (CLI-add if missing), `Badge` for `RULE_01`
- Icon: lucide `ShieldAlert` (or equivalent). Do not use a Material icon font.
- Map `AlertTitle` to the eyebrow; `AlertDescription` to the body. Do not invent a dismiss control.

## Stitch contract

Source: LocalDraft - Campaign Setup (`projects/13798460973041177032/screens/dffcadf839ef470db0d105a117c66826`). Tokens: Operator Core **designMd** / `styleGuidelines` prose, not Stitch Material `namedColors` or the YAML `colors:` dump in `designMd`.

- Eyebrow: `Strict Guardrail Protocol`.
- Token: `RULE_01`.
- Body: `Human-in-the-Loop: LocalDraft drafts emails based strictly on verified public websites. No automated emails are ever dispatched. Every single send requires physical operator sign-off.`

## Props

Typed mock-driven props. No dismiss-persist or settings wiring.

- `className?: string`

Copy is static Stitch protocol text, not props.

## Visual tokens

- Surface: High Friction / Unverified (rose `#FFF1F2` / `#BE123C` / `#FECDD3`). Not info-blue and not amber attention (`#FFFBEB`).
- `RULE_01` badge: `label-sm` 11px semibold, 20px height, 4px radius; JetBrains Mono allowed for the token only.
- Card/alert radius 8px; prefer 1px rose border over drop shadow.

## Acceptance Criteria

- [ ] Eyebrow copy is `Strict Guardrail Protocol` with a `RULE_01` token rendered as `Badge`.
- [ ] Body copy matches Stitch: `Human-in-the-Loop: LocalDraft drafts emails based strictly on verified public websites. No automated emails are ever dispatched. Every single send requires physical operator sign-off.`
- [ ] Visual treatment uses shadcn `Alert` with Operator Core guardrail rose tokens, not generic info blue and not amber missing-data tokens.
- [ ] Component renders in isolation with optional `className` only; no dismiss-persist, settings, or page route.
- [ ] `Alert` is CLI-added to `components/ui/` if missing; do not hand-write a parallel alert primitive.

## Further breakdown

- [ ] Confirm Alert title vs description mapping for eyebrow vs body
- [ ] Include RULE_01 as Badge, not only as title suffix
