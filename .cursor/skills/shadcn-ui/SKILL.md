---
name: shadcn-ui
description: >-
  Apply shadcn/ui and LocalDraft Operator Core when building UI, adding
  components, styling pages, mapping Stitch screens, or using registry
  primitives (Button, Card, Select, Badge).
---

# shadcn/ui

This repo’s UI style guide is **shadcn/ui** composed with **LocalDraft Operator Core** tokens. Prefer registry components over custom primitives.

## Before writing UI

1. Confirm a Kanban story card is in Doing (see [`agenda.md`](../../../agenda.md) and the kanban-markdown skill).
2. Discover primitives from [ui.shadcn.com/docs](https://ui.shadcn.com/docs) and the shadcn CLI. Do **not** call `user-shadcn` MCP — that namespace is not installed.
3. If `components.json` is missing, stop. Create or claim a bootstrap story. Do not hand-write `components/ui/`.

## Stitch → shadcn

- Pull copy and layout from the story’s Stitch contract / parent epic (`get_project`, `get_screen`, `list_design_systems` when needed).
- Map widgets to registry names: Select, Badge, Input, Label, Button, Card, Alert, Textarea, Switch, ToggleGroup.
- Tokens come from Operator Core **designMd**, not Stitch Material `namedColors` (`#faf8ff`, primary `#005c55`). See [references/operator-core.md](references/operator-core.md).
- Circular indicators (e.g. confidence rings) may be CSS or a small SVG. Do not add a chart library for one ring. Linear `Progress` is not a substitute when the contract specifies a ring.

## Conventions

- Compose from shadcn; do not reimplement Button, Dialog, Input, Card, Select.
- Campaign presentational widgets live under `components/campaigns/`.
- After adding registry files, use the CLI; do not paste a parallel primitive into a feature folder.

## References

- https://ui.shadcn.com/docs
- [Operator Core tokens](references/operator-core.md)
- Process: [`agenda.md`](../../../agenda.md)
