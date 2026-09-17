# Contributing

This repository is a personal portfolio. Forks are welcome; please do not open PRs that replace the owner's published CV.

## Small-project branch model

`develop` → `main`. No `staging` branch.

| Branch | Role |
| :--- | :--- |
| `main` | Production. Merge commits only. Tag releases (`v0.1.0`). |
| `develop` | Integration. Feature PRs squash into here. |
| `feature/*`, `fix/*` | Cut from `develop`, squash-merge back. |
| `hotfix/*` | Cut from `main`; merge to `main` and `develop`. |

GitHub rulesets enforce that split:

| Target | Merge method | Extra gates |
| :--- | :--- | :--- |
| `develop` | **Squash** only | PR required, CI `check` must pass |
| `main` | **Merge commit** only | PR required, code-owner review, CI `check` must pass |

Do not squash `develop` → `main`. Repository admins can merge their own PRs; they cannot push directly or force-push.

Commits follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat(studio): allow changing the studio key
fix(pdf): keep availability on the first page
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`.

## Local checks

```bash
npm ci
npm run lint
npm run typecheck
npm test
```

Pre-commit: lint and format only. Hosted CI runs typecheck, tests, and lint.

## Pull requests

Use [.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md). Put `Fixes #N` in the body of the PR that lands on `main` if you want GitHub to close the issue.

Update `CHANGELOG.md` under `[Unreleased]`. Bump `VERSION` and `package.json` only when cutting a release.

## Secrets

Never commit `.env`, Neon URLs, Studio passphrases, or `BETTER_AUTH_SECRET`. Use `.env.example` as the list of names.
