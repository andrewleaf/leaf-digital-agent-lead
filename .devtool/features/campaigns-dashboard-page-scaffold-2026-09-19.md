---
id: "campaigns-dashboard-page-scaffold-2026-09-19"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T21:00:00.000Z"
modified: "2026-09-19T21:00:00.000Z"
completedAt: null
labels: ["story", "epic:epic-campaigns-admin-dashboard-2026-09-19"]
order: "aE"
---

# Campaigns dashboard page scaffold

Campaigns landing route that composes the seven Admin Dashboard widgets into a header / KPI / main-column / right-rail layout. Assembly only: every port is filled by an existing `components/campaigns/*` widget driven by mock data.

Parent epic: [`epic-campaigns-admin-dashboard-2026-09-19`](epic-campaigns-admin-dashboard-2026-09-19.md)

## Files

- `app/(auth)/layout.tsx` — already mounts [`AppShell`](done/operator-app-shell-2026-09-18.md) with [`AppSidebarNav`](done/app-sidebar-nav-2026-09-18.md) and [`WorkspaceTopBar`](done/workspace-top-bar-2026-09-18.md). Reuse; do not rebuild chrome.
- `app/(auth)/campaigns/page.tsx` — the Campaigns Admin Dashboard page body. Sidebar already links here (`href: "/campaigns"`).
- Route paths follow [`epic-application-architecture-2026-09-15`](epic-application-architecture-2026-09-15.md) section 4A (`campaigns/page.tsx` inside the auth group).

This card is **not** a `component` story. Claim it only after the seven widget stories exist as files (they may still be `todo` if implementing with placeholders).

## Layout ports

Source: LocalDraft - Campaigns Admin Dashboard (`projects/13798460973041177032/screens/e569b1bad7964515ae9b8da0edd42ce4`).

Canvas is `grid grid-cols-1 lg:grid-cols-12` with 24px gap and `items-start`.

**Above the grid (full width)**

| Port | Filled by |
|---|---|
| Title, telemetry eyebrow, guard chip, metro filter | [`CampaignsDashboardHeader`](campaigns-dashboard-header-2026-09-19.md) |
| Five KPI cards | [`DashboardTelemetryMetrics`](dashboard-telemetry-metrics-2026-09-19.md) |

**Main column (`lg:col-span-8`)**

| Port | Filled by |
|---|---|
| Campaign portfolio | [`CampaignPortfolioTable`](campaign-portfolio-table-2026-09-19.md) |
| Operator velocity | [`OperatorVelocityCards`](operator-velocity-cards-2026-09-19.md) |

**Inspector rail (`lg:col-span-4`)**

| Port | Filled by |
|---|---|
| Six-stage funnel | [`DashboardPipelineFunnel`](dashboard-pipeline-funnel-2026-09-19.md) |
| Bottleneck alerts | [`DashboardAuditAlerts`](dashboard-audit-alerts-2026-09-19.md) |
| Manual-dispatch proof | [`PlatformGuardrailsStrip`](platform-guardrails-strip-2026-09-19.md) |

Do not mount Setup or Pipeline widgets in these ports. Do not add a second `New Campaign` in the page body.

## Acceptance Criteria

- [ ] `app/(auth)/campaigns/page.tsx` exists and renders under the existing auth layout (sidebar `Campaigns` active, top bar unchanged).
- [ ] Full-width header and KPI row render above a 12-column grid split 8 / 4 at `lg` and stacked below it.
- [ ] Main column mounts the portfolio table then operator velocity cards. Rail mounts funnel, audit alerts, then guardrails strip, in that order.
- [ ] All widget props come from a local mock object in the page (use the exported Stitch mock constants from each widget file). No server actions, API clients, Zod schemas, or database access.
- [ ] Metro filter state may live in the page as `useState` and pass already-filtered `rows` into the table; filtering logic is optional for v1 if the mock is the Stitch six-row set for `All Metros` only.
- [ ] Page compiles and renders at `/campaigns` with no console errors. `/campaigns/new` still renders Campaign Setup.
- [ ] If a widget story is still unimplemented when this card is claimed, that port may show `Pending story: <card id>` rather than invented copy.

## Further breakdown

- [ ] Keep `activeItemId` on the layout as `campaigns` for this route (already the layout default)
- [ ] Do not create `app/(auth)/campaigns/[id]/page.tsx` here (Pipeline page, out of scope)
- [ ] Do not create `/queue` (Review Queue, out of scope)
