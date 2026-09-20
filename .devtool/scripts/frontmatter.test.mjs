import { describe, expect, it } from "vitest";

import {
  FIELD_ORDER,
  cardId,
  compareOrder,
  encodeValue,
  epicLabels,
  incrementOrder,
  isValidOrder,
  isoNow,
  nextOrder,
  parseCard,
  serializeCard,
  slugify,
  uncheckedCriteria,
} from "./frontmatter.mjs";

const CARD = `---
id: "widget-2026-09-20"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-09-20T00:00:00.000Z"
modified: "2026-09-20T00:00:00.000Z"
completedAt: null
labels: ["story", "epic:epic-parent-2026-09-20"]
order: "a0"
---

# Widget

## Acceptance Criteria

- [x] Done thing
- [ ] Pending thing
`;

describe("parseCard", () => {
  it("decodes strings, nulls, and label arrays", () => {
    const parsed = parseCard(CARD);
    expect(parsed.ok).toBe(true);
    expect(parsed.fields.id).toBe("widget-2026-09-20");
    expect(parsed.fields.assignee).toBeNull();
    expect(parsed.fields.labels).toEqual([
      "story",
      "epic:epic-parent-2026-09-20",
    ]);
    expect(parsed.keys).toEqual(FIELD_ORDER);
    expect(parsed.body).toBe(
      "\n# Widget\n\n## Acceptance Criteria\n\n- [x] Done thing\n- [ ] Pending thing\n",
    );
  });

  it("preserves the key sequence so order violations are detectable", () => {
    const swapped = CARD.replace(
      'priority: "medium"\nassignee: null',
      'assignee: null\npriority: "medium"',
    );
    expect(parseCard(swapped).keys).toEqual([
      "id",
      "status",
      "assignee",
      "priority",
      "dueDate",
      "created",
      "modified",
      "completedAt",
      "labels",
      "order",
    ]);
  });

  it("rejects text without frontmatter delimiters", () => {
    expect(parseCard("# No frontmatter\n").ok).toBe(false);
    expect(parseCard('---\nid: "x"\n').ok).toBe(false);
  });

  it("flags unquoted values as invalid rather than guessing", () => {
    const parsed = parseCard(CARD.replace('status: "todo"', "status: todo"));
    expect(parsed.entries.find((entry) => entry.key === "status").kind).toBe(
      "invalid",
    );
  });
});

describe("serializeCard", () => {
  it("round-trips a card byte for byte", () => {
    const parsed = parseCard(CARD);
    expect(serializeCard(parsed.fields, parsed.body)).toBe(CARD);
  });

  it("emits fields in the documented order regardless of input order", () => {
    const serialized = serializeCard(
      {
        order: "a0",
        labels: [],
        id: "x-2026-09-20",
        status: "backlog",
        priority: "low",
        assignee: null,
        dueDate: null,
        created: "2026-09-20T00:00:00.000Z",
        modified: "2026-09-20T00:00:00.000Z",
        completedAt: null,
      },
      "# X\n",
    );
    const keys = serialized
      .split("\n")
      .slice(1, 1 + FIELD_ORDER.length)
      .map((line) => line.split(":")[0]);
    expect(keys).toEqual(FIELD_ORDER);
  });
});

describe("encodeValue", () => {
  it("double-quotes strings, bares null, and spaces label arrays", () => {
    expect(encodeValue("todo")).toBe('"todo"');
    expect(encodeValue(null)).toBe("null");
    expect(encodeValue([])).toBe("[]");
    expect(encodeValue(["story", "epic:x"])).toBe('["story", "epic:x"]');
  });
});

describe("fractional ordering", () => {
  it("starts an empty column at a0", () => {
    expect(nextOrder([])).toBe("a0");
  });

  it("appends after the highest existing index", () => {
    expect(nextOrder(["a0", "a1", "a2"])).toBe("a3");
    expect(nextOrder(["a0", "bR", "aZ"])).toBe("bS");
  });

  it("carries within base-62 rather than repeating an index", () => {
    expect(incrementOrder("a9")).toBe("aA");
    expect(incrementOrder("aZ")).toBe("aa");
    expect(incrementOrder("az")).toBe("b0");
  });

  it("grows the index when every digit overflows, preserving sort order", () => {
    expect(incrementOrder("zz")).toBe("zz0");
    expect(compareOrder("zz", "zz0")).toBe(-1);
  });

  it("orders digits before uppercase before lowercase", () => {
    expect(["b0", "aA", "a0", "aa"].slice().sort(compareOrder)).toEqual([
      "a0",
      "aA",
      "aa",
      "b0",
    ]);
  });

  it("rejects indexes with characters outside base-62", () => {
    expect(isValidOrder("a0")).toBe(true);
    expect(isValidOrder("")).toBe(false);
    expect(isValidOrder("a-0")).toBe(false);
    expect(isValidOrder(null)).toBe(false);
  });

  it("ignores invalid neighbours when picking the next index", () => {
    expect(nextOrder(["a0", "oops!", "a1"])).toBe("a2");
  });
});

describe("id generation", () => {
  it("slugifies a title per the data model", () => {
    expect(slugify("Board Drift Reconciliation")).toBe(
      "board-drift-reconciliation",
    );
    expect(slugify("Campaign: setup / intake (v1)")).toBe(
      "campaign-setup-intake-v1",
    );
    expect(slugify("  spaced   out  ")).toBe("spaced-out");
  });

  it("truncates to 50 characters without a trailing hyphen", () => {
    const slug = slugify("a".repeat(48) + " bb");
    expect(slug.length).toBeLessThanOrEqual(50);
    expect(slug.endsWith("-")).toBe(false);
  });

  it("falls back to feature when the title has no slug characters", () => {
    expect(cardId("!!!", "2026-09-20")).toBe("feature-2026-09-20");
    expect(cardId("Widget", "2026-09-20")).toBe("widget-2026-09-20");
  });
});

describe("uncheckedCriteria", () => {
  it("counts acceptance criteria", () => {
    expect(uncheckedCriteria(parseCard(CARD).body)).toHaveLength(1);
  });

  it("ignores Further breakdown candidates", () => {
    const body = `# X

## Acceptance Criteria

- [x] Shipped

## Further breakdown

- [ ] Maybe later
`;
    expect(uncheckedCriteria(body)).toEqual([]);
  });

  it("counts an epic milestone definition of done", () => {
    const body = `# Epic

## 6. Milestone Definition of Done

- [ ] Not yet
`;
    expect(uncheckedCriteria(body)).toHaveLength(1);
  });

  it("ignores checkboxes inside fenced blocks", () => {
    const body = `# X

## Acceptance Criteria

\`\`\`md
- [ ] template line
\`\`\`

- [x] Real criterion
`;
    expect(uncheckedCriteria(body)).toEqual([]);
  });
});

describe("epicLabels", () => {
  it("extracts parent ids from epic: labels", () => {
    expect(
      epicLabels(["story", "epic:epic-a-2026-09-20", "component"]),
    ).toEqual(["epic-a-2026-09-20"]);
    expect(epicLabels(["epic"])).toEqual([]);
    expect(epicLabels(undefined)).toEqual([]);
  });
});

describe("isoNow", () => {
  it("zeroes milliseconds to match the serialized format", () => {
    expect(isoNow(new Date("2026-09-20T15:01:04.191Z"))).toBe(
      "2026-09-20T15:01:04.000Z",
    );
  });
});
