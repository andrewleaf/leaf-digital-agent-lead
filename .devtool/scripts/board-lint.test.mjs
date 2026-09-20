import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { RULES, lintBoard } from "./board-lint.mjs";
import { serializeCard } from "./frontmatter.mjs";

let featuresDir;

beforeEach(() => {
  featuresDir = mkdtempSync(path.join(tmpdir(), "board-lint-"));
  mkdirSync(path.join(featuresDir, "done"));
});

afterEach(() => {
  rmSync(featuresDir, { recursive: true, force: true });
});

const EPIC_ID = "epic-parent-2026-09-20";

function fields(overrides = {}) {
  return {
    id: "widget-2026-09-20",
    status: "todo",
    priority: "medium",
    assignee: null,
    dueDate: null,
    created: "2026-09-20T00:00:00.000Z",
    modified: "2026-09-20T00:00:00.000Z",
    completedAt: null,
    labels: ["story", `epic:${EPIC_ID}`],
    order: "a0",
    ...overrides,
  };
}

function body(text = "# Widget\n\n## Acceptance Criteria\n\n- [x] Shipped\n") {
  return text;
}

/** Writes a card and returns its board-relative path. */
function writeCard(overrides = {}, options = {}) {
  const card = fields(overrides);
  const inDone = options.inDone ?? card.status === "done";
  const dir = inDone ? path.join(featuresDir, "done") : featuresDir;
  const name = `${options.filename ?? card.id}.md`;
  writeFileSync(path.join(dir, name), serializeCard(card, body(options.body)));
  return inDone ? path.join("done", name) : name;
}

function writeEpic(overrides = {}) {
  return writeCard(
    {
      id: EPIC_ID,
      status: "backlog",
      priority: "high",
      labels: ["epic"],
      order: "a0",
      ...overrides,
    },
    {
      body: "# Parent\n\n## 6. Milestone Definition of Done\n\n- [x] Shipped\n",
    },
  );
}

function writeRaw(name, text) {
  writeFileSync(path.join(featuresDir, name), text);
  return name;
}

function lint() {
  return lintBoard(featuresDir);
}

function rulesFor(file) {
  return lint()
    .violations.filter((violation) => violation.file === file)
    .map((violation) => violation.rule);
}

describe("a valid board", () => {
  it("reports no violations", () => {
    writeEpic();
    writeCard({ order: "a1" });
    writeCard({
      id: "finished-2026-09-20",
      status: "done",
      completedAt: "2026-09-20T01:00:00.000Z",
      modified: "2026-09-20T01:00:00.000Z",
      order: "a1",
    });

    const result = lint();
    expect(result.violations).toEqual([]);
    expect(result.cardCount).toBe(3);
    expect(result.byStatus.done).toBe(1);
  });

  it("tolerates the `epic: null` field the board extension writes", () => {
    writeEpic();
    const file = writeRaw(
      "extension-written-2026-09-20.md",
      `---
id: "extension-written-2026-09-20"
status: "todo"
priority: "medium"
assignee: null
epic: null
dueDate: null
created: "2026-09-20T00:00:00.000Z"
modified: "2026-09-20T00:00:00.000Z"
completedAt: null
labels: ["story", "epic:${EPIC_ID}"]
order: "a1"
---

# Extension written
`,
    );
    expect(rulesFor(file)).toEqual([]);
  });
});

describe(RULES.frontmatter, () => {
  it("flags a reordered required field", () => {
    writeEpic();
    const file = writeRaw(
      "reordered-2026-09-20.md",
      `---
id: "reordered-2026-09-20"
priority: "medium"
status: "todo"
assignee: null
dueDate: null
created: "2026-09-20T00:00:00.000Z"
modified: "2026-09-20T00:00:00.000Z"
completedAt: null
labels: ["story", "epic:${EPIC_ID}"]
order: "a1"
---

# Reordered
`,
    );
    expect(rulesFor(file)).toContain(RULES.frontmatter);
  });

  it("flags an unknown field", () => {
    writeEpic();
    const file = writeRaw(
      "extra-field-2026-09-20.md",
      `---
id: "extra-field-2026-09-20"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-20T00:00:00.000Z"
modified: "2026-09-20T00:00:00.000Z"
completedAt: null
labels: ["story", "epic:${EPIC_ID}"]
order: "a1"
sprint: "next"
---

# Extra field
`,
    );
    const violation = lint().violations.find((item) => item.file === file);
    expect(violation.rule).toBe(RULES.frontmatter);
    expect(violation.detail).toContain("sprint");
  });

  it("flags an unquoted value", () => {
    writeEpic();
    const file = writeRaw(
      "unquoted-2026-09-20.md",
      `---
id: "unquoted-2026-09-20"
status: todo
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-20T00:00:00.000Z"
modified: "2026-09-20T00:00:00.000Z"
completedAt: null
labels: ["story", "epic:${EPIC_ID}"]
order: "a1"
---

# Unquoted
`,
    );
    expect(rulesFor(file)).toContain(RULES.frontmatter);
  });

  it("flags a file with no frontmatter", () => {
    const file = writeRaw(
      "no-frontmatter-2026-09-20.md",
      "# Just a document\n",
    );
    expect(rulesFor(file)).toEqual([RULES.frontmatter]);
  });
});

