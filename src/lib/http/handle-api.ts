import { z } from "zod";
import { auth } from "@/lib/auth/server";
import { assertSameSiteRequest, CrossSiteRequestError } from "@/lib/auth/isolation.server";
import { getSql } from "@/lib/db";
import { DEFAULT_PROFILE, parseProfile, profileSchema } from "@/lib/profile";
import { getRequest, runWithRequest } from "@/lib/request-context";
import {
  StudioLockedError,
  claimStudioPassphrase,
  issueStudioSession,
  passphraseMatches,
  requireStudioSession,
  revokeStudioSession,
  rotatePassphrase,
  sessionIsValid,
  studioIsClaimed,
} from "@/lib/studio-lock.server";

const keySchema = z.string().trim().min(8, "Use at least 8 characters.").max(200);

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please add your name.").max(120),
  email: z.string().trim().email("That email does not look right."),
  subject: z.string().trim().max(160).default(""),
  message: z.string().trim().min(12, "A little more context helps.").max(4000),
});

function json(data: unknown, status = 200) {
  return Response.json(data, { status });
}

function errorResponse(err: unknown) {
  if (err instanceof StudioLockedError || err instanceof CrossSiteRequestError) {
    return json({ error: err.message }, err.status);
  }
  if (err instanceof z.ZodError) {
    return json({ error: err.issues[0]?.message ?? "Invalid input." }, 400);
  }
  console.error("[api]", err);
  return json({ error: err instanceof Error ? err.message : "Request failed." }, 500);
}

function studioToken(): string | undefined {
  return getRequest()?.headers.get("x-studio-token") ?? undefined;
}

async function requireStudio() {
  assertSameSiteRequest();
  await requireStudioSession(studioToken());
}

async function loadProfile() {
  try {
    const sql = await getSql();
    const rows = await sql<{ data: unknown }>`
      select data from site_profile where id = 'site' limit 1
    `;
    if (!rows[0]) return DEFAULT_PROFILE;
    const parsed = parseProfile(rows[0].data);
    if (parsed.role === "Design Engineer" || parsed.name === "Asha Menon") return DEFAULT_PROFILE;
    return parsed;
  } catch (err) {
    console.error("[profile] falling back to sample content:", err);
    return DEFAULT_PROFILE;
  }
}

export async function handleApiRequest(request: Request): Promise<Response> {
  return runWithRequest(request, () => dispatch(request));
}

async function dispatch(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    const method = request.method.toUpperCase();

    if (path.startsWith("/api/auth")) {
      return auth.handler(request);
    }

    if (path === "/api/profile" && method === "GET") {
      return json(await loadProfile());
    }

    if (path === "/api/profile" && method === "POST") {
      await requireStudio();
      const body = profileSchema.parse(await request.json());
      const sql = await getSql();
      await sql.query(
        `insert into site_profile (id, user_id, data, updated_at)
         values ('site', 'studio', $1::jsonb, now())
         on conflict (id) do update
           set data = excluded.data,
               updated_at = now()`,
        [JSON.stringify(body)],
      );
      return json(body);
    }

    if (path === "/api/contact" && method === "POST") {
      assertSameSiteRequest();
      const data = contactSchema.parse(await request.json());
      const sql = await getSql();
      await sql`
        insert into contact_messages (name, email, subject, message)
        values (${data.name}, ${data.email}, ${data.subject}, ${data.message})
      `;
      return json({ ok: true });
    }

    if (path === "/api/messages" && method === "GET") {
      await requireStudio();
      const sql = await getSql();
      const rows = await sql<{
        id: number;
        name: string;
        email: string;
        subject: string;
        message: string;
        created_at: string;
      }>`
        select id, name, email, subject, message, created_at
        from contact_messages
        order by id desc
        limit 50
      `;
      return json(
        rows.map((row) => ({
          id: row.id,
          name: row.name,
          email: row.email,
          subject: row.subject,
          message: row.message,
          createdAt: row.created_at,
        })),
      );
    }

    if (path === "/api/studio/status" && method === "GET") {
      const [unlocked, claimed] = await Promise.all([
        sessionIsValid(studioToken()),
        studioIsClaimed(),
      ]);
      return json({ unlocked, claimed });
    }

    if (path === "/api/studio/claim" && method === "POST") {
      assertSameSiteRequest();
      const data = z.object({ key: keySchema, confirm: keySchema }).parse(await request.json());
      if (data.key !== data.confirm) {
        throw new StudioLockedError("The two keys do not match.");
      }
      if (await studioIsClaimed()) {
        throw new StudioLockedError("Studio is already claimed.");
      }
      await claimStudioPassphrase(data.key);
      return json({ token: await issueStudioSession() });
    }

    if (path === "/api/studio/unlock" && method === "POST") {
      assertSameSiteRequest();
      const data = z.object({ key: keySchema }).parse(await request.json());
      const ok = await passphraseMatches(data.key);
      if (!ok) throw new StudioLockedError("That key does not match.");
      return json({ token: await issueStudioSession() });
    }

    if (path === "/api/studio/lock" && method === "POST") {
      await revokeStudioSession(studioToken());
      return json({ ok: true });
    }

    if (path === "/api/studio/key" && method === "POST") {
      await requireStudio();
      const data = z.object({ currentKey: keySchema, nextKey: keySchema }).parse(await request.json());
      if (data.currentKey === data.nextKey) {
        throw new StudioLockedError("Pick a different key.");
      }
      const ok = await passphraseMatches(data.currentKey);
      if (!ok) throw new StudioLockedError("Current key is wrong.");
      await rotatePassphrase(data.nextKey);
      return json({ token: await issueStudioSession() });
    }

    return json({ error: "Not found." }, 404);
  } catch (err) {
    return errorResponse(err);
  }
}
