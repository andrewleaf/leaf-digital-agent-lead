# `components/` — React components

Presentation layer. Components receive data as props or (later) from a server action return value; they do not query the database.

Style: shadcn/ui + Operator Core ([`.cursor/skills/shadcn-ui/SKILL.md`](../.cursor/skills/shadcn-ui/SKILL.md)).

## Directories

| Path | Owns |
|------|------|
| `ui/` | shadcn registry primitives. Add via CLI. |
| `campaigns/` | Campaign, setup, dashboard, and pipeline widgets. Isolated: typed mocks, no persistence, no page routes. |
| `layout/` | Operator chrome: `app-shell`, `app-sidebar-nav`, `workspace-top-bar`, `form-section`. |
| `shared/` | Cross-feature pieces such as `page-header`. |
| `queue/` | **Planned.** Agent workspace (queue table, draft panel). Not in the tree yet. |

## How pages compose campaigns

**`/campaigns`** (`app/(auth)/campaigns/page.tsx`):

- Header + metro chips: `campaigns-dashboard-header`
- KPI row: `dashboard-telemetry-metrics`
- Portfolio: `campaign-portfolio-table` (campaign rows, not listing rows)
- Operators: `operator-velocity-cards`
- Funnel / alerts / strip: `dashboard-pipeline-funnel`, `dashboard-audit-alerts`, `platform-guardrails-strip`

**`/campaigns/new`**:

- Shell: `PageHeader`, `FormSection`, `CampaignSetupStatusBar`, `GuardrailProtocolBanner`
- Fields: niche, geography chips, value proposition, CTA, voice profile, negative constraints, research depth
- Footer: `CampaignSetupActions`
- Aside: `DiscoveryYieldCard`, `SetupReadinessChips`, `PipelineSequenceRail`

**Unmounted (tests only):** `campaign-pipeline-header`, `campaign-pipeline-actions`, `pipeline-stage-stepper`, `pipeline-summary-metrics`, `pipeline-workbench-filters`, `pipeline-workbench-table`, `pipeline-workbench-footer`. These are the listing workbench. Do not reuse them on the admin dashboard.

## Conventions

- `ui/` is CLI-owned. Customise at the call site; edit a registry file only for a permanent change.
- Prefer a registry primitive. Do not use shadcn `Field` unless it exists in `components/ui/`.
- File names kebab-case; exported components PascalCase.
- Widget stories keep copy, empty/filled/disabled, and a11y in the card. Gold standard: `.devtool/features/done/industry-niche-input-2026-09-18.md`.

## Import rules

- `campaigns/` and `layout/` may import `ui/` and `shared/`.
- `campaigns/` must not import `queue/` (when it exists) or the reverse; share via `shared/` or `layout/`.
- `ui/` and `shared/` must not import feature folders.
- No component imports from `app/`.
- `cn` comes from `@/lib/utils` (re-export of `lib/utils/cn.ts`).
