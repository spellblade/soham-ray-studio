# Coding standards

## TypeScript / React

- Strict TypeScript. Path alias `@/` → `src/`.
- Server-only modules use the `.server.ts` suffix or live behind `/api` handlers.
- Do not import `node:crypto`, `pg`, or `fs` from client components.
- UI tokens live in `src/styles.css` `@theme` (paper / ink palette). No ad-hoc hex in JSX.

## Formatting

EditorConfig + Prettier (`.prettierrc`). ESLint 9 flat config. Indent 2 spaces, LF, UTF-8.

## Tests

- Unit-style Node tests: `scripts/**/*.test.mjs` (`npm test`).
- Typecheck is a merge gate (`npm run typecheck`).
- Do not add tests that need a live Neon instance. Studio hashing can be tested with fixtures.

## Data rules

- Parameterized SQL only.
- Never log passphrases, session tokens, or `DATABASE_URL`.
- Destructive Studio operations (save, change key) stay behind a valid Studio session (`X-Studio-Token`).
