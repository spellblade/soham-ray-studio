import type { Plugin } from "vite";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { incomingToRequest, sendWebResponse } from "./src/lib/http/from-node.ts";

/**
 * Finish PGLite bootstrap during dev-server setup (before traffic). Vite awaits
 * async `configureServer` hooks. Production: `src/lib/db` kicks `ensureDbReady`
 * on import.
 */
function pgliteBootstrapPlugin(): Plugin {
  return {
    name: "studio:pglite-bootstrap",
    apply: "serve",
    async configureServer(server) {
      try {
        const mod = (await server.ssrLoadModule("/src/lib/db.ts")) as {
          ensureDbReady?: () => Promise<void>;
        };
        if (typeof mod.ensureDbReady === "function") {
          await mod.ensureDbReady();
        }
      } catch (err) {
        console.error("[studio] DB bootstrap failed:", err);
        throw err;
      }
    },
  };
}

/**
 * JSON `/api/*` (profile, studio lock, Better Auth). Runs before the SPA
 * HTML fallback so `/api/profile` never returns index.html.
 */
function apiPlugin(): Plugin {
  return {
    name: "studio:api",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathOnly = (req.url ?? "").split("?", 1)[0] ?? "";
        if (pathOnly !== "/api" && !pathOnly.startsWith("/api/")) {
          next();
          return;
        }
        try {
          const request = await incomingToRequest(req);
          const mod = (await server.ssrLoadModule("/src/lib/http/handle-api.ts")) as {
            handleApiRequest: (incoming: Request) => Promise<Response>;
          };
          await sendWebResponse(res, await mod.handleApiRequest(request));
        } catch (err) {
          console.error("[studio] /api handler failed:", err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("content-type", "application/json; charset=utf-8");
            res.end(JSON.stringify({ error: "Request failed." }));
          }
        }
      });
    },
  };
}

export default defineConfig(({ command, isPreview }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 8081,
    strictPort: true,
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    pgliteBootstrapPlugin(),
    apiPlugin(),
    tailwindcss(),
    ...(command === "build" || isPreview
      ? [
          nitro({
            preset: "vercel",
            serverDir: "./server",
          }),
        ]
      : []),
    viteReact(),
  ],
}));
