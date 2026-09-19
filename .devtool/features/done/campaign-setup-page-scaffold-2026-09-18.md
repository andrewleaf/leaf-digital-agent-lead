---
id: "campaign-setup-page-scaffold-2026-09-18"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T00:55:00.000Z"
modified: "2026-09-19T01:45:00.000Z"
completedAt: "2026-09-19T01:45:00.000Z"
labels: ["story", "epic:epic-campaign-setup-2026-09-18"]
order: "a8"
---

# Campaign setup page scaffold

Auth route group layout plus the Campaign Setup route, wiring the shell, nav, page header, and the 12-column form / inspector grid. Assembly only: every port is filled by an existing `components/campaigns/*` widget driven by mock data.

Parent epic: [`epic-campaign-setup-2026-09-18`](../epic-campaign-setup-2026-09-18.md)

## Files

- `app/(auth)/layout.tsx` — mounts [`AppShell`](operator-app-shell-2026-09-18.md) with [`AppSidebarNav`](app-sidebar-nav-2026-09-18.md) and [`WorkspaceTopBar`](workspace-top-bar-2026-09-18.md).
- `app/(auth)/campaigns/new/page.tsx` — the Campaign Setup page body.
- Route paths follow [`epic-application-architecture-2026-09-15`](../epic-application-architecture-2026-09-15.md) section 4A.

## Layout ports

Source: LocalDraft - Campaign Setup (`projects/13798460973041177032/screens/dffcadf839ef470db0d105a117c66826`).

Main column is `grid grid-cols-1 lg:grid-cols-12` with 24px gap and `items-start`.

**Above the grid**

| Port | Filled by |
|---|---|
| Spec strip and hero | [`WorkspacePageHeader`](workspace-page-header-2026-09-18.md) with `Create Targeted Campaign`, badge `Guided Setup`, the Stitch description, `CAMPAIGN_SPEC_v2.4`, `New Perimeter Setup` |
| Strip meta slot | [`CampaignSetupStatusBar`](campaign-setup-status-bar-2026-09-18.md) (`Lead Engine: Active`, `AUTOSAVED 14:02 UTC`) |
| Notice | [`GuardrailProtocolBanner`](guardrail-protocol-banner-2026-09-18.md) |

**Form column (`lg:col-span-8`)** — four [`FormSection`](form-section-shell-2026-09-18.md) shells, then the actions panel

| # | Section | Widgets mounted |
|---|---|---|
| 1 | Target Business & Location | [`IndustryNicheInput`](industry-niche-input-2026-09-18.md), [`GeographyChipsInput`](geography-chips-input-2026-09-18.md), [`DiscoveryYieldCard`](discovery-yield-card-2026-09-18.md) inline variant |
| 2 | Proposition & Review Intent | [`ValuePropositionField`](value-proposition-field-2026-09-18.md), [`CallToActionField`](call-to-action-field-2026-09-18.md), [`ComposerVoiceProfile`](composer-voice-profile-2026-09-18.md) |
| 3 | Negative Constraints & Guardrails | [`NegativeConstraintsInput`](negative-constraints-input-2026-09-18.md) |
| 4 | Research Depth & Verification Settings | [`ResearchDepthSettings`](research-depth-settings-2026-09-18.md) |
| — | Actions panel | [`CampaignSetupActions`](campaign-setup-actions-2026-09-18.md), followed by the centered note `Discovery will populate the 6-stage pipeline. Every draft requires your manual review and approval.` |

**Inspector rail (`lg:col-span-4`)** — four stacked panels

| Port | Status |
|---|---|
| Campaign Quality Score | [`DiscoveryYieldCard`](discovery-yield-card-2026-09-18.md) confidence ring plus [`SetupReadinessChips`](setup-readiness-chips-2026-09-18.md) |
| Pipeline Sequence | [`PipelineSequenceRail`](pipeline-sequence-rail-2026-09-18.md) |
| Target Sample Mockup | No component story yet — leave the port empty and note the gap |
| Operator Playbook | No component story yet — leave the port empty and note the gap |

## Acceptance Criteria

- [x] `app/(auth)/layout.tsx` renders the shell with the sidebar nav (`Campaigns` active) and top bar (`Workspace > Review Desk`) and passes `children` into the main canvas.
- [x] `app/(auth)/campaigns/new/page.tsx` renders the page header, guardrail banner, and the 12-column grid split 8 / 4 at `lg` and stacked below it.
- [x] Each of the four numbered sections uses `FormSection` with the Stitch title, eyebrow, and tone, and mounts the widgets listed above.
- [x] The actions panel and the centered pipeline note render at the bottom of the form column.
- [x] The inspector rail renders the quality-score and pipeline panels; the two unmapped ports are absent rather than stubbed with invented copy.
- [x] All widget props come from a local mock object in the page; no server actions, API clients, Zod schemas, or database access are introduced.
- [x] Page compiles and renders at `/campaigns/new` with no console errors, and the rail collapses beneath the form column on narrow viewports.

### Deviations recorded during implementation

- Four widget stories are still open, so their ports render a dashed `Pending story: <card id>` placeholder instead of the widget: `research-depth-settings-2026-09-18` (section 4), `campaign-setup-actions-2026-09-18` (actions panel), `setup-readiness-chips-2026-09-18` and `pipeline-sequence-rail-2026-09-18` (rail). The pipeline note below the actions panel is real Stitch copy and renders.
- Sections 2 and 3 do not pass an `eyebrow` to `FormSection`: `ValuePropositionField` already renders `Editorial Tone` and `NegativeConstraintsInput` already renders `Strict Prohibition`, so the shell eyebrow would duplicate them. Section 3 keeps `tone="guardrail"` for the rose step token.
- The rail footer selector and operator identity in `app/(auth)/layout.tsx` are plain markup with the Stitch strings; `CampaignSetupStatusBar` is the wide strip and is mounted in the page header meta slot instead.

## Further breakdown

- [x] Decide where the discovery-yield inline badge lives (rail only; the section 1 duplicate is dropped)
- [ ] Raise component stories for `Target Sample Mockup` and `Operator Playbook` if the rail should be complete
- [x] Confirm whether the form element belongs in the page or stays inside `CampaignSetupActions` (the page owns the `form` element)
