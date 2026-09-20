/**
 * Shared plumbing for the project hooks in `.cursor/hooks.json`.
 *
 * Hooks read one JSON object on stdin and write at most one JSON object on
 * stdout. Cursor fails open on a crash or a non-zero exit, but a permission
 * hook that emits malformed JSON blocks the action — so every hook here routes
 * its output through `respond` and its failures through `failOpen`.
 */

export async function readInput() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  return raw === "" ? {} : JSON.parse(raw);
}

export function respond(payload) {
  if (payload && Object.keys(payload).length > 0) {
    process.stdout.write(`${JSON.stringify(payload)}\n`);
  }
  process.exit(0);
}

/**
 * Runs a hook body, falling back to `fallback` if anything at all goes wrong.
 * A broken hook must never be the reason an agent cannot work.
 */
export async function runHook(body, fallback = {}) {
  try {
    respond((await body(await readInput())) ?? {});
  } catch {
    respond(fallback);
  }
}
