import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { CardError, claimCard, createCard, finishCard } from "./board-card.mjs";
import { lintBoard } from "./board-lint.mjs";
import { parseCard, serializeCard } from "./frontmatter.mjs";

let featuresDir;

const EPIC_ID = "epic-parent-2026-09-20";
const NOW = "2026-09-20T12:00:00.000Z";

beforeEach(() => {
  featuresDir = mkdtempSync(path.join(tmpdir(), "board-card-"));
  mkdirSync(path.join(featuresDir, "done"));
  writeCard({
    id: EPIC_ID,
    status: "backlog",
    priority: "high",
    labels: ["epic"],
    order: "a0",
    body: "# Parent\n\n## 6. Milestone Definition of Done\n\n- [x] Shipped\n",
  });
});

afterEach(() => {
  rmSync(featuresDir, { recursive: true, force: true });
});

function writeCard({ body = "# Card\n", ...overrides }) {
  const fields = {
    id: "widget-2026-09-20",
    status: "todo",
    priority: "medium",
    assignee: null,
    dueDate: null,
    created: "2026-09-20T00:00:00.000Z",
    modified: "2026-09-20T00:00:00.000Z",
    completedAt: null,
    labels: ["story", `epic:${EPIC_ID}`],
    order: "a1",
    ...overrides,
  };
  const dir =
    fields.status === "done" ? path.join(featuresDir, "done") : featuresDir;
  writeFileSync(path.join(dir, `${fields.id}.md`), serializeCard(fields, body));
  return fields.id;
}

function write(result) {
  writeFileSync(result.file, result.contents);
  return result;
}

function read(id) {
  return parseCard(readFileSync(path.join(featuresDir, `${id}.md`), "utf8"));
}

describe("new", () => {
  it("derives the id from the title and the date", () => {
    const created = createCard(featuresDir, {
      title: "Queue Filters For Due Today",
      epic: EPIC_ID,
      date: "2026-09-20",
      now: NOW,
    });
    expect(created.id).toBe("queue-filters-for-due-today-2026-09-20");
    expect(path.basename(created.file)).toBe(`${created.id}.md`);
  });

  it("appends the next free index in the target column", () => {
    writeCard({ id: "first-2026-09-20", status: "todo", order: "a1" });
    writeCard({ id: "second-2026-09-20", status: "todo", order: "a2" });
    const created = createCard(featuresDir, {
      title: "Third",
      epic: EPIC_ID,
      status: "todo",
      date: "2026-09-20",
      now: NOW,
    });
    expect(parseCard(created.contents).fields.order).toBe("a3");
  });

  it("indexes each column independently", () => {
    const created = createCard(featuresDir, {
      title: "Backlog item",
      epic: EPIC_ID,
      status: "backlog",
      date: "2026-09-20",
      now: NOW,
    });
    expect(parseCard(created.contents).fields.order).toBe("a1");
  });

  it("labels a story with its parent epic", () => {
    const created = createCard(featuresDir, {
      title: "Story",
      epic: EPIC_ID,
      date: "2026-09-20",
      now: NOW,
    });
    const parsed = parseCard(created.contents);
    expect(parsed.fields.labels).toEqual(["story", `epic:${EPIC_ID}`]);
    expect(parsed.body).toContain(
      `Parent epic: [\`${EPIC_ID}\`](${EPIC_ID}.md)`,
    );
    expect(parsed.body).toContain("## Acceptance Criteria");
  });

  it("scaffolds the extra sections a component story requires", () => {
    const created = createCard(featuresDir, {
      title: "Widget",
      epic: EPIC_ID,
      labels: ["component"],
      date: "2026-09-20",
      now: NOW,
    });
    const parsed = parseCard(created.contents);
    expect(parsed.fields.labels).toEqual([
      "story",
      "component",
      `epic:${EPIC_ID}`,
    ]);
    for (const heading of [
      "## File and primitives",
      "## Stitch contract",
      "## Props",
      "## Visual tokens",
      "## Acceptance Criteria",
    ]) {
      expect(parsed.body).toContain(heading);
    }
  });

  it("prefixes an epic id and scaffolds the seven sections", () => {
    const created = createCard(featuresDir, {
      title: "Outreach Telemetry",
      labels: ["epic"],
      date: "2026-09-20",
      now: NOW,
    });
    expect(created.id).toBe("epic-outreach-telemetry-2026-09-20");
    const parsed = parseCard(created.contents);
    expect(parsed.fields.labels).toEqual(["epic"]);
    expect(parsed.body).toContain("## 7. Dependencies & Sequencing");
  });

  it("refuses a story with no parent epic", () => {
    expect(() =>
      createCard(featuresDir, { title: "Orphan", date: "2026-09-20" }),
    ).toThrow(CardError);
  });

  it("refuses a parent epic that does not exist", () => {
    expect(() =>
      createCard(featuresDir, {
        title: "Story",
        epic: "epic-nope-2026-09-20",
      }),
    ).toThrow(/does not exist/);
  });

  it("refuses to overwrite an existing card", () => {
    const created = write(
      createCard(featuresDir, {
        title: "Widget",
        epic: EPIC_ID,
        date: "2026-09-20",
        now: NOW,
      }),
    );
    expect(existsSync(created.file)).toBe(true);
    expect(() =>
      createCard(featuresDir, {
        title: "Widget",
        epic: EPIC_ID,
        date: "2026-09-20",
      }),
    ).toThrow(/already exists/);
  });

  it("refuses to create a card straight into done", () => {
    expect(() =>
      createCard(featuresDir, {
        title: "Widget",
        epic: EPIC_ID,
        status: "done",
      }),
    ).toThrow(/cannot start in done/);
  });

  it("produces a card the linter accepts", () => {
    write(
      createCard(featuresDir, {
        title: "Linted Card",
        epic: EPIC_ID,
        status: "todo",
        date: "2026-09-20",
        now: NOW,
      }),
    );
    expect(lintBoard(featuresDir).violations).toEqual([]);
  });
});

