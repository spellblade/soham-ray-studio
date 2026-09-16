# Coding standards

## TypeScript / React

- Strict TypeScript. Path alias `@/` → `src/`.
- Server-only modules use the `.server.ts` suffix or live behind `/api` handlers.
- Do not import `node:crypto`, `pg`, or `fs` from client components.
- UI tokens live in `src/styles.css` `@theme` (paper / ink palette). No ad-hoc hex in JSX.

## Formatting

EditorConfig + Prettier (`.prettierrc`). ESLint 9 flat config. Indent 2 spaces, LF, UTF-8. Markdown tables use left-aligned columns (`| :--- |`).

Repository layout and docs follow the universal master template v3 (`docs/` set, Keep a Changelog, Conventional Commits). This repo uses the small-project branch exception: `develop` → `main` (no `staging`).

## Comments

- Public functions, classes, and exported APIs MUST have JSDoc (`/** ... */`) with `@param`, `@returns`, and `@throws` when they apply.
- Multi-step workflows, non-obvious state, and regexes get a short block comment that explains **why**.
- Inline comments are for edge-case workarounds and platform quirks only.
- Linter suppressions MUST include an inline comment on the same line explaining the technical necessity.
- Do not comment out dead code. Do not restate what the code already says. Update or delete comments when the code changes.

## Tests

- Unit-style Node tests: `scripts/**/*.test.mjs` (`npm test`).
- Typecheck is a merge gate (`npm run typecheck`).
- Do not add tests that need a live Neon instance. Studio hashing can be tested with fixtures.

## Data rules

- Parameterized SQL only.
- Never log passphrases, session tokens, or `DATABASE_URL`.
- Destructive Studio operations (save, change key) stay behind a valid Studio session (`X-Studio-Token`).
