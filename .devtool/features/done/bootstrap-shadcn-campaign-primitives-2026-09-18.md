---
id: "bootstrap-shadcn-campaign-primitives-2026-09-18"
status: "done"
priority: "high"
assignee: null
dueDate: null
created: "2026-09-18T20:51:00.000Z"
modified: "2026-09-18T21:10:00.000Z"
completedAt: "2026-09-18T21:10:00.000Z"
labels: ["story", "epic:epic-campaign-setup-2026-09-18"]
order: "a1"
---

# Bootstrap shadcn campaign primitives

Initialize shadcn/ui so Campaign Setup widgets can compose registry primitives. Do not hand-write `components/ui/`. Do not assemble the Campaign Setup page.

Parent epic: [`epic-campaign-setup-2026-09-18`](../epic-campaign-setup-2026-09-18.md)

## File and primitives

- `components.json` via the shadcn CLI
- Registry: `Select`, `Badge`, `Separator`, `Label`, `Input`, `Button`, `Card`
- `lib/utils` `cn` helper for registry imports
- Operator Core tokens in `app/globals.css` (primary `#0F766E`, canvas `#F8FAFC`, surfaces `#FFFFFF`, borders `#E2E8F0`)

## Acceptance Criteria

- [x] `components.json` exists and points UI at `components/ui/`
- [x] Select, Badge, Separator, Label, Input, Button, and Card are CLI-added under `components/ui/`
- [x] Registry files import `cn` from the project utils alias (not a hand-rolled primitive in `components/campaigns/`)
- [x] CSS variables use Operator Core designMd tokens, not Stitch Material namedColors
- [x] No Campaign Setup route or page assembly (`app/(auth)/campaigns/new/page.tsx` remains unbuilt)

## Further breakdown

- [x] Minimal Next/Tailwind scaffolding required for the shadcn CLI (`tsconfig`, PostCSS, root layout, `globals.css`)
- [x] Add only the primitives listed above
