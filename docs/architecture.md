# Architecture

```text
Browser
  │  public pages, PDF (client)
  │  Studio session token (X-Studio-Token)
  ▼
Vite SPA + React Router (Nitro / Vercel for /api)
  │  JSON /api/* handlers
  ▼
Postgres  ── Neon when DATABASE_URL is set
          └── PGLite WASM otherwise
```

## Profile

One JSON document (`site_profile.id = 'site'`) validated with Zod in [`src/lib/profile.ts`](../src/lib/profile.ts). Public `GET /api/profile` reads it; `POST /api/profile` requires a Studio session.

## Studio lock

Tables in [`migrations/0003_studio_lock.sql`](../migrations/0003_studio_lock.sql):

- `studio_lock` — salt + PBKDF2 hash of the owner passphrase
- `studio_sessions` — SHA-256 of a random token, expiry

Server logic: [`src/lib/studio-lock.server.ts`](../src/lib/studio-lock.server.ts). UI never sees the hash.

## Optional identity

Better Auth at `/api/auth/*` can sign people in with Google / X / email. That identity is **not** wired to `saveProfile`. See [ADR-0002](adr/0002-studio-passphrase-not-oauth.md).

## Routes

| Path | Role |
| :--- | :--- |
| `/` | Public CV |
| `/work/:projectId` | Case study |
| `/studio` | Claim / unlock / editor |
| `/login` | Optional identity |
| `/api/auth/*` | Better Auth |
| `/api/profile` | Read / save the published CV |
| `/api/studio/*` | Claim, unlock, lock, rotate key |
| `/api/contact` | Public contact form |
| `/api/messages` | Studio inbox |

## Deploy

Nitro preset `vercel`. `scripts/migrate.mjs` applies SQL files when `DATABASE_URL` is present.
