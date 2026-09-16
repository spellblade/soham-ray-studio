import { TriangleAlert } from "lucide-react";
import { isRouteErrorResponse, useRouteError } from "react-router";

function ErrorScreen({ message }: { message: string }) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-paper px-6 text-center text-ink">
      <span className="text-danger" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="font-display text-2xl tracking-tight">Something went wrong</h1>
      <p className="max-w-md text-sm break-words text-muted">{message}</p>
    </main>
  );
}

function messageFrom(error: unknown): string {
  if (isRouteErrorResponse(error)) {
    return error.statusText || error.data || "An unexpected error occurred. Try reloading the page.";
  }
  if (error instanceof Error && error.message) return error.message;
  return "An unexpected error occurred. Try reloading the page.";
}

export function AppErrorComponent() {
  return <ErrorScreen message={messageFrom(useRouteError())} />;
}

export function NotFoundPage() {
  return <ErrorScreen message="Page not found." />;
}
