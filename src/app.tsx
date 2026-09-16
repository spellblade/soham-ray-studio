import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";

export function App() {
  return (
    <>
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
    </>
  );
}
