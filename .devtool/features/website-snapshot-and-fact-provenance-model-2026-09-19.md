---
id: "website-snapshot-and-fact-provenance-model-2026-09-19"
status: "backlog"
priority: "critical"
assignee: null
dueDate: null
created: "2026-09-19T23:42:00.000Z"
modified: "2026-09-19T23:42:00.000Z"
completedAt: null
labels: ["story", "epic:epic-campaign-data-model-2026-09-19"]
order: "bQ"
---

# Website snapshot and fact provenance model

Model compliant public-page snapshots and facts whose source evidence can be traced from every draft citation.

Parent epic: [`epic-campaign-data-model-2026-09-19`](epic-campaign-data-model-2026-09-19.md)

## Acceptance Criteria

- [ ] Website snapshots record listing, canonical URL, page kind, HTTP result, robots decision, content hash, fetch time, expiry, and allowed public HTML or normalized text.
- [ ] Snapshot uniqueness and content hashes make retries idempotent while retaining evidence required by existing citations.
- [ ] Fact types cover business identity, services, CTA, contact path, observable site gap, About quote, and review theme without introducing employee/revenue extraction.
- [ ] Every fact records listing, snapshot or listing-provider evidence, source URL, exact source snippet, normalized content, confidence, extractor version, and extraction time.
- [ ] Review-theme facts require public review evidence and `reviewCount >= 10`; insufficient records store an abstention outcome rather than a fabricated summary.
- [ ] Owner/leader names are accepted only when explicitly present in retained allowed evidence; thin name-and-city records are marked for manual research.
- [ ] No snapshot or fact stores password-protected/paywalled content, payment data, patient/student records, or consumer PII beyond public business contact paths.
- [ ] Expiry and retention behavior distinguishes refreshable cache content from evidence referenced by an existing draft citation.

## Further breakdown

- [ ] Define page-kind, fetch-result, fact-type, confidence, and abstention contracts.
- [ ] Define snapshot/fact deduplication keys and provenance queries.
- [ ] Add policy fixtures for missing websites, robots denial, thin records, and review thresholds.
