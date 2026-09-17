/**
 * Self-hosted Better Auth for this app (server-only).
 *
 * Email/password identity at `/api/auth/*`. It does not unlock Studio.
 * NEVER import this from client code — it pulls in `pg` and Better Auth internals.
 */
import { betterAuth } from "better-auth";
import { randomBytes } from "node:crypto";
import { Pool } from "pg";
import { ensureDbReady, getPglite } from "../db";
import { emailAndPasswordEnabled } from "./email-password";
import { pgliteDialect } from "./pglite-dialect";

void ensureDbReady();

/**
 * Dev secret must outlive HMR: PGLite session rows live on `globalThis`, so a
 * re-eval of this file must not mint a new signing secret mid-dev.
 */
const globalAuthRef = globalThis as typeof globalThis & {
  __authDevSecret__?: string;
};
function devAuthSecret(): string {
  globalAuthRef.__authDevSecret__ ??= randomBytes(32).toString("hex");
  return globalAuthRef.__authDevSecret__;
}

/** Read an env var, treating empty/whitespace as unset. */
const env = (key: string): string | undefined => {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
};

const authDisabled = env("VITE_AUTH_ENABLED") === "false";

const explicitBaseURL = env("BETTER_AUTH_URL");
const LOCAL_DEV_ORIGINS: string[] = [
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://[::1]:8080",
];
const baseURL = explicitBaseURL ?? "http://localhost:8080";
const trustedOrigins: string[] = explicitBaseURL
  ? [explicitBaseURL, ...LOCAL_DEV_ORIGINS]
  : LOCAL_DEV_ORIGINS;

const databaseUrl = env("DATABASE_URL");
const database = databaseUrl
  ? new Pool({ connectionString: databaseUrl })
  : { dialect: pgliteDialect(() => getPglite()), type: "postgres" as const };

export const auth = betterAuth({
  baseURL,
  secret: env("BETTER_AUTH_SECRET") ?? devAuthSecret(),
  database,
  trustedOrigins,
  session: { cookieCache: { enabled: true, maxAge: 300 } },
  ...(emailAndPasswordEnabled && !authDisabled
    ? { emailAndPassword: { enabled: true } }
    : {}),
  advanced: {
    useSecureCookies: false,
    defaultCookieAttributes: { secure: true, sameSite: "lax", path: "/" },
    cookies: {
      session_token: { name: "__Host-auth.session_token" },
      session_data: { name: "__Host-auth.session_data" },
      account_data: { name: "__Host-auth.account_data" },
      dont_remember: { name: "__Host-auth.dont_remember" },
    },
  },
});
