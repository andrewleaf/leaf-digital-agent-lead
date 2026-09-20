#!/usr/bin/env node
/**
 * afterFileEdit: format the file that was just written.
 *
 * `afterFileEdit` is observational — it cannot block or annotate — so the only
 * useful thing it can do is a side effect. Prettier honours `.prettierignore`
 * even for explicitly named files, so Kanban cards and skill docs are skipped
 * without special handling here.
 *
 * Silent no-op when Prettier is not installed yet, which is the normal state
 * during a Cloud Agent's first turns.
 */

import { existsSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

import { runHook } from "./hook-io.mjs";

const FORMATTABLE = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".css",
  ".json",
  ".md",
  ".mdx",
  ".yml",
  ".yaml",
]);

await runHook(async (input) => {
  const filePath = input.file_path;
  if (
    typeof filePath !== "string" ||
    !FORMATTABLE.has(path.extname(filePath))
  ) {
    return {};
  }

  const root = process.env.CURSOR_PROJECT_DIR ?? process.cwd();
  const prettier = path.join(root, "node_modules", ".bin", "prettier");
  if (!existsSync(prettier) || !existsSync(filePath)) return {};

  spawnSync(prettier, ["--write", "--log-level", "error", filePath], {
    cwd: root,
    stdio: "ignore",
    timeout: 20_000,
  });
  return {};
});
