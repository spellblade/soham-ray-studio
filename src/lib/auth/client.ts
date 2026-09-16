import { createAuthClient } from "better-auth/react";

/**
 * Better Auth client for this React SPA.
 * Talks to same-origin `/api/auth/*`. Identity only — does not unlock Studio.
 */
export const authClient = createAuthClient();

/**
 * True when the email sign-in UI should be shown.
 * Set `VITE_AUTH_ENABLED=false` to hide it.
 */
export const authEnabled = import.meta.env.VITE_AUTH_ENABLED !== "false";
