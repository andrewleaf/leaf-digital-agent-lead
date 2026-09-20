#!/usr/bin/env node
/**
 * Create and transition Kanban cards.
 *
 *   board-card.mjs new "Card title" --epic <epic-id> [--labels a,b] [--status backlog]
 *                                  [--priority medium] [--dry-run]
 *   board-card.mjs claim <card-id> --assignee <name>
 *   board-card.mjs finish <card-id>
 *
 * Frontmatter is generated, never transcribed: the serialization rules and the
 * base-62 fractional index live in `frontmatter.mjs`, and every transition
 * leaves `board-lint.mjs` passing.
 */

import { existsSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  PRIORITIES,
  STATUSES,
  cardId,
  defaultFeaturesDir,
  isoDate,
  isoNow,
  listCardFiles,
  nextOrder,
  parseCard,
  serializeCard,
  uncheckedCriteria,
  updateCardText,
} from "./frontmatter.mjs";

class CardError extends Error {}

function loadBoard(featuresDir) {
  return listCardFiles(featuresDir)
    .map((entry) => {
      const parsed = parseCard(entry.text);
      return parsed.ok
        ? { ...entry, fields: parsed.fields, body: parsed.body }
        : null;
    })
    .filter(Boolean);
}

function findCard(board, id) {
  const card = board.find((entry) => entry.fields.id === id);
  if (!card) throw new CardError(`no card with id "${id}"`);
  return card;
}

function storyBody({ title, epicId, isComponent }) {
  const lines = [
    `# ${title}`,
    "",
    "One-line description of the work and rationale.",
    "",
  ];
  if (epicId) lines.push(`Parent epic: [\`${epicId}\`](${epicId}.md)`, "");

  if (isComponent) {
    lines.push(
      "## File and primitives",
      "",
      "- File: `components/campaigns/<widget-name>.tsx`",
      "- shadcn: registry names only; do not invent primitives",
      "",
      "## Stitch contract",
      "",
      "Source: screen from [stitch-to-shadcn/references/projects.md](../../.cursor/skills/stitch-to-shadcn/references/projects.md) (`projects/{id}/screens/{id}`).",
      "",
      "- Verbatim labels, helpers, and filled-mock copy.",
      "",
      "## Props",
      "",
      "Typed mock-driven props. No persistence, APIs, or page routes.",
      "",
      "## Visual tokens",
      "",
      "Operator Core sizes, colors, and radii (see `.cursor/skills/shadcn-ui/references/operator-core.md`).",
      "",
    );
  }

  lines.push(
    "## Acceptance Criteria",
    "",
    "- [ ] Criterion 1 (concrete, testable condition)",
    "- [ ] Criterion 2",
    "",
    "## Further breakdown",
    "",
    "- [ ] Subtask or smaller candidate story 1",
    "",
  );
  return lines.join("\n");
}

function epicBody(title) {
  return [
    `# ${title}`,
    "",
    "## 1. Intent & Business Value",
    "",
    "Why this epic exists, who it serves, and what problem it solves.",
    "",
    "## 2. Source Specifications",
    "",
    "Domain contracts, tables, rules, and constraints transcribed from the source documents.",
    "",
    "## 3. Scope Boundaries",
    "",
    "- **In Scope (v1)**:",
    "- **Explicit Non-Goals (v2+)**:",
    "",
    "## 4. Architecture & Flow",
    "",
    "Diagrams, schemas, or status lifecycles.",
    "",
    "## 5. Stories",
    "",
    "- [Story title](story-id.md) (`story-id`): Brief responsibility note.",
    "",
    "## 6. Milestone Definition of Done",
    "",
    "- [ ] Milestone condition 1",
    "",
    "## 7. Dependencies & Sequencing",
    "",
    "- **Prerequisites**:",
    "- **Unblocks**:",
    "",
  ].join("\n");
}

export function createCard(featuresDir, options) {
  const {
    title,
    epic: epicId = null,
    labels: extraLabels = [],
    status = "backlog",
    priority = "medium",
    date = isoDate(),
    now = isoNow(),
  } = options;

  if (!title) throw new CardError("a title is required");
  if (!STATUSES.includes(status)) {
    throw new CardError(`--status must be one of ${STATUSES.join(" | ")}`);
  }
  if (status === "done") throw new CardError("new cards cannot start in done");
  if (!PRIORITIES.includes(priority)) {
    throw new CardError(`--priority must be one of ${PRIORITIES.join(" | ")}`);
  }

  const isEpic = extraLabels.includes("epic");
  if (isEpic && epicId)
    throw new CardError("an epic card cannot have a parent epic");
  if (!isEpic && !epicId)
    throw new CardError("a story card needs --epic <epic-id>");

  const board = loadBoard(featuresDir);

  if (epicId) {
    const parent = board.find((entry) => entry.fields.id === epicId);
    if (!parent) throw new CardError(`parent epic "${epicId}" does not exist`);
    if (!(parent.fields.labels ?? []).includes("epic")) {
      throw new CardError(`"${epicId}" is not labelled "epic"`);
    }
  }

  const slugSource = isEpic && !/^epic /i.test(title) ? `epic ${title}` : title;
  const id = cardId(slugSource, date);
  const file = path.join(featuresDir, `${id}.md`);
  if (existsSync(file)) throw new CardError(`${id}.md already exists`);

  const labels = isEpic
    ? ["epic", ...extraLabels.filter((label) => label !== "epic")]
    : [
        "story",
        ...extraLabels.filter((label) => label !== "story"),
        `epic:${epicId}`,
      ];

  const order = nextOrder(
    board
      .filter((entry) => entry.fields.status === status)
      .map((entry) => entry.fields.order),
  );

  const fields = {
    id,
    status,
    priority,
    assignee: null,
    dueDate: null,
    created: now,
    modified: now,
    completedAt: null,
    labels,
    order,
  };

  const body = isEpic
    ? epicBody(title)
    : storyBody({
        title,
        epicId,
        isComponent: extraLabels.includes("component"),
      });

  return { file, id, contents: serializeCard(fields, body) };
}

