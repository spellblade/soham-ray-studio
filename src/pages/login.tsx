import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      if (mode === "signup") {
        const { error: err } = await authClient.signUp.email({
          email,
          password,
          name: name.trim() || email.split("@")[0] || "Owner",
          callbackURL: "/studio",
        });
        if (err) throw new Error(err.message || "Could not create the account.");
      } else {
        const { error: err } = await authClient.signIn.email({
          email,
          password,
          callbackURL: "/studio",
        });
        if (err) throw new Error(err.message || "Could not sign in.");
      }
      window.location.href = "/studio";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="grid min-h-dvh place-items-center px-5 py-16">
      <div className="w-full max-w-md">
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">Account</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight">
          {mode === "signup" ? "Create an email account" : "Email & password"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          This is optional identity only. Signing in — with email, Google, or X —
          never publishes changes. Editing still requires the private studio key.
        </p>

        {authEnabled ? (
          <>
            <form onSubmit={(e) => void onEmail(e)} className="mt-8 space-y-4">
              {mode === "signup" ? (
                <label className="block space-y-2">
                  <Label>Name</Label>
                  <Input
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
              ) : null}
              <label className="block space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="block space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              {error ? <p className="text-sm text-danger">{error}</p> : null}
              <Button type="submit" className="w-full" disabled={pending}>
                {pending
                  ? "Please wait…"
                  : mode === "signup"
                    ? "Create account"
                    : "Sign in with email"}
              </Button>
            </form>

            <button
              type="button"
              className="mt-3 text-sm text-muted underline-offset-4 hover:underline"
              onClick={() => {
                setMode(mode === "signup" ? "signin" : "signup");
                setError(null);
              }}
            >
              {mode === "signup"
                ? "Already have an email account? Sign in"
                : "Need an account? Create one with email"}
            </button>

            <div className="mt-10 border-t border-line pt-6">
              <p className="text-xs text-faint">
                Social sign-in does not unlock the editor.
              </p>
              <div className="mt-3 space-y-2">
                {GROK_PROVIDERS.map((p) => (
                  <Button
                    key={p.providerId}
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => signIn(p.providerId, { callbackURL: "/studio" })}
                  >
                    Continue with {p.label}
                  </Button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className="mt-8 text-sm text-muted">Sign-in is disabled.</p>
        )}

        <p className="mt-8 text-sm text-muted">
          <Link to="/studio" className="underline-offset-4 hover:underline">
            Go to Studio
          </Link>
          <span className="mx-2">·</span>
          <Link to="/" className="underline-offset-4 hover:underline">
            Public site
          </Link>
        </p>
      </div>
    </main>
  );
}
