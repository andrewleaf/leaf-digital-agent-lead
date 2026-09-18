---
id: "research-depth-settings-2026-09-18"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-18T20:12:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "bT"
---

# Research depth settings

Fact Engine settings: website-required gate, extraction options, and low-confidence fallback. Presentational controls only.

Parent epic: [`epic-campaign-setup-2026-09-18`](epic-campaign-setup-2026-09-18.md)

Proposed file: `components/campaigns/research-depth-settings.tsx`. shadcn: Switch, Checkbox, RadioGroup, Card.

## Acceptance Criteria

- [ ] Eyebrow is `Fact Engine`.
- [ ] Row `Require verified public website before draft generation` shows severity `Strict` when enabled; helper is `Discards directories, blank landing pages, or unregistered domains. Only analyzes active storefront sites.`
- [ ] Extraction row copy is `Extract booking capabilities, emergency hours, and founding year` with helper `Pulls specific proof points into the lead profile for genuine operator context (e.g. "Family owned since 1994", "24/7 Dispatch").`
- [ ] Fallback copy is `Fallback action for low-confidence crawl:` with selected option `Flag unverified websites for manual operator check`.
- [ ] Density caption is `High Verification Density Guardrails actively protect domain deliverability and response rates.`
- [ ] All values are props (`requireWebsite`, `extractProofPoints`, `fallbackAction`) with change callbacks; empty/off, filled/on, and disabled states render in isolation with no pipeline API.

## Further breakdown

- [ ] Use Switch for the website gate, Checkbox for extraction, RadioGroup or Select for fallback
- [ ] Do not implement crawl execution
