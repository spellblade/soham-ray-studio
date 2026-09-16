# Soham Ray — Studio

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](VERSION)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Build Status](https://github.com/spellblade/soham-ray-studio/workflows/CI/badge.svg)](.github/workflows/ci.yml)

> An editorial portfolio and software-engineer CV: selected work, case studies, a PDF export, and a private Studio to publish your own details.

The public site is a résumé. Studio is a locked editor for the owner. One deployment is one CV. Forking the repo and pointing it at **your** database is how someone else gets their own.

## Features

- **Selected work**: Category chips and hover copy; each card opens a case study (problem, constraint, decision, result, stack).
- **CV sections**: Experience timeline, education, grouped tools, languages, writing. Recognition is optional in Studio.
- **PDF export**: Generated in the browser from the same published profile.
- **Contact form**: Messages stored for the owner inbox.
- **Studio key**: A passphrase you claim. An email account never unlocks the editor.
- **Vercel + Neon**: Production on Vercel with Neon; embedded Postgres (PGLite) when `DATABASE_URL` is unset.

## Quick Start

### Prerequisites

- Node.js 24.x
- npm 11+

### Installation

```bash
git clone https://github.com/spellblade/soham-ray-studio.git
cd soham-ray-studio
cp .env.example .env
npm ci
```

### Usage

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080). Footer → **Studio** to claim a private key, then replace the sample profile.

With no `DATABASE_URL`, the app uses embedded PGLite. Data resets when the process dies.

### Production (Vercel + Neon)

1. Create a Neon project and copy the **pooled** `DATABASE_URL`.
2. Import this repo into Vercel (Hobby is enough).
3. Set `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL` on the project.
4. Deploy. First visit to `/studio` **claims** the lock for that database.

See [docs/setup.md](docs/setup.md) for environment variables and troubleshooting.

## Documentation Map

*   [Developer Setup Guide](docs/setup.md) — Tooling, env vars, local run, and Vercel + Neon.
*   [Architecture Design](docs/architecture.md) — System data flows, Studio lock, and API routes.
*   [Usage Manual](docs/usage.md) — Public site, Studio, PDF export, and contact inbox.
*   [Coding Standards](docs/coding-standards.md) — Style, comments, tests, and banned idioms.
*   [Security](docs/security.md) — Studio hashing, public vs private surfaces, disclosure.
*   [Architecture Decisions (ADRs)](docs/adr/) — Why Studio is a passphrase, why a Vite SPA.

## Contributing

This is a personal CV. If you fork it, see [CONTRIBUTING.md](CONTRIBUTING.md) for the small-project `develop` → `main` model.

## License

MIT for the **code**. Sample names, copy, and generated images are placeholders — replace them in Studio before you treat the site as yours. See [LICENSE](LICENSE).
