#!/usr/bin/env node
/**
 * subagentStop: remind the parent to reconcile a subagent's card.
 *
 * Only fires when the subagent actually changed files, so read-only `explore`
 * runs stay silent. `followup_message` is consumed only when the subagent
 * completed.
 */

import { runHook } from "./hook-io.mjs";

await runHook(async (input) => {
  if (input.status !== "completed") return {};

  const modified = Array.isArray(input.modified_files)
    ? input.modified_files
    : [];
  if (modified.length === 0) return {};

  const touchedCards = modified.some((file) =>
    String(file).includes(".devtool/features/"),
  );

  return {
    followup_message: [
      `The ${input.subagent_type ?? "sub"}agent modified ${modified.length} file(s).`,
      touchedCards
        ? "It also edited the board, so confirm the card it claimed reflects what it actually did."
        : "It changed no card, so reconcile the claimed card yourself: tick the criteria it met, or record what is still open.",
      "Then run `pnpm board:lint`.",
    ].join(" "),
  };
});
