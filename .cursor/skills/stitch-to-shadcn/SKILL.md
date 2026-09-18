---
name: stitch-to-shadcn
description: >-
  Map Stitch screens and Operator Core tokens onto shadcn component
  stories and campaign widgets. Use when writing or updating Kanban
  cards with the component label, pulling Stitch MCP (get_screen,
  get_project, list_design_systems), or composing LocalDraft UI from
  a Stitch contract.
---

# Stitch → shadcn

Presentational widgets come from Stitch copy and Operator Core tokens, then compose **shadcn registry** primitives. Do not implement React until the matching card is in Doing.

## Workflow

1. Read the parent epic Stitch table (project + screen ids).
2. Call `user-stitch` `get_screen` and `list_design_systems` (`projectId` without the `projects/` prefix). Use `get_project` only for instance ids / screen list.
3. Tokens: [operator-core.md](../shadcn-ui/references/operator-core.md) and MCP pitfalls in [references/mcp-contract.md](references/mcp-contract.md).
4. Write or update a **Component Story** (full sections — stubs are invalid). See [kanban card-format](../kanban-markdown/references/card-format.md).
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
