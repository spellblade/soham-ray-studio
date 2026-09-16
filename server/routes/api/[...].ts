/**
 * Production `/api/*` catch-all (Nitro / Vercel). Dev uses the Vite apiPlugin.
 * Keep this file under server/routes (not a top-level api/) so Vercel does not
 * treat it as a separate Functions directory.
 */
import { handleApiRequest } from "../../../src/lib/http/handle-api";

export default function api(event: { req: Request }) {
  return handleApiRequest(event.req);
}
