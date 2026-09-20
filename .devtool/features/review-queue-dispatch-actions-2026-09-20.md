---
id: "review-queue-dispatch-actions-2026-09-20"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-20T14:45:00.000Z"
modified: "2026-09-20T14:45:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-review-queue-2026-09-20"]
order: "a6"
---

# Review queue dispatch actions

Manual-gate cluster: Mark as Ready, Copy Draft & Open Mail Client, strictly manual footer. Callbacks only.

Parent epic: [`epic-review-queue-2026-09-20`](epic-review-queue-2026-09-20.md)

## File and primitives

- File: `components/queue/queue-dispatch-actions.tsx`
- shadcn: `Button`, `Alert` (optional for the strictly-manual footer; compose `AlertTitle` / `AlertDescription` or equivalent text if `Alert` already fits — do not invent a toast primitive)
- lucide: `Copy` / `ExternalLink` / `Mail` for the primary; `BadgeCheck` or `ShieldCheck` for the footer. Do not use a Material icon font.
- Do not CLI-add a mailer. Do not import [`campaign-pipeline-actions`](done/campaign-pipeline-actions-2026-09-19.md).

## Stitch contract

Source: LocalDraft - Review Queue (`projects/13798460973041177032/screens/edf29e27a2824c4da2952f5bd12988fa`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- Secondary: `Mark as Ready`.
- Primary: `Copy Draft & Open Mail Client`.
- Footer: `Strictly Manual: LocalDraft never sends emails on your behalf. All dispatches occur via your native mail client.`
- The screen has no `Send`, `Send all`, or blast control. Do not add one.

## Props

Typed mock-driven props. No clipboard, mailto URL builder, or status writes inside the widget.

- `onMarkReady: () => void`
- `onCopyAndOpenMail: () => void`
- `disabled?: boolean`
- `pending?: boolean`
- `className?: string`

`pending` busies/disables the primary without implying a live send queue (same idea as pipeline actions `pending`).

## Visual tokens

- Secondary `Mark as Ready`: white, `1px solid #E2E8F0`, text `#0F172A`, 32px, 6px radius.
- Primary `Copy Draft & Open Mail Client`: `#0F766E`, white text, hover `#115E59`, 32px, 6px radius.
- Footer: teal/emerald text `#0F766E` / `#047857` on a light teal tint (`#F0FDFA`), not rose (this confirms the manual gate).
- Disabled: both actions non-interactive; footer still visible.

## Acceptance Criteria

- [ ] Secondary label is `Mark as Ready` and calls `onMarkReady` only.
- [ ] Primary label is `Copy Draft & Open Mail Client` and calls `onCopyAndOpenMail` only (no `clipboard` / `mailto:` inside the component).
- [ ] Footer copy matches `Strictly Manual: LocalDraft never sends emails on your behalf. All dispatches occur via your native mail client.`
- [ ] Default, disabled, and pending (primary busy/disabled) states render in isolation.
- [ ] No Send or Send-all control is rendered. Isolation: no status-machine, SMTP, or toast library unless `sonner` is already the repo pattern **and** Stitch shows a toast (it does not — skip toasts).
- [ ] Both buttons have accessible names matching their visible labels.

## Further breakdown

- [ ] Do not wire Mark as Ready to queue status enums
- [ ] Do not open a real mail client from this story
