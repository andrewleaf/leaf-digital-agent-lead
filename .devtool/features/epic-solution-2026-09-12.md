---
id: "epic-solution-2026-09-12"
status: "backlog"
priority: "high"
assignee: null
dueDate: null
created: "2026-09-12T14:54:00.000Z"
modified: "2026-09-12T17:25:00.000Z"
completedAt: null
labels: ["epic"]
order: "aA"
---

# Solution

## 1. Intent & Business Value
LocalDraft is intentionally engineered as a human-in-the-loop intelligence pipeline, not an autonomous robotic sales development representative (SDR). Fully automated outbound systems alienate local shop owners and risk severe domain reputation penalties. This epic establishes the architectural backbone and stage contracts of the six-part core loop that systematically transforms raw market searches into researched, human-approved email drafts.

## 2. Source Specifications

### The Six-Stage Core Loop
1. **Campaign Setup**: The operator inputs business niche/type, geographic boundaries, and the specific campaign offer brief (including call-to-action and negative constraints).
2. **Discovery**: The system queries Google Maps / licensed local search providers to return active matching businesses with geographic, contact, and category metadata.
3. **Website Attach**: For every discovered listing, the system extracts and validates canonical public website URLs, flagging records lacking websites.
4. **Enrichment**: A polite crawler scrapes public pages (`/`, `/about`, `/services`, `/contact`) to extract concrete, usable facts: service lists, booking/quote CTAs, review-count themes, site gaps, and visible contact emails.
5. **Draft Generation**: An AI drafting engine produces one phone-readable email per business that bridges 1–2 verified facts directly to the campaign offer without hallucinating unverified claims.
6. **Agent Queue**: Discovered businesses and generated drafts populate a unified queue where the human operator reviews, edits, manually dispatches via personal mailbox, and tracks reply/follow-up states.

## 3. Scope Boundaries
- **In Scope (v1)**: 6 sequential stages, deterministic data handoffs, idempotency on re-enrichment or re-drafting, agent manual dispatch gate.
- **Explicit Non-Goals (v2+)**:
  - Bypassing the human agent to trigger autonomous email sending.
  - Multi-step branching nurture trees or auto-drips.
  - Multi-tenant enterprise role-based access control.

## 4. Pipeline Stage Architecture

```mermaid
flowchart TD
    subgraph Stage1 [1. Campaign Setup]
        S1["User inputs Category, Geo, Offer, CTA, Constraints"]
    end

    subgraph Stage2 [2. Discovery Layer]
        S2["Query Maps/Places API -> Normalize Name, Addr, Phone, Rating"]
    end

    subgraph Stage3 [3. Website Attach]
        S3{"Public URL present?"}
        S3Yes["Store Canonical Website URL"]
        S3No["Flag: Has Website = False (Queue Soft Filter)"]
    end

    subgraph Stage4 [4. Public Enrichment]
        S4["Scrape Home, About, Services, Contact -> Extract Facts, Gaps & Mailto"]
    end

    subgraph Stage5 [5. Grounded Draft]
        S5["LLM synthesizes 5-beat draft citing verified facts with citation links"]
    end

    subgraph Stage6 [6. Agent Workspace]
        S6["Human reviews citation panel, edits copy, marks Ready/Sent, tracks Follow-up"]
    end

    S1 --> S2
    S2 --> S3
    S3 -->|Yes| S3Yes --> S4
    S3 -->|No| S3No --> S5
    S4 --> S5
    S5 --> S6
```

## 5. Stories

- [Specify core loop stages](specify-core-loop-stages-2026-09-12.md) (`specify-core-loop-stages-2026-09-12`): Architectural document and pipeline orchestrator wiring the six discrete stages.
- [Pipeline stage data contracts](pipeline-stage-data-contracts-2026-09-12.md) (`pipeline-stage-data-contracts-2026-09-12`): Strongly typed TypeScript interfaces (DTOs) and transition assertions between each pipeline stage.

## 6. Milestone Definition of Done
- [ ] End-to-end integration test runs all 6 pipeline stages from campaign creation through agent queue display.
- [ ] Pipeline data contracts strictly validate stage inputs and outputs, halting downstream steps on fatal fetch errors while logging warnings for soft errors (e.g. missing website).
- [ ] Re-running enrichment or drafting for an existing campaign business updates existing records idempotently without duplicating accounts.
- [ ] Pipeline strictly requires human action in Stage 6 before any email can transition to `Sent`.

## 7. Dependencies & Sequencing
- **Prerequisites**: [epic-purpose](epic-purpose-2026-09-12.md).
- **Unblocks**: [epic-v1-product-scope](epic-v1-product-scope-2026-09-12.md), [epic-data-and-enrichment](epic-data-and-enrichment-2026-09-12.md), [epic-agent-workspace](epic-agent-workspace-2026-09-12.md).
