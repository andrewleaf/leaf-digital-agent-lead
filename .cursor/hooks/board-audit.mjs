#!/usr/bin/env node
/**
 * stop: audit the board at the end of a turn.
 *
 * This is the backstop for the story gate. The gate can only deny writes it can
 * see; this runs unconditionally and reports any card that violates an
 * invariant, as a followup the agent has to answer before the turn really ends.
 *
 * `followup_message` is auto-submitted as the next user message, so the hook
 * stays silent on a clean board and `loop_limit` in `.cursor/hooks.json` bounds
 * how often it can re-prompt.
 */

import path from "node:path";

import { lintBoard } from "../../.devtool/scripts/board-lint.mjs";
import { runHook } from "./hook-io.mjs";

const MAX_REPORTED = 5;

await runHook(async (input) => {
  if (input.status && input.status !== "completed") return {};

  const root = process.env.CURSOR_PROJECT_DIR ?? process.cwd();
  const { violations } = lintBoard(path.join(root, ".devtool", "features"));
  if (violations.length === 0) return {};

  const listed = violations
    .slice(0, MAX_REPORTED)
    .map(
      (violation) =>
        `- ${violation.file}: ${violation.rule}: ${violation.detail}`,
    );
  if (violations.length > MAX_REPORTED) {
    listed.push(`- …and ${violations.length - MAX_REPORTED} more`);
  }

  return {
    followup_message: [
      `\`pnpm board:lint\` reports ${violations.length} Kanban board violation(s):`,
      "",
      ...listed,
      "",
      "Fix the cards you touched — `pnpm board:claim` and `pnpm board:finish` handle the",
      "transitions. If a violation predates this session and is not yours to fix, say so",
      "and stop rather than editing unrelated cards.",
    ].join("\n"),
  };
});
