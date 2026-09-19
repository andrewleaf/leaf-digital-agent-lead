---
id: "pipeline-workbench-footer-2026-09-19"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-19T18:20:00.000Z"
modified: "2026-09-19T18:20:00.000Z"
completedAt: null
labels: ["story", "component", "epic:epic-campaign-pipeline-2026-09-19"]
order: "a6"
---

# Pipeline workbench footer

Workbench count line, retry-interval copy, and Previous / Next pager. Presentational controls only.

Parent epic: [`epic-campaign-pipeline-2026-09-19`](epic-campaign-pipeline-2026-09-19.md)

## File and primitives

- File: `components/campaigns/pipeline-workbench-footer.tsx`
- shadcn: `Button`
- Do not CLI-add `Pagination` for a two-button pager. Do not invent a second button primitive. Do not run a retry timer.

## Stitch contract

Source: LocalDraft - Campaign Pipeline (`projects/13798460973041177032/screens/81796119faa94a379c970ac48a6add3d`). Tokens: Operator Core **designMd**, not Stitch Material `namedColors`.

- Count: `Displaying 5 of 128 targets in execution pipeline`.
- Retry: `Automatic Retry Interval: 30s`.
- Pager: `Previous` (disabled on page 1), current `1 of 26`, `Next`.

The count pattern is `Displaying {shown} of {total} targets in execution pipeline`. The retry pattern is `Automatic Retry Interval: {interval}`. The page pattern is `{page} of {pageCount}`.

## Props

Typed mock-driven props. No paging API and no interval timer.

- `shown: number`
- `total: number`
- `retryInterval: string` (display string such as `30s`)
- `page: number`
- `pageCount: number`
- `onPrevious: () => void`
- `onNext: () => void`
- `className?: string`

Filled mock: `shown: 5`, `total: 128`, `retryInterval: "30s"`, `page: 1`, `pageCount: 26`. `Previous` is disabled when `page <= 1`. `Next` is disabled when `page >= pageCount`.

## Visual tokens

- Strip: tint `#F8FAFC` at ~30%, top border `1px solid #E2E8F0`, padding 12px.
- Copy: `body-sm` 12px, `#64748B`. Retry line uses emerald `#047857` (Stitch tertiary) and medium weight.
- Dot separator: 4px, `#94A3B8`.
- Pager buttons: secondary, 28px height (`h-7`), 6px radius, `label-sm`. Disabled opacity 50%.
- Page index: `code-sm` `#0F172A` semibold, horizontal padding 8px.

## Acceptance Criteria

- [ ] Filled mock reads `Displaying 5 of 128 targets in execution pipeline`, `Automatic Retry Interval: 30s`, and `1 of 26`.
- [ ] Count, retry, and page strings are interpolated from props; the component does not hard-code `5`, `128`, or `30s`.
- [ ] `Previous` is disabled on page 1; `Next` is enabled. On the last page, `Next` is disabled and `Previous` is enabled. Clicks fire `onPrevious` / `onNext` only.
- [ ] The component does not start a 30s timer, poll, or slice table rows.
- [ ] Default (page 1), middle page, last page, and single-page (`pageCount: 1`, both buttons disabled) states render in isolation.
- [ ] Buttons have accessible names `Previous` and `Next`; the page index is text, not color-only.

## Further breakdown

- [ ] Do not import the table; footer is a sibling composed later on the page
- [ ] Empty total (`total: 0`, `shown: 0`, `pageCount: 1`) still uses the Stitch sentence pattern
