---
id: "full-status-model-2026-09-12"
status: "backlog"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-12T14:54:00.000Z"
modified: "2026-09-12T14:54:00.000Z"
completedAt: null
labels: ["story", "epic:epic-agent-workspace-2026-09-12"]
order: "ad"
---

# Full status model

Implement statuses: New, Enriched, Drafted, Needs edit, No email, Skipped, Ready, Sent, Replied, Follow-up due.

Parent epic: [`epic-agent-workspace-2026-09-12`](epic-agent-workspace-2026-09-12.md)

## Acceptance Criteria

- [ ] All statuses from proposal section 9 exist in the model
- [ ] Agent can transition statuses with meaning preserved
- [ ] Sent stores sent date

## Further breakdown

- [ ] Status enum + transitions
- [ ] UI status control
- [ ] Bulk skip/no-email actions
