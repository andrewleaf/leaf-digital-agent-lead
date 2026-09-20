#!/usr/bin/env node
/**
 * beforeShellExecution: keep the toolchain on pnpm.
 *
 * `package.json` declares `packageManager: pnpm@9.15.9`, but a stray
 * `npm install` was enough to commit a second lockfile to this repo. Read-only
 * npm commands (`npm view`, `npm ls`) and `npx` stay allowed.
 */

import { runHook } from "./hook-io.mjs";

const BLOCKED = [
  {
    pattern:
      /(^|[\s;&|(])npm\s+(install|i|ci|add|update|up|rm|uninstall|remove)\b/,
    tool: "npm",
  },
  { pattern: /(^|[\s;&|(])yarn\b(?!\s+(why|info))/, tool: "yarn" },
  { pattern: /(^|[\s;&|(])bun\s+(install|add|remove)\b/, tool: "bun" },
];

export function blockedTool(command) {
  const withoutNpx = command.replace(/(^|[\s;&|(])npx\s+/g, "$1");
  return BLOCKED.find((entry) => entry.pattern.test(withoutNpx))?.tool ?? null;
}

await runHook(
  async (input) => {
    const command = typeof input.command === "string" ? input.command : "";
    const tool = blockedTool(command);
    if (!tool) return { permission: "allow" };

    return {
      permission: "deny",
      user_message: `Blocked a ${tool} command: this repo is pnpm-only.`,
      agent_message: [
        `Blocked: this repo declares \`packageManager: pnpm@9.15.9\`, and a ${tool} command`,
        "writes a competing lockfile.",
        "",
        "Use pnpm instead, for example:",
        "  pnpm install --frozen-lockfile",
        "  pnpm add -D <package>",
        "",
        "Read-only npm queries (`npm view`, `npm ls`) and `npx` are allowed.",
      ].join("\n"),
    };
  },
  { permission: "allow" },
);
