---
id: "campaign-actions-and-read-model-contracts-2026-09-19"
status: "done"
priority: "high"
assignee: null
epic: null
dueDate: "2026-09-20"
created: "2026-09-19T23:42:00.000Z"
modified: "2026-09-20T15:10:00.000Z"
completedAt: "2026-09-20T15:25:00.000Z"
labels: ["story", "epic:epic-campaign-data-model-2026-09-19"]
order: "a2"
---
# Campaign actions and read model contracts

Define command and query contracts that connect the campaign model to setup, pipeline, workbench, and dashboard surfaces.

Parent epic: `epic-campaign-data-model-2026-09-19`

## Acceptance Criteria

- \[x\] The approved contract allows syntactically valid partial Save Draft data and models a receipt with stable campaign identity/version/timestamps and a null pipeline run.
- \[x\] The approved Initialize Campaign contract requires the complete aggregate, expected version, and idempotency key, and models one pending pipeline run on success.
- \[x\] Action errors use field paths and bounded domain codes for validation, stale version, duplicate initialization, invalid transition, and persistence failure.
- \[x\] Setup read-model mappers derive autosave time, completeness, prohibition count, local-boundary readiness, website-gate readiness, and initialization availability from source fields.
- \[x\] Discovery-preview mappers derive estimated yield, confidence, detail caption, and staleness metadata without treating those presentation values as Campaign write fields.
- \[x\] Pipeline/workbench mappers preserve canonical run, listing, and queue keys while producing documented presentation DTOs.
- \[x\] Dashboard mappers derive campaign portfolio status, funnel counts, velocity metrics, and audit alerts with definitions tested against source rows.
- \[x\] Contract validation rejects UI prose labels, colors, tones, percentages, counters, and forbidden firmographics as authoritative write fields.
- \[x\] Filled, empty, stale, paused, and failed fixtures pass focused schema and mapper tests.

## Further breakdown

- \[x\] Specify JSON command/result envelopes and idempotency fields.
- \[x\] Define JSON query DTOs for Campaign Setup, Pipeline, and Admin Dashboard.
- \[x\] Add contract fixtures matching current filled, empty, stale, paused, and failed UI states.
- \[x\] Implement approved contracts as Zod schemas and inferred TypeScript types.
- \[x\] Implement pure read-model mappers and focused contract tests.

## Implementation

Contract-only build under [`lib/contracts/`](../../lib/contracts/): `shared.ts` (status families and stage ordinals), `campaign-commands.ts` (Save Draft / Initialize inputs, receipts, bounded `ActionError` envelope, `validationFailure`), `campaign-sources.ts` (persisted shapes the query side reads), `read-models/{setup,discovery,pipeline,dashboard,stages}.ts` (pure mappers), and `fixtures.ts` (filled, empty, stale, paused, failed). Colocated tests cover both schemas and mappers.

Derivation rules settled while building:

| Derived value | Rule |
|---|---|
| `autosavedLabel` | Relative to now: just now under a minute, then minutes, hours, days. `null` autosave renders "Not autosaved yet". |
| `completeness.percent` | Quarters of the four required fields (niches, geographies, offer, CTA). |
| `localBoundary` / `websiteGate` | Geography count and `requireWebsite` only; both emit a canonical ready flag beside the label. |
| `initialization.available` | Complete required fields **and** `lifecycle === "draft"`; every blocker is listed in `reasons`. |
| Discovery `confidence` | Provider coverage of the requested geographies: ≥0.9 high, ≥0.6 medium, >0 low; stale or unobserved never exceeds low/unknown. |
| Discovery `detailCaption` | Locality portion of each requested geography label, never an invented region name. |
| Stage `progress` / `metricValue` | `processedCount / totalCount`; null when the source reports no totals. |
| Workbench `needsAttention` | Attention queue status, thin record, suppression match, or low draft confidence. |
| Velocity `unit` | `per-hour` when the source window has duration, otherwise raw `count`. |
| Audit `severity` | Fixed per finding code; zero-count findings are dropped so an alert always has an observed count. |

