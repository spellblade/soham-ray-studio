# Soham Ray — Studio

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](VERSION)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> An editorial portfolio and software-engineer CV: selected work, case studies, a PDF export, and a private Studio to publish your own details.

The public site is a résumé. Studio is a locked editor for the owner. One deployment is one CV. Forking the repo and pointing it at **your** database is how someone else gets their own.

## Features

- **Selected work** with category chips and hover copy; each card opens a case study (problem, constraint, decision, result, stack).
- **CV sections** — experience timeline, education, grouped tools, languages, writing. Recognition is optional in Studio.
- **PDF export** generated in the browser from the same profile.
- **Contact form** with messages stored for the owner.
- **Studio key** — a passphrase you claim. Google / X / email never unlock the editor.
- **Vercel + Neon** in production; embedded Postgres (PGLite) when `DATABASE_URL` is unset.

## Quick start

### Prerequisites

- Node.js 22+
- npm 10+

### Local (sample data, in-memory database)

```bash
git clone https://github.com/spellblade/soham-ray-studio.git
cd REPO
cp .env.example .env
npm ci
npm run dev
```

Open [http://localhost:8080](http://localhost:8080). Footer → **Studio** to claim a private key, then replace the sample profile.

### Production (Vercel + Neon)

1. Create a Neon project and copy the **pooled** `DATABASE_URL`.
2. Import this repo into Vercel (Hobby is enough).
3. Set `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL` on the project.
4. Deploy. First visit to `/studio` **claims** the lock for that database.

See [docs/setup.md](docs/setup.md).

## Documentation

| Doc | What it covers |
| --- | --- |
| [Setup](docs/setup.md) | Local run, env vars, Vercel + Neon |
| [Usage](docs/usage.md) | Public site, Studio, PDF, contact inbox |
| [Architecture](docs/architecture.md) | Stack, data model, Studio lock |
| [Security](docs/security.md) | Key hashing, what is public, how to report issues |
| [Coding standards](docs/coding-standards.md) | Style, tests, branching |
| [ADRs](docs/adr/) | Why Studio is a passphrase, why one profile per deploy |

## Contributing

This is a personal CV. If you fork it, see [CONTRIBUTING.md](CONTRIBUTING.md) for the small-project `develop` → `main` model.

## License

MIT for the **code**. Sample names, copy, and generated images are placeholders — replace them in Studio before you treat the site as yours. See [LICENSE](LICENSE).