describe("claim", () => {
  it("sets the status, assignee, and modified timestamp", () => {
    const id = writeCard({});
    write(claimCard(featuresDir, id, "cursor-agent", NOW));
    const parsed = read(id);
    expect(parsed.fields.status).toBe("in-progress");
    expect(parsed.fields.assignee).toBe("cursor-agent");
    expect(parsed.fields.modified).toBe(NOW);
    expect(parsed.fields.created).toBe("2026-09-20T00:00:00.000Z");
  });

  it("refuses a second claim by the same assignee", () => {
    const first = writeCard({ id: "first-2026-09-20", order: "a1" });
    writeCard({ id: "second-2026-09-20", order: "a2" });
    write(claimCard(featuresDir, first, "cursor-agent", NOW));
    expect(() =>
      claimCard(featuresDir, "second-2026-09-20", "cursor-agent", NOW),
    ).toThrow(/one Doing card per assignee/);
  });

  it("lets a second agent claim its own card", () => {
    const first = writeCard({ id: "first-2026-09-20", order: "a1" });
    const second = writeCard({ id: "second-2026-09-20", order: "a2" });
    write(claimCard(featuresDir, first, "agent-a", NOW));
    write(claimCard(featuresDir, second, "agent-b", NOW));
    expect(lintBoard(featuresDir).violations).toEqual([]);
  });

  it("requires an assignee", () => {
    const id = writeCard({});
    expect(() => claimCard(featuresDir, id, undefined, NOW)).toThrow(
      /--assignee is required/,
    );
  });

  it("refuses a finished card", () => {
    writeCard({
      id: "finished-2026-09-20",
      status: "done",
      completedAt: NOW,
      modified: NOW,
    });
    expect(() =>
      claimCard(featuresDir, "finished-2026-09-20", "cursor-agent", NOW),
    ).toThrow(/already done/);
  });

  it("preserves the extension-written epic field", () => {
    const raw = `---
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
`;
    writeFileSync(
      path.join(featuresDir, "extension-written-2026-09-20.md"),
      raw,
    );
    write(
      claimCard(
        featuresDir,
        "extension-written-2026-09-20",
        "cursor-agent",
        NOW,
      ),
    );
    const text = readFileSync(
      path.join(featuresDir, "extension-written-2026-09-20.md"),
      "utf8",
    );
    expect(text).toContain("epic: null");
    expect(text).toContain('assignee: "cursor-agent"');
    expect(lintBoard(featuresDir).violations).toEqual([]);
  });
});

describe("finish", () => {
  const openCriteria = "# Card\n\n## Acceptance Criteria\n\n- [ ] Not yet\n";
  const metCriteria = "# Card\n\n## Acceptance Criteria\n\n- [x] Shipped\n";

  it("refuses while acceptance criteria are unchecked", () => {
    const id = writeCard({
      status: "in-progress",
      assignee: "cursor-agent",
      body: openCriteria,
    });
    expect(() => finishCard(featuresDir, id, NOW)).toThrow(
      /unchecked criteria/,
    );
  });

  it("ignores unchecked Further breakdown items", () => {
    const id = writeCard({
      status: "in-progress",
      assignee: "cursor-agent",
      body: `${metCriteria}\n## Further breakdown\n\n- [ ] Maybe later\n`,
    });
    expect(() => finishCard(featuresDir, id, NOW)).not.toThrow();
  });

  it("sets the done fields, clears the claim, and targets done/", () => {
    const id = writeCard({
      status: "in-progress",
      assignee: "cursor-agent",
      body: metCriteria,
    });
    const finished = write(finishCard(featuresDir, id, NOW));
    expect(finished.destination).toBe(
      path.join(featuresDir, "done", `${id}.md`),
    );
    const parsed = parseCard(finished.contents);
    expect(parsed.fields.status).toBe("done");
    expect(parsed.fields.completedAt).toBe(NOW);
    expect(parsed.fields.modified).toBe(NOW);
    expect(parsed.fields.assignee).toBeNull();
  });

  it("leaves the board clean once the file is moved", () => {
    const id = writeCard({
      status: "in-progress",
      assignee: "cursor-agent",
      body: metCriteria,
    });
    const finished = finishCard(featuresDir, id, NOW);
    writeFileSync(finished.destination, finished.contents);
    rmSync(finished.file);
    expect(lintBoard(featuresDir).violations).toEqual([]);
  });

  it("refuses a card already filed under done/", () => {
    writeCard({
      id: "already-done-2026-09-20",
      status: "done",
      completedAt: NOW,
      modified: NOW,
      body: metCriteria,
    });
    expect(() =>
      finishCard(featuresDir, "already-done-2026-09-20", NOW),
    ).toThrow(/already filed under done/);
  });

  it("reports an unknown card id", () => {
    expect(() => finishCard(featuresDir, "nope-2026-09-20", NOW)).toThrow(
      /no card with id/,
    );
  });
});
