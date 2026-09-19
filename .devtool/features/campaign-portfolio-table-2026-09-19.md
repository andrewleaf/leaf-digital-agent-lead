---
id: "campaign-portfolio-table-2026-09-19"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T21:00:00.000Z"
modified: "2026-09-19T21:00:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaigns-admin-dashboard-2026-09-19"]
order: "a9"
---

# Campaign portfolio table

Campaign-level health table with metro, stage, targets, desk queue, operator, integrity, and next action. Mock rows only.

Parent epic: [`epic-campaigns-admin-dashboard-2026-09-19`](epic-campaigns-admin-dashboard-2026-09-19.md)

## File and primitives

- File: `components/campaigns/campaign-portfolio-table.tsx`
- shadcn: `Table` (`TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`), `Badge`, `Button`, `Avatar` (installed)
- If `Table` is missing from `components/ui/`, CLI-add it (`npx shadcn@latest add table`). Do not hand-roll a `<table>` primitive in `components/campaigns/`.
- lucide: `PauseCircle` for Stitch `pause_circle`, `CheckCircle2` for `check_circle`, `EllipsisVertical` for `more_vert`, `Reply` for `reply`. Initials via `Avatar` / `AvatarFallback`. Do not use the Material icon font.
- Do not import [`pipeline-workbench-table`](pipeline-workbench-table-2026-09-19.md). Columns and rows differ.
- Overflow is a `Button` with an accessible name. Do not CLI-add `dropdown-menu` unless the HTML contains a real menu.

## Stitch contract

Source: LocalDraft - Campaigns Admin Dashboard (`projects/13798460973041177032/screens/e569b1bad7964515ae9b8da0edd42ce4`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

Section: `Campaign Portfolio & Health` with count chip `6 Monitored`.

Column headers (uppercase tracked `label-sm`): `Campaign & Metro`, `Pipeline Stage`, `Targets`, `Desk Queue`, `Operator`, `Integrity`, `Actions`.

Filled mock rows:

1. Initials `A` — `Central Texas HVAC Outbound` — metros `Austin, Round Rock, Cedar Park` — `Stage 5/6 Draft Assembly` — `128 targets` / `121 verified (94.5%)` — `14 ready` / `84 sent` — `Alex M.` — `98%` — `Triage`. Tone `active`.
2. Initials `S` — `DFW Commercial Roofing & Restoration` — `Dallas, Fort Worth, Plano` — `Stage 4/6 Public Scrapes` — `340 targets` / `318 verified (93.5%)` — `42 in scrape` — `Sarah K.` — `96%` — `Triage`. Tone `scrape`.
3. Initials `M` — `Greater Chicago Mechanical & Boiler` — `Chicago, Evanston, Naperville` — `Stage 6/6 Human Review` — `215 targets` / `208 verified (96.7%)` — `32 ready` / `140 sent` — `Marcus T.` — `100%` — `Triage`. Tone `review`.
4. Initials `E` — `Denver Metro High-End Auto Detail` — `Denver, Boulder, Aurora` — `Stage 2/6 Discovery` — `184 targets` / `172 live sites` — `Indexing maps...` — `Elena R.` — `94%` — `Triage`. Tone `discovery`.
5. Initials `P` (or none) — `Phoenix Valley Emergency Plumbing` — `Phoenix, Scottsdale, Mesa` — `Paused: Capacity Guard` — `290 targets` / `275 verified` — `45 held` — `Unassigned` — `Check` — `Resume`. Tone `paused` (amber).
6. Initials `S` — `Atlanta Metro Orthodontic & Pediatric Clinics` — `Buckhead, Alpharetta, Midtown` — `Follow-up Cycle` — `271 targets` / `261 verified` — `58 (27.6%) Replies` — `Sarah K.` — `100%` — `Audit`. Tone `follow-up`.

Action labels stay verbatim. Do not invent extra columns.

## Props

Typed mock-driven props. No campaign API, pause, or review-queue route.

- `title?: string` (default Stitch `Campaign Portfolio & Health`)
- `monitoredCount: number`
- `rows: { id: string; initials: string; name: string; metros: string; stageLabel: string; stageTone: "active" | "scrape" | "review" | "discovery" | "paused" | "follow-up"; targetsLabel: string; verifiedLabel: string; queuePrimary: string; queueSecondary?: string; operatorName: string; operatorInitials?: string; integrityLabel: string; actionLabel: string; actionTone: "primary" | "secondary" }[]`
- `onAction: (id: string) => void`
- `onMore?: (id: string) => void`
- `className?: string`

Export `CAMPAIGN_PORTFOLIO_ROWS` as the six Stitch mocks. Empty mock: `rows: []` still shows headers and `0 Monitored` or the provided count.

This table does not filter by metro; the parent mock passes already-filtered `rows`.

## Visual tokens

- Section title: `headline-md` 18px / 600, `#0F172A`. Count chip: 20px, 4px, teal tint `#F0FDFA` / `#0F766E`.
- Header row: tint `#F8FAFC`, `label-sm` 11px uppercase tracked, `#64748B`.
- Body: `body-md` 13px. Row hover `#F8FAFC`. Compact row ~44–56px (name + metro stack).
- Name: `#0F172A` semibold. Metro line: `body-sm` `#64748B`.
- Stage `active` / `review`: teal tint `#F0FDFA` / `#0F766E`. `discovery` / `scrape`: sky `#0284C7`. `paused`: amber `#FFFBEB` / `#D97706`. `follow-up`: emerald `#ECFDF5` / `#047857`.
- Integrity `100%`: emerald. `Check` on the paused row: amber text, not a fake percentage.
- `Unassigned` operator: muted `#64748B`, no avatar fill required.
- Primary action (`Triage`): `#0F766E`, white text, 28px (`h-7`), 6px radius, `label-sm`.
- Secondary (`Resume`, `Audit`): white / `#E2E8F0` / `#0F172A`, same height.
- Overflow: ghost `Button`, 28px, icon only, accessible name `More actions for {name}`.
- Paused row may use a light amber surface tint; do not paint the whole table amber.

## Acceptance Criteria

- [ ] Column headers match `Campaign & Metro`, `Pipeline Stage`, `Targets`, `Desk Queue`, `Operator`, `Integrity`, `Actions`.
- [ ] Filled mock renders the six Stitch campaigns with names, metros, stage labels, target lines, queue lines, operators, integrity labels, and action labels above.
- [ ] `Triage` uses the primary teal button; `Resume` and `Audit` use secondary. Clicks call `onAction(id)` only.
- [ ] Phoenix row shows `Paused: Capacity Guard`, `Unassigned`, integrity `Check`, and action `Resume`.
- [ ] Empty `rows` renders headers and an empty body (no invented campaigns). Isolation: no fetch, no metro filter logic, no route.
- [ ] `Table` lives in `components/ui/` (CLI-add if missing). Header cells are `th`; overflow buttons have accessible names.

## Further breakdown

- [ ] Export the six-row mock constant for page-assembly later
- [ ] CLI-add watch: if `table` emits a bad `cn` import, correct to `@/lib/utils`
- [ ] Do not open a menu on `more_vert` unless a dropdown primitive is already in `components/ui/`
