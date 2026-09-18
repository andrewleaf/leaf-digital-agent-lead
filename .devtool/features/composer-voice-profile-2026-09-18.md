---
id: "composer-voice-profile-2026-09-18"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-18T20:12:00.000Z"
modified: "2026-09-18T20:12:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaign-setup-2026-09-18"]
order: "bR"
---

# Composer voice profile

Single-select voice chips matching the Stitch Composer Voice Profile row.

Parent epic: [`epic-campaign-setup-2026-09-18`](epic-campaign-setup-2026-09-18.md)

Proposed file: `components/campaigns/composer-voice-profile.tsx`. shadcn: ToggleGroup (preferred) or Badge buttons.

## Acceptance Criteria

- [ ] Label is `Composer Voice Profile`.
- [ ] Options in order: `Helpful & Direct`, `Peer-to-Peer Collegial`, `Concise Technical`, `Audit-led Gentle Inquiry`, `Conversational`.
- [ ] Single selection only; Stitch filled mock has `Helpful & Direct` selected and visually marked `Selected`.
- [ ] `value` / `onValueChange` props only; empty (none selected), filled, and disabled group states render in isolation.
- [ ] Selected chip uses teal primary/container tokens; unselected chips use secondary outline style.

## Further breakdown

- [ ] Prefer ToggleGroup type="single" over ad-hoc button row
- [ ] Do not persist voice on a campaign entity
