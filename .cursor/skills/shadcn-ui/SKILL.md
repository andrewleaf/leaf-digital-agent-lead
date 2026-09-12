---
name: shadcn-ui
description: >-
  Apply shadcn/ui as this project's UI style guide. Use when building UI,
  adding components, styling pages, or when the user mentions shadcn, registry
  components, or the design system.
---

# shadcn/ui

This repo’s UI style guide is **shadcn/ui**. Prefer registry components and patterns over custom primitives.

## Before writing UI

1. Confirm a Kanban story card is in Doing (see [`agenda.md`](../../../agenda.md) and the kanban-markdown skill).
2. Discover components via the `user-shadcn` MCP tools (`search_items_in_registries`, `view_items_in_registries`, `get_item_examples_from_registries`, `get_add_command_for_items`).
3. If `components.json` is missing, stop and create a story for project/UI bootstrap before inventing a parallel design system.

## Conventions

- Compose from shadcn components; do not reimplement Button, Dialog, Form, etc.
- Match existing theme tokens / CSS variables once the project is initialized.
- After adding components, run the MCP audit checklist when available.

## References

- https://ui.shadcn.com/docs
- Project process: [`agenda.md`](../../../agenda.md)
