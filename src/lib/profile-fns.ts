import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { DEFAULT_PROFILE, parseProfile, profileSchema } from "@/lib/profile";
import { studioMiddleware } from "@/lib/studio-middleware";

export const getProfile = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const sql = await getSql();
    const rows = await sql<{ data: unknown }>`
      select data from site_profile where id = 'site' limit 1
    `;
    if (!rows[0]) return DEFAULT_PROFILE;
    const parsed = parseProfile(rows[0].data);
    // Sample was rewritten. Do not keep the old published sample sitting in the local DB.
    if (parsed.role === "Design Engineer" || parsed.name === "Asha Menon") return DEFAULT_PROFILE;
    return parsed;
  } catch (err) {
    console.error("[profile] falling back to sample content:", err);
    return DEFAULT_PROFILE;
  }
});

export const saveProfile = createServerFn({ method: "POST" })
  .middleware([studioMiddleware])
  .validator((input: unknown) => profileSchema.parse(input))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const payload = JSON.stringify(data);
    await sql.query(
      `insert into site_profile (id, user_id, data, updated_at)
       values ('site', 'studio', $1::jsonb, now())
       on conflict (id) do update
         set data = excluded.data,
             updated_at = now()`,
      [payload],
    );
    return data;
  });

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please add your name.").max(120),
  email: z.string().trim().email("That email does not look right."),
  subject: z.string().trim().max(160).default(""),
  message: z.string().trim().min(12, "A little more context helps.").max(4000),
});

export const submitContact = createServerFn({ method: "POST" })
  .validator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      insert into contact_messages (name, email, subject, message)
      values (${data.name}, ${data.email}, ${data.subject}, ${data.message})
    `;
    return { ok: true as const };
  });

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export const listMessages = createServerFn({ method: "GET" })
  .middleware([studioMiddleware])
  .handler(async () => {
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
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      subject: row.subject,
      message: row.message,
      createdAt: row.created_at,
    })) satisfies ContactMessage[];
  });
