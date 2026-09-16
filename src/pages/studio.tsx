import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { StudioEditor } from "@/components/studio-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProfile } from "@/lib/profile-fns";
import { DEFAULT_PROFILE, type Profile } from "@/lib/profile";
import { setStudioToken } from "@/lib/studio-session";
import { claimStudio, studioStatus, unlockStudio } from "@/lib/studio-fns";

export function StudioPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [claimed, setClaimed] = useState(false);
  const [key, setKey] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(() => setProfile(DEFAULT_PROFILE));
    studioStatus()
      .then((s) => {
        setUnlocked(s.unlocked);
        setClaimed(s.claimed);
      })
      .catch(() => {
        setUnlocked(false);
        setClaimed(false);
      });
  }, []);

  async function onUnlock(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const { token } = await unlockStudio({ data: { key } });
      setStudioToken(token);
      setUnlocked(true);
      setClaimed(true);
      setKey("");
      setConfirm("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "That key does not match.");
    } finally {
      setPending(false);
    }
  }

  async function onClaim(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const { token } = await claimStudio({ data: { key, confirm } });
      setStudioToken(token);
      setUnlocked(true);
      setClaimed(true);
      setKey("");
      setConfirm("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not claim Studio.");
    } finally {
      setPending(false);
    }
  }

  if (unlocked === null) {
    return (
      <main className="grid min-h-dvh place-items-center">
        <p className="text-sm text-muted">Checking the lock…</p>
      </main>
    );
  }

  if (!unlocked) {
    return (
      <main className="grid min-h-dvh place-items-center px-5 py-16">
        <div className="w-full max-w-md">
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
            Private
          </p>
          {claimed ? (
            <>
              <h1 className="mt-3 font-display text-4xl tracking-tight">
                Studio is locked
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                A Google or X account cannot open this editor. Enter the private
                studio key you chose when you claimed the site.
              </p>
              <form onSubmit={(e) => void onUnlock(e)} className="mt-8 space-y-4">
                <label className="block space-y-2">
                  <Label>Studio key</Label>
                  <Input
                    type="password"
                    autoComplete="current-password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    minLength={8}
                    required
                  />
                </label>
                {error ? <p className="text-sm text-danger">{error}</p> : null}
                <Button type="submit" className="w-full" disabled={pending}>
                  {pending ? "Unlocking…" : "Unlock"}
                </Button>
              </form>
            </>
          ) : (
            <>
              <h1 className="mt-3 font-display text-4xl tracking-tight">
                Claim this studio
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Anyone can have a Google or X account, so those never unlock the
                editor. Choose a private key only you know. After this, the public
                site, CV, and inbox can only be changed with that key.
              </p>
              <form onSubmit={(e) => void onClaim(e)} className="mt-8 space-y-4">
                <label className="block space-y-2">
                  <Label>New studio key</Label>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    minLength={8}
                    required
                  />
                </label>
                <label className="block space-y-2">
                  <Label>Confirm key</Label>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    minLength={8}
                    required
                  />
                </label>
                {error ? <p className="text-sm text-danger">{error}</p> : null}
                <Button type="submit" className="w-full" disabled={pending}>
                  {pending ? "Claiming…" : "Claim studio"}
                </Button>
              </form>
            </>
          )}
          <p className="mt-8 text-sm text-muted">
            <Link to="/" className="underline-offset-4 hover:underline">
              Back to the public site
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-dvh">
      <div className="border-b border-line">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="text-sm text-muted hover:text-ink">
            ← Public site
          </Link>
        </div>
      </div>
      {profile ? <StudioEditor initial={profile} /> : <div className="min-h-dvh bg-paper" />}
    </div>
  );
}
