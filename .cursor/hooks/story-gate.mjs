#!/usr/bin/env node
/**
 * preToolUse: refuse to write application code while no Kanban card is claimed.
 *
 * This is the hard gate from `agenda.md`, enforced instead of described. There
 * is no `beforeFileEdit` event and `afterFileEdit` cannot revert a write, so
 * `preToolUse` is the only place a write can be stopped. Matcher coverage of
 * in-place string edits is not documented, so treat this as a deterrent whose
 * backstop is the `stop` board audit.
 */

import path from "node:path";

import {
  listCardFiles,
  parseCard,
} from "../../.devtool/scripts/frontmatter.mjs";
import { runHook } from "./hook-io.mjs";

const GATED_DIRS = ["app/", "components/", "lib/", "scripts/"];
const CODE_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".css",
  ".sql",
]);
const EXEMPT_DIRS = [".devtool/", ".cursor/"];
const PATH_KEYS = new Set([
  "path",
  "paths",
  "file",
  "files",
  "file_path",
  "filePath",
  "file_paths",
  "target_file",
  "targetFile",
  "relative_workspace_path",
  "notebook_path",
]);

function collectPaths(value, key = null, found = []) {
  if (typeof value === "string") {
    if (key && PATH_KEYS.has(key)) found.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collectPaths(item, key, found);
  } else if (value && typeof value === "object") {
    for (const [childKey, child] of Object.entries(value)) {
      collectPaths(child, childKey, found);
    }
  }
  return found;
}

function toRelative(candidate, root) {
  const relative = path.isAbsolute(candidate)
    ? path.relative(root, candidate)
    : candidate.replace(/^\.\//, "");
  return relative.split(path.sep).join("/");
}

export function isGatedPath(relativePath) {
  if (relativePath === "" || relativePath.startsWith("..")) return false;
  if (EXEMPT_DIRS.some((dir) => relativePath.startsWith(dir))) return false;
  if (GATED_DIRS.some((dir) => relativePath.startsWith(dir))) return true;
  return CODE_EXTENSIONS.has(path.extname(relativePath));
}

function claimedCards(featuresDir) {
  return listCardFiles(featuresDir)
    .filter((entry) => !entry.inDone)
    .map((entry) => parseCard(entry.text))
    .filter((parsed) => parsed.ok && parsed.fields.status === "in-progress")
    .map((parsed) => parsed.fields);
}

await runHook(
  async (input) => {
    const root = process.env.CURSOR_PROJECT_DIR ?? input.cwd ?? process.cwd();
    const gated = collectPaths(input.tool_input ?? {})
      .map((candidate) => toRelative(candidate, root))
      .filter((relative) => isGatedPath(relative));

    if (gated.length === 0) return { permission: "allow" };

    const claimed = claimedCards(path.join(root, ".devtool", "features"));
    if (claimed.length > 0) return { permission: "allow" };

    const target = gated[0];
    return {
      permission: "deny",
      user_message: `Story gate: no Kanban card is in Doing, so ${target} was not written.`,
      agent_message: [
        `Blocked by the story gate: \`agenda.md\` forbids writing application code`,
        `(here: ${target}) unless a Kanban story card is claimed in Doing.`,
        "",
        "Claim one first:",
        '  pnpm board:new "Card title" --epic <epic-id> --status todo',
        "  pnpm board:claim <card-id> --assignee cursor-agent",
        "",
        "Exempt without a card: .devtool/, .cursor/, and markdown such as agenda.md,",
        "KANBAN.md, AGENTS.md, and README files.",
      ].join("\n"),
    };
  },
  { permission: "allow" },
);
