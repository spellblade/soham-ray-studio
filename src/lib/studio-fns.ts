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

export function studioStatus() {
  return api<{ unlocked: boolean; claimed: boolean }>("/api/studio/status");
}

export function claimStudio(input: { data: { key: string; confirm: string } }) {
  return api<{ token: string }>("/api/studio/claim", {
    method: "POST",
    body: JSON.stringify(input.data),
  });
}

export function unlockStudio(input: { data: { key: string } }) {
  return api<{ token: string }>("/api/studio/unlock", {
    method: "POST",
    body: JSON.stringify(input.data),
  });
}

export function lockStudio() {
  return api<{ ok: true }>("/api/studio/lock", { method: "POST" });
}

export function changeStudioKey(input: { data: { currentKey: string; nextKey: string } }) {
  return api<{ token: string }>("/api/studio/key", {
    method: "POST",
    body: JSON.stringify(input.data),
  });
}
