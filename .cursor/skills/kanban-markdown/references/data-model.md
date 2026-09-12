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

```markdown
# Feature Title

Description of the feature.

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
```

## Further reading

- Extension README: https://github.com/LachyFS/kanban-markdown-vscode-extension
- Upstream skill: https://github.com/LachyFS/kanban-skill