Strict object schemas are what reject prose labels, tones, colours, percentages, counters, and firmographics as write fields. Persistence, transactional writes, and route wiring remain with the aggregate and persistence stories.

## Review checkpoint

This card remains in **Todo** until the JSON model below is approved. No application code, database schema, migration, route wiring, or server action is authorized by this checkpoint.

After approval, this card may move to **Doing** for a contract-only build:

- Zod 4 schemas and inferred JSON-safe TypeScript types;
- pure setup, discovery, pipeline/workbench, and dashboard read-model mappers;
- filled, empty, stale, paused, and failed fixtures and tests.

SQLite/Drizzle persistence, transactional writes, and route wiring remain owned by the aggregate and persistence prerequisite stories. The atomicity and idempotency statements in this card are behavioral requirements for that later persistence-backed implementation, not claims that this contract-only story has implemented them.

## Field ownership

| Owner | Fields |
|---|---|
| Persisted campaign source of truth | `name`, `niches`, `geographies`, `offerSummary`, `callToAction`, `voiceProfile`, `proofs`, `constraints`, `discoverySettings`, `researchSettings` |
| Command metadata | `campaignId`, `expectedVersion`, `idempotencyKey`, `requestId` |
| Persisted execution/source data consumed by queries | Campaign lifecycle/version/timestamps; pipeline run and stage status; listing, queue, fact, draft, outreach, and suppression rows |
| Derived read-model output only | Autosave labels, completeness percentages, readiness flags, discovery estimates/captions/staleness, stage labels/tones/progress, counters, funnel values, velocity metrics, and audit-alert copy |
| Forbidden as write authority | UI prose status labels, colors, tones, percentages, counters, employee count, revenue, invented owner identity, and unsupported claims |

Campaign lifecycle, stage execution status, and listing queue status are separate enum families. A mapper may emit a presentation label alongside a canonical key, but a command may never send that label back as authority.

