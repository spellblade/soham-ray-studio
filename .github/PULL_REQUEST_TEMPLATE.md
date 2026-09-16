## Summary
<!-- Provide a clear, one-sentence description of the change and its context -->

## Related Issues
Closes #N (or Fixes #N, Resolves #N)

## Type of Change
- [ ] Bug fix (non-breaking change resolving an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature that alters existing behaviors)
- [ ] Documentation update
- [ ] Refactoring (internal restructures with no interface modifications)

## Changes
| File Path | Description of Change |
| :--- | :--- |
| `src/...` | |
| `tests/...` | |

## Verification & Testing
<!-- Describe the tests you ran and output verification. Provide instructions to reproduce -->
1. Run command: `npm run typecheck && npm test && npm run lint`
2. Expected output: clean exit

## Checklist
- [ ] Code follows the repository's coding and style guidelines (linter passes with 0 warnings or errors).
- [ ] Self-review completed — verified no debugging code, temporary logs, or print statements are left.
- [ ] JSDoc / comment-based help added for new public functions; block comments for complex logic.
- [ ] Unit and/or integration tests added for new logic.
- [ ] All automated tests pass cleanly in the local environment (`npm test` / `npm run typecheck` / `npm run lint`).
- [ ] No hardcoded configuration, file system paths, or secret credentials (`DATABASE_URL`, Studio keys, `BETTER_AUTH_SECRET`).
- [ ] Relevant documentation in `docs/` (such as `index.md`, `setup.md`, `architecture.md`, `usage.md`, `coding-standards.md`, or `security.md`) has been updated.
- [ ] `CHANGELOG.md` updated under `[Unreleased]` with relevant changes.
- [ ] `VERSION` bumped if preparing for a new release commit.
- [ ] Feature branch is fully rebased and up to date with `develop`.
