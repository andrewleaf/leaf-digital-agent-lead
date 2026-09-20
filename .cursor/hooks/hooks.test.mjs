import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { serializeCard } from "../../.devtool/scripts/frontmatter.mjs";

const hooksDir = path.dirname(fileURLToPath(import.meta.url));

let root;

beforeEach(() => {
  root = mkdtempSync(path.join(tmpdir(), "hooks-"));
  mkdirSync(path.join(root, ".devtool", "features", "done"), {
    recursive: true,
  });
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

const EPIC_ID = "epic-parent-2026-09-20";

function writeCard(overrides = {}, body = "# Card\n") {
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
  writeFileSync(
    path.join(root, ".devtool", "features", `${fields.id}.md`),
    serializeCard(fields, body),
  );
}

function writeEpic() {
  writeCard(
    {
      id: EPIC_ID,
      status: "backlog",
      priority: "high",
      labels: ["epic"],
      order: "a0",
    },
    "# Parent\n\n## 6. Milestone Definition of Done\n\n- [x] Shipped\n",
  );
}

function runHookScript(script, input, { raw = null } = {}) {
  const result = spawnSync(process.execPath, [path.join(hooksDir, script)], {
    input: raw ?? JSON.stringify(input),
    encoding: "utf8",
    env: { ...process.env, CURSOR_PROJECT_DIR: root },
  });
  const stdout = result.stdout.trim();
  return {
    status: result.status,
    stdout,
    json: stdout === "" ? null : JSON.parse(stdout),
  };
}

describe("story-gate", () => {
  const write = (filePath) => ({
    tool_name: "Write",
    tool_input: { path: filePath },
    cwd: root,
  });

  it("denies application code when no card is claimed", () => {
    writeEpic();
    const result = runHookScript(
      "story-gate.mjs",
      write("lib/services/discovery/index.ts"),
    );
    expect(result.json.permission).toBe("deny");
    expect(result.json.agent_message).toContain("pnpm board:claim");
    expect(result.json.user_message).toContain(
      "lib/services/discovery/index.ts",
    );
    expect(result.status).toBe(0);
  });

  it("allows application code once a card is in Doing", () => {
    writeEpic();
    writeCard({ status: "in-progress", assignee: "cursor-agent" });
    expect(
      runHookScript("story-gate.mjs", write("lib/db/schema.ts")).json,
    ).toEqual({ permission: "allow" });
  });

  it("gates each application directory", () => {
    writeEpic();
    for (const file of [
      "app/(auth)/campaigns/page.tsx",
      "components/campaigns/widget.tsx",
      "lib/actions/campaigns.ts",
      "scripts/db/cli.ts",
      "next.config.ts",
      "app/globals.css",
    ]) {
      expect(
        runHookScript("story-gate.mjs", write(file)).json.permission,
        file,
      ).toBe("deny");
    }
  });

  it("exempts the board, the process tooling, and prose", () => {
    writeEpic();
    for (const file of [
      ".devtool/features/widget-2026-09-20.md",
      ".devtool/scripts/board-lint.mjs",
      ".cursor/hooks/story-gate.mjs",
      ".cursor/skills/kanban-markdown/SKILL.md",
      "agenda.md",
      "KANBAN.md",
      "README.md",
      "package.json",
    ]) {
      expect(
        runHookScript("story-gate.mjs", write(file)).json.permission,
        file,
      ).toBe("allow");
    }
  });

  it("resolves absolute paths against the project root", () => {
    writeEpic();
    const absolute = path.join(root, "lib", "db", "index.ts");
    expect(
      runHookScript("story-gate.mjs", write(absolute)).json.permission,
    ).toBe("deny");
  });

  it("ignores path-like strings in file contents", () => {
    writeEpic();
    const input = {
      tool_name: "Write",
      tool_input: {
        path: "agenda.md",
        contents: "See lib/db/schema.ts and components/campaigns/widget.tsx\n",
      },
      cwd: root,
    };
    expect(runHookScript("story-gate.mjs", input).json.permission).toBe(
      "allow",
    );
  });

  it("allows a tool call with no path at all", () => {
    writeEpic();
    const input = {
      tool_name: "Write",
      tool_input: { query: "lib" },
      cwd: root,
    };
    expect(runHookScript("story-gate.mjs", input).json.permission).toBe(
      "allow",
    );
  });

  it("fails open on unparseable input", () => {
    const result = runHookScript("story-gate.mjs", null, {
      raw: "not json at all",
    });
    expect(result.json).toEqual({ permission: "allow" });
    expect(result.status).toBe(0);
  });
});

describe("package-manager-guard", () => {
  const shell = (command) => ({ command, cwd: root, sandbox: false });

  it("denies commands that write a competing lockfile", () => {
    for (const command of [
      "npm install",
      "npm i react",
      "npm ci",
      "npm add -D vitest",
      "yarn",
      "yarn add lodash",
      "cd /workspace && npm install",
      "bun install",
    ]) {
      const result = runHookScript("package-manager-guard.mjs", shell(command));
      expect(result.json.permission, command).toBe("deny");
      expect(result.json.agent_message).toContain("pnpm");
    }
  });

  it("allows pnpm, npx, and read-only npm queries", () => {
    for (const command of [
      "pnpm install --frozen-lockfile",
      "pnpm add -D prettier",
      "npx prettier --check .",
      "npx npm-check-updates",
      "npm view eslint-plugin-react versions",
      "npm ls eslint",
      "git status",
    ]) {
      expect(
        runHookScript("package-manager-guard.mjs", shell(command)).json
          .permission,
        command,
      ).toBe("allow");
    }
  });
});

describe("board-audit", () => {
  it("stays silent on a clean board", () => {
    writeEpic();
    writeCard();
    const result = runHookScript("board-audit.mjs", {
      status: "completed",
      loop_count: 0,
    });
    expect(result.stdout).toBe("");
    expect(result.status).toBe(0);
  });

  it("returns a followup naming the card and the rule", () => {
    writeEpic();
    writeCard({ status: "in-progress" });
    const result = runHookScript("board-audit.mjs", {
      status: "completed",
      loop_count: 0,
    });
    expect(result.json.followup_message).toContain("widget-2026-09-20.md");
    expect(result.json.followup_message).toContain("claim-assignee");
  });

  it("says nothing when the turn was aborted", () => {
    writeEpic();
    writeCard({ status: "in-progress" });
    expect(runHookScript("board-audit.mjs", { status: "aborted" }).stdout).toBe(
      "",
    );
  });
});

describe("subagent-reconcile", () => {
  it("stays silent for a read-only subagent", () => {
    const result = runHookScript("subagent-reconcile.mjs", {
      status: "completed",
      subagent_type: "explore",
      modified_files: [],
    });
    expect(result.stdout).toBe("");
  });

  it("asks the parent to reconcile the card after file changes", () => {
    const result = runHookScript("subagent-reconcile.mjs", {
      status: "completed",
      subagent_type: "generalPurpose",
      modified_files: ["components/campaigns/widget.tsx"],
    });
    expect(result.json.followup_message).toContain("reconcile");
    expect(result.json.followup_message).toContain("board:lint");
  });

  it("stays silent when the subagent did not complete", () => {
    const result = runHookScript("subagent-reconcile.mjs", {
      status: "aborted",
      modified_files: ["lib/db/schema.ts"],
    });
    expect(result.stdout).toBe("");
  });
});

describe("format-edited-file", () => {
  it("emits nothing and succeeds for an unformattable extension", () => {
    const result = runHookScript("format-edited-file.mjs", {
      file_path: path.join(root, "notes.txt"),
    });
    expect(result.stdout).toBe("");
    expect(result.status).toBe(0);
  });

  it("does not fail when the file no longer exists", () => {
    const result = runHookScript("format-edited-file.mjs", {
      file_path: path.join(root, "gone.ts"),
    });
    expect(result.status).toBe(0);
  });
});
