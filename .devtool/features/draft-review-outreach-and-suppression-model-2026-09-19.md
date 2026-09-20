---
id: "draft-review-outreach-and-suppression-model-2026-09-19"
status: "todo"
priority: "critical"
assignee: null
epic: null
dueDate: null
created: "2026-09-19T23:42:00.000Z"
modified: "2026-09-19T23:54:40.254Z"
completedAt: null
labels: ["story", "epic:epic-campaign-data-model-2026-09-19"]
order: "a1"
---
# Draft review outreach and suppression model

Model evidence-backed draft versions, human review, public business contacts, outreach outcomes, and suppression checks.

Parent epic: [`epic-campaign-data-model-2026-09-19`](epic-campaign-data-model-2026-09-19.md)

## Acceptance Criteria

- [ ] Drafts are versioned per campaign listing and store subject, body, confidence, generator version, generation time, editor, and review timestamps without overwriting prior reviewed content.
- [ ] Draft citations use relational links to facts and preserve the exact cited fact version/evidence needed for audit.
- [ ] Contact points belong to the listing, include type/value/source/verification metadata, and distinguish public email, public phone, and contact-form URL.
- [ ] Queue records reference a preferred contact point and hold operator workflow fields; discovered email is not duplicated as queue-owned source truth.
- [ ] `needsManualResearch`, low-confidence reason, no-email outcome, next-touch date, follow-up note, and disqualification reason have explicit nullability and ownership.
- [ ] Outreach events are append-only for sent, bounced, replied, meeting-booked, follow-up, and disqualified outcomes; queue projections can be rebuilt from retained events.
- [ ] Suppression entries support global or campaign scope and normalized email, domain, or business-identity matching with source, reason, and audit timestamps.
- [ ] Ready/send transitions require human approval and suppression re-check; no model field enables automated blasting.

## Further breakdown

- [ ] Define draft version and citation relations.
- [ ] Define contact ownership and preferred-contact selection.
- [ ] Define suppression normalization, precedence, and audit queries.