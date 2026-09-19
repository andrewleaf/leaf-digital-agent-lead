# Stitch catalog

IDs, titles, and Kanban status only. Do not paste `designMd` or Material `namedColors` here.

## Canonical (this repo)

Always default to this project unless the user names another.

- Project: `projects/13798460973041177032` (`agent-lead workspace`)
- Design system: LocalDraft Operator Core `assets/1d9cca68b81c458ea10d71779c1a76ae`
- Tokens: [operator-core.md](../../shadcn-ui/references/operator-core.md)

| Title | Screen id | Kanban |
|---|---|---|
| LocalDraft - Campaign Setup | `dffcadf839ef470db0d105a117c66826` | Epic + stories done |
| LocalDraft - Campaign Pipeline | `81796119faa94a379c970ac48a6add3d` | Epic + stories done |
| LocalDraft - Review Queue | `edf29e27a2824c4da2952f5bd12988fa` | Named as sibling; no epic yet |
| LocalDraft - Campaigns Admin Dashboard | `e569b1bad7964515ae9b8da0edd42ce4` | Epic + stories (board) |
| LocalDraft - Product Landing Page | `91487f4cc5544abc8100d31b5572c23c` | Unmapped |
| LocalDraft Campaign & Review Manager | `c4007e2e1538472ea8c96006c38d26b9` | Unmapped |
| LocalDraft Logo | `4d6c7c07b47e4ec0a2dc5760a96496d8` | Unmapped |

Full path: `projects/13798460973041177032/screens/{screen id}`.

## Out of scope for LocalDraft UI

Do not use these as LocalDraft sources (tokens, copy, or epic Stitch tables):

| Title | Project id | Notes |
|---|---|---|
| AI Lead Generation Dashboard | `3028290737853412139` | Owned; dark indigo theme |
| Developer Portfolio & Mentorship Hub | `4134873457314749339` | Owned; unrelated |
| Lumio Saas Landing Page | `13115250104160537282` | Shared |
| Main Dashboard | `10100603439629535839` | Shared |

## Refresh

If a screen is missing or the user generated new Stitch work, call `user-stitch` `list_screens` with project id `13798460973041177032` (no `projects/` prefix) and update the table. Do not invent IDs. Do not call `list_projects` on every plan — the payload is huge.

## Planning notes

1. Campaigns Admin Dashboard is on the board ([`epic-campaigns-admin-dashboard-2026-09-19`](../../../.devtool/features/epic-campaigns-admin-dashboard-2026-09-19.md)). **Review Queue** remains unmapped (Pipeline still names that screen as a sibling). Do not start the landing page or Campaign & Review Manager until those rows are claimed.
2. Ignore Material `namedColors` from every project. Operator Core is [operator-core.md](../../shadcn-ui/references/operator-core.md).
3. When the user asks what screens exist, answer from this catalog. Hit MCP only to refresh.
4. Keep unmapped screens listed so planning can spawn the right epic instead of inventing a fourth Setup variant.
