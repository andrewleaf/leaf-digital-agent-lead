---
id: "listing-identity-and-discovery-cache-model-2026-09-19"
status: "backlog"
priority: "high"
assignee: null
dueDate: null
created: "2026-09-19T23:42:00.000Z"
modified: "2026-09-19T23:42:00.000Z"
completedAt: null
labels: ["story", "epic:epic-campaign-data-model-2026-09-19"]
order: "bP"
---

# Listing identity and discovery cache model

Define campaign-scoped listing identity, normalized provider data, and reusable discovery cache records.

Parent epic: [`epic-campaign-data-model-2026-09-19`](epic-campaign-data-model-2026-09-19.md)

## Acceptance Criteria

- [ ] Listing storage includes provider and provider listing ID, legal/trade name, full and normalized address parts, public phone, canonical website URL, primary/secondary categories, rating, review count, public hours, and discovery timestamps.
- [ ] Missing optional provider values are null and never populated from inference.
- [ ] Campaign plus provider plus provider listing ID is idempotent; a documented fallback fingerprint handles providers without stable IDs and records possible-match ambiguity rather than merging silently.
- [ ] Provider listing identity is separated from campaign association enough to support cache reuse without leaking campaign-specific queue state.
- [ ] Discovery cache keys include provider, normalized query fingerprint, locale/region inputs, and provider-contract version; raw payload, fetch time, expiry, and response metadata are retained.
- [ ] The default cache TTL is 30 days, with explicit stale-read and refresh behavior and an index supporting expiry scans.
- [ ] Re-running discovery updates the existing campaign listing and source observation without duplicating queue records.
- [ ] Address/phone normalization preserves original public source values for audit and does not collect consumer-only contact data.

## Further breakdown

- [ ] Define listing identity and campaign-listing relation.
- [ ] Define structured public-hours serialization and validation.
- [ ] Add duplicate, refresh, provider-change, and ambiguous-fingerprint fixtures.
