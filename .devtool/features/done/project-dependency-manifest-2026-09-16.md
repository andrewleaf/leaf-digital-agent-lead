---
id: "project-dependency-manifest-2026-09-16"
status: "done"
priority: "high"
assignee: null
dueDate: null
created: "2026-09-16T22:52:00.000Z"
modified: "2026-09-16T23:05:00.000Z"
completedAt: "2026-09-16T23:05:00.000Z"
labels: ["story", "epic:epic-application-architecture-2026-09-15"]
order: "bJ"
---

# Project dependency manifest

Derive the complete dependency set from the board and author the root `package.json` so implementation stories start from a fixed, justified manifest instead of ad-hoc installs.

Parent epic: [`epic-application-architecture-2026-09-15`](../epic-application-architecture-2026-09-15.md)

## Acceptance Criteria

- [x] Root `package.json` exists with name `localdraft`, `private: true`, `type: "module"`, `packageManager: "pnpm@9.15.9"`, and `engines.node` satisfying every tool in the manifest.
- [x] Scripts cover `dev`, `build`, `start`, `lint`, `typecheck`, `format`, `test`, `test:watch`, and Drizzle Kit (`db:generate`, `db:migrate`, `db:push`, `db:studio`).
- [x] Every dependency in the manifest traces to a named technology or requirement on the board (see Dependency rationale below).
- [x] Runtime libraries are in `dependencies`; build, lint, test, and type-only tooling is in `devDependencies`; keys are sorted alphabetically in both blocks.
- [x] Every package name and version range resolves against the npm registry (`npm view <pkg> version`) — no invented versions.
- [x] Stack technologies rejected in the architecture epic (Remix/React Router v7, SvelteKit, Material UI, Chakra UI, Emotion, Prisma, PostgreSQL, MySQL) are absent.
- [x] No packages installed: no `node_modules`, no lockfile, and no application scaffolding beyond `package.json`.

## Dependency rationale

Stack layers come from [`epic-application-architecture-2026-09-15`](../epic-application-architecture-2026-09-15.md) §A/§B/§C; everything else is traced to the card that requires it.

### Runtime dependencies

| Package | Motivated by |
|---------|--------------|
| `next`, `react`, `react-dom` | Architecture epic §A: Next.js App Router 16.x. |
| `drizzle-orm`, `better-sqlite3` | Architecture epic §C: Drizzle ORM over SQLite via the synchronous better-sqlite3 driver. |
| `zod` | `ZodSchema` validation node in [`epic-campaign-intake-fields-2026-09-12`](../epic-campaign-intake-fields-2026-09-12.md); architecture epic §C flow labels the intake form "shadcn Form + Zod". |
| `react-hook-form`, `@hookform/resolvers` | Required peers of the shadcn Form component used by [`required-intake-fields-form-2026-09-12`](../required-intake-fields-form-2026-09-12.md) and [`optional-intake-fields-2026-09-12`](../optional-intake-fields-2026-09-12.md). |
| `@tanstack/react-table` | Sortable/filterable queue table ("shadcn DataTable") in [`agent-queue-filters-2026-09-12`](../agent-queue-filters-2026-09-12.md) and [`epic-agent-workspace-2026-09-12`](../epic-agent-workspace-2026-09-12.md). |
| `@radix-ui/react-*` (`checkbox`, `dialog`, `dropdown-menu`, `label`, `popover`, `progress`, `select`, `separator`, `slot`, `tabs`, `tooltip`) | Architecture epic §A (Radix primitives) plus the component inventory in §E and [`epic-ui-design-system-2026-09-15`](../epic-ui-design-system-2026-09-15.md) §C: Button/Slot, Dialog + Sheet (slide-over draft panel), Dropdown Menu, Form/Label, Combobox popover, Progress (campaign progress stats bar), Select, Separator, Tabs (queue tab filters), Tooltip (status badge definitions), Checkbox (has-website/has-email filters). |
| `cmdk` | Backing library for the shadcn Command/Combobox used by the business-type preset picker in [`epic-ui-design-system-2026-09-15`](../epic-ui-design-system-2026-09-15.md) §4C. |
| `lucide-react` | Status badge icon set (Circle, Database, FileText, AlertTriangle, MailX, XCircle, CheckCircle, Send, MessageCircle, Clock) in [`epic-ui-design-system-2026-09-15`](../epic-ui-design-system-2026-09-15.md) §D. |
| `sonner` | "Toast / Sonner" in architecture epic §E; success toasts in the manual send flow ([`manual-send-path-2026-09-12`](../manual-send-path-2026-09-12.md)). |
| `clsx`, `tailwind-merge` | `lib/utils/cn.ts` "Tailwind class merger" in architecture epic §4A. |
| `class-variance-authority` | Variant API for shadcn components, notably the 10-status badge variants in [`epic-ui-design-system-2026-09-15`](../epic-ui-design-system-2026-09-15.md) §D. |
| `react-day-picker`, `date-fns` | Next-touch date picker and overdue/Due Today date math in [`follow-up-date-note-2026-09-12`](../follow-up-date-note-2026-09-12.md) and [`due-today-view-2026-09-12`](../due-today-view-2026-09-12.md). |
| `cheerio` | HTML parsing for the key-page fact extraction in [`website-scrape-key-pages-2026-09-12`](../website-scrape-key-pages-2026-09-12.md) and [`website-fact-extraction-schema-2026-09-12`](../website-fact-extraction-schema-2026-09-12.md). No library is named on the board; cheerio is the smallest dependency-light server-side parser and needs no browser runtime. |
| `robots-parser` | "robots.txt parser integration" in [`crawler-constraints-2026-09-12`](../crawler-constraints-2026-09-12.md); enforced in [`epic-compliance-and-risk-2026-09-12`](../epic-compliance-and-risk-2026-09-12.md) §2. |
| `p-limit`, `p-throttle` | Two halves of the polite-fetch cap in [`epic-data-and-enrichment-2026-09-12`](../epic-data-and-enrichment-2026-09-12.md) §3 ("max 2 requests/sec per domain"): `p-limit` caps in-flight requests per domain, `p-throttle` caps the per-second rate and spaces retries. |
| `papaparse` | CSV export of pilot logging fields in [`pilot-logging-fields-2026-09-12`](../pilot-logging-fields-2026-09-12.md), [`epic-agent-workspace-2026-09-12`](../epic-agent-workspace-2026-09-12.md) DoD, and suppression list import/export in [`suppression-list-day-one-2026-09-12`](../suppression-list-day-one-2026-09-12.md). |
| `ai` | DraftingService LLM generation ([`epic-email-draft-standard-2026-09-12`](../epic-email-draft-standard-2026-09-12.md), [`personalized-draft-citation-panel-2026-09-12`](../personalized-draft-citation-panel-2026-09-12.md)). No vendor is named anywhere on the board and [`epic-costs-and-dependencies-2026-09-12`](../epic-costs-and-dependencies-2026-09-12.md) treats model tokens as a swappable cost line, so the provider-agnostic Vercel AI SDK is used and the concrete provider package is deliberately left unpinned. |

