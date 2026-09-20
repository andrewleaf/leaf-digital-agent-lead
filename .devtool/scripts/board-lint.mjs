#!/usr/bin/env node
/**
 * Executable definition of the Kanban board invariants described in
 * `agenda.md`, `.cursor/skills/kanban-markdown/SKILL.md`, and
 * `references/data-model.md`.
 *
 * Usage: node .devtool/scripts/board-lint.mjs [--dir <features-dir>] [--json]
 * Exits 0 when the board is clean, 1 when any invariant is violated.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  ACTIVE_STATUSES,
  EXTENSION_FIELDS,
  FIELD_ORDER,
  PRIORITIES,
  STATUSES,
  defaultFeaturesDir,
  epicLabels,
  isValidOrder,
  kindMatches,
  expectedKind,
  listCardFiles,
  parseCard,
  uncheckedCriteria,
} from "./frontmatter.mjs";

export const RULES = {
  frontmatter: "frontmatter-shape",
  idFilename: "id-filename",
  enums: "enum-values",
  placement: "done-placement",
  order: "order-unique",
  epicRef: "epic-reference",
  doneCriteria: "done-criteria",
  claim: "claim-assignee",
  timestamps: "timestamps",
  labels: "labels",
};

const ISO_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
const DUE_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function parseTime(value) {
  const time = Date.parse(value);
  return Number.isNaN(time) ? null : time;
}

export function lintBoard(featuresDir) {
  const violations = [];
  const cards = [];

  const report = (relative, rule, detail) =>
    violations.push({ file: relative, rule, detail });

  for (const entry of listCardFiles(featuresDir)) {
    const parsed = parseCard(entry.text);
    if (!parsed.ok) {
      report(entry.relative, RULES.frontmatter, parsed.error);
      continue;
    }

    const { fields, keys, entries, body } = parsed;
    const card = { ...entry, fields, body };
    cards.push(card);

    const requiredKeys = keys.filter((key) => FIELD_ORDER.includes(key));
    if (requiredKeys.join(",") !== FIELD_ORDER.join(",")) {
      report(
        entry.relative,
        RULES.frontmatter,
        `required fields must appear in the order [${FIELD_ORDER.join(", ")}], found [${requiredKeys.join(", ")}]`,
      );
    }
    for (const key of keys) {
      if (!FIELD_ORDER.includes(key) && !EXTENSION_FIELDS.has(key)) {
        report(
          entry.relative,
          RULES.frontmatter,
          `unknown frontmatter field \`${key}\``,
        );
      }
    }
    for (const field of entries) {
      if (!FIELD_ORDER.includes(field.key) && !EXTENSION_FIELDS.has(field.key))
        continue;
      if (!kindMatches(field.key, field.kind)) {
        report(
          entry.relative,
          RULES.frontmatter,
          `\`${field.key}\` must be ${expectedKind(field.key)}, found ${field.kind}`,
        );
      }
    }

    const expectedId = path.basename(entry.relative, ".md");
    if (fields.id !== expectedId) {
      report(
        entry.relative,
        RULES.idFilename,
        `\`id\` is "${fields.id}", expected "${expectedId}"`,
      );
    }

    if (!STATUSES.includes(fields.status)) {
      report(
        entry.relative,
        RULES.enums,
        `\`status\` must be one of ${STATUSES.join(" | ")}, found "${fields.status}"`,
      );
    }
    if (!PRIORITIES.includes(fields.priority)) {
      report(
        entry.relative,
        RULES.enums,
        `\`priority\` must be one of ${PRIORITIES.join(" | ")}, found "${fields.priority}"`,
      );
    }

    const isDone = fields.status === "done";
    if (isDone && !entry.inDone) {
      report(
        entry.relative,
        RULES.placement,
        'a card with status "done" must live in `done/`',
      );
    }
    if (!isDone && entry.inDone) {
      report(
        entry.relative,
        RULES.placement,
        `a card in \`done/\` must have status "done", found "${fields.status}"`,
      );
    }
    if (isDone && fields.completedAt === null) {
      report(
        entry.relative,
        RULES.placement,
        '`completedAt` is required when status is "done"',
      );
    }
    if (!isDone && fields.completedAt !== null) {
      report(
        entry.relative,
        RULES.placement,
        `\`completedAt\` must be null unless status is "done", found "${fields.completedAt}"`,
      );
    }

    if (!isValidOrder(fields.order)) {
      report(
        entry.relative,
        RULES.order,
        `\`order\` must be a non-empty base-62 index, found "${fields.order}"`,
      );
    }

    for (const field of ["created", "modified"]) {
      if (
        typeof fields[field] === "string" &&
        !ISO_PATTERN.test(fields[field])
      ) {
        report(
          entry.relative,
          RULES.timestamps,
          `\`${field}\` must be an ISO 8601 timestamp like "2026-09-20T00:00:00.000Z", found "${fields[field]}"`,
        );
      }
    }
    if (
      typeof fields.completedAt === "string" &&
      !ISO_PATTERN.test(fields.completedAt)
    ) {
      report(
        entry.relative,
        RULES.timestamps,
        `\`completedAt\` must be an ISO 8601 timestamp, found "${fields.completedAt}"`,
      );
    }
    if (
      typeof fields.dueDate === "string" &&
      !DUE_DATE_PATTERN.test(fields.dueDate)
    ) {
      report(
        entry.relative,
        RULES.timestamps,
        `\`dueDate\` must be "YYYY-MM-DD", found "${fields.dueDate}"`,
      );
    }
    const created = parseTime(fields.created);
    const modified = parseTime(fields.modified);
    const completed =
      fields.completedAt === null ? null : parseTime(fields.completedAt);
    if (created !== null && modified !== null && modified < created) {
      report(
        entry.relative,
        RULES.timestamps,
        "`modified` is earlier than `created`",
      );
    }
    if (created !== null && completed !== null && completed < created) {
      report(
        entry.relative,
        RULES.timestamps,
        "`completedAt` is earlier than `created`",
      );
    }

    const labels = Array.isArray(fields.labels) ? fields.labels : [];
    const isStory = labels.includes("story");
    const isEpic = labels.includes("epic");
    const parents = epicLabels(labels);
    if (labels.length === 0) {
      report(entry.relative, RULES.labels, "`labels` must not be empty");
    }
    if (isStory && isEpic) {
      report(
        entry.relative,
        RULES.labels,
        'a card cannot be labelled both "story" and "epic"',
      );
    }
    if (isStory && parents.length !== 1) {
      report(
        entry.relative,
        RULES.labels,
        `a story card needs exactly one "epic:<id>" label, found ${parents.length}`,
      );
    }
    if (isEpic && parents.length > 0) {
      report(
        entry.relative,
        RULES.labels,
        `an epic card must not carry an "epic:<id>" label, found ${parents.join(", ")}`,
      );
    }

    if (isDone) {
      const unchecked = uncheckedCriteria(body);
      if (unchecked.length > 0) {
        report(
          entry.relative,
          RULES.doneCriteria,
          `${unchecked.length} unchecked criteria remain: ${unchecked[0].trim()}`,
        );
      }
    }

    if (fields.status === "in-progress" && fields.assignee === null) {
      report(
        entry.relative,
        RULES.claim,
        "a claimed card needs an `assignee`; claim it with `pnpm board:claim`",
      );
    }
  }

  const byId = new Map(cards.map((card) => [card.fields.id, card]));

  for (const card of cards) {
    for (const parentId of epicLabels(card.fields.labels ?? [])) {
      const parent = byId.get(parentId);
      if (!parent) {
        report(
          card.relative,
          RULES.epicRef,
          `parent epic "${parentId}" does not exist`,
        );
      } else if (!(parent.fields.labels ?? []).includes("epic")) {
        report(
          card.relative,
          RULES.epicRef,
          `parent "${parentId}" is not labelled "epic"`,
        );
      }
    }
  }

  // Done ordering is not enforced: a finished card keeps the index it held in
  // its previous column, so the Done column is legitimately full of repeats.
  for (const status of ACTIVE_STATUSES) {
    const seen = new Map();
    for (const card of cards) {
      if (card.fields.status !== status) continue;
      const order = card.fields.order;
      if (!isValidOrder(order)) continue;
      const existing = seen.get(order);
      if (existing) {
        report(
          card.relative,
          RULES.order,
          `\`order\` "${order}" in column "${status}" is already used by ${existing}`,
        );
      } else {
        seen.set(order, card.relative);
      }
    }
  }

  const claimsByAssignee = new Map();
  for (const card of cards) {
    if (card.fields.status !== "in-progress") continue;
    const assignee = card.fields.assignee;
    if (typeof assignee !== "string") continue;
    const existing = claimsByAssignee.get(assignee) ?? [];
    existing.push(card.relative);
    claimsByAssignee.set(assignee, existing);
  }
  for (const [assignee, claimed] of claimsByAssignee) {
    if (claimed.length > 1) {
      report(
        claimed[claimed.length - 1],
        RULES.claim,
        `"${assignee}" holds ${claimed.length} claimed cards (${claimed.join(", ")}); one Doing card per assignee`,
      );
    }
  }

  const byStatus = {};
  for (const status of STATUSES) {
    byStatus[status] = cards.filter(
      (card) => card.fields.status === status,
    ).length;
  }

  return {
    violations,
    cardCount: cards.length,
    byStatus,
    activeStatuses: ACTIVE_STATUSES,
  };
}

function parseArgs(argv) {
  const options = { json: false, dir: null };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--json") options.json = true;
    else if (arg === "--dir") options.dir = argv[(index += 1)];
    else if (arg.startsWith("--dir=")) options.dir = arg.slice("--dir=".length);
    else if (arg === "--help" || arg === "-h") options.help = true;
    else options.unknown = arg;
  }
  return options;
}

function main(argv) {
  const options = parseArgs(argv);
  if (options.help) {
    process.stdout.write(
      "Usage: node .devtool/scripts/board-lint.mjs [--dir <features-dir>] [--json]\n",
    );
    return 0;
  }
  if (options.unknown) {
    process.stderr.write(`board-lint: unknown argument "${options.unknown}"\n`);
    return 2;
  }

  const featuresDir = options.dir
    ? path.resolve(options.dir)
    : defaultFeaturesDir();
  const result = lintBoard(featuresDir);

  if (options.json) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return result.violations.length === 0 ? 0 : 1;
  }

  if (result.violations.length === 0) {
    process.stdout.write(
      `board-lint: ${result.cardCount} cards, no violations\n`,
    );
    return 0;
  }

  for (const violation of result.violations) {
    process.stdout.write(
      `${violation.file}: ${violation.rule}: ${violation.detail}\n`,
    );
  }
  process.stdout.write(
    `board-lint: ${result.violations.length} violation(s) across ${result.cardCount} cards\n`,
  );
  return 1;
}

const invokedDirectly =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  process.exit(main(process.argv.slice(2)));
}
