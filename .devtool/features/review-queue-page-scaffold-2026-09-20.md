---
id: "review-queue-page-scaffold-2026-09-20"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-20T14:45:00.000Z"
modified: "2026-09-20T14:45:00.000Z"
completedAt: null
labels: ["story", "epic:epic-review-queue-2026-09-20"]
order: "a7"
---

# Review queue page scaffold

Review Queue route that composes the dispatch header and 3-pane widgets. Assembly only: ports filled by `components/queue/*` driven by mock data. Sets sidebar `activeItemId` from pathname.

Parent epic: [`epic-review-queue-2026-09-20`](epic-review-queue-2026-09-20.md)

## Files

- `app/(auth)/layout.tsx` — already mounts [`AppShell`](done/operator-app-shell-2026-09-18.md) with [`AppSidebarNav`](done/app-sidebar-nav-2026-09-18.md) and [`WorkspaceTopBar`](done/workspace-top-bar-2026-09-18.md). Reuse; do not rebuild chrome. Today `activeItemId` is hardcoded `"campaigns"` — derive it from the pathname so `/queue` selects `review-queue` and `/campaigns` still selects `campaigns`.
- `components/queue/queue-dispatch-header.tsx` — full-width `Queue Dispatch Terminal` cluster (title, `Live Review`, metro meta, policy chips, shortcuts). shadcn: `Badge`, `Button`. Copy from the parent epic section 2. Presentational; optional `disabled`.
- `app/(auth)/queue/page.tsx` — the Review Queue page body. Sidebar already links here (`href: "/queue"`).
- Route paths follow [`epic-application-architecture-2026-09-15`](epic-application-architecture-2026-09-15.md) section 4A (`queue/page.tsx` inside the auth group).

This card is **not** a `component` story. Claim it only after the five widget stories exist as files (they may still be `todo` if implementing with placeholders).

## Layout ports

Source: LocalDraft - Review Queue (`projects/13798460973041177032/screens/edf29e27a2824c4da2952f5bd12988fa`).

Canvas: full-width header, then a three-column grid (`queue | draft column | citations`) with `items-stretch`. Prefer CSS grid over `resizable`. Stack below `lg` (queue, then draft+dossier+actions, then citations).

**Above the grid (full width)**

| Port | Filled by |
|---|---|
| Terminal title, Live Review, metro meta, policy chips, shortcuts | `QueueDispatchHeader` (`queue-dispatch-header.tsx`) |

**Left pane**

| Port | Filled by |
|---|---|
| Filterable lead list | [`QueueLeadList`](review-queue-lead-list-2026-09-20.md) |

**Center column**

| Port | Filled by |
|---|---|
| Recipient / To / mailto / word count | [`QueueLeadDossier`](review-queue-lead-dossier-2026-09-20.md) |
| Subject / body / entities | [`QueueDraftStudio`](review-queue-draft-studio-2026-09-20.md) |
| Mark ready / copy & open mail | [`QueueDispatchActions`](review-queue-dispatch-actions-2026-09-20.md) |

**Right pane**

| Port | Filled by |
|---|---|
| Grounded facts + negative constraints | [`QueueCitationPanel`](review-queue-citation-panel-2026-09-20.md) |

Do not mount Setup, Pipeline, or Campaigns Admin widgets in these ports. Do not add a second `New Campaign` in the page body. Do not wire pipeline `onJumpToQueue`.

## Acceptance Criteria

- [ ] `app/(auth)/queue/page.tsx` exists and renders under the existing auth layout.
- [ ] Visiting `/queue` sets sidebar `activeItemId` to `review-queue`. Visiting `/campaigns` and `/campaigns/new` still highlight `campaigns`.
- [ ] Full-width header copy matches `Queue Dispatch Terminal`, `Live Review`, `Austin Metro • HVAC Sector • Tier-1 Lead Batch`, `Zero-Automation Policy`, `100% Citation Grounding`, and shortcuts `J/K Navigate`, `Copy & Mail`, `Filter Rules`.
- [ ] Below the header, three panes mount list / (dossier + studio + dispatch) / citations in that order.
- [ ] All widget props come from a local mock object in the page (exported Stitch mocks from each widget file). No server actions, API clients, Zod schemas, or database access. `useState` may hold `selectedId`, `view`, `query`, `subject`, and `body`.
- [ ] Page compiles and renders at `/queue` with no console errors. `/campaigns` still renders Campaigns Admin.
- [ ] If a widget story is still unimplemented when this card is claimed, that port may show `Pending story: <card id>` rather than invented copy.

## Further breakdown

- [ ] Do not create `/follow-ups` or `/settings` pages here
- [ ] Do not create `app/(auth)/campaigns/[id]/page.tsx` here
- [ ] Selecting a queue row may swap dossier/studio mocks in page state; v1 may keep the Lonestar/Marcus filled mock only
