---
id: "review-queue-draft-studio-2026-09-20"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-20T14:45:00.000Z"
modified: "2026-09-20T14:45:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-review-queue-2026-09-20"]
order: "a4"
---

# Review queue draft studio

Center-pane composer: subject, manual-edit body, token preview, anchored entity chips, re-generate hook. Presentational only.

Parent epic: [`epic-review-queue-2026-09-20`](epic-review-queue-2026-09-20.md)

## File and primitives

- File: `components/queue/queue-draft-studio.tsx`
- shadcn: `Label`, `Input`, `Textarea`, `Badge`, `Button`
- Anchored entities are `Badge` (or styled `code`) with JetBrains Mono `code-sm`. Do not invent a token primitive.
- lucide: small format icons on the body toolbar if needed; map Material to lucide. Do not use a Material icon font.
- Subject/body stay `Label` + `Input` / `Textarea`. Do not use shadcn `Field` unless it already exists in `components/ui/`.

## Stitch contract

Source: LocalDraft - Review Queue (`projects/13798460973041177032/screens/edf29e27a2824c4da2952f5bd12988fa`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- Subject label: `SUBJECT LINE`.
- Subject counter: `53 chars` (driven by current subject length).
- Subject value stem: `Quick question regarding online booking at Lones` (truncated; do not invent the rest).
- Body eyebrow: `EMAIL BODY (MANUAL EDIT MODE)`.
- Helper: `Plain text format`.
- Toolbar: `Token preview active` • `Plain Text Preview`.
- Body stem (verbatim, stop at screenshot truncation):

```
Hi Marcus,

Noticed that Lonestar Air has been serving South Austin since 2011 and that you offer same-day emergency AC dispatch.

While checking your site on mobile, I saw that your 'Book Emergency Service' button links directly to a desktop PDF form rather than an instant mobile scheduler, which might be costing you calls during high-heat times.

I recorded a quick 3-minute video showing two simple tweaks to make mobile booking one-click for Austin
```

- Anchored entities label: `Anchored Entities:`.
- Tokens: `#longevity-2011`, `#247-emergency-dispatch`, `#mobile-pdf-glitch`.
- Control: `Re-generate Hook`.

Identity (`Draft for Marcus Vance`) and send buttons are other stories. Do not mount them here.

## Props

Typed mock-driven props. No LLM call, autosave API, or mail send.

- `subject: string`
- `onSubjectChange: (value: string) => void`
- `body: string`
- `onBodyChange: (value: string) => void`
- `tokenPreviewActive: boolean`
- `onTokenPreviewChange: (value: boolean) => void`
- `onPlainTextPreview: () => void`
- `entities: { id: string; label: string }[]`
- `onRegenerateHook: () => void`
- `disabled?: boolean`
- `className?: string`

Export `QUEUE_DRAFT_SUBJECT` and `QUEUE_DRAFT_BODY` as the Stitch stems. Export `QUEUE_DRAFT_ENTITIES` as the three tokens.

## Visual tokens

- Labels: `label-sm` uppercase tracked `#64748B` for `SUBJECT LINE` / `EMAIL BODY (MANUAL EDIT MODE)`.
- Inputs: white, `1px solid #CBD5E1`, 6px radius, body-md 13px, teal focus ring.
- Char counter: `label-sm` `#64748B`.
- `Token preview active`: teal/sky tint chip. `Plain Text Preview` is a ghost/secondary control, not primary teal.
- Entity chips: `#F1F5F9` fill, `1px solid #E2E8F0`, `#0F766E` text, 4px radius, `code-sm`.
- `Re-generate Hook`: secondary 32px button, not the primary send control.

## Acceptance Criteria

- [ ] Subject label is `SUBJECT LINE`; filled value is the Stitch stem; counter shows `53 chars` when that stem is 53 characters (or the live `subject.length` plus ` chars`).
- [ ] Body eyebrow is `EMAIL BODY (MANUAL EDIT MODE)` with helper `Plain text format`; textarea contains the Stitch body stem and calls `onBodyChange`.
- [ ] Toolbar exposes `Token preview active` and `Plain Text Preview`; the latter calls `onPlainTextPreview` only.
- [ ] Anchored Entities renders `#longevity-2011`, `#247-emergency-dispatch`, `#mobile-pdf-glitch`.
- [ ] `Re-generate Hook` calls `onRegenerateHook` only (no LLM). Empty subject/body still render the labelled fields. Disabled freezes inputs and actions.
- [ ] Labels are associated with subject and body. Isolation: no To/mailto cluster, no Mark as Ready, no citation cards, no persistence.

## Further breakdown

- [ ] Do not complete truncated subject/body with invented copy
- [ ] Entity chips are not dismissible unless Stitch shows a dismiss control (it does not)