## JSON Schema Draft 2020-12

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://localdraft.dev/schemas/campaign-actions-and-read-models.v1.json",
  "title": "LocalDraft campaign actions and read models v1",
  "anyOf": [
    { "$ref": "#/$defs/SaveCampaignDraftInput" },
    { "$ref": "#/$defs/InitializeCampaignInput" },
    { "$ref": "#/$defs/SaveCampaignDraftResult" },
    { "$ref": "#/$defs/InitializeCampaignResult" },
    { "$ref": "#/$defs/SetupReadModel" },
    { "$ref": "#/$defs/DiscoveryPreviewReadModel" },
    { "$ref": "#/$defs/PipelineReadModel" },
    { "$ref": "#/$defs/DashboardReadModel" }
  ],
  "$defs": {
    "Uuid": {
      "type": "string",
      "format": "uuid"
    },
    "UtcDateTime": {
      "type": "string",
      "format": "date-time"
    },
    "CampaignLifecycle": {
      "type": "string",
      "enum": ["draft", "active", "paused", "archived"]
    },
    "PipelineStageKey": {
      "type": "string",
      "enum": [
        "discovery",
        "website-matching",
        "public-scrape",
        "fact-extraction",
        "draft-generation",
        "human-review"
      ]
    },
    "StageExecutionStatus": {
      "type": "string",
      "enum": ["pending", "running", "succeeded", "failed", "skipped"]
    },
    "QueueStatus": {
      "type": "string",
      "enum": [
        "new",
        "enriched",
        "drafted",
        "needs-edit",
        "no-email",
        "skipped",
        "ready",
        "sent",
        "replied",
        "follow-up-due"
      ]
    },
    "Confidence": {
      "type": "string",
      "enum": ["high", "medium", "low", "unknown"]
    },
    "VoiceProfile": {
      "type": "string",
      "enum": [
        "helpful-direct",
        "peer-collegial",
        "concise-technical",
        "audit-led",
        "conversational"
      ]
    },
    "FallbackAction": {
      "type": "string",
      "const": "flag-unverified"
    },
    "OrderedLabel": {
      "type": "object",
      "additionalProperties": false,
      "required": ["label", "order"],
      "properties": {
        "id": { "$ref": "#/$defs/Uuid" },
        "label": { "type": "string", "minLength": 1, "maxLength": 160 },
        "normalizedValue": {
          "type": "string",
          "minLength": 1,
          "maxLength": 160,
          "description": "Server-derived comparison key; ignored when supplied by an untrusted client."
        },
        "order": { "type": "integer", "minimum": 0 }
      }
    },
    "CampaignProofInput": {
      "type": "object",
      "additionalProperties": false,
      "required": ["text", "order"],
      "properties": {
        "id": { "$ref": "#/$defs/Uuid" },
        "text": { "type": "string", "minLength": 1, "maxLength": 500 },
        "order": { "type": "integer", "minimum": 0 },
        "authorship": { "type": "string", "const": "operator" }
      }
    },
    "DiscoverySettings": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "requireWebsite": { "type": "boolean" },
        "requireEmail": { "type": "boolean" },
        "minimumRating": {
          "type": ["number", "null"],
          "minimum": 0,
          "maximum": 5
        },
        "minimumReviewCount": {
          "type": ["integer", "null"],
          "minimum": 0
        }
      }
    },
    "ResearchSettings": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "extractProofPoints": { "type": "boolean" },
        "fallbackAction": { "$ref": "#/$defs/FallbackAction" }
      }
    },
    "CampaignDraftData": {
      "type": "object",
      "additionalProperties": false,
      "description": "All properties are optional so a syntactically valid incomplete draft can be saved.",
      "properties": {
        "name": { "type": "string", "maxLength": 160 },
        "niches": {
          "type": "array",
          "items": { "$ref": "#/$defs/OrderedLabel" },
          "maxItems": 25
        },
        "geographies": {
          "type": "array",
          "items": { "$ref": "#/$defs/OrderedLabel" },
          "maxItems": 25
        },
        "offerSummary": { "type": "string", "maxLength": 2000 },
        "callToAction": { "type": "string", "maxLength": 1000 },
        "voiceProfile": {
          "oneOf": [
            { "$ref": "#/$defs/VoiceProfile" },
            { "type": "null" }
          ]
        },
        "proofs": {
          "type": "array",
          "items": { "$ref": "#/$defs/CampaignProofInput" },
          "maxItems": 50
        },
        "constraints": {
          "type": "array",
          "items": { "$ref": "#/$defs/OrderedLabel" },
          "maxItems": 50
        },
        "discoverySettings": { "$ref": "#/$defs/DiscoverySettings" },
        "researchSettings": { "$ref": "#/$defs/ResearchSettings" }
      }
    },
    "CampaignInitializationData": {
      "allOf": [
        { "$ref": "#/$defs/CampaignDraftData" },
        {
          "type": "object",
          "required": ["niches", "geographies", "offerSummary", "callToAction"],
          "properties": {
            "niches": { "type": "array", "minItems": 1 },
            "geographies": { "type": "array", "minItems": 1 },
            "offerSummary": { "type": "string", "minLength": 1 },
            "callToAction": { "type": "string", "minLength": 1 }
          }
        }
      ]
    },
    "SaveCampaignDraftInput": {
      "type": "object",
      "additionalProperties": false,
      "required": ["kind", "requestId", "data"],
      "properties": {
        "kind": { "type": "string", "const": "save-campaign-draft" },
        "requestId": { "$ref": "#/$defs/Uuid" },
        "campaignId": { "$ref": "#/$defs/Uuid" },
        "expectedVersion": { "type": "integer", "minimum": 0 },
        "data": { "$ref": "#/$defs/CampaignDraftData" }
      }
    },
    "InitializeCampaignInput": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "kind",
        "requestId",
        "campaignId",
        "expectedVersion",
        "idempotencyKey",
        "data"
      ],
      "properties": {
        "kind": { "type": "string", "const": "initialize-campaign" },
        "requestId": { "$ref": "#/$defs/Uuid" },
        "campaignId": { "$ref": "#/$defs/Uuid" },
        "expectedVersion": { "type": "integer", "minimum": 1 },
        "idempotencyKey": {
          "type": "string",
          "minLength": 16,
          "maxLength": 200,
          "pattern": "^[A-Za-z0-9._:-]+$"
        },
        "data": { "$ref": "#/$defs/CampaignInitializationData" }
      }
    },
    "ActionError": {
      "type": "object",
      "additionalProperties": false,
      "required": ["code", "message", "retryable"],
      "properties": {
        "code": {
          "type": "string",
          "enum": [
            "validation",
            "stale-version",
            "duplicate-initialization",
            "invalid-transition",
            "persistence-failure"
          ]
        },
        "message": { "type": "string", "minLength": 1, "maxLength": 500 },
        "fieldPath": {
          "type": "array",
          "items": {
            "oneOf": [
              { "type": "string", "minLength": 1 },
              { "type": "integer", "minimum": 0 }
            ]
          }
        },
        "retryable": { "type": "boolean" }
      }
    },
    "ActionFailure": {
      "type": "object",
      "additionalProperties": false,
      "required": ["ok", "requestId", "errors"],
      "properties": {
        "ok": { "type": "boolean", "const": false },
        "requestId": { "$ref": "#/$defs/Uuid" },
        "errors": {
          "type": "array",
          "minItems": 1,
          "items": { "$ref": "#/$defs/ActionError" }
        }
      }
    },
    "CampaignWriteReceipt": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "campaignId",
        "lifecycle",
        "version",
        "createdAt",
        "updatedAt",
        "initializedAt"
      ],
      "properties": {
        "campaignId": { "$ref": "#/$defs/Uuid" },
        "lifecycle": { "$ref": "#/$defs/CampaignLifecycle" },
        "version": { "type": "integer", "minimum": 1 },
        "createdAt": { "$ref": "#/$defs/UtcDateTime" },
        "updatedAt": { "$ref": "#/$defs/UtcDateTime" },
        "initializedAt": {
          "oneOf": [
            { "$ref": "#/$defs/UtcDateTime" },
            { "type": "null" }
          ]
        }
      }
    },
    "SaveCampaignDraftResult": {
      "oneOf": [
        {
          "type": "object",
          "additionalProperties": false,
          "required": ["ok", "requestId", "campaign", "pipelineRunId"],
          "properties": {
            "ok": { "type": "boolean", "const": true },
            "requestId": { "$ref": "#/$defs/Uuid" },
            "campaign": { "$ref": "#/$defs/CampaignWriteReceipt" },
            "pipelineRunId": { "type": "null" }
          }
        },
        { "$ref": "#/$defs/ActionFailure" }
      ]
    },
    "InitializeCampaignResult": {
      "oneOf": [
        {
          "type": "object",
          "additionalProperties": false,
          "required": ["ok", "requestId", "campaign", "pipelineRun"],
          "properties": {
            "ok": { "type": "boolean", "const": true },
            "requestId": { "$ref": "#/$defs/Uuid" },
            "campaign": { "$ref": "#/$defs/CampaignWriteReceipt" },
            "pipelineRun": {
              "type": "object",
              "additionalProperties": false,
              "required": ["id", "status", "createdAt"],
              "properties": {
                "id": { "$ref": "#/$defs/Uuid" },
                "status": { "type": "string", "const": "pending" },
                "createdAt": { "$ref": "#/$defs/UtcDateTime" }
              }
            }
          }
        },
        { "$ref": "#/$defs/ActionFailure" }
      ]
    },
    "ReadinessIndicator": {
      "type": "object",
      "additionalProperties": false,
      "required": ["ready", "label"],
      "properties": {
        "ready": { "type": "boolean" },
        "label": { "type": "string", "minLength": 1 }
      }
    },
    "SetupReadModel": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "kind",
        "campaignId",
        "version",
        "lifecycle",
        "autosavedAt",
        "autosavedLabel",
        "completeness",
        "prohibitionCount",
        "localBoundary",
        "websiteGate",
        "initialization"
      ],
      "properties": {
        "kind": { "type": "string", "const": "setup-read-model" },
        "campaignId": { "$ref": "#/$defs/Uuid" },
        "version": { "type": "integer", "minimum": 1 },
        "lifecycle": { "$ref": "#/$defs/CampaignLifecycle" },
        "autosavedAt": {
          "oneOf": [
            { "$ref": "#/$defs/UtcDateTime" },
            { "type": "null" }
          ]
        },
        "autosavedLabel": { "type": "string" },
        "completeness": {
          "type": "object",
          "additionalProperties": false,
          "required": ["complete", "percent", "missingFields"],
          "properties": {
            "complete": { "type": "boolean" },
            "percent": { "type": "integer", "minimum": 0, "maximum": 100 },
            "missingFields": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": ["niches", "geographies", "offerSummary", "callToAction"]
              },
              "uniqueItems": true
            }
          }
        },
        "prohibitionCount": { "type": "integer", "minimum": 0 },
        "localBoundary": { "$ref": "#/$defs/ReadinessIndicator" },
        "websiteGate": { "$ref": "#/$defs/ReadinessIndicator" },
        "initialization": {
          "type": "object",
          "additionalProperties": false,
          "required": ["available", "reasons"],
          "properties": {
            "available": { "type": "boolean" },
            "reasons": {
              "type": "array",
              "items": { "type": "string", "minLength": 1 }
            }
          }
        }
      }
    },
    "DiscoveryPreviewReadModel": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "kind",
        "estimatedYield",
        "confidence",
        "detailCaption",
        "observedAt",
        "expiresAt",
        "stale"
      ],
      "properties": {
        "kind": { "type": "string", "const": "discovery-preview-read-model" },
        "estimatedYield": { "type": ["integer", "null"], "minimum": 0 },
        "confidence": { "$ref": "#/$defs/Confidence" },
        "detailCaption": { "type": "string" },
        "observedAt": {
          "oneOf": [
            { "$ref": "#/$defs/UtcDateTime" },
            { "type": "null" }
          ]
        },
        "expiresAt": {
          "oneOf": [
            { "$ref": "#/$defs/UtcDateTime" },
            { "type": "null" }
          ]
        },
        "stale": { "type": "boolean" }
      }
    },
    "PipelineStageReadModel": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "key",
        "ordinal",
        "status",
        "label",
        "statusLabel",
        "tone",
        "progress"
      ],
      "properties": {
        "key": { "$ref": "#/$defs/PipelineStageKey" },
        "ordinal": { "type": "integer", "minimum": 1, "maximum": 6 },
        "status": { "$ref": "#/$defs/StageExecutionStatus" },
        "label": { "type": "string", "minLength": 1 },
        "statusLabel": { "type": "string", "minLength": 1 },
        "tone": {
          "type": "string",
          "enum": ["neutral", "active", "success", "warning", "danger"]
        },
        "progress": { "type": ["integer", "null"], "minimum": 0, "maximum": 100 },
        "metricLabel": { "type": ["string", "null"] },
        "metricValue": { "type": ["string", "null"] },
        "errorSummary": { "type": ["string", "null"] }
      }
    },
    "WorkbenchRowReadModel": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "listingId",
        "businessName",
        "queueStatus",
        "stageLabel",
        "stageTone",
        "citationsLabel",
        "actionLabel",
        "needsAttention"
      ],
      "properties": {
        "listingId": { "$ref": "#/$defs/Uuid" },
        "businessName": { "type": "string", "minLength": 1 },
        "queueStatus": { "$ref": "#/$defs/QueueStatus" },
        "stageLabel": { "type": "string", "minLength": 1 },
        "stageTone": {
          "type": "string",
          "enum": ["neutral", "active", "success", "warning", "danger"]
        },
        "citationsLabel": { "type": "string" },
        "actionLabel": { "type": "string", "minLength": 1 },
        "needsAttention": { "type": "boolean" }
      }
    },
    "PipelineReadModel": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "kind",
        "campaignId",
        "runId",
        "lifecycle",
        "title",
        "processing",
        "stages",
        "counts",
        "rows",
        "generatedAt"
      ],
      "properties": {
        "kind": { "type": "string", "const": "pipeline-read-model" },
        "campaignId": { "$ref": "#/$defs/Uuid" },
        "runId": { "$ref": "#/$defs/Uuid" },
        "lifecycle": { "$ref": "#/$defs/CampaignLifecycle" },
        "title": { "type": "string", "minLength": 1 },
        "processing": { "type": "boolean" },
        "stages": {
          "type": "array",
          "items": { "$ref": "#/$defs/PipelineStageReadModel" },
          "maxItems": 6
        },
        "counts": {
          "type": "object",
          "additionalProperties": false,
          "required": ["all", "needsAttention", "readyReview", "completed"],
          "properties": {
            "all": { "type": "integer", "minimum": 0 },
            "needsAttention": { "type": "integer", "minimum": 0 },
            "readyReview": { "type": "integer", "minimum": 0 },
            "completed": { "type": "integer", "minimum": 0 }
          }
        },
        "rows": {
          "type": "array",
          "items": { "$ref": "#/$defs/WorkbenchRowReadModel" }
        },
        "generatedAt": { "$ref": "#/$defs/UtcDateTime" }
      }
    },
    "PortfolioRowReadModel": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "campaignId",
        "name",
        "lifecycle",
        "currentStage",
        "statusLabel",
        "statusTone",
        "listingCount",
        "readyCount",
        "sentCount"
      ],
      "properties": {
        "campaignId": { "$ref": "#/$defs/Uuid" },
        "name": { "type": "string", "minLength": 1 },
        "lifecycle": { "$ref": "#/$defs/CampaignLifecycle" },
        "currentStage": {
          "oneOf": [
            { "$ref": "#/$defs/PipelineStageKey" },
            { "type": "null" }
          ]
        },
        "statusLabel": { "type": "string", "minLength": 1 },
        "statusTone": {
          "type": "string",
          "enum": ["neutral", "active", "success", "warning", "danger"]
        },
        "listingCount": { "type": "integer", "minimum": 0 },
        "readyCount": { "type": "integer", "minimum": 0 },
        "sentCount": { "type": "integer", "minimum": 0 }
      }
    },
    "FunnelStageReadModel": {
      "type": "object",
      "additionalProperties": false,
      "required": ["key", "label", "count"],
      "properties": {
        "key": { "$ref": "#/$defs/PipelineStageKey" },
        "label": { "type": "string", "minLength": 1 },
        "count": { "type": "integer", "minimum": 0 }
      }
    },
    "VelocityMetricReadModel": {
      "type": "object",
      "additionalProperties": false,
      "required": ["key", "label", "value", "unit"],
      "properties": {
        "key": {
          "type": "string",
          "enum": ["discovered", "enriched", "drafted", "reviewed", "sent", "replied"]
        },
        "label": { "type": "string", "minLength": 1 },
        "value": { "type": "number", "minimum": 0 },
        "unit": { "type": "string", "enum": ["count", "per-hour", "percent"] }
      }
    },
    "AuditAlertReadModel": {
      "type": "object",
      "additionalProperties": false,
      "required": ["id", "code", "severity", "message", "count"],
      "properties": {
        "id": { "$ref": "#/$defs/Uuid" },
        "code": {
          "type": "string",
          "enum": [
            "missing-citation",
            "thin-record",
            "low-confidence-draft",
            "suppression-match",
            "forbidden-claim",
            "failed-stage"
          ]
        },
        "severity": { "type": "string", "enum": ["info", "warning", "critical"] },
        "message": { "type": "string", "minLength": 1 },
        "count": { "type": "integer", "minimum": 1 }
      }
    },
    "DashboardReadModel": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "kind",
        "portfolio",
        "funnel",
        "velocity",
        "auditAlerts",
        "generatedAt"
      ],
      "properties": {
        "kind": { "type": "string", "const": "dashboard-read-model" },
        "portfolio": {
          "type": "array",
          "items": { "$ref": "#/$defs/PortfolioRowReadModel" }
        },
        "funnel": {
          "type": "array",
          "items": { "$ref": "#/$defs/FunnelStageReadModel" },
          "maxItems": 6
        },
        "velocity": {
          "type": "array",
          "items": { "$ref": "#/$defs/VelocityMetricReadModel" }
        },
        "auditAlerts": {
          "type": "array",
          "items": { "$ref": "#/$defs/AuditAlertReadModel" }
        },
        "generatedAt": { "$ref": "#/$defs/UtcDateTime" }
      }
    }
  }
}
```

## Representative JSON fixtures

### Filled setup

```json
{
  "kind": "setup-read-model",
  "campaignId": "2e4133a0-39b7-4c41-bdef-6654d7c38dc5",
  "version": 7,
  "lifecycle": "draft",
  "autosavedAt": "2026-09-19T23:58:00.000Z",
  "autosavedLabel": "Autosaved 3 minutes ago",
  "completeness": {
    "complete": true,
    "percent": 100,
    "missingFields": []
  },
  "prohibitionCount": 3,
  "localBoundary": {
    "ready": true,
    "label": "2 metros selected"
  },
  "websiteGate": {
    "ready": true,
    "label": "Website required"
  },
  "initialization": {
    "available": true,
    "reasons": []
  }
}
```

### Empty draft command

```json
{
  "kind": "save-campaign-draft",
  "requestId": "1fd453e6-bcda-4d37-843f-cdbebf640d4f",
  "data": {}
}
```

### Stale write result

```json
{
  "ok": false,
  "requestId": "82880d2f-27ca-4579-a115-eae5e2bc8a32",
  "errors": [
    {
      "code": "stale-version",
      "message": "Campaign version 8 no longer matches expected version 7.",
      "fieldPath": ["expectedVersion"],
      "retryable": true
    }
  ]
}
```

### Paused dashboard

```json
{
  "kind": "dashboard-read-model",
  "portfolio": [
    {
      "campaignId": "91dbe025-0cab-4317-9060-3c403ec451ab",
      "name": "Austin HVAC",
      "lifecycle": "paused",
      "currentStage": "human-review",
      "statusLabel": "Paused during human review",
      "statusTone": "warning",
      "listingCount": 128,
      "readyCount": 14,
      "sentCount": 84
    }
  ],
  "funnel": [],
  "velocity": [],
  "auditAlerts": [],
  "generatedAt": "2026-09-20T00:00:00.000Z"
}
```

### Failed pipeline

```json
{
  "kind": "pipeline-read-model",
  "campaignId": "91dbe025-0cab-4317-9060-3c403ec451ab",
  "runId": "662f84ab-0434-4efe-a8e4-34404048a2ab",
  "lifecycle": "active",
  "title": "Austin HVAC",
  "processing": false,
  "stages": [
    {
      "key": "public-scrape",
      "ordinal": 3,
      "status": "failed",
      "label": "Public website research",
      "statusLabel": "Failed",
      "tone": "danger",
      "progress": 42,
      "metricLabel": null,
      "metricValue": null,
      "errorSummary": "Provider timeout; retry is available."
    }
  ],
  "counts": {
    "all": 128,
    "needsAttention": 14,
    "readyReview": 0,
    "completed": 36
  },
  "rows": [],
  "generatedAt": "2026-09-20T00:00:00.000Z"
}
```

## Review questions

Before this card moves to Doing, confirm:

1. The command field names, required initialization fields, and bounded error codes are correct.
2. `requestId` identifies an invocation, while `idempotencyKey` deduplicates initialization side effects.
3. Read models retain canonical status keys alongside presentation labels.
4. The five fixture states are sufficient for the contract-only implementation.