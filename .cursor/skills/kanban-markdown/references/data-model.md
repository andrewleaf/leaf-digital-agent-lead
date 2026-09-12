# Kanban-Markdown Data Model

Adapted from the [LachyFS kanban-skill](https://github.com/LachyFS/kanban-skill) data model. Prefer this file for exact frontmatter rules when creating or editing cards.

## Feature File Format

Each feature is a markdown file with YAML frontmatter. Files live in `.devtool/features/`, with completed features in `done/`.

### Frontmatter Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | `string` (quoted) | Generated from title + date | Unique identifier, matches filename without `.md` |
| `status` | `string` (quoted) | `"backlog"` | Current column |
| `priority` | `string` (quoted) | `"medium"` | Priority level |
| `assignee` | `string` (quoted) or `null` | `null` | Person assigned |
| `dueDate` | `string` (quoted) or `null` | `null` | Due date as `"YYYY-MM-DD"` |
| `created` | `string` (quoted) | ISO 8601 timestamp | Creation time |
| `modified` | `string` (quoted) | ISO 8601 timestamp | Last modification time |
| `completedAt` | `string` (quoted) or `null` | `null` | Completion time (set when moved to done) |
| `labels` | `array` | `[]` | List of label strings |
| `order` | `string` (quoted) | Fractional index (e.g. `"a0"`) | Lexicographic sort position within column |

### Enum Values

**status**: `backlog` | `todo` | `in-progress` | `review` | `done`

**priority**: `critical` | `high` | `medium` | `low`

This repo’s board UI columns (see `.vscode/settings.json`): Backlog, Todo, Doing, Done. `review` is valid in frontmatter if added later.

## ID Generation

1. Take the title (from the first `# Heading` in content)
2. Lowercase
3. Remove all characters except `a-z`, `0-9`, spaces, hyphens
4. Replace spaces with hyphens; collapse multiple hyphens; trim ends
5. Truncate to 50 characters
6. Append `-YYYY-MM-DD`
7. If slug is empty, use `feature-YYYY-MM-DD`

## Exact Serialization Format

```
---
id: "my-feature-2026-09-11"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-11T00:00:00.000Z"
modified: "2026-09-11T00:00:00.000Z"
completedAt: null
labels: []
order: "a0"
---
```

Rules:

- String values: always double-quoted
- Nullable strings: bare `null` when unset
- Labels: `["label1"]` or `[]`
  - Epic card: `labels: ["epic"]`
  - Story card: `labels: ["story", "epic:<epic-id>"]`
- Field order must match the template exactly
- One blank line between closing `---` and content

### Fractional Index Ordering

- Empty column: `"a0"`
- Append after last: `"a0"` → `"a1"` → … (base-62: `0-9`, `A-Z`, `a-z`)

## File Storage

- Active (`backlog`, `todo`, `in-progress`, `review`): `.devtool/features/{id}.md`
- Done: `.devtool/features/done/{id}.md`

## Status Transitions

**To `done`:** set `completedAt`, move file into `done/`, update `modified`.

**From `done`:** set `completedAt` to `null`, move file back to features root, update `modified`.

## Content Format

### Story Cards

Standard actionable cards claimed to **Doing** before writing code:

```markdown
# Feature Title

Description of the feature.

Parent epic: [`epic-id`](epic-id.md)

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2

## Further breakdown

- [ ] Candidate subtask or child slice 1
- [ ] Candidate subtask or child slice 2
```

### Epic Cards

Planning parents that group related stories and capture comprehensive technical and domain specifications:

```markdown
# Epic Title

## 1. Intent & Business Value
Problem solved, beneficiaries, and business outcome.

## 2. Source Specifications
Full domain rules, data contracts, tables, and constraints transcribed from PRD/proposal.

## 3. Scope Boundaries
- **In Scope (v1)**: Delivered capabilities.
- **Explicit Non-Goals (v2+)**: Deferred features to avoid scope creep.

## 4. Architecture & Flow
Mermaid flowcharts, state diagrams, and schema definitions.

## 5. Stories
- [Story Title](story-id.md) (`story-id`): Story role.

## 6. Milestone Definition of Done
Functional, testable completion criteria for the milestone.
- [ ] Condition 1
- [ ] Condition 2

## 7. Dependencies & Sequencing
- **Prerequisites**: Required prior epics.
- **Unblocks**: Subsequent epics or phases.
```

See [card-format.md](card-format.md) for full examples.

## Further reading

- Extension README: https://github.com/LachyFS/kanban-markdown-vscode-extension
- Upstream skill: https://github.com/LachyFS/kanban-skill