describe(RULES.idFilename, () => {
  it("flags an id that does not match the filename", () => {
    writeEpic();
    const file = writeCard({ order: "a1" }, { filename: "renamed-2026-09-20" });
    expect(rulesFor(file)).toContain(RULES.idFilename);
  });
});

describe(RULES.enums, () => {
  it("flags an unknown status", () => {
    writeEpic();
    const file = writeCard({ status: "doing", order: "a1" });
    expect(rulesFor(file)).toContain(RULES.enums);
  });

  it("flags an unknown priority", () => {
    writeEpic();
    const file = writeCard({ priority: "urgent", order: "a1" });
    expect(rulesFor(file)).toContain(RULES.enums);
  });

  it("accepts the review status even though the board has no such column", () => {
    writeEpic();
    const file = writeCard({ status: "review", order: "a1" });
    expect(rulesFor(file)).toEqual([]);
  });
});

describe(RULES.placement, () => {
  it("flags a done card left in the features root", () => {
    writeEpic();
    const file = writeCard(
      {
        status: "done",
        completedAt: "2026-09-20T01:00:00.000Z",
        modified: "2026-09-20T01:00:00.000Z",
        order: "a1",
      },
      { inDone: false },
    );
    expect(rulesFor(file)).toContain(RULES.placement);
  });

  it("flags an unfinished card filed under done/", () => {
    writeEpic();
    const file = writeCard({ order: "a1" }, { inDone: true });
    expect(rulesFor(file)).toContain(RULES.placement);
  });

  it("flags a done card with no completedAt", () => {
    writeEpic();
    const file = writeCard({ status: "done", order: "a1" });
    expect(rulesFor(file)).toContain(RULES.placement);
  });

  it("flags a completedAt on an unfinished card", () => {
    writeEpic();
    const file = writeCard({
      completedAt: "2026-09-20T01:00:00.000Z",
      order: "a1",
    });
    expect(rulesFor(file)).toContain(RULES.placement);
  });
});

describe(RULES.order, () => {
  it("flags two active cards sharing an index in one column", () => {
    writeEpic();
    writeCard({ id: "first-2026-09-20", order: "a1" });
    const file = writeCard({ id: "second-2026-09-20", order: "a1" });
    expect(rulesFor(file)).toContain(RULES.order);
  });

  it("allows the same index in different columns", () => {
    writeEpic();
    writeCard({ id: "first-2026-09-20", status: "todo", order: "a1" });
    const file = writeCard({
      id: "second-2026-09-20",
      status: "backlog",
      order: "a1",
    });
    expect(rulesFor(file)).toEqual([]);
  });

  it("does not police the done column, where cards keep their old index", () => {
    writeEpic();
    writeCard({
      id: "first-done-2026-09-20",
      status: "done",
      completedAt: "2026-09-20T01:00:00.000Z",
      modified: "2026-09-20T01:00:00.000Z",
      order: "a1",
    });
    const file = writeCard({
      id: "second-done-2026-09-20",
      status: "done",
      completedAt: "2026-09-20T01:00:00.000Z",
      modified: "2026-09-20T01:00:00.000Z",
      order: "a1",
    });
    expect(rulesFor(file)).toEqual([]);
  });

  it("flags an index with characters outside base-62", () => {
    writeEpic();
    const file = writeCard({ order: "a-1" });
    expect(rulesFor(file)).toContain(RULES.order);
  });
});

describe(RULES.epicRef, () => {
  it("flags a story whose parent epic does not exist", () => {
    const file = writeCard({
      labels: ["story", "epic:epic-missing-2026-09-20"],
    });
    expect(rulesFor(file)).toContain(RULES.epicRef);
  });

  it("flags a parent that is not labelled epic", () => {
    writeEpic({ labels: ["story", "epic:epic-other-2026-09-20"] });
    writeCard({ id: "epic-other-2026-09-20", labels: ["epic"], order: "a5" });
    const file = writeCard({ order: "a1" });
    expect(rulesFor(file)).toContain(RULES.epicRef);
  });

  it("resolves a parent epic that has already been completed", () => {
    writeEpic({
      status: "done",
      completedAt: "2026-09-20T01:00:00.000Z",
      modified: "2026-09-20T01:00:00.000Z",
    });
    const file = writeCard({ order: "a1" });
    expect(rulesFor(file)).toEqual([]);
  });
});