export function claimCard(featuresDir, id, assignee, now = isoNow()) {
  if (!assignee) throw new CardError("--assignee is required");

  const board = loadBoard(featuresDir);
  const card = findCard(board, id);
  if (card.fields.status === "done")
    throw new CardError(`"${id}" is already done`);
  if (
    card.fields.status === "in-progress" &&
    card.fields.assignee === assignee
  ) {
    throw new CardError(`"${id}" is already claimed by ${assignee}`);
  }

  const held = board.filter(
    (entry) =>
      entry.fields.status === "in-progress" &&
      entry.fields.assignee === assignee &&
      entry.fields.id !== id,
  );
  if (held.length > 0) {
    throw new CardError(
      `${assignee} already holds ${held.map((entry) => entry.fields.id).join(", ")}; ` +
        "one Doing card per assignee",
    );
  }

  return {
    file: card.file,
    contents: updateCardText(card.text, {
      status: "in-progress",
      assignee,
      modified: now,
    }),
  };
}

export function finishCard(featuresDir, id, now = isoNow()) {
  const board = loadBoard(featuresDir);
  const card = findCard(board, id);
  if (card.inDone) throw new CardError(`"${id}" is already filed under done/`);

  const unchecked = uncheckedCriteria(card.body);
  if (unchecked.length > 0) {
    throw new CardError(
      `"${id}" has ${unchecked.length} unchecked criteria; resolve or move them to ` +
        `\`## Further breakdown\` first:\n  ${unchecked.map((line) => line.trim()).join("\n  ")}`,
    );
  }

  return {
    file: card.file,
    destination: path.join(featuresDir, "done", path.basename(card.file)),
    contents: updateCardText(card.text, {
      status: "done",
      assignee: null,
      modified: now,
      completedAt: now,
    }),
  };
}

function moveFile(from, to) {
  const git = spawnSync("git", ["mv", from, to], { stdio: "pipe" });
  if (git.status === 0) return "git mv";
  renameSync(from, to);
  return "rename";
}

function parseArgs(argv) {
  const positional = [];
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) {
      positional.push(arg);
      continue;
    }
    const [flag, inlineValue] = arg.includes("=")
      ? [arg.slice(0, arg.indexOf("=")), arg.slice(arg.indexOf("=") + 1)]
      : [arg, null];
    const key = flag.slice(2);
    if (key === "dry-run") {
      options.dryRun = true;
      continue;
    }
    options[key] = inlineValue ?? argv[(index += 1)];
  }
  return { positional, options };
}

const USAGE = `Usage:
  board-card.mjs new "Card title" --epic <epic-id> [--labels a,b] [--status backlog|todo]
                                 [--priority critical|high|medium|low] [--dry-run]
  board-card.mjs new "Epic title" --labels epic
  board-card.mjs claim <card-id> --assignee <name>
  board-card.mjs finish <card-id>
`;

function main(argv) {
  const { positional, options } = parseArgs(argv);
  const [command, ...rest] = positional;
  const featuresDir = options.dir
    ? path.resolve(options.dir)
    : defaultFeaturesDir();

  if (!command || command === "help") {
    process.stdout.write(USAGE);
    return command ? 0 : 2;
  }

  if (command === "new") {
    const created = createCard(featuresDir, {
      title: rest.join(" "),
      epic: options.epic ?? null,
      labels: (options.labels ?? "")
        .split(",")
        .map((label) => label.trim())
        .filter(Boolean),
      status: options.status ?? "backlog",
      priority: options.priority ?? "medium",
    });
    if (options.dryRun) {
      process.stdout.write(created.contents);
      return 0;
    }
    writeFileSync(created.file, created.contents);
    process.stdout.write(
      `created ${path.relative(process.cwd(), created.file)}\n`,
    );
    return 0;
  }

  if (command === "claim") {
    const claimed = claimCard(featuresDir, rest[0], options.assignee);
    writeFileSync(claimed.file, claimed.contents);
    process.stdout.write(`claimed ${rest[0]} for ${options.assignee}\n`);
    return 0;
  }

  if (command === "finish") {
    const finished = finishCard(featuresDir, rest[0]);
    writeFileSync(finished.file, finished.contents);
    const how = moveFile(finished.file, finished.destination);
    process.stdout.write(
      `finished ${rest[0]} (${how} into ${path.relative(process.cwd(), finished.destination)})\n`,
    );
    return 0;
  }

  process.stderr.write(`board-card: unknown command "${command}"\n${USAGE}`);
  return 2;
}

const invokedDirectly =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  try {
    process.exit(main(process.argv.slice(2)));
  } catch (error) {
    if (error instanceof CardError) {
      process.stderr.write(`board-card: ${error.message}\n`);
      process.exit(1);
    }
    throw error;
  }
}

export { CardError, loadBoard };
