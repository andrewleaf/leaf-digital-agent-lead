---
id: "campaign-setup-status-bar-2026-09-18"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-18T20:12:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "bK"
---

# Campaign setup status bar

Presentational top strip for Campaign Setup: campaign selector, Lead Engine status, and autosaved timestamp. Isolated widget only — no persistence.

Parent epic: [`epic-campaign-setup-2026-09-18`](epic-campaign-setup-2026-09-18.md)

Proposed file: `components/campaigns/campaign-setup-status-bar.tsx`. shadcn: Select, Badge.

## Acceptance Criteria

- [ ] Component accepts mock props for `campaigns` (id + label), `selectedCampaignId`, `engineStatus` (`Active` | `Idle`), and `autosavedAt` (display string such as `14:02 UTC`).
- [ ] Select label reads `Target Campaign`; filled mock shows `HVAC - Central Texas`.
- [ ] Badge copy is `Lead Engine: Active` when `engineStatus` is Active; Idle uses a muted/inactive badge variant.
- [ ] Autosave meta renders `AUTOSAVED` plus the provided timestamp; empty `autosavedAt` hides the timestamp or shows a placeholder without inventing a clock.
- [ ] Empty (no campaigns), filled, and disabled select states render in isolation without a page route or save handler.

## Further breakdown

- [ ] Map Select trigger density to Operator Core 32px compact control
- [ ] Storybook-style mock fixtures matching Stitch copy