describe(RULES.doneCriteria, () => {
  it("flags a done card with unchecked acceptance criteria", () => {
    writeEpic();
    const file = writeCard(
      {
        status: "done",
        completedAt: "2026-09-20T01:00:00.000Z",
        modified: "2026-09-20T01:00:00.000Z",
        order: "a1",
      },
      { body: "# Widget\n\n## Acceptance Criteria\n\n- [ ] Still open\n" },
    );
    expect(rulesFor(file)).toContain(RULES.doneCriteria);
  });

  it("ignores unchecked Further breakdown items", () => {
    writeEpic();
    const file = writeCard(
      {
        status: "done",
        completedAt: "2026-09-20T01:00:00.000Z",
        modified: "2026-09-20T01:00:00.000Z",
        order: "a1",
      },
      {
        body:
          "# Widget\n\n## Acceptance Criteria\n\n- [x] Shipped\n\n" +
          "## Further breakdown\n\n- [ ] Maybe later\n",
      },
    );
    expect(rulesFor(file)).toEqual([]);
  });

  it("leaves unchecked criteria alone on active cards", () => {
    writeEpic();
    const file = writeCard(
      { order: "a1" },
      { body: "# Widget\n\n## Acceptance Criteria\n\n- [ ] Not yet\n" },
    );
    expect(rulesFor(file)).toEqual([]);
  });
});

describe(RULES.claim, () => {
  it("flags a claimed card with no assignee", () => {
    writeEpic();
    const file = writeCard({ status: "in-progress", order: "a1" });
    expect(rulesFor(file)).toContain(RULES.claim);
  });

  it("flags one assignee holding two claimed cards", () => {
    writeEpic();
    writeCard({
      id: "first-2026-09-20",
      status: "in-progress",
      assignee: "dev",
      order: "a1",
    });
    const file = writeCard({
      id: "second-2026-09-20",
      status: "in-progress",
      assignee: "dev",
      order: "a2",
    });
    const violation = lint().violations.find(
      (item) => item.rule === RULES.claim,
    );
    expect(violation.file).toBe(file);
    expect(violation.detail).toContain("2 claimed cards");
  });

  it("allows two agents to hold one card each", () => {
    writeEpic();
    writeCard({
      id: "first-2026-09-20",
      status: "in-progress",
      assignee: "dev-a",
      order: "a1",
    });
    writeCard({
      id: "second-2026-09-20",
      status: "in-progress",
      assignee: "dev-b",
      order: "a2",
    });
    expect(lint().violations).toEqual([]);
  });
});

describe(RULES.timestamps, () => {
  it("flags a non-ISO created timestamp", () => {
    writeEpic();
    const file = writeCard({ created: "2026-09-20", order: "a1" });
    expect(rulesFor(file)).toContain(RULES.timestamps);
  });

  it("flags modified earlier than created", () => {
    writeEpic();
    const file = writeCard({
      modified: "2026-09-19T00:00:00.000Z",
      order: "a1",
    });
    expect(rulesFor(file)).toContain(RULES.timestamps);
  });

  it("flags completedAt earlier than created", () => {
    writeEpic();
    const file = writeCard({
      status: "done",
      completedAt: "2026-09-19T00:00:00.000Z",
      order: "a1",
    });
    expect(rulesFor(file)).toContain(RULES.timestamps);
  });

  it("flags a dueDate that is not YYYY-MM-DD", () => {
    writeEpic();
    const file = writeCard({ dueDate: "next friday", order: "a1" });
    expect(rulesFor(file)).toContain(RULES.timestamps);
  });
});

describe(RULES.labels, () => {
  it("flags an empty label list", () => {
    const file = writeCard({ labels: [] });
    expect(rulesFor(file)).toContain(RULES.labels);
  });

  it("flags a card labelled both story and epic", () => {
    writeEpic();
    const file = writeCard({
      labels: ["story", "epic", `epic:${EPIC_ID}`],
      order: "a1",
    });
    expect(rulesFor(file)).toContain(RULES.labels);
  });

  it("flags a story with no parent epic", () => {
    const file = writeCard({ labels: ["story"] });
    expect(rulesFor(file)).toContain(RULES.labels);
  });

  it("flags an epic that points at a parent epic", () => {
    writeEpic();
    const file = writeCard({
      id: "epic-child-2026-09-20",
      labels: ["epic", `epic:${EPIC_ID}`],
      order: "a1",
    });
    expect(rulesFor(file)).toContain(RULES.labels);
  });

  it("allows extra labels alongside the required ones", () => {
    writeEpic();
    const file = writeCard({
      labels: ["story", "component", `epic:${EPIC_ID}`],
      order: "a1",
    });
    expect(rulesFor(file)).toEqual([]);
  });
});
