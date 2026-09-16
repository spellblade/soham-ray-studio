import type { Profile } from "@/lib/profile";
import { getStudioToken } from "@/lib/studio-session";

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  const token = getStudioToken();
  if (token) headers.set("X-Studio-Token", token);
  const res = await fetch(path, { ...init, headers, credentials: "include" });
  const body = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) {
    throw new Error(body.error || res.statusText || "Request failed.");
  }
  return body;
}

export async function getProfile(): Promise<Profile> {
  return api<Profile>("/api/profile");
}

export async function saveProfile(input: { data: Profile }): Promise<Profile> {
  return api<Profile>("/api/profile", {
    method: "POST",
    body: JSON.stringify(input.data),
  });
}

export async function submitContact(input: {
  data: { name: string; email: string; subject?: string; message: string };
}) {
  return api<{ ok: true }>("/api/contact", {
    method: "POST",
    body: JSON.stringify(input.data),
  });
}

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export async function listMessages(): Promise<ContactMessage[]> {
  return api<ContactMessage[]>("/api/messages");
}
