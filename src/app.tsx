import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";

export function App() {
  return (
    <AuthProvider>
      <PreviewHostBridge />
      <Outlet />
      <Toaster
        theme="light"
        position="bottom-right"
        toastOptions={{
          className: "font-sans",
          style: {
            background: "var(--color-paper)",
            color: "var(--color-ink)",
            border: "1px solid var(--color-line)",
          },
        }}
      />
      <Analytics />
    </AuthProvider>
  );
}
