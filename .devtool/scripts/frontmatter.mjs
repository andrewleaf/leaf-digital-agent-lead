/**
 * Card frontmatter parsing, serialization, and ordering for the markdown Kanban
 * board. Serialization rules are fixed by
 * `.cursor/skills/kanban-markdown/references/data-model.md`.
 *
 * Node standard library only: these helpers run from Cursor hooks, which may
 * execute before `pnpm install` has populated `node_modules`.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

export const FIELD_ORDER = [
  "id",
  "status",
  "priority",
  "assignee",
  "dueDate",
  "created",
  "modified",
  "completedAt",
  "labels",
  "order",
];

/**
 * Fields the Kanban Markdown extension writes itself when a card is saved from
 * the board UI. They are not part of the documented contract, they carry no
 * data on this board (`epic` is always null), and rejecting them would make the
 * linter fail every time a human drags a card. Tolerated, position-free.
 */
export const EXTENSION_FIELDS = new Set(["epic"]);

export const STATUSES = ["backlog", "todo", "in-progress", "review", "done"];
export const PRIORITIES = ["critical", "high", "medium", "low"];
export const ACTIVE_STATUSES = STATUSES.filter((s) => s !== "done");

/** Base-62 digits in ascending order; also their ASCII order, so `<` sorts them. */
export const ORDER_ALPHABET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const NULLABLE_FIELDS = new Set(["assignee", "dueDate", "completedAt"]);

function decodeValue(raw) {
  const text = raw.trim();
  if (text === "null") return { kind: "null", value: null };
  if (text.startsWith('"') && text.endsWith('"') && text.length >= 2) {
    try {
      return { kind: "string", value: JSON.parse(text) };
    } catch {
      return { kind: "invalid", value: text };
    }
  }
  if (text.startsWith("[") && text.endsWith("]")) {
    try {
      const value = JSON.parse(text);
      if (
        Array.isArray(value) &&
        value.every((item) => typeof item === "string")
      ) {
        return { kind: "array", value };
      }
    } catch {
      // fall through to invalid
    }
    return { kind: "invalid", value: text };
  }
  return { kind: "invalid", value: text };
}

export function encodeValue(value) {
  if (value === null || value === undefined) return "null";
  if (Array.isArray(value)) {
    return value.length === 0
      ? "[]"
      : `[${value.map((item) => JSON.stringify(item)).join(", ")}]`;
  }
  return JSON.stringify(String(value));
}

/**
 * @returns {{ok: true, entries: Array<{key: string, kind: string, value: unknown}>,
 *            fields: Record<string, unknown>, keys: string[], body: string}
 *          | {ok: false, error: string}}
 */
export function parseCard(text) {
  const normalized = text.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) {
    return { ok: false, error: "missing opening `---` frontmatter delimiter" };
  }
  const closing = normalized.indexOf("\n---\n", 3);
  if (closing === -1) {
    return { ok: false, error: "missing closing `---` frontmatter delimiter" };
  }

  const block = normalized.slice(4, closing + 1);
  const body = normalized.slice(closing + 5);
  const entries = [];

  for (const line of block.split("\n")) {
    if (line.trim() === "") continue;
    const separator = line.indexOf(":");
    if (separator === -1) {
      return {
        ok: false,
        error: `frontmatter line is not \`key: value\`: ${line}`,
      };
    }
    const key = line.slice(0, separator).trim();
    const decoded = decodeValue(line.slice(separator + 1));
    entries.push({ key, kind: decoded.kind, value: decoded.value });
  }

  const fields = {};
  for (const entry of entries) fields[entry.key] = entry.value;

  return {
    ok: true,
    entries,
    fields,
    keys: entries.map((entry) => entry.key),
    body,
  };
}

export function serializeCard(fields, body) {
  const lines = FIELD_ORDER.map(
    (key) => `${key}: ${encodeValue(key in fields ? fields[key] : null)}`,
  );
  const content = body.replace(/^\n+/, "").trimEnd();
  return `---\n${lines.join("\n")}\n---\n\n${content}\n`;
}

/**
 * Rewrites only the given frontmatter values, leaving every other byte of the
 * card untouched. Used instead of `serializeCard` for transitions so extension
 * fields survive and diffs stay to the lines that actually changed.
 */