### Development dependencies

| Package | Motivated by |
|---------|--------------|
| `typescript`, `@types/node`, `@types/react`, `@types/react-dom` | Architecture epic §A: TypeScript 5.x strict across all layers. |
| `tailwindcss`, `@tailwindcss/postcss`, `postcss`, `tw-animate-css` | Architecture epic §A: Tailwind CSS v4 (compiled at build time, hence dev-only); `tw-animate-css` supplies the animation utilities shadcn components expect under Tailwind v4. |
| `drizzle-kit` | Architecture epic §C: "simple migrations with drizzle-kit"; backs the `db:*` scripts and `lib/db/migrations/`. |
| `@types/better-sqlite3`, `@types/papaparse` | Type-only companions for untyped runtime libraries. |
| `vitest`, `vite`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/dom`, `@testing-library/jest-dom`, `jsdom` | Automated unit tests, golden fixtures, and rubric checks required by [`example-pattern-rubric-tests-2026-09-12`](../example-pattern-rubric-tests-2026-09-12.md), [`epic-compliance-and-risk-2026-09-12`](../epic-compliance-and-risk-2026-09-12.md) DoD ("automated unit tests" for robots.txt), and [`epic-email-draft-standard-2026-09-12`](../epic-email-draft-standard-2026-09-12.md). `vite` is an explicit peer of both vitest and the React plugin under pnpm's strict resolution; `@testing-library/dom` is an explicit peer of `@testing-library/react` v16. |
| `eslint`, `eslint-config-next`, `@eslint/eslintrc` | Standard Next.js lint baseline (`@eslint/eslintrc` provides the flat-config compatibility layer the Next config is consumed through). |
| `prettier`, `prettier-plugin-tailwindcss` | Formatting with deterministic Tailwind class ordering, keeping shadcn component diffs reviewable. |

### Deliberate exclusions

- `@libsql/client` — architecture epic §A marks Turso/libSQL as a migration path with no v1 requirement; adding it now would ship an unused driver. Deferred until a hosted-deployment story exists.
- A concrete LLM provider SDK (OpenAI/Anthropic/etc.) — no vendor is named on the board; picking one here would bake in lock-in that [`epic-costs-and-dependencies-2026-09-12`](../epic-costs-and-dependencies-2026-09-12.md) leaves open.
- A Maps/Places API client — [`discovery-source-policy-2026-09-12`](../discovery-source-policy-2026-09-12.md) still requires a provider adapter decision; the Places REST API needs no SDK, so nothing is pinned yet.
- `next-themes`, chart, and carousel libraries — no dark-mode or data-visualisation requirement appears in [`epic-ui-design-system-2026-09-15`](../epic-ui-design-system-2026-09-15.md) (dashboard is stat cards and an activity feed).

### Version notes

- Architecture epic §A asks for Next.js 16.x and Tailwind v4; both exist on the registry (`next@16.3.5`, `tailwindcss@4.3.3`), so the epic is satisfied as written.
- pnpm 9.x is honoured with the newest published 9 release (`pnpm@9.15.9`).
- The epic pins TypeScript 5.x, so `typescript@^5.9.3` (newest 5.x) is used even though the registry `latest` tag is now 7.0.2. Bumping the major is a stack decision that belongs to a follow-up architecture story, not to this manifest.
- `lint` runs `eslint .` rather than `next lint`, which Next 16 no longer provides.

## Further breakdown

- [ ] Bootstrap story: `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `app/globals.css`, `components.json`, `drizzle.config.ts`, `vitest.config.ts`, ESLint/Prettier config.
- [ ] Decide the LLM provider package and add it alongside the `ai` SDK.
- [ ] Decide the Maps/Places discovery adapter and its client dependency.
- [ ] Revisit `@libsql/client` and the TypeScript major when the hosted-deployment path is scheduled.
