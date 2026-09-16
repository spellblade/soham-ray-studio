import type { IncomingMessage, ServerResponse } from "node:http";

function requestOrigin(req: IncomingMessage): string {
  const host = String(req.headers["x-forwarded-host"] ?? req.headers.host ?? "localhost:8080");
  const proto = String(
    req.headers["x-forwarded-proto"] ??
      ((req.socket as { encrypted?: boolean } | undefined)?.encrypted ? "https" : "http"),
  );
  return `${proto}://${host}`;
}

export async function incomingToRequest(req: IncomingMessage): Promise<Request> {
  const origin = requestOrigin(req);
  const rawUrl = req.url ?? "/";
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const item of value) headers.append(key, item);
    } else {
      headers.set(key, value);
    }
  }
  if (!headers.has("host")) headers.set("host", String(req.headers.host ?? "localhost:8080"));

  const method = (req.method ?? "GET").toUpperCase();
  const init: RequestInit & { duplex?: "half" } = { method, headers };
  if (method !== "GET" && method !== "HEAD") {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    init.body = Buffer.concat(chunks);
    init.duplex = "half";
  }
  return new Request(`${origin}${rawUrl}`, init);
}

export async function sendWebResponse(res: ServerResponse, response: Response) {
  res.statusCode = response.status;
  const setCookies =
    typeof response.headers.getSetCookie === "function" ? response.headers.getSetCookie() : [];
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") return;
    res.setHeader(key, value);
  });
  for (const cookie of setCookies) {
    res.appendHeader("set-cookie", cookie);
  }
  const body = Buffer.from(await response.arrayBuffer());
  res.end(body);
}
