---
id: "website-fact-extraction-schema-2026-09-12"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-12T14:54:00.000Z"
modified: "2026-09-12T14:54:00.000Z"
completedAt: null
labels: ["story", "epic:epic-data-and-enrichment-2026-09-12"]
order: "aT"
---

# Website fact extraction schema

Extract visible name/tagline, services, CTAs, contact emails/forms, obvious gaps, and one About quote if present.

Parent epic: [`epic-data-and-enrichment-2026-09-12`](epic-data-and-enrichment-2026-09-12.md)

## Acceptance Criteria

- [ ] Fact schema covers services, CTAs, gaps, About quote, contact paths
- [ ] Each fact stores source URL/snippet reference
- [ ] Gaps include signals like no booking, no HTTPS, broken contact when detectable

## Further breakdown

- [ ] Fact type enum
- [ ] Extractor pipeline per page type
- [ ] Snippet storage for citations
- [ ] Gap detectors as separate rules
