---
name: stitch-to-shadcn
description: >-
  Catalog Stitch project and screen IDs, then map screens and Operator
  Core tokens onto shadcn component stories and campaign widgets. Use
  when planning UI or design work, writing Kanban design/UI epics or
  cards with the component label, pulling Stitch MCP (get_screen,
  get_project, list_design_systems), or composing LocalDraft UI from
  a Stitch contract.
---

# Stitch → shadcn

Presentational widgets come from Stitch copy and Operator Core tokens, then compose **shadcn registry** primitives. Do not implement React until the matching card is in Doing.

## Workflow

1. Read [references/projects.md](references/projects.md). Pick the canonical project/screen (do not invent IDs). If the parent epic already has a Stitch table, it must match a catalog row.
2. Call `user-stitch` `get_screen` and `list_design_systems` (`projectId` without the `projects/` prefix). Use `get_project` only for instance ids / a live screen list. Do not call `list_projects` on every plan.
3. Tokens: [operator-core.md](../shadcn-ui/references/operator-core.md) and MCP pitfalls in [references/mcp-contract.md](references/mcp-contract.md).
4. Write or update a **Component Story** or UI epic (full sections — stubs are invalid). See [kanban card-format](../kanban-markdown/references/card-format.md).
5. When implementing: CLI-add missing primitives; map Material icons to lucide; compose `Label` + control. Do not use `Field` unless it is already in `components/ui/`.

## Widget → primitive

| Stitch widget | shadcn | Notes |
|---|---|---|
| Selects | `Select` | Do not hand-roll a trigger button |
| Chips / status | `Badge` | lucide `X` to dismiss |
| Text fields | `Input` or `Textarea` | CLI-add `Textarea` if missing |
| Labels | `Label` | Associate with the control |
| Buttons | `Button` | Primary `#0F766E` |
| Panels | `Card` | 8px radius, `#E2E8F0` |
| Banners | `Alert` | CLI-add; rose for guardrail |
| Confidence ring | CSS/SVG | Not linear `Progress` |

Gold-standard card: [`.devtool/features/done/industry-niche-input-2026-09-18.md`](../../../.devtool/features/done/industry-niche-input-2026-09-18.md).
