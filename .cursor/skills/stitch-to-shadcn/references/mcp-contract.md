# Stitch MCP contract

Project, screens, and design-system IDs: [projects.md](projects.md). Default is `agent-lead workspace` (`13798460973041177032`) and Operator Core `assets/1d9cca68b81c458ea10d71779c1a76ae`. Do not invent IDs; pick a catalog row before `get_screen`.

## What to trust

| Source | Use |
|---|---|
| `list_design_systems` → `styleGuidelines` | Operator Core prose (canvas `#F8FAFC`, primary `#0F766E`, chip/card density) |
| `designMd` sections `## Colors`, `## Components`, `## Shapes` | Same Operator Core tokens |
| Parent epic “Screen copy and component inventory” | Verbatim labels, helpers, filled mocks |
| [operator-core.md](../../shadcn-ui/references/operator-core.md) | Canonical token tables in-repo |

## What to ignore

| Source | Why |
|---|---|
| `theme.namedColors` | Material dump: surface `#faf8ff`, primary `#005c55` |
| YAML `colors:` block at the top of `designMd` | Same Material dump; it is **not** Operator Core |
| Generated HTML Material classes | Lose to Operator Core radii and teal |

`list_design_systems` needs `projectId` (`13798460973041177032`). Empty args list global systems and may error.

## Lucide for Stitch icons

| Stitch / Material | lucide |
|---|---|
| `unfold_more` | Select chevron (do not add a second icon) |
| `storefront` | `Store` |
| `location_on` | `MapPin` |
| `block` / prohibition | `Ban` or `OctagonX` |
| Guardrail / protocol | `ShieldAlert` |
| Dismiss chip | `X` |

## Missing registry files

CLI-add (`npx shadcn@latest add …`) when the story names a primitive not in `components/ui/`. Do not paste a parallel primitive into `components/campaigns/`.

Installed today: Button, Badge, Select, Separator, Input, Label, Card.  
Named on remaining Campaign Setup stories: Alert, Textarea.

## Isolation

Component stories: typed mock props only. No `app/(auth)/campaigns/new`, no persistence, no discovery APIs.
