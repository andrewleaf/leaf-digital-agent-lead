---
id: "crawler-constraints-2026-09-12"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-12T14:54:00.000Z"
modified: "2026-09-12T14:54:00.000Z"
completedAt: null
labels: ["story", "epic:epic-compliance-and-risk-2026-09-12"]
order: "ai"
---

# Crawler constraints

Public pages only, respect robots.txt, modest concurrency, identify the crawler, no login walls or paywalled content.

Parent epic: [`epic-compliance-and-risk-2026-09-12`](epic-compliance-and-risk-2026-09-12.md)

## Acceptance Criteria

- [ ] Crawler identifies itself
- [ ] robots.txt respected
- [ ] Concurrency and public-only rules documented and enforced in fetch layer design

## Further breakdown

- [ ] User-Agent string
- [ ] robots.txt parser integration
- [ ] Concurrency config
- [ ] Blocklist for login URLs
