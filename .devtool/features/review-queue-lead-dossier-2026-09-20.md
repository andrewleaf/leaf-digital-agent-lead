---
id: "review-queue-lead-dossier-2026-09-20"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-20T14:45:00.000Z"
modified: "2026-09-20T14:45:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-review-queue-2026-09-20"]
order: "a3"
---

# Review queue lead dossier

Draft-pane identity cluster: recipient, owner listing, To/mailto, saved/session, word-count gate. Presentational only.

Parent epic: [`epic-review-queue-2026-09-20`](epic-review-queue-2026-09-20.md)

## File and primitives

- File: `components/queue/queue-lead-dossier.tsx`
- shadcn: `Badge`, `Label`, `Separator`
- Stitch has no independent middle research column. This widget is the **listing identity** at the top of the center pane, not a third column and not the citation rail.
- lucide: `BadgeCheck` (or equivalent) for `Verified public mailto`. Do not use a Material icon font.

## Stitch contract

Source: LocalDraft - Review Queue (`projects/13798460973041177032/screens/edf29e27a2824c4da2952f5bd12988fa`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- Title: `Draft for Marcus Vance`.
- Subtitle: `Owner, Lonestar Air & Heating`.
- Saved meta: `Saved 12s ago`.
- Session: `Session #488-TX`.
- To label: `To:`.
- To value: `marcus@lonestarair-tx.com`.
- Mailto chip: `Verified public mailto`.
- Length: `118 words • Phone-readable (<150w)`.

Empty: no selected lead — title/To hidden or vacant, no invented recipient. Do not copy citation claims into this widget.

## Props

Typed mock-driven props. No draft persistence or mail client.

- `recipientName: string | null`
- `ownerLabel: string | null`
- `savedLabel?: string`
- `sessionLabel?: string`
- `toAddress: string | null`
- `mailtoVerified: boolean`
- `wordCount: number | null`
- `wordCountCaption?: string`
- `disabled?: boolean`
- `className?: string`

Filled mock: `recipientName: "Marcus Vance"`, `ownerLabel: "Owner, Lonestar Air & Heating"`, `savedLabel: "Saved 12s ago"`, `sessionLabel: "Session #488-TX"`, `toAddress: "marcus@lonestarair-tx.com"`, `mailtoVerified: true`, `wordCount: 118`, `wordCountCaption: "Phone-readable (<150w)"`.

Title is the Stitch pattern `Draft for {recipientName}`. When `recipientName` is null, do not render a fake `Draft for`.

## Visual tokens

- Title `headline-md` / `headline-sm` `#0F172A`.
- Subtitle and To value `body-md`; To address may use `code-sm`.
- Saved / session: `label-sm` / `body-sm` `#64748B`. Session chip may use emerald tint.
- `Verified public mailto`: emerald `#047857` / `#ECFDF5` / `#A7F3D0`, 20px chip.
- Word-count line: meta `#64748B`; keep `<150w` visible as Stitch copy.

## Acceptance Criteria

- [ ] Filled mock title is `Draft for Marcus Vance` with subtitle `Owner, Lonestar Air & Heating`.
- [ ] Meta shows `Saved 12s ago` and `Session #488-TX`.
- [ ] To field is labelled `To:` and displays `marcus@lonestarair-tx.com`; `Verified public mailto` shows only when `mailtoVerified` is true.
- [ ] Word-count line interpolates `118 words • Phone-readable (<150w)` from `wordCount` + caption.
- [ ] Empty (`recipientName` / `toAddress` null) does not invent a recipient or address. Disabled is read-only (no implied edit).
- [ ] Isolation: no citations, no subject/body editor, no send buttons, no persistence.

## Further breakdown

- [ ] Export filled-mock constants for the scaffold
- [ ] Do not duplicate Negative Constraints Check here (citation-panel story)
