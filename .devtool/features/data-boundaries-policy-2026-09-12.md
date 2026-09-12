---
id: "data-boundaries-policy-2026-09-12"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-12T14:54:00.000Z"
modified: "2026-09-12T14:54:00.000Z"
completedAt: null
labels: ["story", "epic:epic-compliance-and-risk-2026-09-12"]
order: "al"
---

# Data boundaries policy

Do not scrape/store payment data, patient/student records, or consumer PII beyond business contact path; no purchased consumer lists or social DMs.

Parent epic: [`epic-compliance-and-risk-2026-09-12`](epic-compliance-and-risk-2026-09-12.md)

## Acceptance Criteria

- [ ] Written data boundary policy exists
- [ ] Enrichment scope excludes sensitive classes
- [ ] Policy referenced by scrape and storage design

## Further breakdown

- [ ] Sensitive-path detectors (payment, portal login)
- [ ] Retention note for contact emails
- [ ] Training note for operators
