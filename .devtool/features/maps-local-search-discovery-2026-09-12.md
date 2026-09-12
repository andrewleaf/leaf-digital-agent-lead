---
id: "maps-local-search-discovery-2026-09-12"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-12T14:54:00.000Z"
modified: "2026-09-12T14:54:00.000Z"
completedAt: null
labels: ["story", "epic:epic-v1-product-scope-2026-09-12"]
order: "aI"
---

# Maps local-search discovery fields

Discover listings via Maps/local search with name, address, phone, rating, review count, category, and website URL when listed.

Parent epic: [`epic-v1-product-scope-2026-09-12`](epic-v1-product-scope-2026-09-12.md)

## Acceptance Criteria

- [ ] Query returns matching listings for type + area
- [ ] Captured fields match proposal must-ship list
- [ ] Missing website/phone handled without crashing the campaign

## Further breakdown

- [ ] Provider adapter interface
- [ ] Persist listing fields
- [ ] Handle missing website/phone
- [ ] Rate-limit + cache layer
- [ ] Category query for one metro
