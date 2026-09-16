# Setup

## Local

Requires Node 22.

```bash
cp .env.example .env
npm ci
npm run dev
```

The app is a Vite SPA with React Router. It listens on `http://localhost:8080`. With no `DATABASE_URL`, it uses embedded PGLite. Data resets when the process dies.

## Environment

| Name | Required in production | Purpose |
| :--- | :--- | :--- |
| `DATABASE_URL` | Yes | Neon pooled Postgres. Without it, Studio saves do not survive restarts. |
| `BETTER_AUTH_SECRET` | Recommended | Signs identity cookies. **Not** the Studio key. |
| `BETTER_AUTH_URL` | If identity is on | Public origin, e.g. `https://your-app.vercel.app` |
| `VITE_AUTH_ENABLED` | No | `false` hides the email identity UI |

Studio's passphrase is **not** an env var. It is claimed in `/studio` and stored as a hash in the database.

## Vercel + Neon

1. Create a Neon project; copy the pooled connection string (`sslmode=require`).
2. New Vercel project from this GitHub repo.
3. Add the env vars above to Production (and Preview if you want durable preview data).
4. Deploy. Migrations run as part of `npm run build`.
5. Open `/studio` and **claim** a key. Keep it in a password manager.

Do not paste `DATABASE_URL` into the repository or a screenshot.

## Scripts

| Command | What it does |
| :--- | :--- |
| `npm run dev` | Vite dev server on port 8080 |
| `npm run build` | Production build, migrations, PGLite asset copy |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Node tests under `scripts/` |
| `npm run test:ci` | Same tests, used in GitHub Actions |
