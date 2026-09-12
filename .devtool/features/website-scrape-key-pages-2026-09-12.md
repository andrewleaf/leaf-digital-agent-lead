---
id: "website-scrape-key-pages-2026-09-12"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-12T14:54:00.000Z"
modified: "2026-09-12T14:54:00.000Z"
completedAt: null
labels: ["story", "epic:epic-v1-product-scope-2026-09-12"]
order: "aJ"
---

# Website scrape key pages

Scrape public home plus a small set of key pages (about, services, contact).

Parent epic: [`epic-v1-product-scope-2026-09-12`](epic-v1-product-scope-2026-09-12.md)

## Acceptance Criteria

- [ ] Fetcher retrieves home and candidate key pages when present
- [ ] Only public pages are fetched
- [ ] Failures are recorded without inventing page content

## Further breakdown

- [ ] URL discovery heuristics for about/services/contact
- [ ] HTML fetch + timeout handling
- [ ] robots.txt check hook
- [ ] Cache fetched pages per campaign