export function updateCardText(text, updates) {
  const normalized = text.replace(/\r\n/g, "\n");
  const closing = normalized.indexOf("\n---\n", 3);
  if (!normalized.startsWith("---\n") || closing === -1) {
    throw new Error("cannot update a file without frontmatter delimiters");
  }

  const head = normalized.slice(4, closing + 1);
  const tail = normalized.slice(closing + 1);
  const seen = new Set();

  const rewritten = head
    .split("\n")
    .map((line) => {
      const separator = line.indexOf(":");
      if (separator === -1) return line;
      const key = line.slice(0, separator).trim();
      if (!(key in updates)) return line;
      seen.add(key);
      return `${key}: ${encodeValue(updates[key])}`;
    })
    .join("\n");

  const missing = Object.keys(updates).filter((key) => !seen.has(key));
  if (missing.length > 0) {
    throw new Error(`card has no ${missing.join(", ")} field to update`);
  }

  return `---\n${rewritten}${tail}`;
}

export function expectedKind(key) {
  if (key === "labels") return "array";
  if (EXTENSION_FIELDS.has(key)) return "string|null";
  return NULLABLE_FIELDS.has(key) ? "string|null" : "string";
}

export function kindMatches(key, kind) {
  const expected = expectedKind(key);
  return expected === "string|null"
    ? kind === "string" || kind === "null"
    : kind === expected;
}

export function compareOrder(a, b) {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

export function isValidOrder(value) {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    [...value].every((char) => ORDER_ALPHABET.includes(char))
  );
}

export function incrementOrder(order) {
  const digits = [...order];
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    const position = ORDER_ALPHABET.indexOf(digits[index]);
    if (position < ORDER_ALPHABET.length - 1) {
      digits[index] = ORDER_ALPHABET[position + 1];
      return digits.join("");
    }
    digits[index] = ORDER_ALPHABET[0];
  }
  // Every digit overflowed. A longer string sorts after its own prefix, so
  // appending the lowest digit keeps the index monotonic.
  return order + ORDER_ALPHABET[0];
}

export function nextOrder(existingOrders) {
  const valid = existingOrders.filter(isValidOrder);
  if (valid.length === 0) return "a0";
  const highest = valid.slice().sort(compareOrder).at(-1);
  return incrementOrder(highest);
}

export function slugify(title) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50)
    .replace(/-$/, "");
  return slug;
}

export function cardId(title, date) {
  const slug = slugify(title);
  return slug === "" ? `feature-${date}` : `${slug}-${date}`;
}

export function isoNow(date = new Date()) {
  return date.toISOString().replace(/\.\d{3}Z$/, ".000Z");
}

export function isoDate(date = new Date()) {
  return isoNow(date).slice(0, 10);
}

export function epicLabels(labels) {
  if (!Array.isArray(labels)) return [];
  return labels
    .filter((label) => label.startsWith("epic:"))
    .map((label) => label.slice(5));
}

/**
 * Headings whose checkboxes gate completion. `## Further breakdown` is
 * deliberately excluded: the card format defines those items as candidate
 * follow-up work, not conditions for Done.
 */
const GATE_HEADING =
  /^(?:\d+\.\s*)?(?:acceptance criteria|(?:milestone )?definition of done)$/i;

export function uncheckedCriteria(body) {
  const unchecked = [];
  let inGateSection = false;
  let inFence = false;

  for (const line of body.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const heading = /^#{2,6}\s+(.*)$/.exec(line);
    if (heading) {
      inGateSection = GATE_HEADING.test(heading[1].trim());
      continue;
    }
    if (inGateSection && /^\s*- \[ \]/.test(line)) unchecked.push(line);
  }

  return unchecked;
}

/**
 * Every card on the board, active cards first.
 * @returns {Array<{file: string, relative: string, inDone: boolean, text: string}>}
 */
export function listCardFiles(featuresDir) {
  const doneDir = path.join(featuresDir, "done");
  const read = (dir, inDone) => {
    let names;
    try {
      names = readdirSync(dir);
    } catch {
      return [];
    }
    return names
      .filter((name) => name.endsWith(".md"))
      .filter((name) => statSync(path.join(dir, name)).isFile())
      .sort()
      .map((name) => {
        const file = path.join(dir, name);
        return {
          file,
          relative: inDone ? path.join("done", name) : name,
          inDone,
          text: readFileSync(file, "utf8"),
        };
      });
  };
  return [...read(featuresDir, false), ...read(doneDir, true)];
}

export function defaultFeaturesDir(cwd = process.cwd()) {
  return path.join(cwd, ".devtool", "features");
}
