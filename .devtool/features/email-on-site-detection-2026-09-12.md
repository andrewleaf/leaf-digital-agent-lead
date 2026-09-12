---
id: "email-on-site-detection-2026-09-12"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-12T14:54:00.000Z"
modified: "2026-09-12T14:54:00.000Z"
completedAt: null
labels: ["story", "epic:epic-v1-product-scope-2026-09-12"]
order: "aK"
---

# Email-on-site detection

Extract visible mailto and contact-page addresses; flag listings with no email found.

Parent epic: [`epic-v1-product-scope-2026-09-12`](epic-v1-product-scope-2026-09-12.md)

## Acceptance Criteria

- [ ] Visible emails are extracted and stored on the listing/enrichment record
- [ ] Listings with no email are flagged as no-email
- [ ] Soft filter can hide or surface has-email rows

## Further breakdown

- [ ] mailto parser
- [ ] Contact page text email regex with false-positive filters
- [ ] No-email status mapping
- [ ] Dedupe multiple emails on one site
